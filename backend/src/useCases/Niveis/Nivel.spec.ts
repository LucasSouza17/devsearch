/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

const niveis = ["Ferro", "Prata", "Ouro", "Platina", "Diamante"]

describe("Create Nivel", () => {
  it("Should be able to create nivel", async () => {
    for (let i = 0; i <= 4; i++) {
      const response = await request(app).post("/nivel").send({
        nivel: niveis[i]
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
    }

  })

  it("Should not be able to create nivel if body is incorrect", async () => {
    for (let i = 0; i <= 5; i++) {
      const response = await request(app).post("/nivel").send({
        nivel: i
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Erro ao criar nível!");
    }

  })
})

describe("Get Nivel", () => {
  it("Should be able to get niveis", async () => {
    const response = await request(app).get("/nivel")

    expect(response.headers).toHaveProperty("x-total-count")
    expect(response.status).toBe(200)
  })

  it("Should be able to get niveis with pagination", async () => {
    const response = await request(app).get("/nivel").query({
      page: "2"
    })

    expect(response.status).toBe(200);
  })

  it("Should be able to order by asc", async () => {
    const mockAsc = ["Bronze", "Diamante", "Ferro", "Ouro", "Platina"]

    const response = await request(app).get("/nivel").query({
      order: "asc"
    })

    interface ResponseI {
      nivel: string
    }

    const data = response.body.map((data: ResponseI) => data.nivel);

    expect(data).toStrictEqual(mockAsc)
    expect(response.status).toBe(200)
  })

  it("Should be able to order by desc", async () => {
    const mockDesc = ["Prata", "Platina", "Ouro", "Ferro", "Diamante"]

    const response = await request(app).get("/nivel").query({
      order: "desc"
    })

    interface ResponseI {
      nivel: string
    }


    const data = response.body.map((data: ResponseI) => data.nivel);

    expect(data).toStrictEqual(mockDesc)
    expect(response.status).toBe(200)
  })

  it("Should be able to search by nivel", async () => {
    const response = await request(app).get("/nivel").query({
      search: "prata"
    })

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  })

  it("Should not be able to return data if search not corresponds", async () => {
    const response = await request(app).get("/nivel").query({
      search: "mestre"
    })

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Nenhum nível encontrado.");
  })

  it("Should not be able to fetch data if there are no more pages", async () => {
    const response = await request(app).get("/nivel").query({
      page: "3"
    })

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Nenhum nível encontrado.");
  })

  it("Should not be able to fetch data if query params are incorrect", async () => {
    const response = await request(app).get("/nivel").query({
      page: "teste",
      order: "primeiro"
    })

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Erro ao buscar níveis!");
  })

  it("Should be able to get how much devs are in respect level", async () => {
    const response = await request(app).get("/nivel")

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("_count");
  })
})

describe("Update Nivel", () => {
  it("Should be able to update nivel", async () => {
    const response = await request(app).put("/nivel/1").send({
      nivel: "Bronze 1"
    });

    expect(response.status).toBe(200);
    expect(response.body.nivel).toBe("Bronze 1");
    expect(response.body).toHaveProperty("id");
  })

  it("Should not be able to update nivel if body is incorrect", async () => {
    const response = await request(app).put("/nivel/1").send({
      nivel: 1
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Erro ao atualizar nível!");
  })
})

describe("Delete Nivel", () => {
  it("Should be able to delete nivel", async () => {
    const response = await request(app).delete("/nivel/3")

    expect(response.status).toBe(204);
  })

  it("Should not be able to delete nivel if nivel not exists", async () => {
    const response = await request(app).delete("/nivel/100")

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Erro ao remover nível!");
  })

  it("Should not be able to delete nivel if dev has the nivel", async () => {
    const response = await request(app).delete("/nivel/1")

    expect(response.status).toBe(501);
    expect(response.body.message).toBe("Nivel não poderá ser removido até que nenhum usuário pertenca mais a ele.");
  })
})