import { Kafka } from "kafkajs"

const kafka = new Kafka({
  clientId: 'timetable-backend',
  brokers: ['localhost:9092'],
})

const producer = kafka.producer()

await producer.connect()
await producer.send({
  topic: 'update_messages',
  messages: [
    { value: 'Hello KafkaJS user!' },
  ],
})

await producer.disconnect()