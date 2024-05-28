import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReposModule } from './repos/repos.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './common/config/env.config';
import { JoiEnvValidationSchema } from './common/config/joi.validation';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [EnvConfiguration],
			validationSchema: JoiEnvValidationSchema,
		}),
		ReposModule,
		CommonModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
