const express = require('express');

const app = express();
const PORT = 3002;

const checkApiKey = (req, res, next) => {
	const apiKey = req.header("x-api-key");
	req.username = "gustavo";
	console.log("check api key", apiKey);
	if (apiKey === '2valor') {
		res.set({
			'Cache-Control': 'no-store'
		});
		next();
	} else {
		return res.status(403).send({
			error: "Wrong api key"
		});	
	}
}

const checkRole = (role) => {
	return (req, res, next) => {

		const reqRole = req.body.role;

		if (reqRole === role) {
			next();
		} else {
			return res.status(403).send({
				error: "Wrong role"
			});	
		}
	}
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Useful for debugging
// app.use((req, res, next) => {
// 	console.log('Time:', Date.now())
// 	console.log(req);
// 	next();
// });

app.use("/auth/*", checkApiKey);
// app.use(checkApiKey);

app.get('/hola', async (request, response) => {
	response.json({ info: "Node.js, Express, and Postgres API (?)"});
});


app.post('/', (request, response) => {
	const data = request.body.data;
	const apiKey = request.header("x-api-key");
	console.log('apikey', apiKey);
	console.log(request.body);
	// response.json(request.body);
	response.status(404).send({
		data,
		apiKey
	});
});


app.post("/auth/middleware", checkRole('admin'), async (req, res) => {
	const data = req.body.data;

	res.status(200).send({
		data,
		username: req.username
	});
});

app.listen(PORT, () => {
	console.log(`App listening on port: ${PORT}`);
	console.log('Testing something');
});

