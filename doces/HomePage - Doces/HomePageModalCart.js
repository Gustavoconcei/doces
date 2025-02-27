// Seleciona o botão e o modal
const openCartButton = document.getElementById('mycartbtn');
const myCartModal = document.getElementById('myCartModal');
const closeCartModal = document.getElementById('closecartmodal');

// Adiciona o evento de clique para abrir o modal
openCartButton.addEventListener('click', function() {
    myCartModal.style.display = 'block'; // Exibe o modal
    setTimeout(function() {
        myCartModal.classList.add('activated'); // Ativa a animação de subir
    }, 10); // Espera um pequeno tempo para garantir que o modal apareceu antes de aplicar a animação
});

// Adiciona o evento de clique para fechar o modal
closeCartModal.addEventListener('click', function() {
    myCartModal.classList.remove('activated'); // Remove a animação de subir
    setTimeout(function() {
        myCartModal.style.display = 'none'; // Esconde o modal após a animação
    }, 1000); // Aguarda o tempo da transição antes de esconder o modal
});



