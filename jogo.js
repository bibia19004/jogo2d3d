// Pegar o elemento canvas pelo id
const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
const gravidade = 0.3;
let gameOver = false;

// Carregar imagem de fundo
const fundo = new Image();
fundo.src = 'https://st4.depositphotos.com/8692642/25395/i/450/depositphotos_253959628-stock-photo-pink-glitter-texture-abstract-background.jpg';

// Carregar imagem do personagem
const personagemImg = new Image();
personagemImg.src = 'https://www.imagenspng.com.br/wp-content/uploads/2023/07/barbie-png-17.png';

// Objeto do personagem
const personagem = {
    x: 100,
    y: canvas.height - 130,
    largura: 100,  // Aumentado para 80px
    altura: 130,  // Aumentado para 130px
    velocidadey: 0,
    pulando: false
};

// Objeto do obstáculo
const obstaculo = {
    x: canvas.width - 50,
    y: canvas.height - 100,
    largura: 50,
    altura: 100,
    velocidadex: 3
};

// Variáveis de pontuação
let pontos = 0;
let maiorPontuacao = 0;

// Evento de tecla pressionada
document.addEventListener('keypress', (e) => {
    if (e.code == 'Space') {
        if (gameOver) {
            reiniciarJogo();
        } else if (!personagem.pulando) {
            personagem.velocidadey = 15;
            personagem.pulando = true;
        }
    }
});

// Funções do personagem
function desenharPersonagem() {
    ctx.drawImage(personagemImg, personagem.x, personagem.y, personagem.largura, personagem.altura);
}

function atualizarPersonagem() {
    if (personagem.pulando) {
        personagem.velocidadey -= gravidade;
        personagem.y -= personagem.velocidadey;
        if (personagem.y >= canvas.height - personagem.altura) {
            personagem.velocidadey = 0;
            personagem.pulando = false;
            personagem.y = canvas.height - personagem.altura;
        }
    }
}

// Funções do obstáculo
function desenharObstaculo() {
    ctx.fillStyle = 'rgb(156, 48, 66)';
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
}

function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidadex;
    if (obstaculo.x <= -obstaculo.largura) {
        obstaculo.x = canvas.width;
        obstaculo.velocidadex += 0.01;
        let nova_altura = (Math.random() * 50) + 100;
        obstaculo.altura = nova_altura;
        obstaculo.y = canvas.height - nova_altura;
        pontos++;
    }
}

// Função para detectar colisão
function detectarColisao() {
    if (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        gameOver = true;
        if (pontos > maiorPontuacao) {
            maiorPontuacao = pontos;
        }
    }
}

// Função para mostrar "Game Over"
function mostrarGameOver() {
    ctx.fillStyle = 'rgb(241, 95, 120)';
    ctx.font = '50px Arial';
    ctx.fillText('GAME OVER', canvas.width / 2 - 150, canvas.height / 2);
    ctx.font = '30px Arial';
    ctx.fillText('Pressione Espaço para reiniciar', canvas.width / 2 - 180, canvas.height / 2 + 50);
}

// Função para mostrar a pontuação
function mostrarPontos() {
    ctx.fillStyle = 'rgb(241, 95, 120)';
    ctx.font = '20px Arial';
    ctx.fillText('Pontos: ' + pontos, 10, 20);
    ctx.fillText('Maior Pontuação: ' + maiorPontuacao, 10, 50);
}

// Função do loop principal
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar o fundo
    ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height);

    if (!gameOver) {
        desenharPersonagem();
        desenharObstaculo();
        atualizarPersonagem();
        atualizarObstaculo();
        detectarColisao();
        mostrarPontos();
    } else {
        mostrarGameOver();
    }

    requestAnimationFrame(loop);
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    pontos = 0;
    gameOver = false;
    obstaculo.x = canvas.width;
    loop();
}

// Iniciar o jogo quando as imagens forem carregadas
fundo.onload = personagemImg.onload = function () {
    reiniciarJogo();
};
