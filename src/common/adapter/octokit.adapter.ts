import { Octokit } from '@octokit/rest';
import { HttpOctokitAdapter } from '../interfaces/http-octokit-adapter.interface';
import { Injectable } from '@nestjs/common';
import { GithubAPIRepo } from '../interfaces/GithubAPIResponse';

@Injectable()
export class OctokitAdapter implements HttpOctokitAdapter {
	private octokit: Octokit;

	async get(authKey: string | null, user: string): Promise<GithubAPIRepo[]> {
		if (!authKey) {
			throw new Error('Invalid Github Auth Key');
		}

		try {
			this.octokit = new Octokit({
				auth: authKey,
			});
			const response = await this.octokit.repos.listForUser({
				username: user,
			});

			const data: GithubAPIRepo[] = response.data;
			return data;
		} catch (error) {
			throw new Error(error);
		}
	}
}
