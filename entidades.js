const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
let gameOver = false;

const obstaculos = [];
let frameCount = 0;
let pontos = 0;
let pontuacaoMaisAlta = 0;

const backgroundImage = new Image();
backgroundImage.src = 'https://acdn-us.mitiendanube.com/stores/963/751/products/casa-da-barbie-editadosite1-e466d9ce5e7e7edd8d16901530882090-1024-1024.png';

const personagemImage = new Image();
personagemImage.src = './image.png';

document.addEventListener('keypress', (e) => {
    if (e.code == 'Space' && personagem.pulando == false && !gameOver) {
        personagem.saltar();
    } else if (e.code == 'Space' && gameOver) {
        reiniciarJogo();
    }
});

class Entidade {
    #gravidade;
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this._largura = largura;
        this._altura = altura;
        this.#gravidade = 1; // Aumenta a gravidade para cair mais rápido
    }
    get gravidade() {
        return this.#gravidade;
    }

    get largura() {
        return this._largura;
    }

    get altura() {
        return this._altura;
    }

    desenhar(cor) {
        ctx.fillStyle = cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

class Personagem extends Entidade {
    #pulando;
    #velocidadey;
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.#pulando = false;
        this.#velocidadey = 0;
    }
    saltar() {
        this.#velocidadey = 20; // Aumenta a velocidade inicial do pulo
        this.#pulando = true;
    }
    get pulando() {
        return this.#pulando;
    }
    set pulando(valor) {
        this.#pulando = valor;
    }
    get velocidadey() {
        return this.#velocidadey;
    }
    set velocidadey(valor) {
        this.#velocidadey = valor;
    }
    atualizarPersonagem() {
        if (this.pulando) {
            this.velocidadey -= this.gravidade;
            this.y -= this.velocidadey;
            if (this.y >= canvas.height - 100) {
                this.velocidadey = 0;
                this.pulando = false;
                this.y = canvas.height - 100;
            }
        }
    }
    desenhar() {
        ctx.drawImage(personagemImage, this.x, this.y, this.largura, this.altura);
    }
}

class Obstaculo extends Entidade {
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
    }
    atualizarObstaculo() {
        this.x -= 5;
    }
}

const personagem = new Personagem(100, canvas.height - 100, 100, 100);

function gerarObstaculo() {
    const altura = Math.random() * 50 + 20; // Altura aleatória
    const obstaculo = new Obstaculo(canvas.width, canvas.height - altura, 30, altura);
    obstaculos.push(obstaculo);
}

function detectarColisao(obstaculo) {
    return (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    );
}

function atualizarObstaculos() {
    for (let i = obstaculos.length - 1; i >= 0; i--) {
        obstaculos[i].atualizarObstaculo();
        obstaculos[i].desenhar('#FF1493');

        if (detectarColisao(obstaculos[i])) {
            gameOver = true;
            ctx.fillStyle = 'pink';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#FF1493';
            ctx.font = '48px serif';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
            return;
        }

        if (obstaculos[i].x + obstaculos[i].largura < 0) {
            obstaculos.splice(i, 1);
            pontos++;
            if (pontos > pontuacaoMaisAlta) {
                pontuacaoMaisAlta = pontos;
            }
        }
    }
}

function reiniciarJogo() {
    gameOver = false;
    obstaculos.length = 0;
    frameCount = 0;
    pontos = 0;
    personagem.x = 100;
    personagem.y = canvas.height - 100;
    personagem.velocidadey = 0;
    personagem.pulando = false;
    loop();
}

function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        personagem.desenhar();
        personagem.atualizarPersonagem();
        atualizarObstaculos();

        ctx.fillStyle = '#FF1493';
        ctx.font = '24px serif';
        ctx.textAlign = 'center'; // Centraliza o texto
        ctx.fillText(`Pontuação: ${pontos}`, canvas.width / 2, 30); // Reposiciona a pontuação
        ctx.fillText(`Pontuação Mais Alta: ${pontuacaoMaisAlta}`, canvas.width / 2, 60); // Reposiciona a pontuação mais alta

        frameCount++;
        if (frameCount % 100 === 0) { // Diminui o intervalo para gerar mais obstáculos
            gerarObstaculo();
        }

        requestAnimationFrame(loop);
    }
}

loop();
