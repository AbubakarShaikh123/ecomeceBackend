// import  {prismaClient} from "@prisma/client";

//  const prisma = new prismaClient()
//  export default prisma

import pkg from '@prisma/client';
const {PrismaClient} = pkg;

const prisma = new PrismaClient();

export default prisma;