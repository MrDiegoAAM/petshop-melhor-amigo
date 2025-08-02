import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertGalleryImageSchema, insertProductSchema } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { X, Plus, Trash2, Calendar, MessageSquare, Image, Package } from 'lucide-react';
import type { z } from 'zod';
import type { GalleryImage, Contact, Booking, Product } from '@shared/schema';

type GalleryFormData = z.infer<typeof insertGalleryImageSchema>;
type ProductFormData = z.infer<typeof insertProductSchema>;

interface AdminPanelModalProps {
  onClose: () => void;
}

export function AdminPanelModal({ onClose }: AdminPanelModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch data
  const { data: galleryImages = [], isLoading: galleryLoading } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery'],
  });

  const { data: contacts = [], isLoading: contactsLoading } = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
  });

  const { data: bookings = [], isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ['/api/bookings'],
  });

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Gallery form
  const galleryForm = useForm<GalleryFormData>({
    resolver: zodResolver(insertGalleryImageSchema),
    defaultValues: {
      url: '',
      description: '',
    },
  });

  // Product form
  const productForm = useForm<ProductFormData>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
    },
  });

  // Gallery mutations
  const addImageMutation = useMutation({
    mutationFn: async (data: GalleryFormData) => {
      return apiRequest('POST', '/api/gallery', data);
    },
    onSuccess: () => {
      toast({
        title: "Imagem adicionada!",
        description: "A imagem foi adicionada à galeria com sucesso.",
      });
      galleryForm.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
    },
    onError: () => {
      toast({
        title: "Erro ao adicionar imagem",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  // Product mutations
  const addProductMutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      return apiRequest('POST', '/api/products', data);
    },
    onSuccess: () => {
      toast({
        title: "Produto adicionado!",
        description: "O produto foi adicionado com sucesso.",
      });
      productForm.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    },
    onError: () => {
      toast({
        title: "Erro ao adicionar produto",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/products/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Produto removido!",
        description: "O produto foi removido com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    },
    onError: () => {
      toast({
        title: "Erro ao remover produto",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/gallery/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Imagem removida!",
        description: "A imagem foi removida da galeria com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
    },
    onError: () => {
      toast({
        title: "Erro ao remover imagem",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const deleteBookingMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/bookings/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Agendamento removido!",
        description: "O agendamento foi removido com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    },
    onError: () => {
      toast({
        title: "Erro ao remover agendamento",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const onGallerySubmit = (data: GalleryFormData) => {
    addImageMutation.mutate(data);
  };

  const onProductSubmit = (data: ProductFormData) => {
    addProductMutation.mutate(data);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Tem certeza que deseja remover este produto?')) {
      deleteProductMutation.mutate(id);
    }
  };

  const handleDeleteImage = (id: string) => {
    if (confirm('Tem certeza que deseja remover esta imagem da galeria?')) {
      deleteImageMutation.mutate(id);
    }
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm('Tem certeza que deseja remover este agendamento?')) {
      deleteBookingMutation.mutate(id);
    }
  };

  return (
    <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Painel Administrativo</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Agendamentos
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Contatos
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Galeria
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Produtos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Agendamentos Recentes</h3>
              {bookingsLoading ? (
                <p>Carregando agendamentos...</p>
              ) : bookings.length === 0 ? (
                <p className="text-gray-500">Nenhum agendamento encontrado.</p>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 flex-1">
                          <div>
                            <strong>{booking.name}</strong>
                            <p className="text-sm text-gray-600">{booking.phone}</p>
                          </div>
                          <div>
                            <p className="font-medium">
                              {booking.service === 'tosa' ? 'Tosa Especializada' : 'Banho Relaxante'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm">{new Date(booking.date).toLocaleDateString('pt-BR')}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{booking.time}</p>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleDeleteBooking(booking.id);
                          }}
                          disabled={deleteBookingMutation.isPending}
                          className="ml-4"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Mensagens de Contato</h3>
              {contactsLoading ? (
                <p>Carregando contatos...</p>
              ) : contacts.length === 0 ? (
                <p className="text-gray-500">Nenhuma mensagem encontrada.</p>
              ) : (
                <div className="space-y-3">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-2">
                        <strong>{contact.name}</strong>
                        <span className="text-gray-600 ml-2">({contact.email})</span>
                        {contact.phone && <span className="text-gray-600 ml-2">- {contact.phone}</span>}
                      </div>
                      <p className="text-gray-700">{contact.message}</p>
                      {contact.newsletter === 'true' && (
                        <p className="text-sm text-green-600 mt-2">✓ Inscrito na newsletter</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Adicionar Nova Imagem</h3>
                <Form {...galleryForm}>
                  <form onSubmit={galleryForm.handleSubmit(onGallerySubmit)} className="space-y-4">
                    <FormField
                      control={galleryForm.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL da Imagem</FormLabel>
                          <FormControl>
                            <Input placeholder="https://exemplo.com/imagem.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={galleryForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Input placeholder="Descrição da imagem" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="bg-pet-green text-white hover:bg-pet-green-dark"
                      disabled={addImageMutation.isPending}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {addImageMutation.isPending ? 'Adicionando...' : 'Adicionar Imagem'}
                    </Button>
                  </form>
                </Form>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Imagens da Galeria</h3>
                {galleryLoading ? (
                  <p>Carregando galeria...</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryImages.map((image) => (
                      <div key={image.id} className="bg-gray-50 p-2 rounded-lg relative group">
                        <img 
                          src={image.url} 
                          alt={image.description}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                        <p className="text-sm text-gray-600 truncate">{image.description}</p>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-8 w-8 p-0"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeleteImage(image.id);
                          }}
                          disabled={deleteImageMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Adicionar Novo Produto</h3>
                <Form {...productForm}>
                  <form onSubmit={productForm.handleSubmit(onProductSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={productForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do Produto</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome do produto" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={productForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preço (R$)</FormLabel>
                            <FormControl>
                              <Input placeholder="99.90" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={productForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="brinquedos">Brinquedos Interativos</SelectItem>
                                <SelectItem value="higiene">Produtos de Higiene</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={productForm.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL da Imagem</FormLabel>
                            <FormControl>
                              <Input placeholder="https://exemplo.com/produto.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={productForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Descrição detalhada do produto" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="bg-pet-green text-white hover:bg-pet-green-dark"
                      disabled={addProductMutation.isPending}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {addProductMutation.isPending ? 'Adicionando...' : 'Adicionar Produto'}
                    </Button>
                  </form>
                </Form>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Produtos Cadastrados</h3>
                {productsLoading ? (
                  <p>Carregando produtos...</p>
                ) : products.length === 0 ? (
                  <p className="text-gray-500">Nenhum produto cadastrado.</p>
                ) : (
                  <div className="space-y-3">
                    {products.map((product) => (
                      <div key={product.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/attached_assets/banhorelaxante_1753978208956.png';
                              }}
                            />
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-gray-600">{product.description}</p>
                              <p className="text-sm">
                                <span className="font-medium">R$ {product.price}</span>
                                <span className="text-gray-500 ml-2">
                                  ({product.category === 'brinquedos' ? 'Brinquedos Interativos' : 'Produtos de Higiene'})
                                </span>
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleDeleteProduct(product.id);
                            }}
                            disabled={deleteProductMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>

                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}