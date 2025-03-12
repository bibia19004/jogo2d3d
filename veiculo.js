class Veiculo{
    #velocidade
    constructor(tipo, marca, cor, velocidade, passageiros){
        this.tipo = tipo;
        this.marca = marca;
        this.cor = cor;
        this.#velocidade = velocidade;
        this.passageiros = passageiros;
    }
    acelerar = function (){
        this.velocidade += 10
        console.log(`A velocidade do Veiculo é ${this.#velocidade} Km/h`)
        }
    freiar = function (){
        if (this.#velocidade > 0){
            this.#velocidade -= 0.05
            console.log(this.#velocidade)
        }else{
            console.log('o carro ja esta parado')
        }
    }
}
class Aviao extends Veiculo {
    #Mach
    constructor(tipo, marca, cor, velocidade, passageiros, companhia){
        super(tipo, marca, cor, velocidade, passageiros);
        this.companhia = companhia;
        this.#Mach = 0
    }
    acelerar = function (){
        this.#Mach += 10
        console.log(`A velocidade do Aviao é ${this.#Mach} Mach`)
        }
    freiar = function (){
        if (this.#Mach > 0){
            this.#Mach -= 5
            console.log(this.#Mach)
        }else{
            console.log('o Aviao ja esta parado')
        }
    }
    setVelocidade = function (valor){
            this.#Mach = valor
        
    }
    getVelocidade = function () {
        return this.#Mach
    }
}

class Barco extends Veiculo {
    #Noz
    constructor(tipo, marca, cor, velocidade, passageiros, companhia){
        super(tipo, marca, cor, velocidade, passageiros);
        this.companhia = companhia;
        this.#Noz = 0
    }
        acelerar = function (){
            this.#Noz += 10
            console.log(`A velocidade do Barco é ${this.#Noz} Noz`)
            }
        freiar = function (){
            if (this.#Noz > 0){
                this.#Noz -= 5
                console.log(this.#Noz)
            }else{
                console.log('o Barco ja esta parado')
            }
    }
}


const carro = new Veiculo('suv','porsche','rosa',0,0)
const outro_carro = new Veiculo('sedan', 'Fiat', 'Preto', 0, 0)
outro_carro.acelerar()
carro.acelerar()
carro.acelerar()
carro.freiar()
carro.acelerar()
outro_carro.freiar()
const aviao = new Aviao('Comercial', 'boeing', 'branco', 0, 0, 'Gol')
aviao.acelerar()
aviao.freiar()

const barco = new Barco('Comercial', 'Cessna', 'laranja', 0, 0, 'Qatar Airways')
barco.acelerar()
barco.freiar()
aviao.acelerar()
aviao.setVelocidade(50)
console.log(aviao.getVelocidade())