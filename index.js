require('dotenv').config();

const express = require("express");
const exphbs = require("express-handlebars");
const session = require("cookie-session");
const flash = require("express-flash");
const path = require("path");
const authRotas = require("./routes/authRotas");
const conn = require("./database/db")
const pagesRotas = require("./routes/pagesRotas")
const Noticia = require("./models/Noticia")
const NoticiaGe = require("./models/NoticiaGe")



const app = express();

app.set('trust proxy', 1);


app.set("views", path.join(process.cwd(), "views"));
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- CORREÇÃO 3: Caminho Public ---
app.use(express.static(path.join(process.cwd(), "public")));

// Sessão
app.use(
  session({
    name: "session",
    keys: [process.env.SESSION_SECRET || "dev_secret_fallback"],
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production", // True na Vercel (HTTPS), False local
    httpOnly: true,
    sameSite: "lax",
  })
);

app.use(flash());

// Polyfill para cookie-session (Garante que req.session.save exista)
app.use((req, res, next) => {
  if (req.session && !req.session.save) {
    req.session.save = (cb) => cb && cb();
  }
  next();
});

// Sessão global (Disponibiliza usuário para todas as views)
app.use((req, res, next) => {
  if (req.session?.userId) {
    res.locals.session = req.session;
  }
  next();
});

// --- ROTAS ---
app.use("/", authRotas);
app.use("/", pagesRotas);
app.use((req, res) => {
    res.status(404).render("404");
});

// --- CONEXAO COM BANCO DE DADOS---

conn
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((err) => console.log(err));
