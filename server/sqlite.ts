import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

// Cria o diretório data se não existir
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Caminho para o banco SQLite
const dbPath = path.join(dataDir, 'petshop.db');

// Cria a conexão com SQLite
export const sqlite = new Database(dbPath);

// Habilita WAL mode para melhor performance
sqlite.pragma('journal_mode = WAL');

// Cria as tabelas se não existirem
export function initializeTables() {
  // Tabela de usuários
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  // Tabela de agendamentos
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      service TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de imagens da galeria
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS gallery_images (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      url TEXT NOT NULL,
      alt TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de contatos
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      newsletter INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de produtos
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("✅ Tabelas SQLite inicializadas com sucesso");
}

// Função para fechar a conexão
export function closeSqlite() {
  sqlite.close();
}

// Função para popular dados iniciais
export function populateInitialData() {
  // Verifica se já existem dados para evitar duplicação
  const galleryCount = sqlite.prepare('SELECT COUNT(*) as count FROM gallery_images').get() as { count: number };
  const productsCount = sqlite.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };

  if (galleryCount.count === 0) {
    console.log("🔄 Populando galeria com dados iniciais...");
    
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

    const insertImage = sqlite.prepare('INSERT INTO gallery_images (id, url, alt, created_at) VALUES (?, ?, ?, ?)');
    
    defaultImages.forEach(img => {
      const id = crypto.randomUUID();
      const createdAt = new Date().toISOString();
      insertImage.run(id, img.url, img.description, createdAt);
    });

    console.log(`✅ ${defaultImages.length} imagens adicionadas à galeria`);
  }

  if (productsCount.count === 0) {
    console.log("🔄 Populando produtos com dados iniciais...");
    
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

    const insertProduct = sqlite.prepare('INSERT INTO products (id, name, description, price, category, image_url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)');
    
    defaultProducts.forEach(prod => {
      const id = crypto.randomUUID();
      const createdAt = new Date().toISOString();
      insertProduct.run(id, prod.name, prod.description, prod.price, prod.category, prod.imageUrl, createdAt);
    });

    console.log(`✅ ${defaultProducts.length} produtos adicionados ao catálogo`);
  }
}

// Inicializa as tabelas ao importar o módulo
initializeTables();

// Popula dados iniciais se necessário
populateInitialData();