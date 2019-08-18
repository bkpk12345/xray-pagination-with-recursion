let phantom = require('x-ray-phantom')
let Xray = require('x-ray')
let x = Xray().driver(phantom({ webSecurity: false }))
let desc
module.exports = async (url) => {
	try {
		console.log(url)
		desc = await x(url, 'body', {
			desc:
				'body > div.ph-page > div > section:nth-child(2) > div > div:nth-child(2) > div > div > div.col-md-8.col-sm-7 > section.job-description > div'
		})
		return desc ? desc : 'no desc'
	} catch (error) {
		console.log('err', error.message)
	}
}
