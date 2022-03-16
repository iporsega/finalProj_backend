import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config';
import productsRouter from './routes/products.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// solve CORS issues for localhost requests
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Content-Type', 'application/json');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'HEAD,GET,PUT,POST,DELETE,OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, application/json, Authorization'
		);
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");	
		next();
	});
	
	
	// const corsOptions = {
	// 	origin: 'http://127.0.0.1:3000/products',
	// 	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
	//   }
	// Middlewares
	app.use(bodyParser.json());
	
	app.get('/',  async (req, res) => {
		res.send('<h1>Ecommerce 17 Node JS Server</h1>');
	});
	
	app.use('/products', productsRouter);
	
	// Connect to DataBase
	const connectDB = async () => {
		try {
			await mongoose.connect(process.env.MONGODB_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			
			console.log('MongoDB connected!!');
		} catch (err) {
			console.log('Failed to connect to MongoDB', err);
		}
	};
	connectDB();
	
	// start the server - listen on port 3000
	const PORT = process.env.PORT || 3000;
	
	app.listen(PORT);
	