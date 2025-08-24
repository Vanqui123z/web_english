import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import compression from 'compression';

// compression : (nén response)

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(compression()); 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
