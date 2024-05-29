import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OctokitAdapter } from '../common/adapter/octokit.adapter';
import { GithubAPIRepo } from '../common/interfaces/GithubAPIResponse';
import { Repo } from './entities/repo.entity';

@Injectable()
export class ReposService {
	constructor(
		private readonly configService: ConfigService,
		private readonly octokit: OctokitAdapter,
	) {}

	private logger = new Logger('ReposService');

	async find10MostPopularRepos() {
		const authKey: string | null = this.configService.get('githubAuthKey');

		if (!authKey) {
			throw new ForbiddenException(
				'Error while reading Github Auth Key. Please provide a valid Github Auth Key',
			);
		}

		try {
			const response = await this.octokit.get(authKey, 'google');

			let data = this.mapResponse(response);

			data = this.sortByStars(data);

			return data;
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerErrorException(
				`Something went wrong with your request -> ${error}`,
			);
		}
	}

	private mapResponse(data: GithubAPIRepo[]) {
		const repos: Repo[] = data.map((githubRepo) => {
			const repo: Repo = {
				id: githubRepo.id,
				name: githubRepo.name,
				full_name: githubRepo.full_name,
				stargazers_count: githubRepo.stargazers_count,
				owner: {
					login: githubRepo.owner.login,
					id: githubRepo.owner.id,
					avatar_url: githubRepo.owner.avatar_url,
					gravatar_id: githubRepo.owner.gravatar_id,
					url: githubRepo.owner.url,
					type: githubRepo.owner.type,
					site_admin: githubRepo.owner.site_admin,
				},
				private: githubRepo.private,
				description: githubRepo.description,
				fork: githubRepo.fork,
				url: githubRepo.url,
				created_at: new Date(githubRepo.created_at),
				updated_at: new Date(githubRepo.updated_at),
				pushed_at: new Date(githubRepo.pushed_at),
				git_url: githubRepo.git_url,
				clone_url: githubRepo.clone_url,
				homepage: githubRepo.homepage,
				size: githubRepo.size,
				watchers_count: githubRepo.watchers_count,
				language: githubRepo.language,
				has_issues: githubRepo.has_issues,
				has_projects: githubRepo.has_projects,
				has_downloads: githubRepo.has_downloads,
				has_wiki: githubRepo.has_wiki,
				has_pages: githubRepo.has_pages,
				has_discussions: githubRepo.has_discussions,
				forks_count: githubRepo.forks_count,
				archived: githubRepo.archived,
				disabled: githubRepo.disabled,
				open_issues_count: githubRepo.open_issues_count,
				license: {
					key: githubRepo.license?.key,
					name: githubRepo.license?.name,
					spdx_id: githubRepo.license?.spdx_id,
					url: githubRepo.license?.url,
				},
				allow_forking: githubRepo.allow_forking,
				is_template: githubRepo.is_template,
				topics: githubRepo.topics,
				visibility: githubRepo.visibility,
				forks: githubRepo.forks,
				open_issues: githubRepo.open_issues,
				watchers: githubRepo.watchers,
				default_branch: githubRepo.default_branch,
				permissions: githubRepo.permissions,
			};

			return repo;
		});

		return repos;
	}

	private sortByStars(data: Repo[]) {
		const dataToSort = [...data];
		const sorted = dataToSort
			.sort((a, b) => {
				return a.stargazers_count < b.stargazers_count
					? 1
					: b.stargazers_count < a.stargazers_count
						? -1
						: 0;
			})
			.slice(0, 10);

		return sorted;
	}
}
