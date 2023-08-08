// This file configures an instance of the Prisma client

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global // Assigns the global namespace to a variable

export const prisma =
    globalForPrisma.prisma || // Checks if the prisma client is already defined -> used it (this is for hot reloading in development)
    new PrismaClient({      // If it is not defined, create a new instance of the prisma client
        // log: ["query"], // Uncomment to see all generated queries
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; // only save the prisma client as a global variable if we are in development
// so in production, each time we call prisma, we are creating a new instance of the prisma client

export default prisma;