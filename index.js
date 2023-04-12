const express = require ("express");
const app = express();

const alunos = require("./alunos");


// Rota que lista todos os alunos:
// app.get("/alunos", (req, res) => {
//     res.json(alunos);
// });

// Crie uma rota GET para “/alunos” que lista todos os alunos. Deve conter query opcional para filtrar por nome e por média. Ou seja, a rota pode ter este formato: “/alunos?nome=pedro”, “/alunos?media=7.5” ou esse “/alunos”. Esta rota deve utilizar as funções exportadas pelo módulo alunos.js;
app.get("/alunos", (req, res) => {
    const { nome, media } = req.query;  

    if(nome !== undefined) {
        const nomes = alunos.filtrarPorNome(nome)
        res.json(nomes);
    } else if (media !== undefined) {
        const medias = alunos.filtrarPorMedia(media)
        res.json(medias);        
    } else {
        res.json(alunos);
    }
});   


// Crie uma rota POST para “/alunos/novo” e o corpo da requisição deve conter (nome, matrícula e média). Valide os campos passados e caso contrário indique um erro (400);

app.use(express.json()); // lê o body no formato json

// Rota /alunos/novo:
app.post("/alunos/novo", (req, res) => {
    const { nome, matricula, media } = req.body;
    if((nome !== undefined) && (matricula !== undefined) && (media !== undefined)) {
        const novoAluno = { nome: nome, matricula: matricula, media: media };
        alunos.alunos.push(novoAluno);
        res.json(`Novo aluno adicionado com sucesso! - nome: ${nome}, matrícula: ${matricula}, media: ${media}.`);
    } else {
        res.status(400).json({mensagem: "Erro ao adicionar um novo aluno! Para adicionar novo aluno você precisa digitar nome, matrícula e média."})
    }    
});

// Crie uma rota POST para “/alunos/deletar/:index” que indica qual aluno remover do array de dados (index). Trate a chamada se o aluno não existir (404);

app.post("/alunos/deletar/:index", (req, res) => {
    const index = Number(req.params.index); // quando for um banco de dados passar o id e não index
    const alunoDeletado = alunos.deletarAluno(index);

    if(alunoDeletado) {
        res.json(alunoDeletado);
    } else {
        res.status(404).json({mensagem: "Aluno não encontrado"})
    }
})



// Escuta das requisições:
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
})