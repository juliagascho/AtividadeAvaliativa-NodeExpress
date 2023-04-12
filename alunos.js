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

module.exports = {
    alunos,
    filtrarPorNome,
    filtrarPorMedia,
    deletarAluno
};

