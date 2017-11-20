// ==================== GET ===================== //
// armazena os objetos json de ingrediente e unidade para ser usado em outros locais
window.jsonIngrediente;
window.jsonUnidade;

// get da tabela de ingredientes
if (typeof jsonIngrediente === 'undefined' || typeof jsonObjectUnidade === 'undefined') {
    $.getJSON('http://localhost:8000/api/ingredientes/list', function (jsonObjectIngrediente) {
        jsonIngrediente = jsonObjectIngrediente;

        // get da tabela de unidades
        $.getJSON('http://localhost:8000/api/unidadesmedida/list', function (jsonObjectUnidade) {
            jsonUnidade = jsonObjectUnidade;
            mostraIngredientes();
        })
    })
} else {
    mostraIngredientes();
};

function mostraIngredientes() {
    // cria os botoes dos ingredientes
    var botaoAdd = '<td><button type="button" class="btn btn-xs addButton"><i class="fa fa-plus"></i></button></td>';
    var botaoSubtract = '<td><button type="button" class="btn btn-danger btn-xs subButton"><i class="fa fa-minus"></i></button></td>';
    var botaoExcluir = '<td><button type="button" class="btn btn-xs btn-danger excluir_ing"><i class="fa fa-trash"></i></button></td>';
    var botaoEditar = '<td><button class="editar" type="button">Editar</button></td>';

    // roda a lista de ingredientes
    $.each(jsonIngrediente, function (indexIngrediente, valIngrediente) {
        // roda a lista de unidades
        $.each(jsonUnidade, function (indexUnidade, valUnidade) {
            // compara as id de unidade das tabelas ingredientes e unidade e armazena a key 'descricao' da tabela unidade na variavel unidade
            if (valUnidade.id_unidade_medida == valIngrediente.id_unidade_medida) {

                // cria a 'tr' de cada ingrediente para ficar em formato de lista
                var htmlList = $('<tr class="id-ingrediente" data-id="' + valIngrediente.id_ingrediente + '"></tr>');

                // cria as 'td' com os valores do ingreiente E joga as 'td' dentro da 'tr' htmlList (<tr><td>  </td></tr>)
                $('<td class="nome_ingrediente">' + valIngrediente.nome_ingrediente + '</td>').appendTo(htmlList);
                $('<td class="quantidade_calorica">' + valIngrediente.quantidade_calorica_ingrediente + '</td>').appendTo(htmlList);
                $('<td class="aproveitamento">' + valIngrediente.aproveitamento_ingrediente + '</td>').appendTo(htmlList);
                $('<td class="valor_ingrediente"> R$ ' + valIngrediente.valor_ingrediente + '</td>').appendTo(htmlList);
                $('<td class="quantidade_estoque">' + valIngrediente.quantidade_estoque_ingrediente + '</td>').appendTo(htmlList);
                $('<td class="unidade_medida">' + valUnidade.simbolo_unidade_medida + '</td>').appendTo(htmlList);
                $(botaoAdd).appendTo(htmlList);
                $(botaoSubtract).appendTo(htmlList);
                $(botaoEditar).appendTo(htmlList);
                $(botaoExcluir).appendTo(htmlList);

                // imprime na tela os ingredientes e os botoes
                $(htmlList).appendTo('.tabela-ingrediente');
            }
        });
    });
}
// ===================== POST PUT é chamado em validacao-ingrediente.js ===================== //
function postJson() {
    // seleciona o formulario, vai ser enviado serializado em 'data'
    var form = $('#form-addIngrediente');
    console.log(form.serialize())
    // pega id do ingrediente (se vazio = POST, se tem algo = PUT)
    var id = $('.id').val();

    // serializa o formulario
    var formArray = form.serializeArray();

    if (typeof id === 'undefined') {
        var urlData = "http://localhost:8000/api/ingredientes/create/";
    } else {
        var urlData = "http://localhost:8000/api/ingredientes/edit/" + id + "";

        $.each(jsonIngrediente, function (indexIngrediente, valIngrediente) {
            if (valIngrediente.id_ingrediente == id) {
                formArray.push({
                    name: 'valor_ingrediente',
                    value: '' + valIngrediente.valor_ingrediente + ''
                }, {
                    name: 'quantidade_estoque_ingrediente',
                    value: '' + valIngrediente.quantidade_estoque_ingrediente + ''
                })
            }
        })
    }
    console.log(form.serializeArray())
    $.ajax({
        type: "POST",
        url: urlData,
        dataType: "json",
        // contentType: "application/json; charset=utf-8",
        // headers: { "X-HTTP-Method-Override": "PUT" },
        data: formArray,
        success: function () {
            $('.aulas').modal("hide");
            swal({
                    title: "Sucesso!",
                    text: "Ingrediente incluido com sucesso!",
                    type: "success"
                },
                function () {
                    location.reload();
                }
            )
        },
        error: function () {
            $('#mensagens-erro').append('Problemas no cadastro do ingrediente');
        }
    });
};

// ===================== DELETE ===================== //
$('.lista-ingredientes').on('click', '.excluir_ing', function () {
    // seleciona a 'tr' do ingrediente especifico
    var thisTr = $(this).closest('tr');
    // pega a id do ingrediente localizado no html
    var idData = thisTr.data('id');
    excluir_ingrediente(idData, thisTr);
});

$('#listaSearch').on('click', '.excluir_ing', function () {
    // seleciona a 'tr' do ingrediente especifico
    var thisTr = $(this).closest('tr');
    // pega a id do ingrediente localizado no html
    var idData = thisTr.data('id');
    excluir_ingrediente(idData, thisTr);
})

function excluir_ingrediente(idData, thisTr) {
    swal({
            title: "Tem certeza que deseja deletar este ingrediente?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Deletar!",
            closeOnConfirm: false,
        },
        function () {
            $.ajax('http://localhost:8000/api/ingredientes/delete/' + idData + '', {
                type: 'DELETE',
                data: {
                    "id_ingrediente": idData
                },
                dataType: 'json',
                success: function () {
                    swal({
                            title: "Ingrediente removido com sucesso!",
                            type: "success",
                        }),
                        // remove o ingrediente da lista no html
                        $(thisTr).remove();
                },
                error: function () {
                    swal({
                        title: "Problemas ao remover o ingrediente",
                        type: "error",
                    })
                },
            })
        }
    )
}