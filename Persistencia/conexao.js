import mysql from 'mysql2/promise';

export default async function conectar(){

    if(global.poolConexoes){
        return await global.poolConexoes.getConnections();
    }
    else{
        const pool = await mysql.createPool({
            host: 'localhost',
            port: 3306,
            user: 'root',
            database: 'materiais',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay:0
        })

        global.poolConexoes = pool;
        return await pool.getConnection();
    }

    return {
        'gravar': (materiais) => {},
        'atualizar': (materiais) => {},
        'excluir': (materiais) => {},
        'consultar': () => {},
    }
}