import mongoose from "mongoose";

const URI = 'mongodb+srv://pablo:pablo@cluster0.moakzyi.mongodb.net/'
mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la DB"))
  .catch((error) => console.log(error));