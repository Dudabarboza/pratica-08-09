const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')
const PORT = 3333

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'));
app.use(express.json()); 

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'aluno_medio',
  password: '@lunoSenai23.',
  database: 'system_pratica'
});

// Home////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/', (request, response)=>{
  return response.render('home')
});

// Cadastro///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/cadastrar', (request, response)=>{
  return response.render('cadastro')
});

app.post("/cadastrar", (request, response) => {               
  const { nome, descricao, categoria, preco, qnt_disponivel } = request.body   
  
  const inserirMysql = `INSERT INTO livros(nome, descricao, categoria, preco, qnt_disponivel) VALUES('${nome}', '${descricao}', '${categoria}', ${preco}, ${qnt_disponivel});`   

  connection.query(inserirMysql, (error) => {                 
      if(error){                                              
          console.error(error)                                 
          return response.status(500).json({error: "erro ao cadastrar o livro"})   
      }

      return response.redirect("/")                          
  });
});
// Excluir///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.delete("/cadastrar/:id", (request, response) => {
  const { id } = request.params

  const livro = livros.findIndex((livro) => livro.id === id);

  livros.splice(livro, 1);

  return response.json({"message": "Livro deletado com sucesso"});
});

// Atualizar/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.put("/atualizar/:id", (request, response) => {
  const { id } = request.params;
  const { nome, descricao, categoria, preco, qnt_disponivel } = request.body;

  const livroIndex = livros.findIndex((livro) => livro.id === id);

  if (livroIndex === -1) {
      return response.status(404).json({ message: "Livro não encontrado" });
  }

  const livroAtualizado = {
      id,
      nome,
      descricao, 
      categoria, 
      preco, 
      qnt_disponivel
  };

  livros[livroIndex] = livroAtualizado;

  return response.json(livroAtualizado);
});

// Detalhes///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/detalhes', (request, response)=>{
  return response.render('detalhes')
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, ()=>{
  console.log(`Servidor está sendo executado na porta ${PORT}`)
});
