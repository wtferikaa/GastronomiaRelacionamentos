function listarReceitas() {
    $.ajax({
        type: 'GET',
        url: 'http://jsonstub.com/receita/lista',
        contentType: 'application/json',
        beforeSend: function (request) {
            request.setRequestHeader('JsonStub-User-Key', 'a4ed75a2-3733-4107-aacb-68a12165b258');
            request.setRequestHeader('JsonStub-Project-Key', '322cfc5d-3c67-40a3-bb76-d4d40e59d94a');
        }
    }).done(function (data) {
        alert(JSON.stringify(data, null, 4));
        
    });
}


