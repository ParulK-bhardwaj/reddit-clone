import express, { response } from 'express';
import { engine } from 'express-handlebars';
// const express = require('express');


const app = express();
// const engine = handlebars();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

// CASES COntroller RESOURCE

// New

app.get('/cases/new', (req, res) => {
    res.render('cases-new', {});
});

// CREATE

app.post('cases/create', (req, res) => {
    console.log("OH ho")

    res.redirect('/cases/${caseid}');
});

// SHOW
app.get('/cases/:id', (req, res) => {
    res.render()
})

app.listen(3000);