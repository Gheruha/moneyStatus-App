// @ts-nocheck
import mysql from 'mysql2/promise';

let mysqlConnection = null;
export function mysqlConnectionFn() {
    if (!mysqlConnection) {
        mysqlConnection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'moneyStatus'
        });
    }
    return mysqlConnection;
}