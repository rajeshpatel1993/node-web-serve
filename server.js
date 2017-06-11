const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+"/views/partials");
hbs.registerHelper('getCurrentYear',()=>{
   return new Date().getFullYear();
});



hbs.registerHelper('makeUpperCase',(text)=>{
   return  text.toUpperCase();
});
app.set('view engine','hbs');




app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} : ${req.url}`;
    fs.appendFile(__dirname+'/public/log/server.log',log+'\n',(err)=>{
        //console.log(err);
        if(err){
            console.log(`Unable to append to server.log`);
        }

    });
    console.log(log);
    next();
});



// app.use((req,res,next)=>{
//
//     res.render('maintenance.hbs',{
//         pageTitle:'Home page'
//     });
//     next();
//
// });

app.use(express.static(__dirname+'/public'));


app.get('/',(req,res)=>{
    res.render('home.hbs',{
        name:"Mahesh",
        pageTitle:'Home page'
    })
});

app.get('/about',(req,res)=>{
res.render('about.hbs',{

    pageTitle:'About page'

});
});


app.get('/project',(req,res)=>{
    res.render('project.hbs',{

        pageTitle:'Project page'

    });
});


app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:"Unable to find page"
    });
});

app.listen(port,()=>{
    console.log(`Server is up on to port ${port}`);
});