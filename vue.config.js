const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	publicPath: `/${process.env.BASE_URL}`,
	// devServer: {
	//   proxy: `${process.env.APP_API_URL ?? 'http://localhost'}`,
	// },
});
