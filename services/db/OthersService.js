import prisma from "@/lib/prismadb";

export class OthersService {
  static async getStyles() {
    const styles = await prisma.style.findMany();
    return styles;
  }
  static async getBodyParts() {
    const bodyParts = await prisma.bodyPart.findMany();
    return bodyParts;
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

export class CityService {
  static async getCitiesByQueryPaginated({ query, take }) {
    const cities = await prisma.city.findMany({
      where: {
        label: {
          startsWith: query,
          mode: "insensitive",
        },
      },
      take,
    });
    return cities;
  }

  static async getByLabel(label) {
    const city = await prisma.city.findFirst({
      where: {
        label: {
          equals: label,
          mode: "insensitive", // this will make the search case-insensitive
        },
      },
    });

    return city;
  }
}
export class TagService {
  // ### PUBLICH METHODS
  // public method
  // static async publicMethod() {
  // }
  static async getByLabel(label) {
    const tag = await prisma.tag.findUnique({
      where: {
        label,
      },
    });
    return tag;
  }

  static async create(labelText) {
    const label = await prisma.tag.create({
      data: {
        label: labelText,
        value: labelText,
      },
    });
    return label;
  }

  static async getLabelsByQuery(query) {
    const tags = await prisma.tag.findMany({
      where: {
        label: {
          startsWith: query,
          mode: "insensitive",
        },
      },
      take: 10,
    });

    return tags;
  }
}
