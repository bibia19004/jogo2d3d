//pegar o elemento canvas pelo id
const canvas = document.getElementById('jogo2D')
//inicializar o canvas
const ctx = canvas.getContext('2d')
const gravidade = 0.4
let gameOver = false;

document.addEventListener('keypress', (e) => {
    if(e.code == 'Space' && personagem.pulando == false && !gameOver) {
        console.log('clicou para pular')
        personagem.velocidadey = 15
        personagem.pulando = true
    }
})

const personagem = {
    x: 100,
    y: canvas.height - 50,
    altura: 50,
    largura: 50,
    velocidadey: 0,
    pulando: false
}

function desenharPersonagem () {
    ctx.fillStyle = 'magenta'
    ctx.fillRect(personagem.x, personagem.y, personagem.largura, personagem.altura)
}

function atualizarPersonagem () {
    if (personagem.pulando) {
        personagem.velocidadey -= gravidade
        personagem.y -= personagem.velocidadey
        if (personagem.y >= canvas.height - personagem.altura) {
            personagem.velocidadey = 0
            personagem.pulando = false
            personagem.y = canvas.height - personagem.altura
        }
    }
}

const obstaculo = {
    x: canvas.width - 50,
    y: canvas.height - 100,
    largura: 50,
    altura: 100,
    velocidadex: 3
}

function desenharObstaculo () {
    ctx.fillStyle = 'red'
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura)
}

function atualizarObstaculo () {
    obstaculo.x -= obstaculo.velocidadex
    if(obstaculo.x <= 0 - obstaculo.largura){
        obstaculo.x = canvas.width
        obstaculo.velocidadex += 0.2
        let nova_altura = (Math.random() * 50) + 100
        obstaculo.altura = nova_altura
        obstaculo.y = canvas.height - nova_altura
    }
}

function detectarColisao() {
    if (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        gameOver = true;
    }
}

function mostrarGameOver() {
    ctx.fillStyle = 'black';
    ctx.font = '50px Arial';
    ctx.fillText('GAME OVER', canvas.width / 2 - 150, canvas.height / 2);
}

//criar a função loop
function loop () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
        desenharPersonagem();
        desenharObstaculo();
        atualizarPersonagem();
        atualizarObstaculo();
        detectarColisao();
        requestAnimationFrame(loop);
    } else {
        mostrarGameOver();
    }
}

loop();
