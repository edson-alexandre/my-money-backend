import express from 'express';
import 'express-async-errors';
import routes from './shared/http/routes';
import cors from 'cors';
import StartDatabase from './database/StartDatabase';
import ErrorHandler from './shared/errors/ErrorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

app.listen(process.env.PORT, async () => {
  const db = new StartDatabase();
  console.log();
  console.log(`*********************************************************************`);
  await db.init();
  console.log(`Servidor executando na porta ${process.env.PORT}!`);

  app.use(routes); //Iniciando as rotas após conexão com o banco estabelecida
  app.use(ErrorHandler.handler); // Iniciando ErroHandler após rotas
});
