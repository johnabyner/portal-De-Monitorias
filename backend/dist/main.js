"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: process.env.FRONTEND_URL,
            methods: 'GET,POST,PUT,DELETE',
            credentials: true,
        });
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (errors) => {
                return new common_1.BadRequestException(errors.map(error => ({
                    field: error.property,
                    messages: Object.values(error.constraints ?? {})
                })));
            }
        }));
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Portal de Monitorias')
            .setDescription('Documentaçao de endpoints')
            .setVersion('1.0')
            .addBearerAuth()
            .addTag('Aura')
            .build();
        const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, documentFactory);
        await app.listen(process.env.PORT ?? 7777);
    }
    catch (err) {
        console.error('Erro ao iniciar a aplicação', err);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map