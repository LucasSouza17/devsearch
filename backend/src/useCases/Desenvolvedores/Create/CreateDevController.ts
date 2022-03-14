import { Request, Response } from "express"
import { CreateDevUseCase } from "./CreateDevUseCase"

class CreateDevController {
  async handle(request: Request, response: Response) {
    try {
      const { nome, sexo, datanascimento, hobby, nivel } = request.body;

      const createDevUseCase = new CreateDevUseCase();

      const dev = await createDevUseCase.execute({
        nome,
        sexo,
        datanascimento,
        hobby,
        nivel
      });

      return response.status(201).json(dev);
    } catch (err) {
      return response.status(400).json({message: "Erro ao criar desenvolvedor!"})
    }
  }
}

export { CreateDevController };