import { Kafka } from 'kafkajs';
const kafka = new Kafka({
  clientId: 'timetable-backend',
  brokers: ['192.168.202.8:9092'],
  sasl: {
    mechanism: 'plain', // Указываем механизм SASL
    username: 'producer', // Имя пользователя для аутентификации
    password: process.env.KAFKA_PRODUCER_PASSWORD // Пароль для аутентификации
  }
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();

  try {
    const result = await producer.send({
      topic: 'timetable-updates',
      messages: [
        { value: 'test timetable update message #2' },
        { value: 'test timetable update message #3'}
      ],
    });
    console.log('Message sent successfully:', result);
  } catch (error) {
    console.error('Failed to send message:', error);
  }

  await producer.disconnect();
};

run().catch(console.error);
