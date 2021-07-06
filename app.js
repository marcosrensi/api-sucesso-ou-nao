const express = require('express');
const mongoose = require('mongoose');
require("./models/Artigo");
const Artigo = mongoose.model('artigo');

const app = express();

mongoose.connect('mongodb+srv://root:production@cluster0.rozko.mongodb.net/dbTeste?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Com sucesso!");
}).catch((erro) => {
    console.log("Erro: " + erro);
});

app.use(express.json());

app.get("/", (req, res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo não cadastrado"
        });
    });
});

app.post("/artigo", (req, res) => {
    const artigo = Artigo.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Artigo não cadastrado"
        });

        return res.status(400).json({
            error: false,
            message: "Artigo cadastrado"
        });
    })
});

app.get("/artigo/:id", (req, res) => {
    console.log(req.params.id);
    Artigo.findOne({ _id: req.params.id }).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        });
    });
});

app.put("/artigo/:id", (req, res) => {

    const artigo = Artigo.updateOne({ _id: req.params.id }, req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Artigo não editado"
        });

        return res.status(400).json({
            error: false,
            message: "Artigo editado"
        });
    })
});

app.delete("/artigo/:id", (req, res) => {

    const artigo = Artigo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Artigo não deletado"
        });

        return res.status(400).json({
            error: false,
            message: "Artigo deletado"
        });
    })
});


app.listen(8080, () => {
    console.log("OK!");
})
