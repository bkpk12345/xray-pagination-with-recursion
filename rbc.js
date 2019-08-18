const fs = require('fs')
let phantom = require('x-ray-phantom')
let jobs = []
let Xray = require('x-ray')
let x = Xray({
	filters: {
		trim: function(value) {
			return typeof value === 'string' ? value.trim() : value
		},
		slice: function(value, start, end) {
			return typeof value === 'string' ? value.slice(start, end) : value
		}
	}
}).driver(phantom({ webSecurity: false }))

let fun = (i) => {
	if (i <= 800) {
		console.log('iii', i)
		x(
			`https://jobs.rbc.com/ca/en/search-results?keywords=&from=${i}&s=1`,
			'.phs-jobs-list > div.phs-jobs-block.au-target > ul > li',
			[
				{
					title: 'div.information.au-target > a > h4',
					location: '.job-location.au-target | trim',
					date: 'span.job-date | trim | slice:20',
					apply_link: '.information.au-target > a@href'
				}
			]
		).then((res) => {
			if (res) {
				console.log('res')
				jobs = [ ...jobs, ...res ]
				fun(i + 50)
			}
		})
	} else {
		console.log(jobs.length)
		fs.writeFileSync('./rbc.json', JSON.stringify(jobs))
		return
	}
}
fun(0)
