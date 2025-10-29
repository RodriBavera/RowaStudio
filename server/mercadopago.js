import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

const accessToken = process.env.MP_ACCESS_TOKEN;
const client = new MercadoPagoConfig({ accessToken });

export const crearPreferencia = async (carrito, cliente, envio, formaPago) => {
    try {
        console.log("🎯 Creando preferencia con redirección...");

        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

        const body = {
            items: [{
                title: "Compra en RowaStudio",
                quantity: 1,
                currency_id: "ARS",
                unit_price: total,
            }],
            back_urls: {
                success: "http://localhost:5174/success",  // ← Mismo puerto que tu frontend
                failure: "http://localhost:5174/failure",  // ← Mismo puerto que tu frontend
                pending: "http://localhost:5174/pending",  // ← Mismo puerto que tu frontend
            },
            // ✅ AUTO_RETURN CORRECTO - Solo si success URL está definida
            auto_return: "approved",
        };

        console.log("📤 Configuración con auto_return:", JSON.stringify(body, null, 2));

        const preference = new Preference(client);
        const result = await preference.create({ body });

        console.log("🎉 Preferencia creada con redirección automática");
        console.log("🆔 ID:", result.id);
        return result.id;

    } catch (error) {
        console.error("💥 ERROR:", error.message);
        
        // Si falla con auto_return, intentar sin él
        if (error.message.includes("auto_return")) {
            console.log("🔄 Intentando sin auto_return...");
            return await crearPreferenciaSinAutoReturn(carrito, cliente, envio, formaPago);
        }
        
        throw error;
    }
};

// Versión de respaldo sin auto_return
async function crearPreferenciaSinAutoReturn(carrito, cliente, envio, formaPago) {
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    const body = {
        items: [{
            title: "Compra en RowaStudio",
            quantity: 1,
            currency_id: "ARS",
            unit_price: total,
        }],
        back_urls: {
            success: "http://localhost:5174/success",
            failure: "http://localhost:5174/failure",
            pending: "http://localhost:5174/pending",
        },
        // Sin auto_return
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    
    console.log("✅ Preferencia creada (sin auto_return)");
    return result.id;
}