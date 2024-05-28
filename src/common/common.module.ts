import { Module } from '@nestjs/common';
import { OctokitAdapter } from './adapter/octokit.adapter';

@Module({
	providers: [OctokitAdapter],
	exports: [OctokitAdapter],
})
export class CommonModule {}
