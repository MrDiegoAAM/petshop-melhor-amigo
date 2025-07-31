import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertBookingSchema } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { X } from 'lucide-react';
import type { z } from 'zod';

type BookingFormData = z.infer<typeof insertBookingSchema>;

interface BookingModalProps {
  onClose: () => void;
}

export function BookingModal({ onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      service: '',
      date: '',
      time: '',
    },
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      return apiRequest('POST', '/api/bookings', data);
    },
    onSuccess: () => {
      toast({
        title: "Agendamento confirmado!",
        description: "Seu serviço foi agendado com sucesso.",
      });
      form.reset();
      setSelectedDate('');
      setSelectedTime('');
      setShowTimeSlots(false);
      setShowForm(false);
      onClose();
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    },
    onError: () => {
      toast({
        title: "Erro ao agendar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const generateCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const calendarDays = [];
    
    // Add day headers
    daysOfWeek.forEach(day => {
      calendarDays.push(
        <div key={`header-${day}`} className="font-semibold text-gray-600 py-2 text-center">
          {day}
        </div>
      );
    });
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`}></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = date.toISOString().split('T')[0];
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today && !isToday;
      const isSelected = selectedDate === dateString;
      
      if (isPast) {
        calendarDays.push(
          <div key={day} className="py-2 text-gray-400 text-center">
            {day}
          </div>
        );
      } else {
        calendarDays.push(
          <button
            key={day}
            type="button"
            onClick={() => selectDate(dateString)}
            className={`py-2 hover:bg-pet-green-light cursor-pointer rounded text-center transition-colors ${
              isToday ? 'bg-pet-green text-white' : ''
            } ${isSelected ? 'bg-pet-green text-white' : ''}`}
          >
            {day}
          </button>
        );
      }
    }
    
    return calendarDays;
  };

  const selectDate = (date: string) => {
    setSelectedDate(date);
    setShowTimeSlots(true);
    setShowForm(false);
  };

  const selectTime = (time: string) => {
    setSelectedTime(time);
    setShowForm(true);
    form.setValue('date', selectedDate);
    form.setValue('time', time);
  };

  const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const onSubmit = (data: BookingFormData) => {
    createBookingMutation.mutate(data);
  };

  return (
    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Agendar Serviço</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Selecione uma Data</h3>
          <div className="grid grid-cols-7 gap-1 text-center mb-6">
            {generateCalendar()}
          </div>
        </div>

        {showTimeSlots && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Horários Disponíveis</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {timeSlots.map(time => (
                <button
                  key={time}
                  type="button"
                  onClick={() => selectTime(time)}
                  className={`px-3 py-2 border border-gray-300 rounded-lg hover:bg-pet-green hover:text-white transition-colors ${
                    selectedTime === time ? 'bg-pet-green text-white' : ''
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {showForm && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Dados do Agendamento</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(11) 99999-9999" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serviço</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um serviço" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tosa">Tosa Especializada</SelectItem>
                          <SelectItem value="banho">Banho Relaxante</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-pet-green text-white hover:bg-pet-green-dark"
                  disabled={createBookingMutation.isPending}
                >
                  {createBookingMutation.isPending ? 'Confirmando...' : 'Confirmar Agendamento'}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
