const canvas = document.getElementById('jogo2D')
const ctx = canvas.getContext('2d')
let gameOver = false

const obstaculos = [];
let frameCount = 0;

document.addEventListener('keypress', (e) => {
    if(e.code == 'Space' && personagem.pulando == false && !gameOver) {
        console.log('clicou para pular')
        personagem.saltar()
    }
})


class Entidade {
    #gravidade
    constructor (x, y, largura, altura){
        this.x = x;
        this.y = y;
        this._largura = largura;
        this._altura = altura;
        this.#gravidade = 0.5
    }
    get gravidade(){
        return this.#gravidade
    }

    get largura() {
        return this._largura;
    }

    get altura() {
        return this._altura;
    }

    desenhar = function (cor){
        ctx.fillStyle = cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

class Personagem extends Entidade{
    #pulando
    #velocidadey 
    constructor(x, y, largura, altura){
        super(x, y, largura, altura) 
        this.#pulando= false
        this.#velocidadey = 0
    }
    saltar = function (){
        this.#velocidadey = 15
        this.#pulando = true
        console.log('saltou')
    }
    get pulando () {
        return this.#pulando
    }
    set pulando (valor) {
        this.#pulando = valor
    }
    get velocidadey () {
        return this.#velocidadey
    }
    set velocidadey (valor) {
        this.#velocidadey = valor
    }
    atualizarPersonagem = function () {
        if (this.pulando) {
            this.velocidadey -= this.gravidade
            this.y -= this.velocidadey
            if (this.y >= canvas.height-50) {
                this.velocidadey = 0
                this.pulando = false
                this.y = canvas.height-50
            }
        }
    }
}

class Obstaculo extends Entidade{
    constructor (x, y, largura, altura){
        super(x, y, largura, altura)
    }
    atualizarObstaculo() {
        this.x -= 5;
    }
}

const personagem = new Personagem (100, canvas.height - 50, 50 ,50)

function gerarObstaculo() {
    const obstaculo = new Obstaculo(canvas.width, canvas.height - 50, 30, 50);
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
        obstaculos[i].desenhar('Red');

        if (detectarColisao(obstaculos[i])) {
            gameOver = true;
            alert('Game Over!');
            return;
        }

        if (obstaculos[i].x + obstaculos[i].largura < 0) {
            obstaculos.splice(i, 1);
        }
    }
}

function loop () {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        personagem.desenhar('Black')
        personagem.atualizarPersonagem()
        atualizarObstaculos();

        frameCount++;
        if (frameCount % 100 === 0) {
            gerarObstaculo();
        }

        requestAnimationFrame(loop);
    }
}

loop();