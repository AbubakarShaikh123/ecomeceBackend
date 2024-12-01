import prisma from "../utils/prismaClient.js";

export default async function (req, res){
    try {
        
        const products = await prisma.product.findMany({})
        
        if (products) {
            return res.status(200).json({products})
        }
        
        res.status(500).json({msg : "Internal Error "})
        
    } catch (error) {
        console.log("Error occured at GET : getProducts ",error);
        res.status(500).json({"message" : "Internal Server Error at getProducts"}) 
    }
}