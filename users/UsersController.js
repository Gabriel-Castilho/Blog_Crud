const express = require("express");
const router = express.Router();
const User = require("./User");
//hash password
const bcrypt = require('bcryptjs');


router.get("/admin/users", (req, res) => {
    if (req.session.user == undefined) {
        res.redirect("/");
    }
    User.findAll().then(users => {
        res.render("admin/users/index", { users: users });
    })

});

router.get("/admin/users/create", (req, res) => {

    res.render("admin/users/create");
})

router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ where: { email: email } }).then(user => {
        if (user == undefined) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch((error) => {
                res.redirect("/");
            })
        } else {

            res.redirect("/admin/users/create")
        }
    });

});

router.get("/login", (req, res) => {
    res.render("admin/users/login",{message:req.flash("info")})
})

router.post("/authenticate", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ where: { email: email } }).then(user => {
        if (user != undefined) {
            //validating password
            var correct = bcrypt.compareSync(password, user.password);

            if (correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles")
            } else {
                req.flash('info','Email ou senha incorretos')
                res.redirect("/login")

            }
        } else {
            req.flash('info','Usuário não localizado'),   
            res.redirect("/login")
           
        }
    })
})
router.post("/users/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            User.destroy({
                where: {
                    id: id
                }
            }).then(() => {

                res.redirect("/admin/users");
            });
        } else {
            res.redirect("/admin/users");

        }
    } else {
        res.redirect("/admin/users");

    }
});

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
})
module.exports = router;


