import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try{
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: 'http://127.0.0.1:5500',
      methods: 'GET,POST,PUT,DELETE',
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

    await app.listen(process.env.PORT ?? 3000);
  }catch(err){
    console.error('Erro ao iniciar a aplicação', err)
  }
}
bootstrap();
