import prisma from "@/lib/prismadb";

export class StyleService {
  static async getStyles() {
    const styles = await prisma.style.findMany();
    return styles;
  }
  static async getStylesByQueryPaginated({ query, take } = {}) {
    const styles =
      // await prisma.style.findMany({
      //     where: {
      //       label: {
      //         startsWith: s,
      //         mode: 'insensitive',
      //       },
      //     },
      //     take: 10,
      //   });

      await prisma.style.findMany({
        where: {
          label: {
            contains: query,
            mode: "insensitive",
          },
        },
        take: take,
      });

    return styles;
  }
}
