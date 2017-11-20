// variavel apenas por conveniencia, caso precisar alterar, altere aqui apenas
window.form_addAula = $('#form_addAula');

// ========== MODAL EDITAR AULA ========== //
$('.aulas').on('click', '.editar', function () {
    // abre modal
    $('#addReceita').modal('show');
    limpaMensagens();

    // limpa a lista de receitas (nao acumular apertando editar varias vezes)
    $('.tabela_receita tr').remove();

    // seleciona a 'tr' da aula especifica
    var thisTr = $(this).closest('tr');

    // pega a id da aula especifica
    var idAula = thisTr.data('id');

    // cria os botoes add e del
    var htmlNumReceitas = '<li type="text" id="numero_de_receitas" class="form-control" name="numero_receitas" placeholder="Nº de Receitas" value="">';
    var htmlAddIngButton = '<button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#addReceita"><i class="fa fa-plus"></i></button>';
    form_addAula.find('.addIngButton').html(htmlAddIngButton);

    var htmlTurno = '<select class="form-control periodo_aula" name="periodo_aula" style="width: 100%;"><option value="Manhã">Manhã</option><option value="Noite">Noite</option></select>';

    // roda a lista de aulas e verifica com a id pego na 'tr'
    $.each(jsonAula, function (indexAula, valAula) {
        if (valAula.id_aula == idAula) {
            // header da modal (mostrar o dia da aula)
            var htmlHeader = '<h4 class="modal-title">Editar aula do dia ' + valAula.data_aula + '</h4>'
            $('.cabecalho').html(htmlHeader);

            var htmlIdAula = '<li class="id_aula" hidden data-id="' + valAula.id_aula + '"></li>';
            var htmlDiaDaAula = '<input type="text" name="data_aula" class="form-control" id="datepicker" value="' + valAula.data_aula + '"></input>';
            var htmlNumAlunos = '<input type="text" class="form-control qtdAlunos" name="numero_de_alunos_projetados" placeholder="Nº de Alunos" value="' + valAula.numero_de_alunos_projetados + '">';

            form_addAula.find('.idAula').html(htmlIdAula);
            form_addAula.find('.data').html(htmlDiaDaAula);
            form_addAula.find('.numAlunos').html(htmlNumAlunos);
            form_addAula.find('.turno').html(htmlTurno);
            form_addAula.find('.numReceitas').html(htmlNumReceitas);
            chamaDatePicker();

            // esvazia a array para validação da receita (não repetir receita)
            receitaArray.length = 0;

            // deixa selecionado o periodo da aula
            $('.turno').val(valAula.periodo_aula).change();

            // garante que a tabela de receitas foi carregada
            if (typeof jsonObjectReceita === 'undefined') {
                $.getJSON('../js/testesJson/testeJsonReceitas.json', function (jsonObjectReceita) {
                    jsonReceita = jsonObjectReceita;
                    mostraReceitas(idAula);
                });
            } else {
                mostraReceitas(idAula);
            }
        }
    })
});

// =========== MODAL MARCAR COMO AULA AGENDADA =========== //
$('.aulas').on('click', '.botaoAgendarAula', function () {
    // abre modal
    $('#addReceita').modal('show');
    limpaMensagens();

    // limpa a lista de receitas (nao acumular apertando editar varias vezes)
    $('.tabela_receita tr').remove();

    // seleciona a 'tr' da aula especifica
    var thisTr = $(this).closest('tr');

    // pega a id da aula especifica
    var idAula = thisTr.data('id');

    // cria os botoes add e del
    var htmlNumReceitas = '<input type="text" id="numero_de_receitas" class="form-control" name="numero_receitas" placeholder="Nº de Receitas" value="">';
    var htmlAddIngButton = '<button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#addReceita"><i class="fa fa-plus"></i></button>';

    form_addAula.find('.addIngButton').html(htmlAddIngButton);

    var htmlTurno = '<select class="form-control periodo_aula" name="periodo_aula" style="width: 100%;"><option value="Manhã">Manhã</option><option value="Noite">Noite</option></select>';

    // roda a lista de aulas e verifica com a id pego na 'tr'
    $.each(jsonAula, function (indexAula, valAula) {
        if (valAula.id_aula == idAula) {
            // header da modal (mostrar o dia da aula)
            var htmlHeader = '<h4 class="modal-title">Confirmar dados da aula ' + valAula.data_aula + '</h4>'
            $('.cabecalho').html(htmlHeader);

            var htmlIdAula = '<input name="id_aula" class="id_aula" hidden value="' + valAula.id_aula + '"></input>';
            var htmlDiaDaAula = '<input type="text" name="data_aula" class="form-control" id="datepicker" value="' + valAula.data_aula + '"></input>';
            var htmlNumAlunos = '<input type="text" class="form-control qtdAlunos" name="numero_de_alunos_projetados" placeholder="Nº de Alunos" value="' + valAula.numero_de_alunos_projetados + '">';

            form_addAula.find('.idAula').html(htmlIdAula);
            form_addAula.find('.data').html(htmlDiaDaAula);
            form_addAula.find('.numAlunos').html(htmlNumAlunos);
            form_addAula.find('.periodo_aula').html(htmlNumAlunos);
            form_addAula.find('.turno').html(htmlTurno);
            form_addAula.find('.numReceitas').html(htmlNumReceitas);
            chamaDatePicker();

            // esvazia a array para validação da receita (não repetir receita)
            receitaArray.length = 0;

            // deixa selecionado o periodo da aula
            $('.turno').val(valAula.periodo_aula).change();

            // garante que a tabela de receitas foi carregada
            if (typeof jsonObjectReceita === 'undefined') {
                $.getJSON('../js/testesJson/testeJsonReceitas.json', function (jsonObjectReceita) {
                    jsonReceita = jsonObjectReceita;
                    // mostraReceitas(idAula) vem do modal-add-editar-aulas.js
                    mostraReceitas(idAula);
                });
            } else {
                mostraReceitas(idAula);
            }
        }
    })

    // cria array de botoes (cancelar e agendar) 
    var htmlButtonArr = [];
    // joga os botoes na array
    htmlButtonArr.push('<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>');
    htmlButtonArr.push('<button type="button" id="agendarButton" class="btn btn-success pull-right">Agendar Aula</button>');
    // imprime a array no rodape (cancelar e agendar)
    $('.rodape').html(htmlButtonArr);
});


// modal editar/agendar aula, lista de receitas da aula (toda parte de baixo da modal)
function mostraReceitas(idAula) {
    var htmlDelIngButton = '<td class="botao-excluir"><button type="button" class="excluir">Excluir</button></td>';

    // roda a lista de aulas
    $.each(jsonAula, function (indexAula, valAula) {
        // seleciona a aula especifica
        if (valAula.id_aula == idAula) {
            // roda a lista de receitas da aula
            $.map(valAula.receitas, function (innerJsonAula) {
                // roda a lsita de receitas
                $.each(jsonReceita, function (indexReceitas, valReceitas) {
                    // compara a lista de receitas da aula com a lista de receitas (para pegar o nome da receita pelo id)
                    if (innerJsonAula.id_receita == valReceitas.id_receita) {
                        var htmlListReceitas = $('<tr data-id="' + innerJsonAula.id_receita + '"></tr>');
                        $('<td class="info-nome"><input hidden="" type="text" name="lista_ingrediente.nome_ingrediente" value="' + valReceitas.id_receita + '"><p>' + valReceitas.nome_receita + '</p></td>').appendTo(htmlListReceitas);
                        $('<td class="info-unidade"><input hidden="" type="text" name="lista_ingrediente.quantidade_receita" value="' + innerJsonAula.quantidade_receita + '"><p>' + innerJsonAula.quantidade_receita + '</p></td>').appendTo(htmlListReceitas);
                        $(htmlDelIngButton).appendTo(htmlListReceitas);

                        // joga na tela
                        $(htmlListReceitas).appendTo('.tabela_receita');

                        // insere id da receita na array para validação (não repetir receita)
                        receitaArray.push(innerJsonAula.id_receita);
                    }
                })
            })
        }
        // cria array de botoes (cancelar e agendar) 
        var htmlButtonArr = [];
        // joga os botoes na array
        htmlButtonArr.push('<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>');
        htmlButtonArr.push('<button type="button" id="agendarButton" class="btn btn-success pull-right">Agendar Aula</button>');
        // imprime a array no rodape (cancelar e agendar)
        $('.rodape').html(htmlButtonArr);
    })
}
// ========== MODAL ADICIONAR AULA ========== //
$('#addIngrediente').on('click', function () {
    $('#addReceita').modal('show');

    limpaMensagens();
    // limpa a lista de receitas (nao acumular apertando editar varias vezes)
    $('.tabela_receita tr').remove();

    // header da modal
    var htmlHeader = '<h4 class="modal-title">Criar nova aula </h4>'
    $('.cabecalho').html(htmlHeader);

    var htmlIdAula = '<input name="id_aula" class="id_aula" hidden value=""></input>'
    var htmlDiaDaAula = '<input type="text" name="dia_da_aula" class="form-control" id="datepicker" placeholder="dd/mm/yy">';
    var htmlTurno = '<select class="form-control periodo_aula" name="periodo_aula" style="width: 100%;"><option value="Manhã">Manhã</option><option value="Noite">Noite</option></select>';
    var htmlNumReceitas = '<input type="text" class="form-control" id="numero_de_receitas" placeholder="Nº de Receitas" value="">';
    var htmlNumAlunos = '<input type="text" class="form-control qtdAlunos" name="numero_alunos" placeholder="Nº de Alunos" value="">';

    form_addAula.find('.idAula').html(htmlIdAula);
    form_addAula.find('.data').html(htmlDiaDaAula);
    form_addAula.find('.numAlunos').html(htmlNumAlunos);
    form_addAula.find('.turno').html(htmlTurno);
    form_addAula.find('.numReceitas').html(htmlNumReceitas);

    chamaDatePicker();

    // cria array de botoes (cancelar e agendar) 
    var htmlButtonArr = [];
    // joga os botoes na array
    htmlButtonArr.push('<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>');
    htmlButtonArr.push('<button type="button" id="saveButton" class="btn btn-success pull-right">Planejar Aula</button>');
    // imprime a array no rodape (cancelar e agendar)
    $('.rodape').html(htmlButtonArr);
});

// ==================== MODAL DETALHES DA AULA ==================== //
$('.aulas').on('click', '.botaoDetalhes', function () {
    // var nomeReceita é usado para converter id_reecita para nome_receita
    var nomeReceita;

    // mostra a modal
    $('#verAula').modal('show');

    // pega a id da aula
    var idAula = $(this).closest('tr').data('id');

    // limpa a tabela das receitas
    $('.receitasQuantidade tr').remove();

    // Header da modal
    $.each(jsonAula, function (indexAula, valAula) {
        if (idAula == valAula.id_aula) {
            var trIdAula = '<tr hidden data-id="' + valAula.id_aula + '"></tr>';
            $('.receitasQuantidade').append(trIdAula);

            var htmlDataAula = '<h4 class="modal-title">Aula do dia ' + valAula.data_aula + '</h4>'
            $('.headerDaModal').html(htmlDataAula);
        }
    })

    // verifica se foi dado get das receitas, caso nao tenha dado ele dará get aqui
    if (typeof jsonReceita === 'undefined') {
        $.getJSON('../js/testesJson/testeJsonReceitas.json', function (jsonObjectReceita) {
            jsonReceita = jsonObjectReceita;
            aulaDetalhe()
        });
    }
    aulaDetalhe()

    function aulaDetalhe() {
        // roda a tabela de aulas
        $.map(jsonAula, function (obj) {
            // pega aula com o id especifico
            if (obj.id_aula == idAula) {
                // roda a tabela de receitas da aula
                $.each(obj.receitas, function (indexAulaReceitas, valueAulaReceitas) {
                    // caso id_receita das duas tabelas sejam iguais, pega o nome_receita
                    $.map(jsonReceita, function (objReceita) {
                        if (valueAulaReceitas.id_receita == objReceita.id_receita) {
                            nomeReceita = objReceita.nome_receita;
                        }
                    })

                    var htmlListReceitas = $('<tr></tr>');
                    $('<td class="id_receita"><a href="#" id="hipertextColor">' + nomeReceita + '</a></td>').appendTo(htmlListReceitas);
                    $('<td class="quantidade_receita">' + valueAulaReceitas.quantidade_receita + '</td>').appendTo(htmlListReceitas);
                    $(htmlListReceitas).appendTo('.receitasQuantidade');
                })
            }
        })
        var htmlButtonArr = [];
        htmlButtonArr.push('<button type="button" class="btn btn-default clonar">Clonar Aula</button>');
        htmlButtonArr.push('<button type="button" class="btn btn-default" data-dismiss="modal">OK</button>');
        $('.rodape').html(htmlButtonArr);
    }
})

// =========== GET RECEITAS para selecionar ===========
$.getJSON('../js/testesJson/testeJsonReceitas.json', function (receitaList) {
    var listaReceitas = $.map(receitaList, function (receita, id) {

        $('#receitas').append($('<option>', {
            value: receita.id_receita,
            text: receita.nome_receita
        }));
    });
});