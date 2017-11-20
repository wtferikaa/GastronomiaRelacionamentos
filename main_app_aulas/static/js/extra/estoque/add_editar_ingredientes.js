// variavel apenas para evitar repetição, caso necessario, alterar apenas aqui
var form_addIngrediente = $('#form-addIngrediente');

// ==================== MODAL EDITAR INGREDIENTE ==================== //
$('.lista-ingredientes').on('click', '.editar', function () {
    // seleciona a tag 'tr' do ingrediente especifico
    var thisTr = $(this).closest('tr');

    limpaMensagens();

    // pega id do ingrediente localizado no html
    var id_ingrediente = thisTr.data('id');

    // limpa o drop down de unidades (para nao ir acrescentando mais lista)
    $('#unidadeMedida').empty();

    // roda a lista de ingredientes
    $.each(jsonIngrediente, function (indexIngrediente, valIngrediente) {
        // caso id_ingrediente localizado no html seja igual a id_ingrediente do json ingrediente, pega o json desse ingrediente e mostra na tela
        if (id_ingrediente == valIngrediente.id_ingrediente) {

            // roda a lista de unidades e joga na classe#unidadeMedida do html (cria o dropdown com json de unidades)
            $.each(jsonUnidade, function (indexUnidade, valUnidade) {
                $('#unidadeMedida').append($('<option>').text(valUnidade.simbolo_unidade_medida).attr(('value'), valUnidade.id_unidade_medida));
            })

            var valueUnidade = valIngrediente.id_unidade_medida;
            validaUnidade(valueUnidade);

            // cria os inputs com os dados do ingrediente
            var htmlIdIngrediente = '<input type="hidden" name="id_ingrediente" class="id" value="' + valIngrediente.id_ingrediente + '"></input>'
            var htmlNomeIngrediente = '<input name="nome_ingrediente" type="text" class="form-control" id="nome_ingrediente" placeholder="Ingrediente" value="' + valIngrediente.nome_ingrediente + '">';
            var htmlQuantidadeCalorica = '<input name="quantidade_calorica_ingrediente" type="text" class="form-control" id="quantidade_calorica" placeholder="Calorias em 100g" value ="' + valIngrediente.quantidade_calorica_ingrediente + '">';
            var htmlAproveitamento = '<input name="aproveitamento_ingrediente" type="text" class="form-control" id="aproveitamento" placeholder="Aproveitamento em %" value="' + valIngrediente.aproveitamento_ingrediente + '">';
            var htmlQuantidadeEstoque = '<input name="quantidade_estoque_ingrediente" type="text" class="form-control" id="quantidade_estoque" placeholder="Quantidade Atual" value="' + valIngrediente.quantidade_estoque_ingrediente + '">';

            // aparecera na header da modal, "Editar + <nome do ingrediente>"
            var htmlHeader = '<h4 class="modal-title ">Editar ' + valIngrediente.nome_ingrediente + '</h4>';
            $('.nomeIngredienteHeader').html(htmlHeader);

            // deixa selecionado a unidade do ingrediente ao abrir modal
            $('select[name="id_unidade_medida"] option[value="' + valIngrediente.unidade_medida_id_unidade_medida + '"]').prop('selected', true);

            // joga os inputs na modal (ex: find(.NomeIngrediente), procura a classe NomeIngrediente no html e joga o input criado la)
            form_addIngrediente.find('.idIngrediente').html(htmlIdIngrediente);
            form_addIngrediente.find('.NomeIngrediente').html(htmlNomeIngrediente);
            form_addIngrediente.find('.QuantidadeCalorica').html(htmlQuantidadeCalorica);
            form_addIngrediente.find('.QuantidadeEstoque').html(htmlQuantidadeEstoque);
            form_addIngrediente.find('.Aproveitamento').html(htmlAproveitamento);
        }
    })
    // abre a modal
    $('#formIngrediente').modal('show');
});

// ==================== MODAL ADICIONAR INGREDIENTE ==================== //
$('#addIngrediente').on('click', function () {

    limpaMensagens();

    // reseta a lista de unidades para kg
    $('select[name="id_unidade_medida"] option[value="1"]').prop('selected', true);

    // limpa o drop down de unidades (para nao ir acrescentando mais lista)
    $('#unidadeMedida').empty();

    // roda a lista de unidades e joga na classe#unidadeMedida do html (cria o dropdown com json de unidades)
    $.each(jsonUnidade, function (indexUnidade, valUnidade) {
        $('#unidadeMedida').append($('<option>').text(valUnidade.simbolo_unidade_medida).attr(('value'), valUnidade.id_unidade_medida));
    })

    // cria os inputs vazio
    var htmlIdIngrediente = '<input class="id_ingrediente" hidden value=""></input>'
    var htmlNomeIngrediente = '<input name="nome_ingrediente" type="text" class="form-control" id="nome_ingrediente" placeholder="Ingrediente" value="">';
    var htmlQuantidadeCalorica = '<input name="quantidade_calorica_ingrediente" type="text" class="form-control" id="quantidade_calorica" placeholder="Calorias em 100g" value ="">';
    var htmlAproveitamento = '<input name="aproveitamento_ingrediente" type="text" class="form-control" id="aproveitamento" placeholder="Aproveitamento em %" value="">';
    var htmlQuantidadeEstoque = '<input name="quantidade_estoque_ingrediente" type="text" class="form-control" id="quantidade_estoque" placeholder="Quantidade Atual" value="">';

    // aparecera na header da modal
    var htmlHeader = '<h4 class="modal-title ">Adicionar Ingrediente</h4>';
    $('.nomeIngredienteHeader').html(htmlHeader);

    // joga os inputs na modal (ex: find(.NomeIngrediente), procura a classe NomeIngrediente no html e joga o input criado la)
    form_addIngrediente.find('.idIngrediente').html(htmlIdIngrediente);
    form_addIngrediente.find('.NomeIngrediente').html(htmlNomeIngrediente);
    form_addIngrediente.find('.QuantidadeCalorica').html(htmlQuantidadeCalorica);
    form_addIngrediente.find('.QuantidadeEstoque').html(htmlQuantidadeEstoque);
    form_addIngrediente.find('.Aproveitamento').html(htmlAproveitamento);

    // tira 'mg' e 'ml' da lista, funçao esta em unidade.js
    filtraUnidade();

    // abre a modal
    $('#formIngrediente').modal('show');
});