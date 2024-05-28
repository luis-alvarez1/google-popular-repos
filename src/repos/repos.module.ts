import { Module } from '@nestjs/common';
import { ReposService } from './repos.service';
import { ReposController } from './repos.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';

@Module({
	controllers: [ReposController],
	providers: [ReposService],
	imports: [ConfigModule, CommonModule],
})
export class ReposModule {}
