import { Request, Response, } from "express"
import { DeleteNivelUseCase } from "./DeleteNivelUseCase";

class DeleteNivelController {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params

      const deleteNivelUseCase = new DeleteNivelUseCase();

      const nivel = await deleteNivelUseCase.execute({
        id: Number(id)
      });

      if (nivel === 501) {
        return response.status(501).json({ message: "Nivel não poderá ser removido até que nenhum usuário pertenca mais a ele." })
      }

      return response.status(204).json(nivel);
    } catch (err) {
      return response.status(400).json({ message: "Erro ao remover nível!" })
    }
  }
}

export { DeleteNivelController };