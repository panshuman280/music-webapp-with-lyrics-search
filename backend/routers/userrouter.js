// user database operations

const express = require('express');
const router = express.Router();
const Model = require('../models/userModel');

// route or endpoint
router.post('/add', (req, res) => {
    console.log(req.body);
    new Model(req.body).save()
    .then((result) => {
        console.log(result);
        res.json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });

});

router.get('/getall', (req, res) => {
    Model.find({})
    .then((result) => {
        console.log(result);
        res.json(result);    
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/getbyemail/:email', (req, res) => {
    console.log(req.params.email);
    Model.find({email : req.params.email})
    .then((result) => {
        console.log(result);
        res.json(result);    
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        console.log(result);
        res.json(result);    
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
        console.log(result);
        res.json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.post('/authenticate',(req,res)=>{
    const formdata=req.body;
    Model.findOne(formdata)
    .then((result) => {
        if(result) res.json(result);
        else res.status(401).json({status:'error'});
    })
    .catch((err) => {
        res.status(500).json(err);
    });

});

module.exports = router;