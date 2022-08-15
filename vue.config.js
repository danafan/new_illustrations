module.exports = {	
	devServer: {
		proxy: {
			'/api': {
				target: 'http://producttest.92nu.com',
				ws: true,
				changOlrigin: true,		
			}
		},
		host:"0.0.0.0",  
	},
	// assetsDir: "clothes",
	// publicPath:'../',
}