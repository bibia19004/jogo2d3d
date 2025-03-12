const canvas = document.getElementById('jogo2D')
const ctx = canvas.getContext('2d')
let gameOver = false

document.addEventListener('keypress', (e) => {
    if(e.code == 'Space' && Personagem.pulando == false && gameOver) {
        console.log('clicou para pular')
        Personagem.velocidadey = 15
        Personagem.pulando = true
    }
})


class Entidade {
    #gravidade
    constructor (x, y, largura, altura){
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.#gravidade = 0.5
    }
    get gravidade(){
        return this.#gravidade
    }

    desenhar = function (cor){
            ctx.fillStyle = cor
            ctx.fillRect(this.x, this.y, this.largura, this.altura)
        
    }
}
class Personagem extends Entidade{
    constructor(x, y, largura, altura){
        super(x, y, largura, altura)
    }
}
class Obstaculo extends Entidade{
    constructor (x, y, largura, altura){
        super(x,y, largura, altura)
    }
}
const personagem = new Personagem (100, canvas.height - 50, 50 ,50)


function loop () {
    if (gameOver == false) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
        personagem.desenhar('Black')
        //desenharObstaculo();
        //atualizarPersonagem();
        //atualizarObstaculo();
        //detectarColisao();
        //requestAnimationFrame(loop);
        requestAnimationFrame(loop);
    }
}

loop();

const x = new Entidade(10,20,30,50)
console.log(x.gravidade)