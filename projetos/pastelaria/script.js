let produtos = [
    { nome: "Pastel de Carne", preco: 6.00, imagem: "imgs/pastel_de_carne.png" },
    { nome: "Pastel de Frango", preco: 5.50, imagem: "imgs/pastel_de_frango.jpg" },
    { nome: "Pastel de Queijo", preco: 5.00, imagem: "imgs/pastel_de_queijo.jpg" },
    { nome: "Coxinha", preco: 3.50, imagem: "imgs/coxinha.webp" },
    { nome: "Empada de Frango", preco: 4.00, imagem: "imgs/empada_de_frango.jpg" },
    { nome: "Refrigerante", preco: 3.00, imagem: "imgs/refri.jpg" }
];

let carrinho = [];
let total = 0;

function exibirProdutos() {
    let produtosDiv = document.getElementById("produtos");
    produtosDiv.innerHTML = "";
    produtos.forEach((produto, index) => {
        let div = document.createElement("div");
        div.classList.add("produto");
        div.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <p>${produto.nome} - R$ ${produto.preco.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${index})">Adicionar</button>
        `;
        produtosDiv.appendChild(div);
    });
}

function adicionarAoCarrinho(index) {
    let quantidade = parseInt(prompt(`Quantos ${produtos[index].nome} deseja?`));
    if (!isNaN(quantidade) && quantidade > 0) {
        let itemExistente = carrinho.find(item => item.nome === produtos[index].nome);
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            carrinho.push({
                nome: produtos[index].nome,
                preco: produtos[index].preco,
                quantidade: quantidade
            });
        }
        calcularTotal();
    } else {
        alert("Quantidade inválida!");
    }
}

function calcularTotal() {
    total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    document.getElementById("total").innerText = total.toFixed(2);
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    
    let taxa = confirm("Deseja adicionar uma taxa de 10% ao valor final?") ? 0.10 : 0;
    let totalComTaxa = total + (total * taxa);
    
    let recibo = "--- Recibo da Pastelaria e cia ---\n";
    carrinho.forEach(item => {
        recibo += `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });
    recibo += `------------------------------\nTotal: R$ ${total.toFixed(2)}\n`;
    if (taxa > 0) {
        recibo += `Taxa Garçom Atendimento (10%): R$ ${(total * 0.10).toFixed(2)}\n`;
    }
    recibo += `Total Final: R$ ${totalComTaxa.toFixed(2)}\n`;
    alert(recibo);
    
    novoPedido();
}

function novoPedido() {
    carrinho = [];
    total = 0;
    document.getElementById("total").innerText = total.toFixed(2);
}

exibirProdutos();
