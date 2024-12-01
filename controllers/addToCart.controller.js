import prisma from "../utils/prismaClient.js"

export default async function (req, res) {
    try {
        const {userId, productId, quantity} = req.body

       const exist = await prisma.cartItem.findFirst({
            where :{
                // userId_productId : {userId, productId}
                userId, productId
            },
            include : {product:true}
        })

        if (exist) {
            const updatedCartItem = await prisma.cartItem.update({
                where :{
                    userId_productId:{userId, productId}
                },
                data : {
                    quantity : exist.quantity + quantity,
                    totalAmount : exist.product.price*(exist.quantity + quantity) 
                }
            })
            return res.status(200).json({msg:"updated cart item",updatedCartItem})
        }

        const product = await prisma.product.findUnique({
            where : {id : productId}
        })

        const totalAmount = product.price*quantity

        const newCartItem = await prisma.cartItem.create({
            data : {
                userId,
                productId,
                quantity,
                totalAmount
            }
        })
        if (newCartItem) {
            return res.status(200).json({msg:"added to cart",newCartItem})
        }

        res.status(500).json({msg:"Server Error"})


    } catch (error) {
        console.log("error at POST: addToCart",error);
        res.status(500).json({msg:"Internal Server Error"})
    }
}