import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { apiRequest } from '@/lib/queryClient';
import { X } from 'lucide-react';

interface AdminModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

interface LoginFormData {
  username: string;
  password: string;
}

export function AdminModal({ onClose, onLoginSuccess }: AdminModalProps) {
  const { toast } = useToast();
  const { login, isLoggingIn } = useAuth();

  const form = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
      });
      onLoginSuccess();
    } catch (error) {
      toast({
        title: "Credenciais inválidas",
        description: "Verifique seu usuário e senha.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl max-w-md w-full">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Acesso Administrativo</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite 'admin'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Digite 'infinity'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-pet-green text-white hover:bg-pet-green-dark"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

interface AdminPanelProps {
  onClose: () => void;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const { toast } = useToast();
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageDesc, setNewImageDesc] = useState('');

  const addImageMutation = useMutation({
    mutationFn: async (data: { url: string; description: string }) => {
      return apiRequest('POST', '/api/gallery', data);
    },
    onSuccess: () => {
      toast({
        title: "Imagem adicionada!",
        description: "A nova imagem foi adicionada à galeria.",
      });
      setNewImageUrl('');
      setNewImageDesc('');
    },
    onError: () => {
      toast({
        title: "Erro ao adicionar imagem",
        description: "Verifique a URL e tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleAddImage = () => {
    if (newImageUrl && newImageDesc) {
      addImageMutation.mutate({
        url: newImageUrl,
        description: newImageDesc,
      });
    } else {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha URL e descrição da imagem.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Painel Administrativo</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Gerenciar Galeria de Fotos</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              URL da Nova Foto
            </label>
            <Input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Descrição da Foto
            </label>
            <Input
              type="text"
              placeholder="Descrição para acessibilidade"
              value={newImageDesc}
              onChange={(e) => setNewImageDesc(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={handleAddImage}
            className="bg-pet-green text-white hover:bg-pet-green-dark"
            disabled={addImageMutation.isPending}
          >
            {addImageMutation.isPending ? 'Adicionando...' : '+ Adicionar Foto'}
          </Button>
        </div>
      </div>
    </div>
  );
}
