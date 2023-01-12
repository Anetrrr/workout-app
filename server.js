require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');

const workoutRoutes = require('./routes/workouts');

//express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});
//routes
app.use('/api/workouts', workoutRoutes);

//connect to db
mongoose.set('strictQuery', true);
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		// listen for requests
		app.listen(process.env.PORT, () => {
			console.log(
				'connected to DB while listening on port ' + process.env.PORT
			);
		});
	})
	.catch((error) => {
		console.log(error);
	});
