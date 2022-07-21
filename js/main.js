const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

console.log(itens)

itens.forEach( (elemento) => {
    criaElemento(elemento)
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault() //interrompendo o comportamento padrão, que é enviar os dados do form para outro lugar. Nesse caso queremos que os dados sejam enviados para a própria página.

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value ) // Perguntamos aos itens se o elemento já existe

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id // Se o elemento existir mantém o id que já existe

        atualizaElemento(itemAtual) // Atualiza quantidade do elemento
    
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual // Atualiza o array e o localStorage
    }

    else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0 // Se não existir array o id é 0, se existir ele soma + 1 com o ultimo id criado.

         criaElemento(itemAtual)

         itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens)) //salva na página o novo elemento.
    // JSON.stringify tranforma o objeto em uma string porque o localStorage só aceita string.

    nome.value = "";
    quantidade.value = "";
})

function criaElemento (item) {

    // <li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id //  Insere o id na tag strong

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id)) // Toda vez que um item é criado, o botão deleta também é criado junto.

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

// Deletando itens

function botaoDeleta(id) { // Criando o botão deleta
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id) // this: pra dizer que estou me referindo aquele elemento em específico.
        // parentNode: o botão é filho do li, logo para me referir especificamente ao li precisa usar o parentNode.
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1) // Encontro o elemento que corresponde aquele id

    localStorage.setItem("itens", JSON.stringify(itens))
}