var express = require('express');
var router = express.Router();

const { v4: uuid} = require('uuid');

const users = [];

router.get('/users', (request, response) => {
    return response.json(users);
});

router.post('/users', (request, response) => {
    const {name,age,email,password,local,games} = request.body;

    const user = {id: uuid(),name,age,email,password,local,games};

    users.push(user);

    return response.json(user);

});

router.put("/users",(request, response) => {
    const {id,name,age,email,password,local,games} = request.body;

    const userIndex = users.findIndex(user => user.id === id);

    if(userIndex === -1){
        return response.status(404).json({message: "Usuário não encontrado"});
    }

    const user = {
        id,
        name,
        age,
        email,
        password,
        local,
        games
    };
    

    if (password == users.password){
        users[userIndex] = user;
    
        return response.status(200).json({message: "Conta atualizada com sucesso!!!"});
    }
    else{
    return response.status(400).json({message:"Senha incorreta"});}

});

router.delete("/users", (request, response) => {

    const {id,password} = request.body;

    const userIndex = users.findIndex(user => user.id === id);

    if(userIndex < 0){
        return response.status(404).json({error: "Usuário não encontrado"});
    }else{
        const user = {id,password};

        if (password == users[userIndex].password){
            users[userIndex] = user;
            users.splice(userIndex, 1);
            return response.status(200).json({message: "Conta excluída com sucesso!!!"});
        }else{
            return response.status(400).json({message: "Senha incorreta"});
        }
            
    
    }

    
    

    
});










module.exports = router;
