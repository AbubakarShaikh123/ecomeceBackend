import prisma from "../utils/prismaClient.js"
import jwt from "jsonwebtoken"


export default async function (req, res) {
    try {
        const {email, name, password} = req.body
        if(!email || !password || !name ) {
            return res.status(400).json({msg:"All fields are required"})
        }

        const exist = await prisma.user.findUnique({where:{email}})

        if(exist) {
            return res.status(400).json({msg:"User already exist"})
        }

        const user = await prisma.user.create({
            data:{email, password, name},
            select :{email: true}
        })

        const token = jwt.sign({email}, process.env.JWT_KEY, {expiresIn : "1d"})

        const cookieOptions = {
            httpOnly: true, // Prevent JavaScript access
            secure: false, // Use HTTPS in production
            sameSite: 'lax', // Prevent CSRF attacks
            maxAge: 24 * 60 * 60 * 1000, // 1 day
          };

        if(user){
            
             res.cookie('token', token, cookieOptions);
            return res.status(200).json({ wellcome : user.email , token})
        }

        res.status(500).json({msg : "Error in Code"})

    } catch (error) {
        console.log("Error",error);
        res.status(500).json({msg:"Internal server error"})
    }
}