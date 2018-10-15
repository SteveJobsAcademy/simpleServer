var exp = require('express');
var bodyParser = require('body-parser');
var app = exp();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var counter = 0;
var posts = [
    {
        title: "Titolo del post",
        description: "La description del mio post"
    },
    {
        title: "Titolo del secondo post",
        description: "La description del mio secondo post"
    }
]

app.get('/posts', function(req, res) {
    console.log(req.query.appId);
    res.json(posts);
})

app.post('/posts', function(req, res){
    var newPost = req.body;
    posts.push(newPost);
    res.status(201).json();
})

app.put('/posts/:index', function(req, res) {
    var i = parseInt(req.params.index);
    //posts[i] = editPost;
    posts[i].title = req.body.title;
    posts[i].description = req.body.description;
    res.json();
})

app.get('/posts/:index', function(req, res) {
    var i = parseInt(req.params.index);
    res.json(posts[i]);
})

app.delete('/posts/:index', function(req, res) {
    var i = parseInt(req.params.index);
    posts.splice(i, 1);
    res.json();
})


app.get('/pippo', function(req, res) {
    counter++;
    var x = {message:'Ciao !!', counter: counter};
    res.json(x);
})

app.delete('/pippo', function(req, res) {
    counter--;
    var x = {message:'Sono nel delete !!', counter: counter};
    res.json(x);
})

function getRandomChoice(){
    var random = Math.random();
    if (random < 0.33) {
        return 'scissor';
    } else if (random < 0.66) {
        return 'paper';
    } else {
        return 'rock';
    }
}
var history = {
    draw: 0,
    win: 0,
    lose: 0
} 

app.get('/games/paperScissorRock', function(req, res) {
    if (req.query.myChoice === 'paper' || 
        req.query.myChoice === 'scissor' ||
        req.query.myChoice === 'rock'
    ) {
        var computerChoice = getRandomChoice();
        if (computerChoice === req.query.myChoice){
            history.draw++;
            res.json({
                result: 'draw',
                computerChoice: computerChoice,
                history: history
            })
        } else if (
            (req.query.myChoice === 'rock' && computerChoice === 'scissor') ||
            (req.query.myChoice === 'paper' && computerChoice === 'rock') ||
            (req.query.myChoice === 'scissor' && computerChoice === 'paper') ){
                history.win++;
                res.json({
                    result: 'win',
                    computerChoice: computerChoice,
                    history: history
                })
        } else {
            history.lose++;
            res.json({
                result: 'lose',
                computerChoice: computerChoice,
                history: history
            })
        }
    } else {
        res.status(400).json({message: 'wrong value of myChoice'})
    }
})

app.listen(3001);