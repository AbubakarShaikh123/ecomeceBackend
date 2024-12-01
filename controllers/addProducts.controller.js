import prisma from "../utils/prismaClient.js";

export default async function (req, res){
    try {
        const {name, description, price, imageUrl, category} = req.body
         if ( !name || !description || !price || !imageUrl || !category) {
           return res.status(400).json({message : "All field required"})
        }
        
        const product = await prisma.product.create({
            data : {name,description,imageUrl,price, category},
            select : {name:true, description:true, imageUrl:true, price:true}
        })

        if (product) {
            return res.status(201).json({msg:"Product item created", product})
        }

        
        res.status(500).json({msg : "Internal Error" })
        
    } catch (error) {
        console.log("Error occured at POST : login ",error);
        res.status(500).json({"message" : "Internal Server Error"}) 
    }
}