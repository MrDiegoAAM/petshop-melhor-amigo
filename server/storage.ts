import { type User, type InsertUser, type Booking, type InsertBooking, type GalleryImage, type InsertGalleryImage, type Contact, type InsertContact, type Product, type InsertProduct } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { sqlite } from "./sqlite";
import { users, bookings, galleryImages, contacts, products } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  deleteBooking(id: string): Promise<boolean>;
  
  getGalleryImages(): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  deleteGalleryImage(id: string): Promise<boolean>;
  
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
        url: "/petshop2.png",
        description: "Pet escolhendo seu mimo"
      },
      {
        url: "/petshop4.jpg",
        description: "Que tal deixar seu pet feliz com um ótimo petisco?"
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
        name: "Carpete adesivo para gatos",
        description: "Seu Gato Está Arranhando Muito Seu Sofá? Descubra Como Resolver",
        price: "89.90",
        category: "brinquedos",
        imageUrl: "https://www.casadascapas.store/cdn/shop/files/carpeteadesivo_1.jpg"
      },
      {
        name: "Quebra-Cabeça Alimentar",
        description: "Quebra-cabeça em formato de osso que desafia a inteligência do pet",
        price: "65.90",
        category: "brinquedos", 
        imageUrl: "https://m.media-amazon.com/images/I/61NV7impHDL._AC_SX522_.jpg"
      },
      {
        name: "Corda Interativa com Nós",
        description: "Corda resistente com múltiplos nós para brincadeiras e exercícios",
        price: "34.90",
        category: "brinquedos",
        imageUrl: "https://m.media-amazon.com/images/I/71BhqfTQRFL._UF1000,1000_QL80_.jpg"
      },
      {
        name: "Tapete Olfativo Amarelo",
        description: "Tapete que estimula o faro natural do pet durante a alimentação",
        price: "78.90",
        category: "brinquedos",
        imageUrl: "https://m.media-amazon.com/images/I/61jgDCDsOzL.jpg"
      },
      // Produtos de Higiene
      {
        name: "Shampoo Bubble Bath Premium",
        description: "Shampoo suave com fórmula especial para banhos relaxantes",
        price: "45.90",
        category: "higiene",
        imageUrl: "https://cdn.awsli.com.br/800x800/1658/1658417/produto/21478198781cca9e472.jpg"
      },
      {
        name: "Condicionador Hidratante",
        description: "Condicionador que deixa o pelo macio e hidratado",
        price: "38.90",
        category: "higiene",
        imageUrl: "https://dcdn-us.mitiendanube.com/stores/005/097/186/products/1000091586-508bb4ca114a5d01d717242109317003-480-0.jpg"
      },
      {
        name: "Escova Massageadora",
        description: "Escova especial que massageia enquanto remove pelos mortos",
        price: "52.90",
        category: "higiene",
        imageUrl: "https://images.tcdn.com.br/img/img_prod/214003/escova_de_banho_massageadora_pet_em_silicone_com_dispenser_de_shampoo_2_em_1_5937_5_2ed13a2134e1dbdc101a800f59dee22c.jpg"
      },
      {
        name: "Toalhas Ultra Absorventes",
        description: "Conjunto de toalhas macias para secagem após o banho",
        price: "69.90",
        category: "higiene",
        imageUrl: "https://gouppet.com.br/cdn/shop/files/6_0ef0bc38-9648-41d4-97ad-7f8f42e7b2ce_1024x.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
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

  async deleteBooking(id: string): Promise<boolean> {
    return this.bookings.delete(id);
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

  async deleteGalleryImage(id: string): Promise<boolean> {
    return this.galleryImages.delete(id);
  }
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const result = await db.insert(bookings).values(insertBooking).returning();
    return result[0];
  }
  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async deleteBooking(id: string): Promise<boolean> {
    const result = await db.delete(bookings).where(eq(bookings.id, id)).returning();
    return result.length > 0;
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return await db.select().from(galleryImages).orderBy(desc(galleryImages.createdAt));
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const result = await db.insert(galleryImages).values(insertImage).returning();
    return result[0];
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    const result = await db.delete(galleryImages).where(eq(galleryImages.id, id)).returning();
    return result.length > 0;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(insertContact).returning();
    return result[0];
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category)).orderBy(desc(products.createdAt));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(insertProduct).returning();
    return result[0];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result.length > 0;
  }
}

export class SqliteStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const stmt = sqlite.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as User | undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const stmt = sqlite.prepare('SELECT * FROM users WHERE username = ?');
    return stmt.get(username) as User | undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const stmt = sqlite.prepare('INSERT INTO users (id, username, password) VALUES (?, ?, ?)');
    stmt.run(id, insertUser.username, insertUser.password);
    
    return { id, ...insertUser };
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const createdAt = new Date();
    const stmt = sqlite.prepare('INSERT INTO bookings (id, name, phone, service, date, time, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)');
    stmt.run(id, insertBooking.name, insertBooking.phone, insertBooking.service, insertBooking.date, insertBooking.time, createdAt.toISOString());
    
    return { id, ...insertBooking, createdAt };
  }

  async getBookings(): Promise<Booking[]> {
    const stmt = sqlite.prepare('SELECT * FROM bookings ORDER BY created_at DESC');
    const rows = stmt.all() as any[];
    return rows.map(row => ({
      ...row,
      createdAt: new Date(row.created_at)
    }));
  }

  async deleteBooking(id: string): Promise<boolean> {
    const stmt = sqlite.prepare('DELETE FROM bookings WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    const stmt = sqlite.prepare('SELECT * FROM gallery_images ORDER BY created_at DESC');
    const rows = stmt.all() as any[];
    return rows.map(row => ({
      id: row.id,
      url: row.url,
      description: row.alt,
      createdAt: new Date(row.created_at)
    }));
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const id = randomUUID();
    const createdAt = new Date();
    const stmt = sqlite.prepare('INSERT INTO gallery_images (id, url, alt, created_at) VALUES (?, ?, ?, ?)');
    stmt.run(id, insertImage.url, insertImage.description, createdAt.toISOString());
    
    return { id, url: insertImage.url, description: insertImage.description, createdAt };
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    const stmt = sqlite.prepare('DELETE FROM gallery_images WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const createdAt = new Date();
    const stmt = sqlite.prepare('INSERT INTO contacts (id, name, email, phone, message, newsletter, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)');
    stmt.run(id, insertContact.name, insertContact.email, insertContact.phone || null, insertContact.message, insertContact.newsletter || null, createdAt.toISOString());
    
    return { id, ...insertContact, phone: insertContact.phone || null, newsletter: insertContact.newsletter || null, createdAt };
  }

  async getContacts(): Promise<Contact[]> {
    const stmt = sqlite.prepare('SELECT * FROM contacts ORDER BY created_at DESC');
    const rows = stmt.all() as any[];
    return rows.map(row => ({
      ...row,
      createdAt: new Date(row.created_at)
    }));
  }

  async getProducts(): Promise<Product[]> {
    const stmt = sqlite.prepare('SELECT * FROM products ORDER BY created_at DESC');
    const rows = stmt.all() as any[];
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: row.price,
      category: row.category,
      imageUrl: row.image_url,
      createdAt: new Date(row.created_at)
    }));
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const stmt = sqlite.prepare('SELECT * FROM products WHERE category = ? ORDER BY created_at DESC');
    const rows = stmt.all(category) as any[];
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: row.price,
      category: row.category,
      imageUrl: row.image_url,
      createdAt: new Date(row.created_at)
    }));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const createdAt = new Date();
    const stmt = sqlite.prepare('INSERT INTO products (id, name, description, price, category, image_url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)');
    stmt.run(id, insertProduct.name, insertProduct.description, insertProduct.price, insertProduct.category, insertProduct.imageUrl, createdAt.toISOString());
    
    return { id, ...insertProduct, createdAt };
  }

  async deleteProduct(id: string): Promise<boolean> {
    const stmt = sqlite.prepare('DELETE FROM products WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}

// Função para criar o storage apropriado
async function createStorage(): Promise<IStorage> {
  // Primeira opção: SQLite (banco local persistente)
  try {
    const sqliteStorage = new SqliteStorage();
    
    // Testa a conexão criando/verificando se existe o usuário admin
    let adminUser = await sqliteStorage.getUserByUsername("admin");
    if (!adminUser) {
      // Cria o usuário admin se não existir
      adminUser = await sqliteStorage.createUser({
        username: "admin",
        password: "infinity"
      });
      console.log("✅ Usuário admin criado no banco SQLite");
    }
    
    console.log("✅ Usando armazenamento em banco de dados SQLite");
    return sqliteStorage;
  } catch (error) {
    console.warn("⚠️  Erro ao conectar com SQLite:", error);
  }

  // Segunda opção: PostgreSQL (se configurado)
  if (db) {
    try {
      const dbStorage = new DbStorage();
      
      // Testa a conexão criando/verificando se existe o usuário admin
      let adminUser = await dbStorage.getUserByUsername("admin");
      if (!adminUser) {
        // Cria o usuário admin se não existir
        adminUser = await dbStorage.createUser({
          username: "admin",
          password: "infinity"
        });
        console.log("✅ Usuário admin criado no banco PostgreSQL");
      }
      
      console.log("✅ Usando armazenamento em banco de dados PostgreSQL");
      return dbStorage;
    } catch (error) {
      console.warn("⚠️  Erro ao conectar com PostgreSQL:", error);
    }
  }

  // Fallback: Armazenamento em memória
  console.log("🔄 Usando armazenamento em memória como fallback");
  return new MemStorage();
}

// Inicializa o storage dinamicamente
let storageInstance: IStorage | null = null;

export const getStorage = async (): Promise<IStorage> => {
  if (!storageInstance) {
    storageInstance = await createStorage();
  }
  return storageInstance;
};

// Para compatibilidade com o código existente, exporta uma instância padrão
export const storage = new MemStorage();
