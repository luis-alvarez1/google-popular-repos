// repos.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { ReposController } from '../repos.controller';
import { ReposService } from '../repos.service';
import { mockedResponse } from './mockedReposResponse';
import { ConfigModule } from '@nestjs/config';
import { OctokitAdapter } from '../../common/adapter/octokit.adapter';

describe('ReposController', () => {
	let reposController: ReposController;
	let reposService: ReposService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ReposController],
			providers: [ReposService, OctokitAdapter],
			imports: [ConfigModule.forRoot({ envFilePath: '.env' })],
		}).compile();

		reposController = module.get<ReposController>(ReposController);
		reposService = module.get<ReposService>(ReposService);
	});

	describe('findPopularRepos', () => {
		it('should return the top 10 repositories from ReposService', async () => {
			const topRepos = mockedResponse;

			jest.spyOn(
				reposService,
				'find10MostPopularRepos',
			).mockResolvedValue(topRepos);

			const result = await reposController.findPopularRepos();

			expect(result).toEqual(topRepos);
		});
	});
});
