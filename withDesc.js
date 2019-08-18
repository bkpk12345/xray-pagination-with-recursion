const fs = require('fs')
const desc = require('./desc')
let jobs = []
const jsonJobs = require('./rbc.json')

setTimeout(async () => {
	for (const job of jsonJobs) {
		fs.appendFileSync(
			'./newJSON.json',
			JSON.stringify({
				title: job.title,
				location: job.location,
				date: job.date,
				apply_link: job.apply_link,
				desc: await desc(job.apply_link)
			})
		)
	}
}, 2000)
