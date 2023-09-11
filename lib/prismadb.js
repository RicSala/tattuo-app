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

// prisma.$use(async (params, next) => {
//     if (params.model === 'User' && (params.action === 'create' || params.action === 'update')) {
//         if (isUserProfileComplete(params.args.data)) {
//             params.args.data.isComplete = true;
//         } else {
//             params.args.data.isComplete = false;
//         }
//     }
//     return next(params);
// });

// function isUserProfileComplete (data) {
//     const { name, email, phone, address, city, country, postalCode, bio, avatar, socialMedia } = data;
//     if (name && email && phone && address && city && country && postalCode && bio && avatar && socialMedia) {
//         return true;
//     } else {
//         return false;
//     }
// }

export default prisma;