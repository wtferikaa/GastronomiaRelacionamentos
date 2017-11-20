$(function listarReceitas() {


    $.getJSON("http://localhost:8000/api/receita/list/",
        function (jsonObjectReceita) {
            console.log(jsonObjectReceita);

            $.getJSON("http://localhost:8000/api/categoria/list/",
                function (jsonObjectCategoria) {
                    console.log(jsonObjectCategoria);

                    // $.getJSON("http://localhost:8000/api/classificacao/list/", data,
                    //     function (jsonObjectClassificacao) {
                            
                    //     }
                    // );
                    $.each(jsonObjectReceita, function (indexReceita, valueReceita) {

                        $.each(jsonObjectCategoria, function (indexCategoria, valueCategoria) {
                            var row = $("<tr />");
                            var buttonEdit = '<td><button type="button" class="btn btn-md" data-toggle="modal" data-target="#editReceita"><i class="fa fa-edit"></i></button></td>';
                            var buttonDelete = '<td><button type="button" id="buttonDeletar" class="btn btn-danger btn-md" ><i class="fa fa-trash-o"></i></button></td>';
                            var buttonView = '<td><button type="button" class="btn btn-default btn-md" data-toggle="modal" data-target="#visualizar"><i class="fa fa-eye" aria-hidden="true"></i></span> Visualizar Receita </button></td>';

                            $("#tableReceitas").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
                            row.append($("<td>" + valueReceita.nome_receita + "</td>"));
                            row.append($("<td>" + valueReceita.descricao_classificacao + "</td>"));
                            row.append($("<td>" + valueCategoria.descricao_categoria + "</td>"));
                            row.append(buttonEdit);
                            row.append(buttonDelete);
                            row.append(buttonView);
                        });
                    });
                });

        });

    // $.ajax({
    //     type: '1GET',
    //     url: 'http://localhost:8000/api/receita/list/',
    //     contentType: 'application/json',
    //     beforeSend: function (request) {
    //         request.setRequestHeader('JsonStub-User-Key', 'a4ed75a2-3733-4107-aacb-68a12165b258');
    //         request.setRequestHeader('JsonStub-Project-Key', '322cfc5d-3c67-40a3-bb76-d4d40e59d94a');
    //     }
    // }).done(function (data) {
    //     $.each(data, function (indexInArray, valueOfElement) {
    //         var row = $("<tr />");
    //         var buttonEdit = '<td><button type="button" class="btn btn-md" data-toggle="modal" data-target="#editReceita"><i class="fa fa-edit"></i></button></td>';
    //         var buttonDelete = '<td><button type="button" id="buttonDeletar" class="btn btn-danger btn-md" ><i class="fa fa-trash-o"></i></button></td>';
    //         var buttonView = '<td><button type="button" class="btn btn-default btn-md" data-toggle="modal" data-target="#visualizar"><i class="fa fa-eye" aria-hidden="true"></i></span> Visualizar Receita </button></td>';

    //         $("#tableReceitas").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    //         row.append($("<td>" + valueOfElement.nome_receita + "</td>"));
    //         row.append($("<td>" + valueOfElement.classificacao + "</td>"));
    //         row.append($("<td>" + valueOfElement.categoria + "</td>"));
    //         row.append(buttonEdit);
    //         row.append(buttonDelete);
    //         row.append(buttonView);
    //     });
    // });
});



$('#tableReceitas').on('click', '#buttonDeletar', function () {
    // swal({
    //     title: "Você tem certeza?",
    //     text: "Após ser deletado, este dado não poderá ser recuperado!",
    //     icon: "warning",
    //     type: "warning",
    //     buttons: true,
    //     dangerMode: true,
    // },
    // function () {
    $.ajax({
        type: 'DELETE',
        url: 'http://jsonstub.com/receita/delete' + id_receita + '',
        contentType: 'application/json',
        data: {
            "id_receita": id_receita
        },
        beforeSend: function (request) {
            request.setRequestHeader('JsonStub-User-Key', 'a4ed75a2-3733-4107-aacb-68a12165b258');
            request.setRequestHeader('JsonStub-Project-Key', '322cfc5d-3c67-40a3-bb76-d4d40e59d94a');
        }
    }).done(function (data) {
        alert(JSON.stringify(data, null, 4));
        $(row).remove();
    });


    // $.ajax('http://localhost:8000/api/ingredientes/delete/' + id_receita + '', {
    //     type: 'DELETE',
    //     data: {
    //         "id_receita": id_receita
    //     },
    //     dataType: 'json',
    //     success: function () {
    //         swal({
    //                 title: "Poof! Deletado com sucesso!",
    //                 type: "success",
    //             }),
    //             // remove o ingrediente da lista no html
    //             $(thisTr).remove();
    //     },
    //     error: function () {
    //         swal({
    //             title: "Problemas ao remover o ingrediente",
    //             type: "error",
    //         })
    //     },
    // })
    //}



    //)


    //     .then((willDelete) => {
    //         if (willDelete) {
    //             swal("Poof! Deletado com sucesso!", {
    //                 icon: "success",
    //             });
    //         } else {
    //             swal("Desistiu de deletar cagão!?");
    //         }
    //     });
});