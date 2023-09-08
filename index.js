const express = require('express');
const { validateUser } = require('./schemes/users');
const { validateCharacter } = require('./schemes/characters');
const { validateItem } = require('./schemes/items');
const app = express();
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/* const cors = require('cors'); 
app.use(cors()) */



//---------------------------Users---------------------------------//
let users = []

//lo utilizo para que no empiece del todo vacio y pueda ir probando cosas
users.push({
    id_user: 1107836489,
    name: "Andres",
    last:"Neira" ,
    email:"andresNeira@gmail.com",
})

app.get('/users', (req, res) => {
    console.log("hey here it comes the users")
    res.send({"users":users})
})

app.get("/users/:id", (req, res) => {
    console.log ("params", req.params)
    const requestIDU = req.params.id
    let requiredUser = null;
    
    for (let index = 0; index < users.length; index++) {
        console.log(users[index].id_user == requestIDU, users[index].id_user, requestIDU)
        if(users[index].id_user == requestIDU){
            requiredUser = users[index];
        }}
        console.log (requiredUser)
        res.json(requiredUser)
    })
    
    //Aca es el conteo de personajes
    app.get('/users/:id/character-count', (req, res) => {
        const userId = parseInt(req.params.id);
        const characterCount = characters.filter(character => character.id_user === userId).length;
        res.json({ userId, characterCount });
    });
    
    app.post('/users', (req, res) => {
        console.log("recibiendo:", req.body)
        const userValidationResult = validateUser(req.body)
    console.log("result", userValidationResult.error)

    
    if(userValidationResult.error){
        return res.status(400).send(
            {message:JSON.parse(userValidationResult.error.message)}
        )
    }

    let newUser = {
        id_user: userValidationResult.data.id_user,
        name:userValidationResult.data.name,
        last:userValidationResult.data.last,
        email: userValidationResult.data.email
    }
    users.push(newUser);
    res.status(201).send({"message": "User Created Succesfully", "user": newUser})

})

app.patch('/users/:id_user', (req, res) => {
    let index = users.findIndex(users => users.id_user == req.params.id_user)

    users[index].id_user = req.body.id_user || users[index].id_user
    users[index].name = req.body.name || users[index].name
    users[index].last = req.body.last || users[index].last
    users[index].email = req.body.email || users[index].email

    res.send("Actualizacion satisfactoria")
})

app.delete("/users/:id_user", (req, res)=> {
    const idToDelete = req.params.id_user;
    let indexToDelete = users.findIndex(users=>users.id_user==idToDelete)
    let userDeleted = users.splice(indexToDelete, 1)
    res.send("Se Elimino Perfectamente el user " + userDeleted[0].id_user)
})



//---------------------------Characters---------------------------------//
let characters = [] 


//lo utilizo para que no empiece del todo vacio y pueda ir probando cosas
characters.push({
    id_charac: 13,
    name:"Gojo",
    level: 34,
    type: "Wizard" ,
    id_user: 1107836489

})

app.get('/characters', (req, res) => {
    console.log("hey here it comes the characters")
     res.send({"characters":characters})
})

app.get("/characters/:id", (req, res) => {
    console.log ("params", req.params)
    const requestIDC = req.params.id
    let requiredCharacter = null;

    for (let index = 0; index < characters.length; index++) {
        console.log(characters[index].id_charac == requestIDC, characters[index].id_charac, requestIDC)
        if(characters[index].id_charac == requestIDC){
            requiredCharacter = characters[index];
        }}
        console.log (requiredCharacter)
        res.json(requiredCharacter)
})

//Aca es el conteo de items dentro de los personajes
app.get('/characters/:id_charac/item-count', (req, res) => {
    const characId = parseInt(req.params.id_charac);
    const itemCount = items.filter(item => {
        const character = characters.find(character => character.id_charac === item.id_charac);
        return character && character.id_charac === characId;
    }).length;
    res.json({ characId, itemCount });
});

app.post('/characters', (req, res) => {
    console.log("recibiendo:", req.body)
    const characterValidationResult = validateCharacter(req.body)
    console.log("result", characterValidationResult.error)

    
    if(characterValidationResult.error){
        return res.status(400).send(
            {message:JSON.parse(characterValidationResult.error.message)}
        )
    }

    let newCharacter = {
        id_charac: characterValidationResult.data.id_charac,
        name:characterValidationResult.data.name,
        level:characterValidationResult.data.level,
        type: characterValidationResult.data.type,
        id_user: characterValidationResult.data.id_user
    }
    characters.push(newCharacter);
    res.status(201).send({"message": "Character Created Succesfully", "character":  newCharacter})

})

app.patch('/characters/:id_charac', (req, res) => {
    let index = characters.findIndex(characters => characters.id_charac == req.params.id_charac)

    characters[index].id_charac = req.body.id_charac || users[index].id_charac
    characters[index].name = req.body.name || users[index].name
    characters[index].level = req.body.level || users[index].level
    characters[index].type = req.body.type || users[index].type
    characters[index].id_user = req.body.id_user || users[index].id_user

    res.send("Actualizacion de personaje satisfactoria")
})


app.delete("/characters/:id_charac", (req, res)=> {
    const idToDelete = req.params.id_charac;
    let indexToDelete = characters.findIndex(characters=>characters.id_charac==idToDelete)
    let characterDeleted = characters.splice(indexToDelete, 1)
    res.send("Se Elimino Perfectamente el character " + characterDeleted[0].id_charac)
})

//---------------------------Items---------------------------------//
let items = []


//lo utilizo para que no empiece del todo vacio y pueda ir probando cosas
items.push({
    id_item: 1,
    name: "Hollow Purple",
    item_type: "Spell",
    mode: "Attack",
    id_charac: 13,
})

app.get('/items', (req, res) => {
    console.log("hey here it comes the items")
     res.send({"items":items})
})

app.get("/items/:id", (req, res) => {
    console.log ("params", req.params)
    const requestIDI = req.params.id
    let requiredItem = null;

    for (let index = 0; index < items.length; index++) {
        console.log(items[index].id_item == requestIDI, items[index].id_item, requestIDI)
        if(items[index].id_item == requestIDI){
            requiredItem = items[index];
        }}
        console.log (requiredItem)
        res.json(requiredItem)
})

app.post('/items', (req, res) => {
    console.log("recibiendo:", req.body)
    const itemValidationResult = validateItem(req.body)
    console.log("result", itemValidationResult.error)

    
    if(itemValidationResult.error){
        return res.status(400).send(
            {message:JSON.parse(itemValidationResult.error.message)}
        )
    }

    let newItem = {
        id_item: itemValidationResult.data.id_item,
        name:itemValidationResult.data.name,
        item_type:itemValidationResult.data.item_type,
        mode: itemValidationResult.data.mode,
        id_charac: itemValidationResult.data.id_charac
    }
    items.push(newItem);
    res.status(201).send({"message": "Item Created Succesfully", "item":  newItem})

})

app.patch('/items/:id_item', (req, res) => {
    let index = items.findIndex(items => items.id_item == req.params.id_item)

    items[index].id_item = req.body.id_item || items[index].id_item
    items[index].name = req.body.name || items[index].name
    items[index].item_type = req.body.item_type || items[index].item_type
    items[index].mode = req.body.mode || items[index].mode
    items[index].id_charac = req.body.id_charac || items[index].id_charac

    res.send("Actualizacion de item satisfactoria")
})


app.delete("/items/:id_item", (req, res)=> {
    const idToDelete = req.params.id_item;
    let indexToDelete = items.findIndex(items=>items.id_item==idToDelete)
    let itemDeleted = items.splice(indexToDelete, 1)
    res.send("Se Elimino Perfectamente el item" + itemDeleted[0].id_item)
})







//---------------------------------Listen---------------------------------------//
app.listen(port, (req, res) => {
    console.log("im listening you, player 1 ")
    console.log(`${port}`)
})