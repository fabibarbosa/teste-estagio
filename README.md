# Repositório contendo os arquivos referentes ao teste de JavaScript

Os Exercícios propostos encontram-se disponível <a href="https://codesandbox.io/s/teste-estagio-template-forked-venll">aqui</a>.

## Documentação referente a RESTFULL API

O banco dados utilizado foi o <a href="https://www.mysql.com" > mysql </a> ( <a href=""> Você pode obter ele no XAMP </a>)
<br>
O projeto se encontrada disponível na porta 5000: http://localhost:5000/
## Cerifique de criar o seguinte banco de dados e suas tabelas: 

```sql

CREATE TABLE `naverdb`.`projects` ( `id` INT NOT NULL AUTO_INCREMENT ,
`name` VARCHAR(80) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `naverdb`.`navers` ( `id` INT NOT NULL AUTO_INCREMENT , 
`name` VARCHAR(80) NOT NULL , `job_role` VARCHAR(180) NOT NULL , `birthdate` DATE NOT NULL , 
`admission_date` DATE NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

```
## O acesso ao banco de dados foi definido como o padrão do XAMP, caso você tenha alterado as configurações de acesso ao Mysql, basta alterar a váriavel knex, como descrito abaixo 

```javascript
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'host',
    user : 'usuario',
    password : 'senha',
    database : 'banco de dados'
    }
});

```

##Instalação 
No terminal, acesse a página do projeto e rode o seguinte comando:
```node
  npm install
  npm index.js
```
## Teste das request
Utilizando o <a href="https://www.postman.com/">Postman </a>, faça as requisições para as seguintes rotas:

```
http://localhost:5000/navers/store
http://localhost:5000/projects/store
```

Segue alguns json para utlizar de exemplo na raw do Postman

```javascript
{
  "id": 1, 
  "name": "Fulano", 
  "birthdate": "1998-06-12", 
  "admission_date": "2020-06-12",
   "job_role": "Desenvolvedor"
}

{
  name: "Projeto x",
  navers: [1,3]
}


##Dificuldades
Obtive certa dificuldade ao tentar utilizar o padrão MVC na arquitetura, tentei achar exemplos na documentação, porém não conseguir implementar como gostaria. 
