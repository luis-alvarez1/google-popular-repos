import { Test, TestingModule } from '@nestjs/testing';
import { ReposService } from '../repos.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OctokitAdapter } from '../../common/adapter/octokit.adapter';
import { GithubAPIRepo } from '../../common/interfaces/GithubAPIResponse';
import { mockedGithubResponse } from './mockedGithubAPIResponse';
import { Repo } from '../entities/repo.entity';
import { mockedResponse } from './mockedReposResponse';

describe('ReposService', () => {
	let reposService: ReposService;
	let configService: ConfigService;
	let octokit: OctokitAdapter;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ReposService,
				{
					provide: OctokitAdapter,
					useValue: {
						get: jest.fn(),
					},
				},
			],
			imports: [ConfigModule.forRoot({ envFilePath: '.env' })],
		}).compile();

		reposService = module.get<ReposService>(ReposService);
		configService = module.get<ConfigService>(ConfigService);
		octokit = module.get<OctokitAdapter>(OctokitAdapter);
	});

	describe('find10MostPopularRepos', () => {
		it('should return the top 10 repositories sorted by stargazers count', async () => {
			const githubResponse: GithubAPIRepo[] = mockedGithubResponse;
			const apiReponse: Repo[] = mockedResponse;
			const authKey = process.env.GITHUB_AUTH_KEY;

			jest.spyOn(octokit, 'get').mockResolvedValue(githubResponse);
			jest.spyOn(configService, 'get').mockReturnValue(authKey);

			const result = await reposService.find10MostPopularRepos();

			expect(result).toHaveLength(10);
			expect(result[0].name).toBe(apiReponse[0].name);
		});

		it('should throw an error if GitHub Auth Key is missing', async () => {
			jest.spyOn(configService, 'get').mockReturnValue(undefined);

			await expect(
				reposService.find10MostPopularRepos(),
			).rejects.toThrowError(
				'Error while reading Github Auth Key. Please provide a valid Github Auth Key',
			);
		});

		// Add more test cases for error handling, edge cases, etc.
	});
});
