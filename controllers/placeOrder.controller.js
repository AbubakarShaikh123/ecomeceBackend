import prisma from "../utils/prismaClient.js";

export default async function (req, res){
    try {
        const { userId } = req.body
         if ( !userId ) {
           return res.status(400).json({message : "userId required"})
        }
        
        const cartItems = await prisma.cartItem.findMany({
           where : {userId},
            include : {product:true}
        })

        if (cartItems.length===0) {
            return res.status(400).json({msg:"Cart is empty"})
        }

        const totalAmount = cartItems.reduce((sum, item) => sum + item.totalAmount, 0);

        const order = await prisma.order.create({
            data: {
                userId,
                totalAmount,
                orderItems :{
                    create : cartItems.map((item)=>({
                        productId : item.productId,
                        quantity : item.quantity,
                        pricePerUnit : item.product.price
                    }))
                }
            }
        })

        await prisma.cartItem.deleteMany({where:{userId}})

        res.status(200).json({msg : "order placed", order })
        
    } catch (error) {
        console.log("Error occured at POST : placeOrder ",error);
        res.status(500).json({"message" : "Internal Server Error"}) 
    }
}