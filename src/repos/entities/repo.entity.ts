export class Repo {
	id: number;
	name: string;
	full_name: string;
	private: boolean;
	owner?: Owner;
	description: null | string;
	fork: boolean;
	url: string;
	created_at: Date;
	updated_at: Date;
	pushed_at: Date;
	git_url: string;
	clone_url: string;
	homepage: null | string;
	size: number;
	stargazers_count: number;
	watchers_count: number;
	language: null | string;
	has_issues: boolean;
	has_projects: boolean;
	has_downloads: boolean;
	has_wiki: boolean;
	has_pages: boolean;
	has_discussions: boolean;
	forks_count: number;
	archived: boolean;
	disabled: boolean;
	open_issues_count: number;
	license?: License | null;
	allow_forking: boolean;
	is_template: boolean;
	topics: string[];
	visibility: string;
	forks: number;
	open_issues: number;
	watchers: number;
	default_branch: string;
	permissions: Permissions;
}

export interface License {
	key?: string;
	name?: string;
	spdx_id?: string;
	url?: null | string;
}

export interface Owner {
	login?: string;
	id?: number;
	avatar_url?: string;
	gravatar_id?: string;
	url?: string;
	type?: string;
	site_admin?: boolean;
}

export interface Permissions {
	admin?: boolean;
	maintain?: boolean;
	push?: boolean;
	triage?: boolean;
	pull?: boolean;
}
