import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

async function bootstrap() {
  try{
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: process.env.FRONTEND_URL,
      methods: 'GET,POST,PUT,DELETE,PATCH',
      credentials: true, // Permite cookies
    })

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,

        exceptionFactory: (errors) => {
          return new BadRequestException(
            errors.map(error => ({
              field: error.property,
              messages: Object.values(error.constraints ?? {})
            }))
         );
        }
      }),
    );

    const config = new DocumentBuilder()
      .setTitle('Portal de Monitorias')
      .setDescription('Documentaçao de endpoints')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('Aura')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(process.env.PORT ?? 7777);
  }catch(err){
    console.error('Erro ao iniciar a aplicação', err)
  }
}
bootstrap();
