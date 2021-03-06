const express = require('express');
const router = express.Router();

router.post('/store', (req,res) => {
    let newProject = req.body;
    navers.push(req.body);
    res.json(req.body);
});

router.get('/index', (req,res) => {
    res.json(navers);

});

router.get('/show/:id', (req,res) => {
    let projectId = req.params.id;
    let selectedProject = navers.find( naver => naver.id === Number(projectId));
    if (selectedProject === undefined) {
        res.send("Project don't find");
    }else {
        res.json(selectedProject);
    }

});


export default router;