//Imported values
import express from "express";
import mongoose from "mongoose";
import config from './core/config.js';
import userRouter from "./entities/users/userRouter.js";



const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/dentist")
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log(err, "Problemas para conectar a la base de datos");
});


app.use(express.json());
app.use('/user', userRouter);

app.listen(config.PORT, () => console.log(`Servidor levantado en ${config.PORT}`));