import Pedido from "../Modelo/pedido.js";
import conectar from "./conexao.js";

export default class PedidoDAO{
    async gravar(pedido){
        if (pedido instanceof Pedido){
            const conexao = await conectar();
            //let sql = `start transaction;`;
            //conexao.execute(sql);
            let sql = `INSERT INTO pedido (dataPedido) VALUES (?);`;
            let parametros = [pedido.dataPedido];
            const resultado = await conexao.execute(sql, parametros);
            pedido.id = resultado[0].insertId;
            for(const item of pedido.itensPedidos){
                sql = `SELECT codigo FROM material WHERE descricao like ?`;
                const [registros] = await conexao.execute(sql, ['%' + item.material + '%']);
                item.codigo = registros[0].codigo;
                sql = 
                     `INSERT INTO pedido_material(fk_id_pedido, fk_codigo_material, qtd)
                       VALUES (?,?,?);

                     `
                parametros = [pedido.id, item.codigo, item.qtd];
                await conexao.execute(sql, parametros);
            }
            //sql = `COMMIT;`
            //await conexao.execute(sql);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

}