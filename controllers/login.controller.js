import prisma from "../utils/prismaClient.js";
import jwt from "jsonwebtoken"

export default async function  (req, res){
    try {
        const {email, password} = req.body
         if ( !email || !password) {
           return res.status(400).json({message : "All field required"})
        }
        const user = await prisma.user.findFirst({
            where : {email}
        })
        
        if (!user || user.password != password) {
            return res.status(400).json({message : "Invalid Credential"})
        }

        const userData = await prisma.user.findUnique({
            where : {email},
            select : {
                email: true, 
                name: true,
                cartItems : {
                    select : {product:true, productId:true, quantity:true,totalAmount:true,userId:true}
                },
                orders : {
                    select:{ orderItems:true, status:true, totalAmount:true, user:true, userId:true   }
                }
            }
        })
        if (!userData) {
            userData = "hi"
        }
        
        const cookieOptions = {
            httpOnly: true, // Prevent JavaScript access
            secure: false, // Use HTTPS in production
            sameSite: 'lax', // Prevent CSRF attacks
            maxAge: 24 * 60 * 60 * 1000, // 1 day
          };
        const token = jwt.sign({email}, process.env.JWT_KEY, {expiresIn : "1d"})


         res.cookie('token', token, cookieOptions);
       return res.status(201).json({msg : "Loged in successfully" ,userData})
        
    } catch (error) {
        console.log("Error occured at POST : login ",error);
        res.status(500).json({"message" : "Internal Server Error at LOGIN"}) 
    }
}