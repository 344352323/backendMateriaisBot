export default class Materiais{

    #codigo;
    #valor;
    #descricao;
    #urlImagem;

    constructor(codigo, descricao = [], valor, urlImagem){

        this.#codigo = codigo;
        this.#valor = valor;
        this.#descricao = descricao;
        this.#urlImagem = imagem;
    }

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get valor(){
        return this.#valor;
    }

    set valor(novoValor){
        this.#valor = novoValor;
    }

    get descricao(){
        return this.#descricao;
    }

    set valor(novaDescricao){
        this.#descricao = novaDescricao;
    }

    get urlImagem(){
        return this.#urlImagem;
    }

    set urlImagem(novaImagem){
        this.#urlImagem = novaImagem;
    }

    toJSon(){
        return {
            'codigo' : this.#codigo,
            'valor' : this.#valor,
            'descricao' : this.#descricao,
            'urlImagem' : this.#urlImagem
        }
    }
}