// Validação SOMA modal
$('.salvar-soma').on('click', function () {
    limpaMensagens();
    var erros = [];
    var qtdSoma = $('.qtdSoma').val();
    var valorTotal = $('.valor_total_compra').val();

    if (qtdSoma == '0' || qtdSoma == '' || qtdSoma == null) {
        erros.push('A QUANTIDADE a ser somado NÃO ser VAZIO');
    }
    if (qtdSoma < 0) {
        erros.push('A QUANTIDADE NÃO pode ser NEGATIVO');
    }
    if (isNaN(qtdSoma)) {
        erros.push('A QUANTIDADE deve ser conter NUMERCOS APENAS');
    }
    if (valorTotal < 0) {
        erros.push('O PREÇO do ingrediente NÃO pode ser NEGATIVO');
    }
    if (isNaN(valorTotal)) {
        erros.push('O PREÇO do ingrediente deve conter NUMERO APENAS');
    }
    // se valido, da post
    if (!isNaN(qtdSoma) && qtdSoma != '0' && qtdSoma != '' && qtdSoma >= 0 && !isNaN(valorTotal)) {
        erros.length = 0;
        postAdd();
    }
    // se valido, limpa a lista de erros e da post
    $.each(erros, function (index, erro) {
        var li = $('<li>' + erro + '</li>');
        $(li).appendTo('#mensagens-erro-soma');
    })
});

// Validação SUBTRAIR modal
$('.salvar-subtracao').on('click', function () {
    limpaMensagens();
    var erros = [];
    var qtdSub = $('.qtdSubtrai').val();
    var motivo = $('.motivo').val();

    if (qtdSub == '0' || qtdSub == '') {
        erros.push('A QUANTIDADE a subtrair NÃO pode ser VAZIO');
    }
    if (isNaN(qtdSub)) {
        erros.push('A QUANTIDADE deve conter NUMEROS APENAS')
    }
    if (qtdSub < 0) {
        erros.push('A QUANTIDADE NÃO pode ser NEGATIVO')
    }
    if (motivo == '') {
        erros.push('Insira o MOTIVO');
    }
    // se valido, limpa a lista de erros e da post
    if (qtdSub != '' && qtdSub != '0' && !isNaN(qtdSub) && motivo != '' && qtdSub >= 0) {
        erros.length = 0;
        postSub();
    }
    // imprime a lista de erros
    $.each(erros, function (index, erro) {
        var li = $('<li>' + erro + '</li>');
        $(li).appendTo('#mensagens-erro-subtrair');
    })
});