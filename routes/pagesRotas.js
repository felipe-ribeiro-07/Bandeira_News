const express = require("express")
const router = express.Router()
const Noticia = require("../controllers/NoticiaController")
const NoticiaGe = require("../controllers/NoticiaGeController")
const {checkAuth} = require("../helpers/auth")
const {checkAdmin} = require("../helpers/admin")

router.get("/" , Noticia.showAll)
router.get("/create" , checkAuth , Noticia.createNews)
router.post("/create" , checkAuth , Noticia.createPost)
router.get("/createGe" ,  checkAuth ,NoticiaGe.createNews)
router.post("/createGe" , checkAuth , NoticiaGe.createPost)
router.get("/noticia/:id" , Noticia.showOne)
router.get("/noticiaGe/:id" , NoticiaGe.getNewsById)
router.post("/updateGe" , checkAdmin , NoticiaGe.updatePost)
router.post("/deleteGe" , checkAdmin , NoticiaGe.deleteOne)

module.exports = router;