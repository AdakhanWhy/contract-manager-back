import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors('http://localhost:5173');

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Adahan API')
    .setDescription('Made by @MrPrezAtambaev with ❤️')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  const logger = new Logger('Adahan API');
  await app.listen(8000, () => {
    logger.verbose(`App started at http://localhost:${8000}`);
  });
}
bootstrap();
