// módulo alunos.js que exporta um array de alunos

const alunos = [
    {
        nome: "João Souza",
        media: "8.5"
    },
    {
        nome: "Maria Silva",
        media: "9.0"
    },
    {
        nome: "Pedro Santos",
        media: "7.5"
    },
    {
        nome: "Ana Pereira",
        media: "5.5"
    }          
]

function filtrarPorNome (nome) {
    return alunos.filter(aluno => aluno.nome.toLowerCase().includes(nome.toLowerCase()));
}

function filtrarPorMedia (mediaDigitada) {
    return alunos.filter(aluno => aluno.media >= mediaDigitada)
}

function deletarAluno(index) {
    const alunoDeletado = alunos.splice(index, 1);
    return alunoDeletado.length > 0 ? alunoDeletado[0] : null;
  }

const fs = require('fs');
const path = require('path');

function atualizarAluno(index, nome, media) {
    if(index >= 0 && index < alunos.length) {
        const alunoAtualizado = alunos[index];
        alunoAtualizado.nome = nome || alunoAtualizado.nome;
        alunoAtualizado.media = media || alunoAtualizado.media;

        //Desafio 0:
        fs.writeFile(
            path.join(__dirname, 'db.json'),
            JSON.stringify(alunos),
            err => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Dados do aluno atualizados com sucesso!');
                }
            }
        );

        return alunoAtualizado;
    } else {
        return null
    }
}

//Desafio 1:
// function adicionarAluno(req, res) {
//     const { nome, matricula, media } = req.body;
//     if ((nome !== undefined) && (matricula !== undefined) && (media !== undefined)) {
//       const novoAluno = { nome: nome, matricula: matricula, media: media };
//       alunos.adicionarAluno(novoAluno);
//       res.json(`Novo aluno adicionado com sucesso! - nome: ${nome}, matrícula: ${matricula}, media: ${media}.`);
//     } else {
//       res.status(400).json({ mensagem: "Erro ao adicionar um novo aluno! Para adicionar novo aluno você precisa digitar nome, matrícula e média." });
//     }
//   }
function adicionarAluno(novoAluno) {
    if (novoAluno.nome && novoAluno.matricula && novoAluno.media) {
      alunos.push(novoAluno);

      //Desafio 0:
      fs.writeFile(
        path.join(__dirname, 'db.json'),
        JSON.stringify(alunos),
        err => {
            if (err) {
                console.error(err);
            } else {
                console.log('Dados do aluno atualizados com sucesso!');
            }
        }
    );
    
      return novoAluno;
    } else {
      return null;
    }
  }

  
module.exports = {
    alunos,
    filtrarPorNome,
    filtrarPorMedia,
    adicionarAluno,
    deletarAluno,
    atualizarAluno    
};


