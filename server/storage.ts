import { type User, type InsertUser, type Booking, type InsertBooking, type GalleryImage, type InsertGalleryImage, type Contact, type InsertContact, type Product, type InsertProduct } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  
  getGalleryImages(): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  deleteProduct(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private bookings: Map<string, Booking>;
  private galleryImages: Map<string, GalleryImage>;
  private contacts: Map<string, Contact>;
  private products: Map<string, Product>;

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
    this.galleryImages = new Map();
    this.contacts = new Map();
    this.products = new Map();
    
    // Initialize with default admin user
    const adminId = randomUUID();
    const adminUser: User = {
      id: adminId,
      username: "admin",
      password: "infinity"
    };
    this.users.set(adminId, adminUser);
    
    // Initialize with some gallery images
    const defaultImages = [
      {
        url: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        description: "Golden Retriever feliz após sessão de tosa"
      },
      {
        url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        description: "Gato malhado relaxado após banho"
      },
      {
        url: "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        description: "Beagle amigável após cuidados especiais"
      },
      {
        url: "https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        description: "Gato persa com pelagem bem cuidada"
      },
      {
        url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        description: "Filhote de labrador brincando"
      },
      {
        url: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        description: "Husky com lindos olhos azuis"
      },
      {
        url: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        description: "Gato laranja relaxado"
      },
      {
        url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        description: "Chihuahua fofo após cuidados"
      }
    ];
    
    defaultImages.forEach(img => {
      const id = randomUUID();
      const galleryImage: GalleryImage = {
        id,
        url: img.url,
        description: img.description,
        createdAt: new Date()
      };
      this.galleryImages.set(id, galleryImage);
    });

    // Initialize with default products
    const defaultProducts = [
      // Brinquedos Interativos
      {
        name: "Bola Interativa com Ração",
        description: "Bola que libera ração conforme o pet brinca, estimulando mente e corpo",
        price: "89.90",
        category: "brinquedos",
        imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Quebra-Cabeça Alimentar",
        description: "Quebra-cabeça em formato de osso que desafia a inteligência do pet",
        price: "65.90",
        category: "brinquedos", 
        imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Corda Interativa com Nós",
        description: "Corda resistente com múltiplos nós para brincadeiras e exercícios",
        price: "34.90",
        category: "brinquedos",
        imageUrl: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Tapete Olfativo Amarelo",
        description: "Tapete que estimula o faro natural do pet durante a alimentação",
        price: "78.90",
        category: "brinquedos",
        imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      // Produtos de Higiene
      {
        name: "Shampoo Bubble Bath Premium",
        description: "Shampoo suave com fórmula especial para banhos relaxantes",
        price: "45.90",
        category: "higiene",
        imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Condicionador Hidratante",
        description: "Condicionador que deixa o pelo macio e hidratado",
        price: "38.90",
        category: "higiene",
        imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Escova Massageadora",
        description: "Escova especial que massageia enquanto remove pelos mortos",
        price: "52.90",
        category: "higiene",
        imageUrl: "https://images.unsplash.com/photo-1559190394-df5a28aab5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Toalhas Ultra Absorventes",
        description: "Conjunto de toalhas macias para secagem após o banho",
        price: "69.90",
        category: "higiene",
        imageUrl: "https://images.unsplash.com/photo-1516041420636-a952e7d59b1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      }
    ];

    defaultProducts.forEach(prod => {
      const id = randomUUID();
      const product: Product = {
        id,
        name: prod.name,
        description: prod.description,
        price: prod.price,
        category: prod.category,
        imageUrl: prod.imageUrl,
        createdAt: new Date()
      };
      this.products.set(id, product);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id,
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const id = randomUUID();
    const image: GalleryImage = { 
      ...insertImage, 
      id,
      createdAt: new Date()
    };
    this.galleryImages.set(id, image);
    return image;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      phone: insertContact.phone || null,
      newsletter: insertContact.newsletter || null,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.category === category)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }
}

export const storage = new MemStorage();
