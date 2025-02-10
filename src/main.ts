import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, LogLevel } from '@nestjs/common';

async function bootstrap() {
  // Create logger instance
  const logger = new Logger('Main');
  
  // Parse LOG_LEVELS from environment variable and cast to LogLevel
  const logLevels = (process.env.LOG_LEVELS?.split(',') ?? ['error', 'warn']) as LogLevel[];
  
  const app = await NestFactory.create(AppModule, {
    logger: logLevels
  });
  
  const port = process.env.PORT ?? 8080;
  await app.listen(port);
  
  if (process.env.NODE_ENV !== 'production') {
    logger.log(`Application is running on: ${await app.getUrl()}`);
    logger.log(`Environment: ${process.env.NODE_ENV}`);
  }
}
bootstrap();
