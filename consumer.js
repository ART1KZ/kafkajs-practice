import { Kafka } from "kafkajs"

const kafka = new Kafka({
  clientId: 'telegram-bot',
  brokers: ['192.168.202.8:9092'],
  ssl: false,
  sasl: {
    mechanism: 'plain',
    username: 'consumer', 
    password: process.env.KAFKA_CONSUMER_PASSWORD
  }
  // connectionTimeout: 30000, 
  // requestTimeout: 30000, 
})

const consumer = kafka.consumer({ groupId: 'timetable-consumers' })

await consumer.connect()
await consumer.subscribe({ topic: 'timetable-updates', fromBeginning: true })

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      partition: partition.toString(),
      topic_name: topic,
      value: message.value.toString(),
    })
  },
})