import { client } from "../../../prisma/client";

interface INivelRequest {
  id: number
  nivel: string
}

class UpdateNivelUseCase {
  async execute({ id, nivel }: INivelRequest) {
    const updateNivel = await client.niveis.update({
      where: {
        id: id
      },
      data: {
        nivel
      }
    })

    return updateNivel;

  }
}

export { UpdateNivelUseCase }