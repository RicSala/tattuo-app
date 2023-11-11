import prisma from "@/lib/prismadb";

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
