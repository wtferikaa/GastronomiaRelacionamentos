$(document).ready(function () {
    var ingredienteArray = [];

    $("#novo-ingrediente").click(function (event) {
        event.preventDefault();

        limpaMensagens();
        var formAdicionarIngrediente = $('#form-adicionar-ingrediente');
        var ingrediente = obtemIngredienteDoFormulario(formAdicionarIngrediente);

        var htmlLinha = '<tr data-teste="' + ingrediente.id + '" class="ig"><td class="info-nome"><input type="text" name="nome[]" value="' + ingrediente.nome + '" /></td><td class="info-quantidade"><input type="text" name="quantidade[]" value="' + ingrediente.quantidade + '" /></td><td class="info-unidade">' + ingrediente.unidade + '</td><td class="botao-excluir">' + ingrediente.excluir + '</td></tr>';

        var erros = validaReceita(ingrediente);

        if (erros.length > 0) {
            exibeMensagensDeErro(erros);
            return;
        } else {
            return $(".tabela-ingrediente").append(htmlLinha);
        }

    });

    // BOTAO REMOVE INGREDIENTE DA RECEITA
    $("#formIngredientes").on('click', 'td.botao-excluir', function () {
        var splice = $(this).closest('.ig').data('teste');

        for (var i = 0; i < ingredienteArray.length; i++) {
            if (ingredienteArray[i] == splice) {
                ingredienteArray.splice(i, 1);
                break;
            }
        }
        $(this).parent().remove();
    });

    // CAPTURA OS DADOS DO FORMULARIO
    function obtemIngredienteDoFormulario(formAdicionarIngrediente) {
        var nomeIngrediente = document.getElementById("nomeIngrediente");

        // BOTAO EXCLUIR GERADO
        var htmlBotao = '<button type="button" class="excluir">Excluir</button>';

        var ingrediente = {
            id: nomeIngrediente.options[nomeIngrediente.selectedIndex].value,
            nome: nomeIngrediente.options[nomeIngrediente.selectedIndex].text,
            quantidade: document.getElementById("quantidade").value,
            unidade: document.querySelector("#unidade").textContent,
            excluir: htmlBotao
        }
        return ingrediente;
    }

    // VALIDAÇAO DO INGREDIENTE
    function validaReceita(ingrediente) {
        var erros = [];

        // ingredienteArray.push($('#nomeIngrediente option:selected').index());
        var idx = $.inArray(ingrediente.id, ingredienteArray);
        if (ingrediente.quantidade == 0 || ingrediente.quantidade == "") {
            erros.push("A QUANTIDADE do ingrediente não pode ser em branco");
        }
        if (document.getElementById("nomeIngrediente").selectedIndex == "0") {
            erros.push("SELECIONE o ingrediente");
        }
        if (idx != -1) {
            erros.push("O Ingrediente JA ESTÁ INSERIDO");
        }
        if (isNaN(ingrediente.quantidade)) {
            erros.push("A quantidade deve ser conter NUMERCOS APENAS");
        }
        if ((idx == -1 && ingrediente.quantidade != 0) && !isNaN(ingrediente.quantidade)) {
            ingredienteArray.push(ingrediente.id);
            erros.length = 0;
        }
        return erros;
    }

    function exibeMensagensDeErro(erros) {
        var ul = document.querySelector("#mensagens-ing-receita-erro");
        ul.innerHTML = "";

        erros.forEach(function (erro) {
            var li = document.createElement("li");
            li.textContent = erro;
            ul.appendChild(li);
        })
    }
});