import { client } from "../../../prisma/client";

interface INivelRequest {
  nivel: string
}

class CreateNivelUseCase {
  async execute({ nivel }: INivelRequest) {
    const createNivel = await client.niveis.create({
      data: {
        nivel
      }
    })

    return createNivel;

  }
}

export { CreateNivelUseCase }