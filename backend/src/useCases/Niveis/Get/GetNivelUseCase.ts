/** @format */

import { client } from "../../../prisma/client";

interface INivelQuery {
  page: number;
  search: string;
  order: "asc" | "desc";
  full: boolean;
}

class GetNivelUseCase {
  async execute({ page, search, order, full }: INivelQuery) {
    let skip: number;

    if (page === 1 || !page) {
      skip = 0;
    } else {
      skip = 5 * (Number(page) - 1);
    }

    const totalNivels = await client.niveis.count({
      where: {
        nivel: {
          startsWith: search,
        },
      },
    });

    const nivel = await client.niveis.findMany({
      where: {
        nivel: {
          startsWith: search,
        },
      },
      orderBy: {
        nivel: order,
      },
      skip,
      take: full ? totalNivels : 5,
      include: {
        _count: {
          select: {
            Desenvolvedores: true,
          },
        },
      },
    });

    if (nivel.length === 0) {
      return 404;
    }

    return { nivel, totalNivels };
  }
}

export { GetNivelUseCase };
