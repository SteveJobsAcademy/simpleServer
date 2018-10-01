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

app.listen(3001);