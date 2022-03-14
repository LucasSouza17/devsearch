import { client } from "../../../prisma/client";

interface IDevQuery {
  page: number
  search: string
  order: "asc" | "desc"
}

class GetDevUseCase {
  async execute({page, search, order}: IDevQuery) {

    let skip: number;

    if (page === 1 || !page) {
      skip = 0;
    } else {
      skip = 5 * (Number(page) - 1)
    }

    const dev = await client.desenvolvedores.findMany({
      where: {
        nome: {
          startsWith: search
        }
      },
      skip,
      take: 5,
      orderBy: {
        nome: order
      },
      include: {
        Niveis: true
      }
    })

    if(dev.length === 0) {
      return 404
    }

    return dev;
  }
}

export { GetDevUseCase }