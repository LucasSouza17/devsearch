/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

const devs = [
  {
    nivel: 1,
    nome: "Ana Karolina",
    sexo: "F",
    datanascimento: "2003-09-18",
    idade: 18,
    hobby: "Escutar música",
  },
  {
    nivel: 1,
    nome: "Gabriel Foloni",
    sexo: "M",
    datanascimento: "2001-01-09",
    idade: 21,
    hobby: "Jogar",
  },
  {
    nivel: 1,
    nome: "Lara Bernardo",
    sexo: "F",
    datanascimento: "2002-07-19",
    idade: 17,
    hobby: "Escutar música",
  },
  {
    nivel: 1,
    nome: "Leonardo Franzoti",
    sexo: "M",
    datanascimento: "2003-09-11",
    idade: 18,
    hobby: "Escutar música",
  },
  {
    nivel: 1,
    nome: "Telisom Santos",
    sexo: "M",
    datanascimento: "2000-03-18",
    idade: 21,
    hobby: "Ver vídeos no tiktok",
  }
]

describe("Create Dev", () => {
  it("Should be able to create desenvolvedor", async () => {
    for (let i = 0; i <= 4; i++) {
      const response = await request(app).post("/dev").send({
        nivel: devs[i].nivel,
        nome: devs[i].nome,
        sexo: devs[i].sexo,
        datanascimento: devs[i].datanascimento,
        hobby: devs[i].hobby,
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
    }
  })

  it("Should be able to format idade starting datanascimnento", async () => {
    const response = await request(app).post("/dev").send({
      nivel: 1,
      nome: "William Cola",
      sexo: "M",
      datanascimento: "2000-02-18",
      hobby: "Ver vídeos no tiktok",
    });

    expect(response.status).toBe(201);
    expect(response.body.idade).toBe(22);
    expect(response.body).toHaveProperty("id");
  })

  it("Should not be able to create desenvolvedor if body is incorrect", async () => {
    const response = await request(app).post("/dev").send({
      nivel: 1,
      nome: "Telisom Santos",
      sexo: "M",
      datanascimento: "2000-03-18",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Erro ao criar desenvolvedor!");

  })
})

describe("Get Desenvolvedores", () => {
  it("Should be able to get desenvolvedores", async () => {
    const response = await request(app).get("/dev")

    expect(response.status).toBe(200);
    expect(response.headers).toHaveProperty("x-total-count")
  })

  it("Should be able to get desenvolvedores with pagination", async () => {
    const response = await request(app).get("/dev").query({
      page: "2"
    })

    expect(response.status).toBe(200);
  })

  it("Should be able to order by asc", async () => {
    const mockAsc = ["Ana Karolina", "Gabriel Foloni", "Lara Bernardo", "Leonardo Franzoti", "Lucas Souza"];

    const response = await request(app).get("/dev").query({
      order: "asc"
    })

    interface ResponseI {
      nome: string
    }

    const data = response.body.map((data: ResponseI) => data.nome);

    expect(data).toStrictEqual(mockAsc);
    expect(response.status).toBe(200);
  })

  it("Should be able to order by desc", async () => {
    const mockDesc = ["Lara Bernardo", "Leonardo Franzoti", "Lucas Souza", "Telisom Santos", "William Cola"];

    const response = await request(app).get("/dev").query({
      order: "desc"
    })

    interface ResponseI {
      nome: string
    }

    const data = response.body.map((data: ResponseI) => data.nome);

    expect(data).toStrictEqual(mockDesc.reverse());
    expect(response.status).toBe(200);
  })

  it("Should be able to search by nome", async () => {
    const response = await request(app).get("/dev").query({
      search: "Lucas"
    })

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  })

  it("Should not be able to return data if search not corresponds", async () => {
    const response = await request(app).get("/dev").query({
      search: "Silvia"
    })

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Nenhum desenvolvedor encontrado.");
  })

  it("Should not be able to fetch data if there are no more pages", async () => {
    const response = await request(app).get("/dev").query({
      page: "3"
    })

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Nenhum desenvolvedor encontrado.");
  })

  it("Should not be able to fetch data if query params are incorrect", async () => {
    const response = await request(app).get("/dev").query({
      page: "teste",
      order: "primeiro"
    })

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Erro ao buscar desenvolvedores!");
  })

})

describe("Update Desenvolvedor", () => {
  it("Should be able to update desenvolvedor", async () => {
    const response = await request(app).put("/dev/2").send({
      nivel: 1,
      nome: "Ana Karolina Vilarim",
      sexo: "F",
      datanascimento: "2003-09-18",
      idade: 18,
      hobby: "Escutar música",
    })

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe("Ana Karolina Vilarim");
    expect(response.body).toHaveProperty("id");
  })

  it("Should not be able to update nivel if body is incorrect", async () => {
    const response = await request(app).put("/dev/2").send({
      nivel: "Bronze"
    })

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Erro ao atualizar desenvolvedor!");
  })
})

describe("Delete Desenvolvedor", () => {
  it("Should be able to delete desenvolvedor", async () => {
    const response = await request(app).delete("/dev/4");

    expect(response.status).toBe(204);
  })

  it("Should not be able to delete desenvolvedor if not exists", async () => {
    const response = await request(app).delete("/dev/100");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Erro ao remover desenvolvedor!");
  })
})