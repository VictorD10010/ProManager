import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, type LoginResponse } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      // Validate request body
      const result = loginSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: result.error.errors,
        } as LoginResponse);
      }

      const { email, password } = result.data;

      // Validate credentials
      const user = await storage.validateCredentials(email, password);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Email ou senha incorretos",
        } as LoginResponse);
      }

      // Successful login
      return res.status(200).json({
        success: true,
        message: "Login realizado com sucesso",
        user: {
          id: user.id,
          username: user.username,
        },
      } as LoginResponse);
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
      } as LoginResponse);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
