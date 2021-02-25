const express = require('express');


const { v4: uuid} = require('uuid');

const app = express();

app.use(express.json());


const users = [];

app.get('/users', (request, response) => {
    return response.json(users);
});

app.post('/users', (request, response) => {
    const {name,age,email,password,local,games} = request.body;

    const user = {id: uuid(),name,age,email,password,local,games};

    users.push(user);

    return response.json(user);

});

app.put("/users",(request, response) => {
    const {id,name,age,email,password,local,games} = request.body;

    const userIndex = users.findIndex(user => user.id === id);

    if(userIndex === -1){
        return response.status(404).json({error: "User not found"});
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
    
        return response.json(user);
    }
    else{
    return response.status(400).json({error: "Incorrect password"});}

});

app.delete("/users", (request, response) => {

    const {id,password} = request.body;

    const userIndex = users.findIndex(user => user.id === id);

    if(userIndex < 0){
        return response.status(404).json({error: "User not found"});
    }

    
    const user = {id,password};

    if (password == users.password){
        users[userIndex] = user;
        users.splice(userIndex, 1);
        return response.status(204).send();
    }else
        return response.status(400).json({error: "Incorrect password"});


    
});








app.listen(8082, () => {
    console.log('Backend Started!');
});