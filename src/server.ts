import express from 'express';
import routes from './routes';
import cors from 'cors';
import 'dotenv/config'
import './resources/db/connection'

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`aplicação rodando em  rodando em http://localhost:${port}`))
