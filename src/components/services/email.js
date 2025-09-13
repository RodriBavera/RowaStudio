
import emailjs from 'emailjs-com';


emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const sendEmail = async (templateParams) => {
    try {
        console.log('Enviando email con config:', {
            serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
            templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        });

        const response = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            templateParams
        );

        console.log('✅ Email enviado exitosamente:', response);
        return response;
    } catch (error) {
        console.error('❌ Error detallado al enviar email:', error);
        console.error('Código de error:', error?.code);
        console.error('Mensaje:', error?.message);
        throw error;
    }
};

export default emailjs;