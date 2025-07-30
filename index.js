require('dotenv').config();
const express = require('express');
const twilio = require('twilio');

const app = express();
app.use(express.urlencoded({ extended: false }));

app.post('/whatsapp', (req, res) => {
    const incomingMsg = req.body.Body.trim().toLowerCase();
    const MessagingResponse = twilio.twiml.MessagingResponse;
    const twiml = new MessagingResponse();
    const msg = twiml.message();

    if (incomingMsg.includes("hola")) {
        msg.body(
            "Hola, bienvenido a Barberia Marco.\n" +
            "Que deseas hacer?\n\n" +
            "1. Ver servicios y precios\n" +
            "2. Ver horarios disponibles\n\n" +
            "Escribe el numero de la opcion."
        );
    } else if (incomingMsg === "1") {
        msg.body(
            "Servicios disponibles:\n" +
            "- Corte clasico - 5000 CRC\n" +
            "- Corte + Barba - 7000 CRC\n" +
            "- Barba - 4000 CRC\n\n" +
            "Deseas agendar una cita? (proximamente)"
        );
    } else if (incomingMsg === "2") {
        msg.body(
            "Horarios disponibles:\n" +
            "Lunes a Sabado: 9am - 6pm\nDomingos: Cerrado"
        );
    } else {
        msg.body("Opcion no reconocida. Escribe 'Hola' para empezar.");
    }

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Bot funcionando en puerto ${PORT}`);
});
