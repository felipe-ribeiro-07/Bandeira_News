const express = require("express")
const router = express.Router()
const Noticia = require("../controllers/NoticiaController")
const NoticiaGe = require("../controllers/NoticiaGeController")
const {checkAuth} = require("../helpers/auth")


router.get("/" , checkAuth , Noticia.showAll)
router.get("/create" , checkAuth , Noticia.createNews)
router.post("/create" , checkAuth , Noticia.createPost)
router.get("/createGe" ,  checkAuth ,NoticiaGe.createNews)
router.post("/createGe" , checkAuth , NoticiaGe.createPost)
router.get("/noticia/:id" , Noticia.showOne)


module.exports = router;