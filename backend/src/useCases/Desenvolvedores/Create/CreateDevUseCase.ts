import moment from "moment";
import { client } from "../../../prisma/client";

interface IDevRequest {
  nome: string
  sexo: string
  datanascimento: string
  hobby: string
  nivel: number
}

class CreateDevUseCase {
  async execute({ nome, sexo, datanascimento, hobby, nivel }: IDevRequest) {
    const idadeFormatted = moment().diff(new Date(datanascimento), 'years');

    const dev = await client.desenvolvedores.create({
      data: {
        nome,
        sexo,
        datanascimento,
        idade: idadeFormatted,
        hobby,
        nivel,
      }
    })

    return dev;
  }
}

export { CreateDevUseCase }