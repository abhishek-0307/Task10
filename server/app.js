


const express=require("express");
const app=express();
const cors=require("cors");
const stripe=require("stripe")("sk_test_51PJC7tSIxNC9jnNCan9h0iCPYTiQbZAZq0EsaeQtdCBIpSD1I33TmARnNtbqkHqcQcVBLNuyz5aiw6rFbt5okETC00D9EKEwXB")
const { firebaseApp, db} = require('./firebase')
const {set,ref} = require('firebase/database')

app.use(express.json());
app.use(cors());




//checkoutapi
app.post("/api/create-checkout-session",async(req,res)=>{
    const {Data}=req.body;

    const customer=await stripe.customers.create({
        name:Data.Name,
        address:{
            line1:"123 Default Street",
            city:"Hyderabad",
            postal_code:"500081",
            country:"IN"
        }
    });
    //console.log(Data)
    // const lineItems=prod.map((res)=>({
    //     price_data:{
    //         currency:"inr",
    //         user_data:{
    //             name:res.Name
    //         },
    //         unit_amount:res.Amount * 100,
    //     }
    // }))
    
    const session=await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:[{
            price_data:{
                currency:"inr",
                product_data:{
                    name:Data.Name,
                },
                unit_amount:Data.Amount * 100,
            },
            quantity:1, 
        }],
        mode:"payment",
        customer:customer.id,
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel",
    });
    //console.log(session.id)
    const sou={
        name:Data.Name,
        amount:Data.Amount,
        transaction:session.id
    }
    set(ref(db,`users/${session.id}`),sou);
    res.json({id:session.id})
})

app.listen(7000,()=>{
    console.log("server start")
})