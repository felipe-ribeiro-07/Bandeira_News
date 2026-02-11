module.exports.checkAdmin = function (req, res, next) {
    const adminEmail = "gabrielaBandeiras@gatinha.com";

    // 1. Busca o usuário na sessão (que você preencheu no LoginPost)
    const userEmail = req.session.userEmail; 

    if (userEmail === adminEmail) {
        next(); // É você! Pode passar.
    } else {
        req.flash("error", "Acesso restrito à administradora.");
        res.redirect("/"); // Não é você? Volta para a home.
    }
};