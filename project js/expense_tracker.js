const express = require('express')
let app = express()
app.use(express.json())

require("dotenv").config()


//  This platform is developed to maintain the expense records of the user. 

// Initialization :

let expenseArr = []
let id = 0

// POST METHOD :

app.post('/add-expense',(req,res)=>{
    let data = req.body
    try{
        if (data){
            data.id = id + 1
            id = id + 1
            expenseArr.push(data)

            res.status(200).send(req.body)
            
            req.send({
                isSuccess : true,
                Expenses : expenseArr 
            })
        }
        else{
            res.status(404).send({isSuccess : false, message : "Data is missing."})
        }
    }
    catch(err){
        res.status(500).send({isSuccess : false, message : "Internal server error."})
    }
})

// GET METHOD :

app.get('/get-expenses',(req,res)=>{
    try{
        data = expenseArr
        if(data){
            res.status(200).send({
                isSuccess : true,
                Expenses : data,
                Count : data.length
            })
        }

        else{
             res.status(404).send({isSuccess : false, message : "Data is missing."})
        }
    }
    catch(err){
         res.status(500).send({isSuccess : false, message : "Internal server error."})
    }
})

// GET METHOD (WITH QUERY):

app.get('/get-expense-at-index',(req,res)=>{
    try{
        let id = Number(req.query.id);
        let data = expenseArr.find((val)=> val.id === id)
        if(data){
            res.status(200).send({
                isSuccess : true,
                expense : data
            })
        }
        else{
            res.status(404).send({isSuccess : false, message : "Expense data not found."})
        }
    }
    catch(err){
        console.error(err)
        res.status(500).send({isSuccess : false, message : "Internal server error."})
    }
})

// GET METHOD (WITH PARAMs):

app.get('/get-expense-at-index/:id',(req,res)=>{
    try{
        let id = parseInt(req.params.id)
        let data = expenseArr.find((val)=> val.id === id)
        if(data){
            res.status(200).send({
                isSuccess : true,
                expense : data
            })
        }
        else{
            res.status(404).send({isSuccess : false, message : "Expense data not found."})
        }
    }
    catch(err){
        console.error(err)
        res.status(500).send({isSuccess : false, message : "Internal server error."})
    }
})

// DELETE METHOD :

app.delete('/delete-expense', (req, res) => {
    try {
        let id = parseInt(req.query.id);
        let idx = expenseArr.findIndex((val) => val.id === id);
        if (idx !== -1) {
            expenseArr.splice(idx, 1);
            res.status(200).send({
                isSuccess: true,
                deletedId: id
            });
        } else {
            res.status(404).send({ isSuccess: false, message: "Expense data not found." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ isSuccess: false, message: "Internal server error." });
    }
});


// PUT METHOD :
app.put('/update-expense',(req,res)=>{
    try{
        let id = parseInt(req.query.id)
        let body = req.body
        let idx = expenseArr.findIndex((val)=> val.id === id)
        if(idx!==-1){
            expenseArr[idx] = {...expenseArr[idx],...body}
            res.status(200).send({
                isSuccess : true,
                expenses : expenseArr[idx]
            })
        }
        else{
            res.status(404).send({isSuccess : false, message : "Expense data not found."})
        }
    }
    catch(err){
        console.error(err)
        res.status(500).send({isSuccess : false, message : "Internal server error."})
    }
})

app.listen(process.env.PORT,(err)=>{
    console.log("Server started at port",process.env.PORT)
})