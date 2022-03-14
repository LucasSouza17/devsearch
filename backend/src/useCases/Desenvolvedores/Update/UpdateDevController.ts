import { Request, Response } from "express"
import { UpdateDevUseCase } from "./UpdateDevUseCase";

class UpdateDevController {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { nome, sexo, datanascimento, idade, hobby, nivel } = request.body;

      const createDevUseCase = new UpdateDevUseCase();

      const dev = await createDevUseCase.execute({
        id: Number(id),
        nome,
        sexo,
        datanascimento,
        idade,
        hobby,
        nivel
      });

      return response.status(200).json(dev);
    } catch (err) {
      return response.status(400).json({message: "Erro ao atualizar desenvolvedor!"})
    }
  }
}

export { UpdateDevController };