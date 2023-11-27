import Pedido from "../Modelo/pedido.js0";

export default class PedidoDAO{
    async gravar(pedido){
        if (pedido instanceof Pedido){
            let sql = `
            start transaction;
            INSERT INTO pedido (dataPedido) VALUES (?)`;
            const parametros = [pedido.dataPedido];
            const conexao = await conectar();
            const resultado = await conexao.execute(sql, parametros);
            pedido.id = resultado[0].insertId;
            for(const item of pedido.itensPedidos){
                sql = 
                     `INSERT INTO pedido_material(fk_id_pedido, fk_codigo_material, qtd)
                       VALUES (?,?,?);

                     `
                parametros = [pedido.id, item.codigo, item.qtd];
                await conexao.execute(sql);
            }
            sql = `COMMIT;`
            await conexao.execute(sql);
            global.poolConexoes.releaseConnection(conexao);
        }
    }
}