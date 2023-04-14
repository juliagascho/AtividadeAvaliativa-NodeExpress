const express = require ("express");
const app = express();

const alunos = require("./alunos");

const morgan = require('morgan');


// Rota que lista todos os alunos:
// app.get("/alunos", (req, res) => {
//     res.json(alunos);
// });

// 1. Crie uma rota GET para “/alunos” que lista todos os alunos. Deve conter query opcional para filtrar por nome e por média. Ou seja, a rota pode ter este formato: “/alunos?nome=pedro”, “/alunos?media=7.5” ou esse “/alunos”. Esta rota deve utilizar as funções exportadas pelo módulo alunos.js;
app.get("/alunos", morgan('tiny'), (req, res) => {
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

app.use(express.json());

// 2. Crie uma rota POST para “/alunos/novo” e o corpo da requisição deve conter (nome, matrícula e média). Valide os campos passados e caso contrário indique um erro (400);

// app.post("/alunos/novo", (req, res) => {
//     const { nome, matricula, media } = req.body;
//     if((nome !== undefined) && (matricula !== undefined) && (media !== undefined)) {
//         const novoAluno = { nome: nome, matricula: matricula, media: media };
//         alunos.alunos.push(novoAluno);
//         res.json(`Novo aluno adicionado com sucesso! - nome: ${nome}, matrícula: ${matricula}, media: ${media}.`);
//     } else {
//         res.status(400).json({mensagem: "Erro ao adicionar um novo aluno! Para adicionar novo aluno você precisa digitar nome, matrícula e média."})
//     }    
// });

// 3. Crie uma rota POST para “/alunos/deletar/:index” que indica qual aluno remover do array de dados (index). Trate a chamada se o aluno não existir (404);
// app.post("/alunos/deletar/:index", (req, res) => {
//     const index = Number(req.params.index); // quando for um banco de dados passar o id e não index
//     const alunoDeletado = alunos.deletarAluno(index);

//     if(alunoDeletado) {
//         res.json(alunoDeletado);
//     } else {
//         res.status(404).json({mensagem: "Aluno não encontrado"})
//     }
// })

// 4. Crie uma rota POST para /alunos/atualizar/:index, que no corpo da requisição recebe um objeto (nome, média) e atualiza os dados do aluno naquela posição. Trate a chamada se o aluno não existir (404);
// app.post("/alunos/atualizar/:index", (req, res) => {
//     const index = Number(req.params.index);
//     const { nome, media } = req.body;
//     const alunoAtualizado = alunos.atualizarAluno(index, nome, media);

//     if(alunoAtualizado) {
//         res.json(alunoAtualizado);
//     } else {
//         res.status(404).json({mensagem: "Aluno não encontrado"})
//     }
// })


//  Desafio 1 - Refatore a aplicação e mova para alunos.js, os métodos de deletar, adicionar e atualizar um aluno:
// as funções atualizar e deletar aluno já estavam em alunos.js
app.post("/alunos/novo", morgan('tiny'), (req, res) => {    
    const { nome, matricula, media } = req.body;
    const novoAluno = { nome, matricula, media };
    const alunoAdicionado = alunos.adicionarAluno(novoAluno);
  
    if (alunoAdicionado) {
      res.json(`Novo aluno adicionado com sucesso! - nome: ${nome}, matrícula: ${matricula}, media: ${media}.`);
    } else {
      res.status(400).json({ mensagem: "Erro ao adicionar um novo aluno! Para adicionar novo aluno você precisa digitar nome, matrícula e média." });
    }
  });


//  Desafio 2: Substituir as rotas POST de atualizar e deletar com os métodos PUT e DELETE respectivamente, reformulando as URLs para todas utilizarem o mesmo caminho /alunos, mudando apenas o método utilizado;
app.put("/alunos/:index", morgan('tiny'), (req, res) => {
    const index = Number(req.params.index);
    const { nome, media } = req.body;
    const alunoAtualizado = alunos.atualizarAluno(index, nome, media);

    if(alunoAtualizado) {
        res.json(alunoAtualizado);
    } else {
        res.status(404).json({mensagem: "Aluno não encontrado"})
    }
})

app.delete("/alunos/:index", morgan('tiny'), (req, res) => {
    const index = Number(req.params.index);
    const alunoDeletado = alunos.deletarAluno(index);

    if(alunoDeletado) {
        res.json(alunoDeletado);
    } else {
        res.status(404).json({mensagem: "Aluno não encontrado"})
    }
})

// Desafios 3 e 4 realizados!

// Escuta das requisições:
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
})

//  Desafio 1 - Refatore a aplicação e mova para alunos.js, os métodos de deletar, adicionar e atualizar um aluno:
// as funções atualizar e deletar aluno já estavam em alunos.js
// app.post("/alunos/novo", (req, res) => {    
//     const { nome, matricula, media } = req.body;
//     const alunoAdicionado = alunos.adicionarAluno(nome, matricula, media);

//     if(alunoAdicionado) {
//         res.json(alunoAdicionado);
//     } else {
//         res.status(404).json({mensagem: "Não foi possível adicionar o aluno."})
//     }
// })