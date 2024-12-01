import express from 'express'
import {login, registor, addProducts, getProducts,addToCart, placeOrder} from './controllers/index.js'
import cors from 'cors' 
import {verifyToken} from './utils/verifyTokenMiddeleware.js'

const app = express()
const port = 3000

app.use(cors({
    credentials : true,
    origin : "http://localhost:5173"
}))

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({msg:"Wellcome"})
})

app.post("/register",registor)
app.post("/login",login)
app.post("/addProduct",addProducts)
app.get("/getProducts", getProducts)
app.post("/addToCart",verifyToken,addToCart)
app.post("/placeOrder",verifyToken,placeOrder)

app.listen(port, ()=>{
    console.log("Server is on at Port :", port);
})
