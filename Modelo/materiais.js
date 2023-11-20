import MateriaisDAO from "../Persistencia/materiaisDAO.js";

export default class Materiais{

    #codigo;
    #valor;
    #descricao;
    #urlImagem;

    constructor(codigo, descricao, valor, urlImagem){

        this.#codigo = codigo;
        this.#descricao = descricao;
        this.#valor = valor;
        this.#urlImagem = urlImagem;
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

    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
    }

    get urlImagem(){
        return this.#urlImagem;
    }

    set urlImagem(novaurlImagem){
        this.#urlImagem = novaurlImagem;
    }

    toJSon(){
        return {
            'codigo' : this.#codigo,
            'descricao' : this.#descricao,
            'valor' : this.#valor,
            'urlImagem' : this.#urlImagem
        }
    }

    async gravar(){
        const materiaisDAO = new MateriaisDAO();
        await materiaisDAO.gravar(this);
    }

    async atualizar(){
        const materiaisDAO = new MateriaisDAO();
        await materiaisDAO.atualizar(this);
    }

    async excluir(){
        const materiaisDAO = new MateriaisDAO();
        await materiaisDAO.excluir;
    }

    async consultar(){
        const materiaisDAO = new MateriaisDAO();
        return await materiaisDAO.consultar();
    }
}