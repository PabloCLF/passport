import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js"
import sessionsRouter from "./routes/session.router.js";
import MongoStore from "connect-mongo";


import "./db/configDB.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URI =
    "mongodb+srv://coderhouse:coderhouse@cluster0.sugvijj.mongodb.net/session47315?retryWrites=true&w=majority";
app.use(
    session({
        store: new MongoStore({
            mongoUrl: URI,
        }),
        secret: "secretSession",
        cookie: { maxAge: 60000 },
    })
);

app.engine("handlebars", handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
});