const NodeEnvironment = require("jest-environment-node");
const { v4: uuid } = require("uuid");
const { execSync } = require("child_process");
const { resolve } = require("path");
const mysql = require("mysql");

require("dotenv").config({
  path: resolve(__dirname, "..", ".env.test"),
});

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.schema = `code_schema_${uuid()}`;
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}?schema=${this.schema}`;
  }

  setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    // Rodar as migrations
    execSync(`npx prisma migrate dev`);

    const connection = mysql.createConnection(this.connectionString);
    connection.connect();
    connection.query("INSERT INTO tb_niveis (nivel) VALUES ('Bronze'); ")
    connection.query("INSERT INTO tb_desenvolvedores (nome, sexo, datanascimento, idade, hobby, nivel) VALUES ('Lucas Souza', 'M', '2003-01-17', 19, 'Escutar música', 1) ")
    connection.end();
  }

  async teardown() {
    const connection = mysql.createConnection(this.connectionString);
    connection.connect();
    const database = `"` + this.schema + `"`
    connection.query("DROP DATABASE IF EXISTS " + `${database.replace(/"/g, "`")}` + ";");
    connection.end();
  }
}

module.exports = CustomEnvironment;