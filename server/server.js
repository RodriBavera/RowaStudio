import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { crearPreferencia } from "./mercadopago.js";

dotenv.config();

const app = express();

// ✅ CORREGIDO - CORS más flexible para desarrollo
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json());

// Logging de requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log(`🌐 Origen: ${req.headers.origin}`);
  next();
});

// Ruta de health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Servidor funcionando",
    timestamp: new Date().toISOString(),
    origin: req.headers.origin
  });
});

app.post("/create_preference", async (req, res) => {
  try {
    console.log("📦 Recibiendo solicitud de preferencia...");
    console.log(`📍 Origen: ${req.headers.origin}`);
    
    const { carrito, cliente, envio, formaPago } = req.body;
    
    if (!carrito || !cliente || !envio || !formaPago) {
      return res.status(400).json({ 
        error: "Datos incompletos"
      });
    }

    console.log("✅ Datos recibidos correctamente");
    
    const preferenceId = await crearPreferencia(carrito, cliente, envio, formaPago);
    
    res.json({ 
      success: true,
      id: preferenceId,
      message: "Preferencia creada correctamente"
    });
    
  } catch (error) {
    console.error("❌ Error en create_preference:", error.message);
    res.status(500).json({ 
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 CORS habilitado para: localhost:5173, localhost:5174, localhost:3000`);
});