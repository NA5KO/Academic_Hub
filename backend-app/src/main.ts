import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as bodyParser from 'body-parser';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());

  // Increase JSON payload limit (adjust as needed)
  app.use(bodyParser.json({ limit: '10mb' })); // Set 10MB limit
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // Enable CORS for frontend communication
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(port);
  Logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap');

  // ✅ Graceful shutdown handling to prevent "EADDRINUSE" errors
  process.on('SIGINT', async () => {
    Logger.warn('🛑 SIGINT received: Closing application...');
    await app.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    Logger.warn('🛑 SIGTERM received: Closing application...');
    await app.close();
    process.exit(0);
  });

  process.on('uncaughtException', (err) => {
    Logger.error(`⚠️ Uncaught Exception: ${err.message}`, '', 'Bootstrap');
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    Logger.warn(
      `⚠️ Unhandled Rejection at: ${promise}, reason: ${reason}`,
      'Bootstrap',
    );
  });
}

bootstrap();
