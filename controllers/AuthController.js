const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static registrar(req, res) {
    res.render("auth/registrar");
  }

  static async registrarPOST(req, res) {
    const { name, email, senha, confirmSenha } = req.body;

    // password match

    if (senha != confirmSenha) {
      req.flash("error", "As senhas não conferem , tente novamente");
      res.render("auth/registrar");
      return;
    }

    // check if user exist

    const checkIfExist = await User.findOne({ where: { email: email } });

    if (checkIfExist) {
      req.flash("success", "O email ja esta sendo utilizado");
      res.render("auth/registrar");
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashdPassword = bcrypt.hashSync(senha, salt);

    const user = {
      name,
      email,
      senha: hashdPassword,
    };

    try {
      const createdUser = await User.create(user);

      //   inicializar sesão
      req.session.userId = createdUser.id;

      req.flash("success", "Conta criada com sucesso , seja bem-vindo");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.log(err);
      req.flash(
        "error",
        "Não foi possivel criar sua conta no momento , tente novamente mais tarde"
      );

      res.render("auth/registrar");
      return;
    }
  }

static logout(req, res) {
  req.session = null
  res.redirect("/")
}


  static async loginPost(req, res) {
    const { email, senha } = req.body;

    // find user

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash("error", "Email não encontrado , tente novamente");
      res.redirect("/login");

      return;
    }

    // check password

    const passwordMatch = bcrypt.compareSync(senha, user.senha);

    if (!passwordMatch) {
      req.flash("error", "Senha invalida");
      res.redirect("/login");
      return;
    }

    // inicializando session

    try {
      //   inicializar sesão
      req.session.userId = user.id;

      req.flash("success", "seja bem-vindo");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.log(err);
      req.flash(
        "error",
        "Não foi possivel criar sua conta no momento , tente novamente mais tarde"
      );

      res.render("auth/registrar");
      return;
    }
  }
};
