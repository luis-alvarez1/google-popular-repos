import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const logger = new Logger('main');
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);

	// Default port for App
	const PORT = +process.env.PORT || 3000;
	await app.listen(PORT);
	logger.log(`App running on port: ${PORT}`);
}
bootstrap();
