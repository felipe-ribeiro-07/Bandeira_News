const NoticiaGe = require("../models/NoticiaGe");

module.exports = class NoticiaGeController {

  static createNews(req, res) {
    // Adicionado session para controle do layout/nav
    res.render("noticiasGe/create", { session: req.session });
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
        res.redirect("/createGe");
      });
    } catch (err) {
      console.error("❌ Erro ao criar notícia:", err);
      req.flash("error", "Não foi possível adicionar a notícia no momento.");
      req.session.save(() => {
        res.redirect("/createGe"); 
      });
    }
  }

  static async getNewsById(req,res){
    const id = req.params.id

    try{
      const noticia = await NoticiaGe.findOne({where:{id:id} ,raw:true})
      // Adicionado session para que os botões de editar/deletar apareçam na página da notícia
      res.render("noticiasGe/noticia" , { noticia, session: req.session })

    } catch(err){
      console.log(err)
      res.redirect("/")
    }
  }

  static async updatePost(req,res){
    const id = req.body.id

    const {titulo , description , image , link , autor} = req.body
    const newsUpadated = {titulo , description , image , link , autor}
    try{
        await NoticiaGe.update(newsUpadated ,{where:{id:id}})

        // Correção pontual: mudei res.flash para req.flash (padrão da lib connect-flash)
        req.flash("success" , "Noticia atualizada com sucesso")

        res.redirect("/")
    } catch(err){
      console.log(err)
      res.redirect("/")
    }
  }

  static async deleteOne(req,res){
    const id = req.body.id

    try{
      await NoticiaGe.destroy({
        where:{id:id}
      })

      res.redirect("/")
    }catch(err){
      console.log(err)
    }
  }
};