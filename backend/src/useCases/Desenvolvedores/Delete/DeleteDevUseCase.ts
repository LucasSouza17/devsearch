import { client } from "../../../prisma/client";

interface IDevRequest {
  id: number
}

class DeleteDevUseCase {
  async execute({ id }: IDevRequest) {
    const dev = await client.desenvolvedores.delete({
      where: {
        id: id
      }
    })

    return dev;
  }
}

export { DeleteDevUseCase }