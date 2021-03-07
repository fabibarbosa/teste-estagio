const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const app = express();
const PORT = "5000";
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'naversdb'
    }
});


app.listen(PORT, () => {
    console.log("The port is working");
})
app.get('/', (req,res) => {
    res.send("Insert the route...");
})


app.get('/navers/index', (req,res,next) => {
    knex('navers').then( (dados) => {
        res.json(dados);
    },next)
});

//Rota responsável por exibir o naver com id especifico
app.get('/navers/show/:id', (req,res) => {
    const {id} = req.params;
    //Verificar se o id passado pelo get existe na tabela, e então seleciona todas informações deste id
    //Apos selecionar as informações ele pegar as informações da tabela de projetos
    knex('navers').where('id', id).first().then( (dados) => {
        if (dados) {
            let jsonNaver = dados;
            knex('projects').where('navers', id).then( (dados) => {
                jsonNaver.projects = [];
                console.log(dados);
                if (dados === undefined || dados.length === 0) {
                    res.send(jsonNaver);
                }else {
                    jsonNaver.projects.push(dados[0].id, dados[0].name,);
                    res.send(jsonNaver);
                }

            })
        }else {
            res.send("id not found");
        }
    })
});


//Crias as variaveis com as informações que foram passadas na requisição e depois insere no banco de dados.
app.post('/navers/store', (req,res) => {
    let {name,birthdate,admission_date,job_role} = req.body
    res.send(req.body);
    knex('navers').insert([{id: 0, name: name,
        birthdate: birthdate,
        admission_date: admission_date,
         job_role: job_role}])
         .then(console.log("Hellou"));
});


app.get('/projects/index', (req,res,next) => {
    knex('projects').then( (dados) => {
        res.json(dados);
    },next)
});


//Rota responsável por exibir os projetos os e seus detalhes
app.get('/projects/show/:id', (req,res) => {
    const {id} = req.params;
    //Seleciona o projeto com base na requisicao do get
    knex('projects').where('id', id).first().then( (dados) => {
        if (dados) {
            console.log(dados.navers);
            let jsonProjectsNavers = dados.navers.split(',');
            jsonProjectsNavers = jsonProjectsNavers.map(Number);
            console.log(jsonProjectsNavers);
            let jsonProject = dados;
            console.log(jsonProjectsNavers);
            // Depos seleciona todos os navers que trabalharam no determinado projeto
            knex("navers").whereIn('id',jsonProjectsNavers).then( (naversDados) => {
                console.log(naversDados)
                jsonProject.navers = naversDados
        
                res.send(jsonProject)
            }) 

        }else {
            res.send("id not found");
        }
    })
    
});

app.post('/projects/store', (req,res) => {
    let {id,navers} = req.body
    knex('projects').insert([{id: 0, navers : navers}]).then(console.log("Hellou"));
    res.send(req.body)
});

