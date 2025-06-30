# Sistema CRUD de livros

API RESTful de um sistema CRUD para livros

## Tecnologias:

* Node.js
* Express
* MongoDB
* Mongoose

## Funções:

1. Mostra livros
2. Criar livros
3. Atualizar livros
4. Deletar livros
5. Buscar livros

## Endpoints:

 Livros(/livros)

GET /livros → Mostra os livros

POST /livros → Cria um livro

PUT /livros/:id → Atualiza um livro

DELETE /livros/:id → Deleta um livro

GET /livros/busca?titulo=joao → Busca um livro por titulo

## Modelos:

 Livros
```
{
    titulo: String,
    autor: String,
    ano: String,
    genero: String,
}
```
## Licença

Este projeto está licenciado sob a Licença MIT.  
Veja o arquivo [LICENSE](./LICENSE) para mais informações.
