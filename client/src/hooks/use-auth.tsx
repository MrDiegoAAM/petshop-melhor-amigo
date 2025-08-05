import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest, setAuthStateHandler } from '@/lib/queryClient';

interface User {
  id: string;
  username: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });
  
  const queryClient = useQueryClient();

  // Check authentication status
  const { data: authStatus } = useQuery({
    queryKey: ['/api/admin/status'],
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 2 * 60 * 1000, // Check every 2 minutes
  });

  // Update auth state when status changes
  useEffect(() => {
    if (authStatus) {
      setAuthState({
        isAuthenticated: authStatus.isAuthenticated,
        user: authStatus.user || null
      });
    }
  }, [authStatus]);

  // Set up global auth state handler
  useEffect(() => {
    setAuthStateHandler((isAuthenticated: boolean) => {
      if (!isAuthenticated) {
        setAuthState({
          isAuthenticated: false,
          user: null
        });
        // Invalidate all queries to clear cached data
        queryClient.invalidateQueries();
      }
    });
  }, [queryClient]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest('POST', '/api/admin/login', credentials);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setAuthState({
          isAuthenticated: true,
          user: data.user
        });
        // Invalidate auth status query to refresh
        queryClient.invalidateQueries({ queryKey: ['/api/admin/status'] });
      }
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/admin/logout');
      return response.json();
    },
    onSuccess: () => {
      setAuthState({
        isAuthenticated: false,
        user: null
      });
      // Clear all cached data
      queryClient.clear();
    },
  });

  return {
    ...authState,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}