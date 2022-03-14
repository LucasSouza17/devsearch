import { Request, Response } from "express"
import { DeleteDevUseCase } from "./DeleteDevUseCase";

class DeleteDevController {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params

      const deleteDevUseCase = new DeleteDevUseCase();

      const dev = await deleteDevUseCase.execute({
        id: Number(id)
      });

      return response.status(204).json(dev);
    } catch (err) {
      return response.status(400).json({ message: "Erro ao remover desenvolvedor!" })
    }
  }
}

export { DeleteDevController };