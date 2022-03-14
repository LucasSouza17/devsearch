import { client } from "../../../prisma/client";

interface IDevRequest {
  id: number
  nome: string
  sexo: string
  datanascimento: string
  idade: number
  hobby: string
  nivel: number
}

class UpdateDevUseCase {
  async execute({id, nome, sexo, datanascimento, idade, hobby, nivel}: IDevRequest) {

    const dev = await client.desenvolvedores.update({
      where: {
        id: id
      },
      data: {
        nome,
        sexo,
        datanascimento,
        idade,
        hobby,
        nivel
      }
    })

    return dev;
  }
}

export { UpdateDevUseCase }