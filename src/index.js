const express = require('express')
const apiRoutes = require('./routes/index.js');
const { ServerConfig, Logger } = require('./config/index.js');
const amqplib = require('amqplib');
const { EmailService } = require('./services/index.js');

async function connectQueue() {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue("flight-notification-queue");
        channel.consume("flight-notification-queue", async (data) => {
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            await EmailService.sendEmail(ServerConfig.SEND_EMAIL, object.recepientEmail, object.subject, object.text);
            channel.ack(data);
        })
    } catch (error) {
        console.log(error)
    }
}

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", apiRoutes)

app.listen(ServerConfig.PORT, async () => {
    console.log(`Server is running on PORT : ${ServerConfig.PORT}`)
    Logger.info("Succesfully started the server")
    await connectQueue();
})

