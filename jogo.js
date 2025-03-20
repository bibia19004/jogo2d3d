// Pegar o elemento canvas pelo id
const canvas = document.getElementById('jogo2D');
// Inicializar o canvas
const ctx = canvas.getContext('2d');
const gravidade = 0.4;
let gameOver = false;

// Objeto do personagem
const personagem = {
    x: 100,
    y: canvas.height - 50,
    altura: 50,
    largura: 50,
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

// Função de reiniciar o jogo
function reiniciarJogo() {
    personagem.x = 100;
    personagem.y = canvas.height - 50;
    personagem.velocidadey = 0;
    personagem.pulando = false;

    obstaculo.x = canvas.width - 50;
    obstaculo.y = canvas.height - 100;
    obstaculo.largura = 50;
    obstaculo.altura = 100;
    obstaculo.velocidadex = 3;

    gameOver = false;
    loop();  // Iniciar o loop de animação
}

// Adicionar evento de tecla pressionada
document.addEventListener('keypress', (e) => {
    if (e.code == 'Space') {
        if (gameOver) {
            // Reiniciar o jogo ao pressionar 'espaço' após Game Over
            reiniciarJogo();
        } else if (personagem.pulando == false) {
            // Fazer o personagem pular
            console.log('clicou para pular');
            personagem.velocidadey = 15;
            personagem.pulando = true;
        }
    }
});

// Funções do personagem
function desenharPersonagem() {
    ctx.fillStyle = 'magenta';
    ctx.fillRect(personagem.x, personagem.y, personagem.largura, personagem.altura);
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
    ctx.fillStyle = 'red';
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
}

function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidadex;
    if (obstaculo.x <= 0 - obstaculo.largura) {
        obstaculo.x = canvas.width;
        obstaculo.velocidadex += 0.2;
        let nova_altura = (Math.random() * 50) + 100;
        obstaculo.altura = nova_altura;
        obstaculo.y = canvas.height - nova_altura;
    }
}

// Função para detectar colisão
// ...existing code...

// Variável para armazenar a pontuação
// Variável para armazenar a pontuação
let pontos = 0;
// Variável para armazenar a maior pontuação
let maiorPontuacao = 0;

// Função para detectar colisão
function detectarColisao() {
    if (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        gameOver = true;
        // Atualiza a maior pontuação se a pontuação atual for maior
        if (pontos > maiorPontuacao) {
            maiorPontuacao = pontos;
        }
    } else if (personagem.x > obstaculo.x + obstaculo.largura) {
        // Incrementa a pontuação se o personagem passar o obstáculo
        pontos++;
        // Move o obstáculo para fora da tela para ser reposicionado
        obstaculo.x = -obstaculo.largura;
    }
}

// Função para mostrar "Game Over"
function mostrarGameOver() {
    ctx.fillStyle = 'black';
    ctx.font = '50px Arial';
    ctx.fillText('GAME OVER', canvas.width / 2 - 150, canvas.height / 2);
    ctx.font = '30px Arial';
    ctx.fillText('Pressione Espaço para reiniciar', canvas.width / 2 - 180, canvas.height / 2 + 50);
}

// Função para mostrar a pontuação
function mostrarPontos() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Pontos: ' + pontos, 10, 20);
    ctx.fillText('Maior Pontuação: ' + maiorPontuacao, 10, 50);
}

// Função do loop principal
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
        desenharPersonagem();
        desenharObstaculo();
        atualizarPersonagem();
        atualizarObstaculo();
        detectarColisao();
        mostrarPontos(); // Mostrar a pontuação
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

// Iniciar o jogo chamando a função loop ao carregar a página
reiniciarJogo();
