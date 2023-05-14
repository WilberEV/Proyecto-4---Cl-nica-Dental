//Imported values
import express from "express";
import mongoose from "mongoose";
import config from './core/config.js';
import userRouter from "./entities/users/userRouter.js";
import appRouter from "./entities/appointments/router.js"
import cors from 'cors'



const app = express();

mongoose.connect(config.DB_URL)
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log(err, "Problemas para conectar a la base de datos");
});

let corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
  // allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
  optionsSuccessStatus: 204
};


app.use(express.json());
app.use(cors(corsOptions));
app.use('/user', userRouter);
app.use('/appointments', appRouter)

app.listen(config.PORT, () => console.log(`Servidor levantado en ${config.PORT}`));