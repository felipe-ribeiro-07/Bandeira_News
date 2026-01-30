const Noticia = require("../models/Noticia");

module.exports = class NoticiaController {
  static async showAll(req, res) {
    const noticia = await Noticia.findAll({raw:true})
    
    res.render("noticias/all" , {noticia});
  }

  static createNews(req, res) {
    res.render("noticias/create");
  }

  static async createPost(req, res) {
    const { titulo, conteudo, image, autor } = req.body;

    try {
      await Noticia.create({
        titulo: titulo,
        conteudo: conteudo,
        image: image,
        autor: autor,
      });

      req.flash("success", "Notícia adicionada com sucesso!");
      console.log("criado noticia")
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.error("❌ Erro ao criar notícia:", err);
      req.flash("error", "Não foi possível adicionar a notícia no momento.");
      req.session.save(() => {
        res.redirect("/create"); 
      });
    }
  }



  static async showOne(req,res){
    const id = req.params.id

    try{
      const noticia = await Noticia.findOne({where:{id:id} ,raw:true})
      res.render("noticias/noticia" , {noticia})

    } catch(err){
      console.log(err)
      res.redirect("/")
    }


  }
};
