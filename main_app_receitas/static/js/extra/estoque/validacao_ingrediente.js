// ========== VALIDAÇAO de ADICIONAR e EDITAR INGREDIENTE ========== //
$('#adicionar-ingrediente').on('click', function () {

    limpaMensagens();
    var ingrediente = obtemIngredienteDoFormulario();

    var erros = validaIngrediente(ingrediente);
    if (erros.length > 0) {
        exibeMensagensDeErro(erros);
    } else {
        postJson();
    }
});

function obtemIngredienteDoFormulario() {
    var nome = document.getElementById("nome_ingrediente").value;
    var qtd = document.getElementById("quantidade_calorica").value;
    var aproveitamento = document.getElementById("aproveitamento").value;
    var ingrediente = {
        nome: nome,
        calorias: qtd,
        aproveitamento: aproveitamento
    };
    return ingrediente;
}

function validaIngrediente(ingrediente) {
    var erros = [];

    if (ingrediente.nome.length == 0) {
        erros.push("O NOME do ingrediente NÃO pode estar em VAZIO");
    }
    if (ingrediente.calorias.length == 0) {
        erros.push("A QUANTIDADE CALORICA NÃO pode estar em VAZIO");
    }
    if (ingrediente.calorias < 0) {
        erros.push("A QUANTIDADE CALORICA NÃO pode ser NEGATIVO");
    }
    if (ingrediente.calorias >= 2000) {
        erros.push("A QUANTIDADE CALORICA NÃO pode ser SUPERIOR a 2000");
    }
    if (isNaN(ingrediente.calorias)) {
        erros.push("A QUANTIDADE CALORICA deve conter NUMEROS APENAS");
    }
    if (ingrediente.aproveitamento.length == 0) {
        erros.push("O APROVEITAMENTO NÃO pode estar em VAZIO");
    }
    if (ingrediente.aproveitamento < 0) {
        erros.push("O APROVEITAMENTO NÃO pode ser NEGATIVO");
    }
    if (ingrediente.aproveitamento > 100) {
        erros.push("O APROVEITAMENTO NÃO pode ser SUPERIOR a 100%");
    }
    if (isNaN(ingrediente.aproveitamento)) {
        erros.push("O APROVEITAMENTO deve conter NUMEROS APENAS");
    }
    return erros;
}

function exibeMensagensDeErro(erros) {
    var ul = document.querySelector("#mensagens-erro");

    ul.innerHTML = "";

    erros.forEach(function (erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}