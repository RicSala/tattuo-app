// @ts-check

import prisma from "@/lib/prismadb";
import { TypeIcon } from "lucide-react";


// given a board id, it returns the board completed data, including the artist profile
/**
 * @param {string} boardId
 * @returns {Promise<(import("@prisma/client").Board & { tattoos: import("@prisma/client").Tattoo[] }) | null>}
 */
export async function getBoardById(boardId) {

    try {

        const board = await prisma.board.findUnique({
            where: {
                id: boardId,
            },
            include: {
                tattoos: {
                    include: {
                        tattoo: true
                    }
                }
            }
        });

        if (!board) {
            return null;
        }

        return board

    } catch (error) {

        return null;
    }
}

