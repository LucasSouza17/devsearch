import { Request, Response } from "express"
import { GetDevUseCase } from "./GetDevUseCase";

class GetDevController {
  async handle(request: Request, response: Response) {
    try {
      const { page = 1, search = "", order = "asc" } = request.query;

      const getDevUseCase = new GetDevUseCase();

      const dev = await getDevUseCase.execute({
        page: Number(page),
        search: String(search),
        order: <"asc" | "desc">order
      });

      if(dev === 404) {
        return response.status(404).json({message: "Nenhum desenvolvedor encontrado."})
      }

      response.header("X-Total-Count", String(dev.totalDevs))

      return response.status(200).json(dev.dev);
    } catch (err) {
      return response.status(400).json({message: "Erro ao buscar desenvolvedores!"})
    }
  }
}

export { GetDevController };