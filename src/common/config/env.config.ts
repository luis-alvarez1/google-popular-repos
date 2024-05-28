export const EnvConfiguration = () => ({
	port: +process.env.PORT || 3000,
	githubAuthKey: process.env.GITHUB_AUTH_KEY || '',
});
