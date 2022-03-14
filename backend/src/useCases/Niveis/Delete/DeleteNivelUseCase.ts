import { client } from "../../../prisma/client";

interface INivelRequest {
  id: number
}

class DeleteNivelUseCase {
  async execute({ id }: INivelRequest) {
    const nivelBelongsToUser = await client.desenvolvedores.findMany({
      where: {
        nivel: Number(id)
      }
    })

    if(nivelBelongsToUser.length > 0) {
      return 501
    }

    const nivel = await client.niveis.delete({
      where: {
        id: id
      }
    })

    return nivel;
  }
}

export { DeleteNivelUseCase }