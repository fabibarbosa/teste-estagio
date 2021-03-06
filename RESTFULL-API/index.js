const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const PORT = "5000";

app.listen(PORT, () => {
    console.log("Hello");
})
app.get('/', (req,res) => {
    res.send("Hello world");
})

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'naverdb'
    }
  });


//Rota responsável por exibir todos os navers
app.get('/navers/index', (req,res,next) => {
    knex('navers').then( (dados) => {
        res.json(dados);
    },next)
});

//Rota responsável por o naver com id especifico
app.get('/navers/show/:id', (req,res) => {
    const {id} = req.params;
    knex('navers').where('id', id).first().then( (dados) => {
        if (dados) {
            res.json(dados)
        }else {
            res.send("id not found");
        }
    })
});

app.post('/navers/store', (req,res) => {
    console.log(req.body)
    res.send("Hello");
});


app.get('/projects/index', () => {
    knex('navers').then( (dados) => {
        res.json(dados);
    },next)
});

app.get('/projects/show/:id', () => {
    const {id} = req.params;
    knex('projects').where('id', id).first().then( (dados) => {
        if (dados) {
            res.json(dados)
        }else {
            res.send("id not found");
        }
});

app.post('/projects/store', () => {
    console.log(req.body)
    res.send("Hello");
});

