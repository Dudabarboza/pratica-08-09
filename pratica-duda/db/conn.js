const mysql = require('mysql2')

//Configuração e conexão com banco
const conn = mysql.createPool({
  host: 'host',
  user: 'aluno_medio',
  password: '@lunoSenai23.',
  database: 'system_pratica',
})

// É necessário exportar esse modulo