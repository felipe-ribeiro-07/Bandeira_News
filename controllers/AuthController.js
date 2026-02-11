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
        const meuEmailAdm = "gabrielaBandeiras@gatinha.com"; //

        if (senha != confirmSenha) {
            req.flash("error", "As senhas não conferem, tente novamente");
            res.render("auth/registrar");
            return;
        }

        const checkIfExist = await User.findOne({ where: { email: email } });
        if (checkIfExist) {
            req.flash("error", "O email já está sendo utilizado");
            res.render("auth/registrar");
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashdPassword = bcrypt.hashSync(senha, salt);

        const userData = {
            name,
            email,
            senha: hashdPassword,
        };

        try {
            const createdUser = await User.create(userData);

            // Inicializar sessão apenas APÓS criar o usuário
            req.session.userId = createdUser.id;
            req.session.userEmail = createdUser.email;
            req.session.isAdmin = (createdUser.email === meuEmailAdm); //

            req.flash("success", "Conta criada com sucesso, seja bem-vinda");
            res.redirect("/");
        } catch (err) {
            console.log(err);
            res.render("auth/registrar");
        }
    }

    static logout(req, res) {
        req.session = null;
        res.redirect("/");
    }

static async loginPost(req, res) {
    const { email, senha } = req.body;
    
    // 1. Defina seu email ADM exatamente como apareceu no DEBUG
    const meuEmailAdm = "gabrielaBandeiras@gatinha.com"; 

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
        req.flash("error", "Email não encontrado");
        return res.redirect("/login");
    }

    const passwordMatch = bcrypt.compareSync(senha, user.senha);
    if (!passwordMatch) {
        req.flash("error", "Senha inválida");
        return res.redirect("/login");
    }

    try {
        req.session.userId = user.id;
        req.session.userEmail = user.email;
        
        // 2. 🔧 COMPARAÇÃO À PROVA DE ERROS:
        // Convertemos ambos para minúsculo e removemos espaços extras
        const emailLogado = user.email.trim().toLowerCase();
        const emailDefinido = meuEmailAdm.trim().toLowerCase();

        if (emailLogado === emailDefinido) {
            req.session.isAdmin = true;
        } else {
            req.session.isAdmin = false;
        }

        console.log(`--- TENTATIVA DE LOGIN ---`);
        console.log(`Email no Banco: "${user.email}"`);
        console.log(`Admin definido: "${meuEmailAdm}"`);
        console.log(`Resultado isAdmin: ${req.session.isAdmin}`);

        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.redirect("/login");
    }
}
};