
**Nivel**
----
  Cria um nível
  
  * **URL**

    /nivel

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**
    
    **Required:**
    
  ```JSON
  {
	"nivel": String
  }
  ```

* **Success Response:**

  * **Code:** 201
  *  **Content:** 
  ```JSON
  {
    "id": Number
	"nivel": String
  }
  ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST
  * **Content:** `{ message : "Erro ao criar nível!" }`

* **Sample Call:**

  ```javascript
    axios.post('/nivel', {
	    nivel: "Bronze"
    })
    .then(data => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err)
    });
  ```
----
  Busca níveis

* **URL**

  /nivel

* **Method:**

  `GET`
  
* **URL Params**
 
   None

* **Data Params**

   None

* **Query Params**

  `page=[integer]`
  `search=[string]`
  `order=[asc, desc]`

* **Success Response:**

  * **Code:** 200
  *  **Content:** 
  ```JSON
  [
    {
        "id": Number
        "nivel": String,
        "_count": {
            "Desenvolvedores": Number
        }
    }
   ]
  ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND
  * **Content:** `{ message : "Nenhum nível encontrado." }`

  OR

  * **Code:** 400 BAD REQUEST
  * **Content:** `{ message : "Erro ao buscar níveis!" }`

* **Sample Call:**

  ```javascript
    axios.get('/nivel?page=1&order=asc&search=bron')
        .then(data => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err)
        });
  ```
----
  Atualiza um desenvolvedor

* **URL**

  /nivel/:id

* **Method:**

  `PUT`
  
*  **URL Params**

    **Required:**
 
   `id=[integer]`

* **Data Params**

    **Required:**

  ```JSON
  {
	"nivel": String
  }
  ```

* **Success Response:**

  * **Code:** 200
  *  **Content:**   
  ```JSON
  {
    "id": Number
	"nivel": String
  }
  ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST
  * **Content:** `{ message : "Erro ao atualizar nível!" }`

* **Sample Call:**

  ```javascript
    axios.put('/nivel/1', {
	    nivel: "Ferro"
    })
    .then(data => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err)
    });
  ```
 ----

  Remove um nível

* **URL**

  /nivel/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 204
  *  **Content:** `none`
 
* **Error Response:**

  * **Code:** 501 NOT IMPLEMENTED
  * **Content:** `{ message : "Nivel não poderá ser removido até que nenhum usuário pertenca mais a ele." }`

  OR

  * **Code:** 400 BAD REQUEST
  * **Content:** `{ message : "Erro ao remover nível!" }`

* **Sample Call:**

  ```javascript
    axios.delete('/nivel/1')
        .then(data => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err)
        });
  ```

----
**Desenvolvedor**
----
  Cria um desenvolvedor

* **URL**

  /dev

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

    **Required:**
    
  ```JSON
  {
	"nome": String,
	"sexo": String,
	"datanascimento": DateString ("2003-01-17"),
	"hobby": String,
	"nivel": Number
  }
  ```

* **Success Response:**

  * **Code:** 201
  *  **Content:** 
  ```JSON
  {
    "id": Number
	"nome": String,
	"sexo": String,
	"datanascimento": DateString ("2003-01-17"),
    "idade": Number
	"hobby": String,
	"nivel": Number
  }
  ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST
  * **Content:** `{ message : "Erro ao criar desenvolvedor!" }`

* **Sample Call:**

  ```javascript
    axios.post('/dev', {
	    nome: "Lucas Souza",
	    sexo: "M",
	    datanascimento: "2003-01-17",
	    hobby: "Usar tiktok",
	    nivel: 1
    })
    .then(data => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err)
    });
  ```
  ----
  Busca desenvolvedores

* **URL**

  /dev

* **Method:**

  `GET`
  
* **URL Params**
 
   None

* **Data Params**

  None

* **Query Params**

  `page=[integer]`
  `search=[string]`
  `order=[asc, desc]`

* **Success Response:**

  * **Code:** 200
  *  **Content:** 
  ```JSON
  [
    {
        "id": Number
        "nome": String,
        "sexo": String,
        "datanascimento": DateString ("2003-01-17"),
        "idade": Number
        "hobby": String,
        "nivel": Number,
        "Niveis": {
            "id": 1,
            "nivel": "Bronze"
        }
    }
   ]
  ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND
  * **Content:** `{ message : "Nenhum desenvolvedor encontrado." }`

  OR

  * **Code:** 400 BAD REQUEST
  * **Content:** `{ message : "Erro ao buscar desenvolvedores!" }`

* **Sample Call:**

  ```javascript
    axios.get('/dev?page=1&order=asc&search=lucas')
        .then(data => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err)
        });
  ```
  ----
  Atualiza um desenvolvedor

* **URL**

  /dev/:id

* **Method:**

  `PUT`
  
*  **URL Params**

    **Required:**
 
   `id=[integer]`

* **Data Params**

    **Required:**

  ```JSON
  {
	"nome": String,
	"sexo": String,
	"datanascimento": DateString ("2003-01-17"),
	"hobby": String,
	"nivel": Number
  }
  ```

* **Success Response:**

  * **Code:** 200
  *  **Content:**   
  ```JSON
  {
    "id": Number
	"nome": String,
	"sexo": String,
	"datanascimento": DateString ("2003-01-17"),
    "idade": Number
	"hobby": String,
	"nivel": Number
  }
  ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST
  * **Content:** `{ message : "Erro ao atualizar desenvolvedor!" }`

* **Sample Call:**

  ```javascript
    axios.put('/dev/1', {
	    nome: "Lucas Souza",
	    sexo: "M",
	    datanascimento: "2003-01-17",
	    hobby: "Usar tiktok",
	    nivel: 1
    })
    .then(data => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err)
    });
  ```
  ----
  Remove um desenvolvedor

* **URL**

  /dev/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 204
  *  **Content:** `none`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST
  * **Content:** `{ message : "Erro ao remover desenvolvedor!" }`

* **Sample Call:**

  ```javascript
    axios.delete('/dev/2')
        .then(data => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err)
        });
  ```