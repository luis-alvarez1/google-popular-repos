import { Controller, Get } from '@nestjs/common';
import { ReposService } from './repos.service';

@Controller('repos')
export class ReposController {
	constructor(private readonly reposService: ReposService) {}

	@Get()
	findPopularRepos() {
		return this.reposService.find10MostPopularRepos();
	}
}
