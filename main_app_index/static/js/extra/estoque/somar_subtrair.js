// ==================== SOMAR ==================== //
// botao adiconar mais ingredientes do search
$('#search_ingredientes').on('click', '.addButton', function () {
    window.thisIng = this;
    getThingsSoma();
});

// botao adiconar mais ingredientes de estoque.html
$('.lista-ingredientes').on('click', '.addButton', function () {
    window.thisIng = this;
    getThingsSoma();
});

function getThingsSoma() {
    window.jsonIngrediente;
    window.jsonUnidade;
    if (typeof jsonIngrediente === 'undefined' || typeof jsonUnidade === 'undefined') {
        $.getJSON(listIngrediente, function (jsonObjectIngrediente) {
            jsonIngrediente = jsonObjectIngrediente;

            // get da tabela de unidades
            $.getJSON(listUnidadeMedida, function (jsonObjectUnidade) {
                jsonUnidade = jsonObjectUnidade;
                addButton();
            })
        })
    } else {
        addButton();
    };
}

function addButton() {
    // limpa valor calculado
    $('.preco_unitario_atualizado').empty();

    limpaMensagens();

    // seleciona a tag 'tr' do ingrediente especifico
    var thisTr = thisIng.closest('tr');

    // pega id do ingrediente localizado no html
    var id_ingrediente = $(thisTr).data('id');

    // limpa o drop down de unidades (para nao ir acrescentando mais lista)
    $('#UnidadeMedidaSoma').empty();

    // roda a lista de ingredientes
    $.each(jsonIngrediente, function (indexIngrediente, valIngrediente) {
        // caso id_ingrediente localizado no html seja igual a id_ingrediente do json ingrediente, pega o json desse ingrediente e mostra na tela
        if (id_ingrediente == valIngrediente.id_ingrediente) {
            // cria input do id do ingrediente (para saber qual ingrediente dar o PUT) 'hidden'
            var htmlIdIngrediente = '<input name="id_ingrediente" id="idSoma" hidden value="' + valIngrediente.id_ingrediente + '"></input>';

            // cria html para mostrar a quantidade atual do ingrediente em estoque
            var htmlQuantidadeAtual = '<h5>' + valIngrediente.quantidade_estoque_ingrediente + '</h5>';

            // pega a id da unidade do ingrediente (para filtragem das unidades)
            var valueUnidade = valIngrediente.id_unidade_medida;

            // pega o preço unitario do ingrediente
            var htmlPrecoUnitario = '<h5>R$ ' + valIngrediente.valor_ingrediente + '</h5>';

            // aparecera na header da modal, "Acrescentar + <nome do ingrediente>"
            var htmlNomeIngrediente = '<h4 class="modal-title">Acrescentar ' + valIngrediente.nome_ingrediente + '</h4>';

            // roda a lista de unidades e joga na classe UnidadeMedida do html (cria o dropdown com json de unidades)
            $.each(jsonUnidade, function (indexUnidade, valUnidade) {
                $('#UnidadeMedidaSoma').append($('<option>').text(valUnidade.simbolo_unidade_medida).attr(('value'), valUnidade.id_unidade_medida));

                // vem de unidades.js, filtra as unidades que podem ser usados
                validaUnidadeSoma(valueUnidade);

                // se as id de unidade dos json ingrediente e unidade forem iguais, joga a descricao do json unidade desse ingrediente na tela
                if (valUnidade.id_unidade_medida == valIngrediente.id_unidade_medida) {
                    var htmlUnidadeMedida = '<h5 value="' + valIngrediente.id_unidade_medida + '">' + valUnidade.simbolo_unidade_medida + '</h5>';

                    // deixa selecionado a unidade do ingrediente ao abrir modal
                    // $('select[name="id_unidade_medida"] option[value="' + valIngrediente.id_unidade_medida + '"]').prop('selected', true);
                    $('#formSomar').find('.unidadeTxt').html(htmlUnidadeMedida);
                }
            })
            // header da modal
            $('.nomeIngredienteHeader').html(htmlNomeIngrediente);

            // joga na modal a id do ingrediente 'hidden' e a quantidade atual
            $('#formSomar').find('.idIngrediente').html(htmlIdIngrediente);
            $('#formSomar').find('.quantidadeAtual').html(htmlQuantidadeAtual);
            $('#formSomar').find('.preco_unitario_atual').html(htmlPrecoUnitario);

            // cria e imprime na tela os input quantidade a somar e preço
            $('.inputQtdSoma').html('<input type="text" onkeyup="calculaPreco()" class="form-control qtdSoma" placeholder="Quantidade">');
            $('.inputPreco').html('<input type="text" onkeyup="calculaPreco()" class="form-control valor_total_compra" placeholder="Preço total">');

            // abre a modal
            $('#somar').modal('show');
        }
    })
};

function calculaPreco() {
    var valorTransformado;
    var unidadeSelecionado = $('#UnidadeMedidaSoma').find('option:selected').val();
    var qtdSoma = $('.qtdSoma').val();

    if (unidadeSelecionado == '1' || unidadeSelecionado == '2' || unidadeSelecionado == '4') {
        valorTransformado = qtdSoma;
    }
    if (unidadeSelecionado == '3' || unidadeSelecionado == '5') {
        valorTransformado = qtdSoma / 1000;
    }
    $('.inputValorTransformado').html('<input type="hidden" name="quantidade_estoque_ingrediente" class="form-control valorTransformado" placeholder="Quantidade" value="+' + valorTransformado + '">');

    // pega os valores inseridos na modal
    var qtdIngrediente = $('.valorTransformado').val();
    var precoTotal = $('.valor_total_compra').val();

    // pega a unidade (texto) da modal para mostrar ao lado do valor unitario atual
    var unidadeTxt = $('.unidadeTxt').find('h5').text();

    if (qtdIngrediente == '' || precoTotal == '' || isNaN(precoTotal) || isNaN(qtdIngrediente)) {
        $('.preco_unitario_atualizado').html('<h5>R$ 0</h5><input type="text" name="valor_ingrediente" value="0" hidden/>');
    } else {
        // calcula e mostra na tela o valor do preco unitario atual
        var precoUnitarioAtual = (Math.round((qtdIngrediente / precoTotal) * 100) / 100);
        var htmlPrecoUnitarioAtual = '<h5>R$ ' + precoUnitarioAtual + ' / ' + unidadeTxt + '</h5><input type="text" name="valor_ingrediente" value="' + precoUnitarioAtual + '" hidden/> ';
        $('.preco_unitario_atualizado').html(htmlPrecoUnitarioAtual);

    }
}

// ========== postAdd() é chamado em validacao-somar-subtrair.js ==========
function postAdd() {
    limpaMensagens();
    // seleciona o formulario, vai ser enviado serializado em 'data'
    var formSoma = $('#formSomar');
    // seleciona o id do ingrediente 'hidden' localizado no html
    idData = $('#idSoma').val();

    load_url();

    var formSomaArray = formSoma.serializeArray();
    console.log(formSomaArray)
    $.each(jsonIngrediente, function (indexIngrediente, valIngrediente) {
        if (valIngrediente.id_ingrediente == idData) {
            formSomaArray.push({
                name: 'nome_ingrediente',
                value: '' + valIngrediente.nome_ingrediente + ''
            }, {
                name: 'quantidade_calorica_ingrediente',
                value: '' + valIngrediente.quantidade_calorica_ingrediente + ''
            }, {
                name: 'aproveitamento_ingrediente',
                value: '' + valIngrediente.aproveitamento_ingrediente + ''
            })
        }
    })

    $.ajax({
        type: "POST",
        url: updateIngrediente,
        dataType: "json",
        data: formSomaArray,

        success: function () {
            $('#somar').modal("hide");
            swal({
                    title: "Sucesso!",
                    text: "Ingrediente somado com sucesso!",
                    type: "success"
                },
                function () {
                    location.reload();
                }
            )
        },
        error: function (xhr, error) {
            $('#mensagens-erro-soma').append('Erro ao acrescentar ingrediente.');
        },
    });
}

// ==================== SUBTRAIR ==================== //
$('.lista-ingredientes').on('click', '.subButton', function () {
    limpaMensagens();

    //seleciona a 'tr' do ingrediente especifico
    var thisTr = $(this).closest('tr');

    // pega id do ingrediente localizado no html
    var id_ingrediente = thisTr.data('id');

    // limpa o drop down de unidades (para nao ir acrescentando mais lista)
    $('#unidadeMedidaSubtrai').empty();

    // roda a lista de ingredientes
    $.each(jsonIngrediente, function (indexIngrediente, valIngrediente) {
        // caso id_ingrediente localizado no html seja igual a id_ingrediente do json ingrediente, pega o json desse ingrediente e mostra na tela
        if (id_ingrediente == valIngrediente.id_ingrediente) {

            // cria input do id do ingrediente (para saber qual ingrediente dar o PUT) 'hidden'
            var htmlIdIngrediente = '<input name="id_ingrediente" id="idSub" hidden value="' + valIngrediente.id_ingrediente + '"></input>';

            // aparecera na header da modal, "Subtrair + <nome do ingrediente>"
            var htmlNomeIngrediente = '<h4 class="modal-title ">Subtrair ' + valIngrediente.nome_ingrediente + '</h4>';

            // pega id da unidade do ingrediente para filtrar o select
            var valueUnidade = valIngrediente.id_unidade_medida;

            // cria html para mostrar a quantidade atual do ingrediente em estoque
            var htmlQuantidadeAtual = '<h5>' + valIngrediente.quantidade_estoque_ingrediente + '</h5>';
            // roda a lista de unidades e joga na classe UnidadeMedida do html (cria o dropdown com json de unidades)
            $.each(jsonUnidade, function (indexUnidade, valUnidade) {
                $('#unidadeMedidaSubtrai').append($('<option>').text(valUnidade.simbolo_unidade_medida).attr(('value'), valUnidade.id_unidade_medida));

                // se as id de unidade dos json ingrediente e unidade forem iguais, joga a descricao do json unidade desse ingrediente na tela
                if (valUnidade.id_unidade_medida == valIngrediente.id_unidade_medida) {

                    // mostra o tipo da unidade de medida do ingrediente
                    var htmlUnidadeMedida = '<h5 value="' + valIngrediente.id_unidade_medida + '">' + valUnidade.simbolo_unidade_medida + '</h5>';
                    // deixa selecionado a unidade do ingrediente ao abrir modal
                    // $('select[name="id_unidade_medida"] option[value="' + valIngrediente.id_unidade_medida + '"]').prop('selected', true);
                    $('#formSubtrair').find('.unidadeTxtsub').html(htmlUnidadeMedida);

                    $('#formSubtrair').find('.unidadeTxt').html('<h5>' + valUnidade.simbolo_unidade_medida + '</h5>');

                    return;
                }
            })

            // header da modal
            $('.nomeIngredienteHeader').html(htmlNomeIngrediente);
            $('#formSubtrair').find('.quantidadeAtual').html(htmlQuantidadeAtual);
            // joga na modal a id do ingrediente 'hidden' e a quantidade atual
            $('#formSubtrair').find('.idIngrediente').html(htmlIdIngrediente);


            // filtra as unidades
            validaUnidadeSubtrai(valueUnidade);

            // abre a modal
            $('#subtrair').modal('show');

            return;
        }
    })
    // MOTIVO DE DELETAR ESTA NO HTML
});

// chamado no html
function converteUnidadeSub() {
    var valorTransformado;
    var unidadeSelecionado = $('#unidadeMedidaSubtrai').find('option:selected').val();
    var qtdSubtrai = $('.qtdSubtrai').val();

    if (unidadeSelecionado == '1') {
        valorTransformado = qtdSubtrai;
    }
    if (unidadeSelecionado == '2' || unidadeSelecionado == '4') {
        valorTransformado = qtdSubtrai;
    }
    if (unidadeSelecionado == '3' || unidadeSelecionado == '5') {
        valorTransformado = qtdSubtrai / 1000;
    }
    $('.subTransformado').html('<input type="text" name="quantidade_estoque_ingrediente" value="-' + valorTransformado + '"hidden/>')
}


// ========== postSub() é chamado em validacao-somar-subtrair.js ==========
function postSub() {
    limpaMensagens();

    // seleciona o formulario, vai ser enviado serializado em 'data'
    var formSubtrair = $('#formSubtrair');

    // seleciona o id do ingrediente 'hidden' localizado no html
    idData = $('#idSub').val();

    load_url();

    var formSubtrairArray = formSubtrair.serializeArray();

    $.each(jsonIngrediente, function (indexIngrediente, valIngrediente) {
        if (valIngrediente.id_ingrediente == idData) {
            formSubtrairArray.push({
                name: 'nome_ingrediente',
                value: '' + valIngrediente.nome_ingrediente + ''
            }, {
                name: 'quantidade_calorica_ingrediente',
                value: '' + valIngrediente.quantidade_calorica_ingrediente + ''
            }, {
                name: 'aproveitamento_ingrediente',
                value: '' + valIngrediente.aproveitamento_ingrediente + ''
            }, {
                name: 'valor_ingrediente',
                value: '' + valIngrediente.valor_ingrediente + ''
            })
        }
    })

    console.log(formSubtrairArray)
    $.ajax({
        type: "POST",
        url: updateIngrediente,
        dataType: "json",
        data: formSubtrairArray,

        success: function () {
            $('#subtrair').modal("hide");
            swal({
                    title: "Sucesso!",
                    text: "Ingrediente retirado com sucesso!",
                    type: "success"
                },
                function () {
                    location.reload();
                }
            )
        },
        error: function (xhr, error) {
            $('#mensagens-erro-subtrair').append('Erro ao subtrair ingrediente.');
        },
    });
};