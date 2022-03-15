import { Request, Response } from "express"
import { GetNivelUseCase } from "./GetNivelUseCase";

class GetNivelController {
  async handle(request: Request, response: Response) {
    try {
      const { page = 1, search = "", order = "asc" } = request.query;

      const getNivelUseCase = new GetNivelUseCase();

      const nivel = await getNivelUseCase.execute({
        page: Number(page),
        search: String(search),
        order: <"asc" | "desc">order
      });

      if(nivel === 404) {
        return response.status(404).json({message: "Nenhum nível encontrado."})
      }

      response.header("X-Total-Count", String(nivel.totalNivels))

      return response.status(200).json(nivel.nivel);
    } catch (err) {
      return response.status(400).json({message: "Erro ao buscar níveis!"})
    }
  }
}

export { GetNivelController };