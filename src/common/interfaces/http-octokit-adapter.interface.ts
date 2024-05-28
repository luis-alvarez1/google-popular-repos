import { GithubAPIRepo } from './GithubAPIResponse';

export interface HttpOctokitAdapter {
	get(authKey: string | null, user: string): Promise<GithubAPIRepo[]>;
}
