const mongoose = require( 'mongoose' );

const sportCollectionsScchema = mongoose.Schema({

    sportId:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    num_players:{
        type:Number,
        required:true,
    }
});


const sportsCollection = mongoose.model('sports',sportCollectionsScchema);

const Sports={
    createSport:function (newSport)
    {
        return sportsCollection
            .create(newSport)
            .then(createdSport=>{
                return createdSport;
            })
            .catch(err=>{
                return err;
            })
    }
}

module.exports = {Sports};