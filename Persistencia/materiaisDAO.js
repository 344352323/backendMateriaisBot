import Materiais from "../Modelo/materiais.js";
import conectar from "./conexao.js";

export default class MateriaisDAO{
    async gravar(materiais){
        if (materiais instanceof Materiais){
            const sql = `INSERT INTO material (descricao, valor, urlImagem) VALUES (?, ?, ?)`
            const parametros = [materiais.descricao, materiais.valor, materiais.urlImagem]
            const conexao = await conectar();
            const resultado = await conexao.execute(sql, parametros);
            materiais.codigo = resultado[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(materiais){
        if (materiais instanceof Materiais){
            const [codigo, descricao, valor, urlImagem] = [materiais.codigo, materiais.descricao, materiais.valor, materiais.urlImagem];
            const sql = `UPDATE material SET descricao = ?, valor = ?, urlImagem = ? WHERE codigo = ?`;
            const parametros = [descricao, valor, urlImagem, codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(materiais){

        if (materiais instanceof Materiais){
            const sql = `DELETE FROM material WHERE codigo = ?`;
            const parametros = [materiais.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }

    }

    async consultar(){

        const sql = `SELECT * FROM material`;
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql);
        let listaMateriais = [];
        for (const registro of registros){
            const material = new Materiais(registro.codigo, registro.descricao, registro.valor, registro.urlImagem);
            listaMateriais.push(material);
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaMateriais;
    }
}
