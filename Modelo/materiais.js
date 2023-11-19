export default class Materiais{

    #codigo;
    #quantidade;
    #valor;
    #descricao;

    constructor(codigo, quantidade, valor, descricao = []){

        this.#codigo = codigo;
        this.#quantidade = quantidade;
        this.#valor = valor;
        this.#descricao = descricao;
    }

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get quantidade(){
        return this.#quantidade;
    }

    set quantidade(novaQuantidade){
        this.#quantidade = novaQuantidade;
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

    toJSon(){
        return {
            'codigo' : this.#codigo,
            'quantidade' : this.#quantidade,
            'valor' : this.#valor,
            'descricao' : this.#descricao
        }
    }
}