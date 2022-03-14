import { Request, Response } from "express"
import { UpdateNivelUseCase } from "./UpdateNivelUseCase";

class UpdateNivelController {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { nivel } = request.body;

      const createNivelUseCase = new UpdateNivelUseCase();

      const updateNivel = await createNivelUseCase.execute({
        id: Number(id),
        nivel
      });

      return response.status(200).json(updateNivel);
    } catch (err) {
      return response.status(400).json({message: "Erro ao atualizar nível!"})
    }
  }
}

export { UpdateNivelController };