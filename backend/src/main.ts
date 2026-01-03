import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://library-ms-chi.vercel.app',
      'https://library-ipfm9wiu1-yousfis-projects-033fb0e9.vercel.app',
      /\.vercel\.app$/, // Allow all Vercel preview deployments
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
