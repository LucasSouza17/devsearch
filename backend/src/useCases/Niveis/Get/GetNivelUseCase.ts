import { client } from "../../../prisma/client";

interface INivelQuery {
  page: number
  search: string
  order: "asc" | "desc"
}

class GetNivelUseCase {
  async execute({page, search, order}: INivelQuery) {

    let skip: number;

    if (page === 1 || !page) {
      skip = 0;
    } else {
      skip = 5 * (Number(page) - 1)
    }

    const nivel = await client.niveis.findMany({
      where: {
        nivel: {
          startsWith: search
        }
      },
      orderBy: {
        nivel: order
      },
      skip,
      take: 5,
      include: {
        _count: {
          select: {
            Desenvolvedores:  true
          }
        }
      }
    })

    if(nivel.length === 0) {
      return 404
    }

    return nivel;
  }
}

export { GetNivelUseCase }