require('../config');
const { database, Exception } = require('../utils');

database
	.then(() => {
		const { port } = require('../config');
		const express = require('express');
		const path = require('path');

		const app = express();

		app.get('/test', (req, res) => res.status(200).json({ msg: 'welcome' }));

		app.use('/assets', express.static(path.join('assets', 'public')));

		app.use(express.urlencoded({ extended: false }));
		app.use(express.json({ limit: '50mb' }));
		app.use(express.text({ limit: '50mb' }));

		app.use('/api', require('./app/router'));

		app.use(Exception.requestDefaultHandler);

		app.listen(port, () => {
			console.info(`Server is listening on port ${port}`);
		});
	})
	.catch(Exception.defaultHandler);
