import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import compression from 'compression';
import { join } from 'path';
import * as express from 'express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
  // Serve static files từ public
  app.use(express.static(join(__dirname, '..', 'public')));

  // Nếu không match API nào thì trả index.html
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.path.startsWith('/api')) {
      return next(); // cho request API đi tiếp
    }
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  });

  app.enableCors();
  app.use(compression());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
