const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const {Sports} = require('./models/sport-model');
const { DATABASE_URL, PORT } = require( './config' );

const app = express();

let listOfSports=[
    {
        sportId : "123",
        name: "Baseball",
        num_players: "22"
    },
    {
        sportId : "234",
        name: "Basketball",
        num_players: "12"
    }
];


app.post('/sports/addSport/:sportId',jsonParser,(req,res)=>{

    let pId = Number(req.params.sportId);

    let id = Number(req.body.sportId);
    let name = req.body.name;
    let num_players = req.body.num_players;

    if(!pId)
    {
        res.statusMessage = "Please send the id as a parameter";
        return res.status(406).end();
    }

    if(pId !== id)
    {
        res.statusMessage = "The id in the body does not match the id in the params";
        return res.status(406).end();
    }

    if(!name || !num_players || !id)
    {
        res.statusMessage = "The name or the number of players or the id is missing";
        return res.status(406).end();
    }


    let newSport = {
        id,
        name,
        num_players};

    Sports
        .createSport(newSport)
        .then(result=>{
            return res.status(201).json(newSport);
        })
        .catch(err=>{
            res.statusMessage = "Something went wrong with the db"+err;
            return res.status(406).end();
        });
});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});