function pegarCep(cep) {
    fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
        .then(res => {
            res.json().then(res => {
                if (res.erro) {
                    inputCep.value = "Inválido";
                } else {
                    inputLogradouro.value = res.logradouro;
                    inputCidade.value = res.localidade;
                    inputBairro.value = res.bairro;
                    inputUf.value = res.uf;

                    inputLogradouro.setAttribute("disabled", true);
                    inputCidade.setAttribute("disabled", true);
                    inputBairro.setAttribute("disabled", true);
                    inputUf.setAttribute("disabled", true);
                }
            })
        });
}

function mascararCep(cep) {
    var inputLength = cep.value.length;

    if (inputLength == 5) {
        cep.value += "-";
    }
}

function cadastrarEndereco() {
    var nomeFilial = inputNomeFilial.value;
    var cep = inputCep.value;
    var isCepValid = (/^[0-9]{5}-[0-9]{3}$/).test(cep);
    var logradouro = inputLogradouro.value;
    var cidade = inputCidade.value;
    var bairro = inputBairro.value;
    var complemento = inputComplemento.value;
    var uf = inputUf.value;

    if (nomeFilial == "") inputNomeFilial.classList.add("error");  
    if (!isCepValid) inputCep.classList.add("error");
    if (logradouro == "") inputLogradouro.classList.add("error");
    if (cidade == "") inputCidade.classList.add("error");
    if (bairro == "") inputBairro.classList.add("error");
    if (uf == "") inputUf.classList.add("error");

    if (nomeFilial != "" && isCepValid && logradouro != "" && cidade != "" && bairro != "" && uf != "") {
        fetch(`/empresa/cadastrar-endereco/${idEmpresa}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nomeFilial,
                cepServer: cep,
                logradouroServer: logradouro,
                cidadeServer: cidade,
                bairroServer: bairro,
                complementoServer: complemento,
                ufServer: uf
            })
        }).then(function (resposta) {
            if (resposta.status == 201) {
                inputNomeFilial.value = "";
                inputCep.value = "";
                inputLogradouro.value = "";
                inputCidade.value = "";
                inputBairro.value = "";
                inputComplemento.value = "";
                inputUf.value = "";

                inputNomeFilial.classList.remove("error");
                inputCep.classList.remove("error");
                inputLogradouro.classList.remove("error");
                inputCidade.classList.remove("error");
                inputBairro.classList.remove("error");
                inputUf.classList.remove("error");

                inputLogradouro.removeAttribute("disabled");
                inputCidade.removeAttribute("disabled");
                inputBairro.removeAttribute("disabled");
                inputUf.removeAttribute("disabled");

                abrirModalCadastro();
            }
        });
    }
}

function removerErroInput(input) {
    if (input.value != "") input.classList.remove("error");
}