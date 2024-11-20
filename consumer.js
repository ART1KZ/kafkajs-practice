import { Kafka } from "kafkajs"

const kafka = new Kafka({
    clientId: 'telegram-bot',
    brokers: ['localhost:9092'],
    connectionTimeout: 3000,
    requestTimeout: 25000, 
  })

const consumer = kafka.consumer({ groupId: 'telegram-bot-messages' })

await consumer.connect()
await consumer.subscribe({ topic: 'update_messages', fromBeginning: true })

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    })
  },
})