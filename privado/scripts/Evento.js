const formularioEventoo = document.getElementById('formEventoo');
// formularioEventoo.onsubmit = validarFormulario;
window.onload = buscarEventoo; //função está sendo atribuída
document.getElementById('btnRegistrar').addEventListener('click', function(event) {
    event.preventDefault(); // Impede a submissão padrão do formulário
    validarFormulario(event, 'cadastro'); // Chama a função de validação com 'cadastro'
});

document.getElementById('atualizar').addEventListener('click', function(event) {
    event.preventDefault(); // Impede a submissão padrão do formulário
    const codigo = document.getElementById('codigo').value; // Obtém o código do evento
    atualizarEventoo(codigo); // Passa o código como argumento
});

document.getElementById('excluir').addEventListener('click', function(event) {
    event.preventDefault(); // Impede a submissão padrão do formulário
    apagarEventoo(); // Chama a função de exclusão
});



function validarFormulario(evento, operacao = 'atualizacao') {
    if (formularioEventoo.checkValidity()) {
        formularioEventoo.classList.remove('was-validated');
        const cpf = document.getElementById('cpf').value;
        const nome = document.getElementById('nome').value;
        const cantor = document.getElementById('cantor').value;
        const endereco = document.getElementById('endereco').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;
        const uf = document.getElementById('uf').value;
        const telefone = document.getElementById('telefone').value;
        const idade = document.getElementById('idade').value;
        const valor_ingresso = document.getElementById('valor_ingresso').value;
        const email = document.getElementById('email').value;

        const evento = { cpf, nome, cantor, endereco, bairro, cidade, "estado": uf, telefone, idade, valor_ingresso, email };
        
        if (operacao === 'cadastro') {
            cadastrarEventoo(evento);
        } else if (operacao === 'atualizacao') {
            return evento; // Retorna o objeto evento para ser usado na atualização
        }
    }
    else {
        formularioEventoo.classList.add('was-validated'); //faz o bootstrap exibir mensagem de validação
        return false; // Indica que a validação falhou
    }
}

function cadastrarEventoo(evento) {
    fetch('http://localhost:3000/eventoo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(evento)
    })
        .then((resposta) => {
            return resposta.json();
        })
        .then((dados) => {
            if (dados.status) {
                formularioEventoo.reset();
                mostrarMensagem(dados.mensagem, true);
                buscarEventoo();
            }
            else {
                mostrarMensagem(dados.mensagem, false);
            }

        })
        .catch((erro) => {
            mostrarMensagem(erro.message, false);
        });
}

function buscarEventoo() {
    fetch('http://localhost:3000/eventoo', { method: 'GET' })
        .then((resposta) => {
            return resposta.json();
        })
        .then((dados) => {
            if (Array.isArray(dados)) {
                exibirTabelaEventoo(dados);
            }
            else {
                mostrarMensagem(dados.mensagem, false);
            }
        })
        .catch((erro) => {
            mostrarMensagem(erro.message, false);
        });
}

function mostrarMensagem(mensagem, sucesso = false) {
    const divMensagem = document.getElementById('mensagem');
    if (sucesso) {
        divMensagem.innerHTML = `
        <div class="alert alert-success" role="alert">
        ${mensagem}
        </div>`;
    }
    else {
        divMensagem.innerHTML = `
        <div class="alert alert-danger" role="alert">
        ${mensagem}
        </div>`;
    }

    setTimeout(() => {
        divMensagem.innerHTML = ''
    }, 5000);
}

function exibirTabelaEventoo(listaEventoo) {
    const espacoTabela = document.getElementById('espacoTabela');
    espacoTabela.innerHTML = '';
    if (Array.isArray(listaEventoo) && listaEventoo.length > 0) {
        const tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover';
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
        <tr>
            <th>#</th>
            <th>CPF</th>
            <th>Nome</th>
            <th>Cantor</th>
            <th>Endereço</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>UF</th>
            <th>Telefone</th>
            <th>Idade</th>
            <th>Valor_ingresso</th>
            <th>E-mail</th>
            <th>Ações</th>
        </tr>
        `;
        tabela.appendChild(cabecalho);
        const corpo = document.createElement('tbody');
        for (let i = 0; i < listaEventoo.length; i++) {
            const eventoo = listaEventoo[i];
            const linha = document.createElement('tr');
            linha.innerHTML = `
            <td>${eventoo.codigo}</td>
            <td>${eventoo.cpf}</td>
            <td>${eventoo.nome}</td>
            <td>${eventoo.cantor}</td>
            <td>${eventoo.endereco}</td>
            <td>${eventoo.bairro}</td>
            <td>${eventoo.cidade}</td>
            <td>${eventoo.estado}</td>
            <td>${eventoo.telefone}</td>
            <td>${eventoo.idade}</td>
            <td>${eventoo.valor_ingresso}</td>
            <td>${eventoo.email}</td>
            <td>
            <button type="button" onclick="prepararEventoo('${eventoo.codigo}', '${eventoo.cpf}', '${eventoo.nome}', '${eventoo.cantor}', '${eventoo.endereco}', '${eventoo.bairro}', '${eventoo.cidade}', '${eventoo.estado}', '${eventoo.telefone}', '${eventoo.idade}', '${eventoo.valor_ingresso}', '${eventoo.email}')">Editar</button>
            </td>`;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        espacoTabela.appendChild(tabela);
    } else {
        espacoTabela.innerHTML = '<p>Nenhum Evento Encontrado</p>';
    }
}


function prepararEventoo(codigo, cpf, nome, cantor, endereco, bairro, cidade, uf, telefone, idade, valor_ingresso, email) {
    
    document.getElementById('codigo').value = codigo;
    document.getElementById('cpf').value = cpf;
    document.getElementById('nome').value = nome;
    document.getElementById('cantor').value = cantor;
    document.getElementById('endereco').value = endereco;
    document.getElementById('bairro').value = bairro;
    document.getElementById('cidade').value = cidade;
    document.getElementById('uf').value = uf;
    document.getElementById('telefone').value = telefone;
    document.getElementById('idade').value = idade;
    document.getElementById('valor_ingresso').value = valor_ingresso;
    document.getElementById('email').value = email;
}

function apagarEventoo() {
    const codigo = document.getElementById('codigo').value; // obtém o código do evento
    if (confirm("Confirma a exclusão do Evento?")) {
        fetch(`http://localhost:3000/eventoo/${codigo}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        .then((resposta) => {
            if (!resposta.ok) {
                return resposta.text().then(text => {
                    throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText} ${text}`);
                });
            }
            return resposta.json();
        })
        .then((dados) => {
            if (dados && dados.mensagem) {
                mostrarMensagem(dados.mensagem, true);
            } else {
                mostrarMensagem("Ocorreu um erro ao processar a solicitação.", false);
            }
            buscarEventoo(); // atualiza a lista após a exclusão
        })
        .catch((erro) => {
            mostrarMensagem(erro.message, false);
        });
    } else {
        prepararEventoo(); // limpa o formulário de edição
    }
}

function atualizarEventoo(codigo) {
    if (confirm("Confirma atualização do Evento?")) {
        const eventoo = validarFormulario(null, 'atualizacao');
        if (eventoo) {
            fetch(`http://localhost:3000/eventoo/${codigo}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventoo)
            })
            .then((resposta) => {
                if (!resposta.ok) {
                    return resposta.text().then(text => {
                        throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText} ${text}`);
                    });
                }
                return resposta.json();
            })
            .then((dados) => {
                console.log(dados); // Adicione esta linha para verificar a resposta do servidor
                if (dados && dados.mensagem) {
                    mostrarMensagem(dados.mensagem, true);
                } else {
                    mostrarMensagem("Ocorreu um erro ao processar a solicitação.", false);
                }
                buscarEventoo();
            })
            .catch((erro) => {
                mostrarMensagem(erro.message, false);
            });
        } else {
            mostrarMensagem("Favor, informar corretamente os dados do Evento!", false);
        }
    }
}
