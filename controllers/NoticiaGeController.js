const NoticiaGe = require("../models/NoticiaGe");

module.exports = class NoticiaGeController {

  static createNews(req, res) {
    res.render("noticiasGe/create");
  }

  static async createPost(req, res) {
    const { titulo, conteudo, image, autor , link } = req.body;

    try {
      await NoticiaGe.create({
        titulo: titulo,
        conteudo: conteudo,
        image: image,
        autor: autor,
        link: link
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
};
