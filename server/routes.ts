import type { Express } from "express";
import { createServer, type Server } from "http";
import { getStorage } from "./storage";
import { insertBookingSchema, insertGalleryImageSchema, insertContactSchema, insertProductSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin authentication
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const storage = await getStorage();
      const user = await storage.getUserByUsername(username);
      
      if (user && user.password === password) {
        res.json({ success: true, user: { id: user.id, username: user.username } });
      } else {
        res.status(401).json({ message: "Credenciais inválidas" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Bookings
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const storage = await getStorage();
      const booking = await storage.createBooking(validatedData);
      res.json(booking);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para agendamento" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const storage = await getStorage();
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar agendamentos" });
    }
  });

  app.delete("/api/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ error: "ID do agendamento é obrigatório" });
      }

      const storage = await getStorage();
      const deleted = await storage.deleteBooking(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
      }

      res.json({ success: true, message: "Agendamento removido com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  // Gallery images
  app.get("/api/gallery", async (req, res) => {
    try {
      const storage = await getStorage();
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar imagens da galeria" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const validatedData = insertGalleryImageSchema.parse(req.body);
      const storage = await getStorage();
      const image = await storage.createGalleryImage(validatedData);
      res.json(image);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para imagem" });
    }
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ error: "ID da imagem é obrigatório" });
      }

      const storage = await getStorage();
      const deleted = await storage.deleteGalleryImage(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Imagem não encontrada" });
      }

      res.json({ success: true, message: "Imagem deletada com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar imagem da galeria:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  // Contacts
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const storage = await getStorage();
      const contact = await storage.createContact(validatedData);
      res.json(contact);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para contato" });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const storage = await getStorage();
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar contatos" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const { category } = req.query;
      const storage = await getStorage();
      let products;
      
      if (category && typeof category === 'string') {
        products = await storage.getProductsByCategory(category);
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produtos" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const storage = await getStorage();
      const product = await storage.createProduct(validatedData);
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para produto" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const storage = await getStorage();
      const deleted = await storage.deleteProduct(id);
      
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ message: "Produto não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar produto" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
