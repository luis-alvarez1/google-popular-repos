import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
	let appController: AppController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
			imports: [ConfigModule],
		}).compile();

		appController = module.get<AppController>(AppController);
	});

	describe('healthCheck', () => {
		it('should return the health status from the AppService', () => {
			const healthStatus = 'Healthy';

			expect(appController.healthCheck()).toBe(healthStatus);
		});
	});
});
