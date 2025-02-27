const buttonsproduto = document.querySelectorAll('.produto');
const modal = document.getElementById('produtoModal');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const modalImage = document.getElementById('modalImage');
const maisbtn = document.getElementById('maisbtn');
const menosbtn = document.getElementById('menosbtn');
const buttonAddModal = document.getElementById('add');
const modalcart = document.getElementById('myCartModal')
const cartItemsContainer = document.getElementById('cartItems'); // Div para exibir itens no carrinho
const totalPriceElement = document.getElementById('totalPrice'); // Elemento para exibir o valor total do carrinho
const addToCartModal = document.getElementById('addToCartModal');
//PopUp quantidade no carrinho 
let quantidade = 1; 
let produtoPrice = 0;
let cart = [];

// Função para atualizar a quantidade no modal
function updateQuantia() {
    document.getElementById('quantidade').innerText = quantidade;
}

// Função para clicar no botão add
function addClick() {
    if(quantidade < 1) {
        buttonAddModal.style.pointerEvents = "none"
    } else {
        buttonAddModal.style.pointerEvents = "auto"
    }
}

// Função para adicionar ao carrinho (log)
function addToCart() {
    // Criar um objeto com os dados do produto
    const produto = {
        nome: modalName.innerText,  // Pegando o texto do modalName
        preco: parseFloat(modalPrice.innerText.replace("R$ ", "").replace(",", ".")),
        quantidade: quantidade
    };

    // Verificar se o produto já existe no carrinho
    const produtoExistente = cart.find(item => item.nome === produto.nome);

    if (produtoExistente) {
        // Se o produto já existe, somar as quantidades
        produtoExistente.quantidade += produto.quantidade;
    } else {
        // Se o produto não existe, adicionar ao carrinho
        cart.push(produto);
    }

    updateCartModal();
    showAddToCartModal();

    // Fechar o modal do produto
    modal.close(); // Fecha o modal de produto
    // Exibir no console o conteúdo do carrinho
    console.log('Carrinho:', cart);
}

// Função para adicionar ao carrinho (log)
function addToCart() {
    // Criar um objeto com os dados do produto
    const produto = {
        nome: modalName.innerText,  // Pegando o texto do modalName
        preco: produtoPrice,  // Usando o preço fixo do data-price
        quantidade: quantidade
    };

    // Verificar se o produto já existe no carrinho
    const produtoExistente = cart.find(item => item.nome === produto.nome);

    if (produtoExistente) {
        // Se o produto já existe, somar as quantidades
        produtoExistente.quantidade += produto.quantidade;
    } else {
        // Se o produto não existe, adicionar ao carrinho
        cart.push(produto);
    }

    updateCartModal();
    showAddToCartModal();
    // Exibir no console o conteúdo do carrinho
}
// Função para remover um item do carrinho
function removeFromCart(index) {
    // Remove o item pelo índice
    cart.splice(index, 1);

    // Atualiza o modal após a remoção
    updateCartModal();
}

// Função para atualizar o conteúdo do modal do carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = '';  // Limpar o conteúdo atual
    let totalCarrinho = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');

            const totalPrice = item.preco * item.quantidade; // Calculando o preço total
            totalCarrinho += totalPrice;

            // HTML de cada item com botão de remoção
            cartItemDiv.innerHTML = `
                <p>${item.quantidade + "x"}</p>
                <p>${item.nome}</p>
                <p>R$${item.preco.toFixed(2)}</p>
                <button class="remove-btn" data-index="${index}">Remover</button>
            `;

            // Adiciona o item ao container
            cartItemsContainer.appendChild(cartItemDiv);

            // Adiciona o evento de remoção
            const removeButton = cartItemDiv.querySelector('.remove-btn');
            removeButton.addEventListener('click', () => removeFromCart(index));
        });
    }

    // Adicionar o total do carrinho ao final
    const totalCarrinhoElement = document.createElement('div');
    totalCarrinhoElement.classList.add('total-carrinho');
    totalCarrinhoElement.innerHTML = `
        <p><strong>Total:</strong> R$ ${totalCarrinho.toFixed(2)}</p>
    `;
    cartItemsContainer.appendChild(totalCarrinhoElement);
}

// Função para atualizar o valor total no modal
function updateValor() {
    const totalPrice = produtoPrice * quantidade;
    modalPrice.innerText = `R$ ${totalPrice.toFixed(2)}`;
}

// Função para atualizar a cor do button add
function updateButtonColor () {
        buttonAddModal.style.backgroundColor = "#da20a5";
};
// Função para atualizar o carri
// Adiciona um ouvinte de evento para cada botão de produto
buttonsproduto.forEach(button => {
    button.addEventListener('click', () => {
        // Obter as informações de cada produto
        const produtoName = button.getAttribute('data-name');
        produtoPrice = parseFloat(button.getAttribute('data-price')); // Definindo o preço do produto
        const produtoImage = button.querySelector('img').src;

        // Atualizar o modal com o nome, preço e imagem do produto
        modalName.innerText = produtoName;
        modalPrice.innerText = `R$ ${produtoPrice.toFixed(2)}`; // Atualiza o preço inicial
        modalImage.src = produtoImage;

        // Reiniciar a quantidade
        quantidade = 1;
        updateQuantia();
        updateValor();
        addClick();
       
        buttonAddModal.addEventListener('click', addToCart);

        // Abrir o modal
        modal.showModal();
    });
});

// Função para exibir o modal de "Item adicionado ao carrinho"
function showAddToCartModal() {
    addToCartModal.classList.add('show');  // Adiciona a classe para mostrar o modal
    modal.close();
    // Esconde o modal após 2 segundos
    setTimeout(() => {
        addToCartModal.classList.remove('show');
    }, 2000); // 2000ms = 2 segundos
    buttonAddModal.style.backgroundColor = "";
}


// Fechar o produtomodal
const closeModal = document.getElementById('close-modal');
closeModal.addEventListener('click', () => {
    modal.close();
    quantidade = 1;
    updateQuantia();
    updateValor();
    updateButtonColor();
    addClick();
});

// Fechar o modal quando pressionar 'Escape'
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        modal.close();
        quantidade = 1;
        updateQuantia();
        updateValor();
        updateButtonColor();
        addClick();
    }
});

// Aumentar a quantidade
maisbtn.addEventListener('click', () => {
    quantidade += 1;
    updateQuantia();
    updateValor();
    updateButtonColor();
    addClick();
});

// Diminuir a quantidade
menosbtn.addEventListener('click', () => {
    if (quantidade > 1) { // Impede que a quantidade seja menor que 1
        quantidade -= 1;
        updateQuantia();
        updateValor();
        updateButtonColor();
        addClick();
    }
});