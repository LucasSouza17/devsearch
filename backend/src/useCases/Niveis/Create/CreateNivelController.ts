import { Request, Response } from "express"
import { CreateNivelUseCase } from "./CreateNivelUseCase";

class CreateNivelController {
  async handle(request: Request, response: Response) {
    try {
      const { nivel } = request.body;

      const createNivelUseCase = new CreateNivelUseCase();

      const createNivel = await createNivelUseCase.execute({
        nivel
      });

      return response.status(201).json(createNivel);
    } catch (err) {
      return response.status(400).json({message: "Erro ao criar nível!"})
    }
  }
}

export { CreateNivelController };