const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const CategoriaController = require('./controllers/CategoriaController')
const AnuncioController = require('./controllers/AnuncioController')
const UsuarioController = require('./controllers/UsuarioController');
const FornecedorController = require('./controllers/FornecedorController')
const EnderecoController = require('./controllers/EnderecoController')
const verifyToken = require('./config/verifyToken');

const routes = express.Router();
const upload = multer(multerConfig);


const swaggerOptions = {
    swaggerDefinition: {
        info: {
          version: "4.1.4",
          title: "Projeto BFriend - S7",
          description: "Documentação da API do projeto.",
          contact: {
            name: "https://github.com/grmelito/ProjetoFC-Squad7"
          },
          servers: ["http://localhost:3333"]
        }
      },
      // ['.routes/*.js']
      apis: ["src/routes.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//routes.get('/categorias/1', CategoriaController.showCategoria)

/**
* @swagger 
* /categorias:
*  get:
*    description: Use essa requisição para trazer todas as categorias
*    summary: Buscar todas as categorias
*    responses:
*       '200':
*           description: Requisição feita com sucesso
*/
routes.get('/categorias', CategoriaController.index)
/**
* @swagger 
* /usuarios:
*  get:
*    description: Use essa requisição para listar todos os usuarios
*    summary: Buscar todos os usuarios
*    responses:
*       '200':
*           description: Requisição feita com sucesso
*/
routes.get('/usuarios', UsuarioController.index)
/**
* @swagger 
* /profile:
*  get:
*     summary: Listar as informações de perfil do usuario.
*     parameters:
*       - in: header
*         name: auth-token
*         description: Use essa requisição para listar as informações do perfil usuario.
*         schema:
*           required: true
*           type: string
*     responses:
*       '200':
*         description: Requisição feita com sucesso
*       '400':
*         description: Token Inválido!
*/
routes.get('/profile', verifyToken, UsuarioController.showProfile)
/**
* @swagger 
* /anuncio/{id}:
*  get:
*     summary: Listar um anuncio.
*     parameters:
*       - in: path
*         name: id
*         description: Use essa requisição para listar um anuncio especifico
*         schema:
*           required: true
*           type: integer
*     responses:
*       '200':
*         description: Requisição feita com sucesso
*/
routes.get('/anuncio/:id', AnuncioController.showAnuncio)
/**
* @swagger 
* /anuncios:
*  get:
*     summary: Listar um anuncio com filtro page.
*     parameters:
*       - in: query
*         name: page
*         description: Use essa requisição para listar os anuncios(12 anuncios por página)
*         schema:
*           required: true
*           type: integer
*     responses:
*       '200':
*         description: Requisição feita com sucesso
*/
routes.get('/anuncios', AnuncioController.indexPage)

/**
* @swagger 
* /anuncios/filtro:
*  get:
*    description: Use essa requisição para filtar os anuncios por cidade, bairro ou categoria
*    summary: Filtrar anúncios 
*    parameters:
*       - in: query
*         name: Cidade
*         description: Cidade a ser buscada
*         schema:
*           required: true
*           type: string
*       - in: query
*         name: Bairro
*         description: Bairro a ser buscado
*         schema:
*           required: false
*           type: string
*       - in: query
*         name: Categoria
*         description: Digite o ID da categoria
*         schema:
*           required: false
*           type: integer
*    responses:
*       '200':
*           description: Requisição feita com sucesso
*/
routes.get('/anuncios/filtro', AnuncioController.proxAnuncio)
/**
* @swagger 
* /anuncios/categoria/{id}:
*  get:
*    description: Use essa requisição para listar todos os anúncios de uma categoria específica
*    summary: Buscar todos os anúncios de uma única categoria
*    parameters:
*       - in: path
*         name: id
*         description: Use essa requisição para listar um anuncio especifico
*         schema:
*           required: true
*           type: integer
*    responses:
*       '200':
*           description: Requisição feita com sucesso
*/
routes.get('/anuncios/categoria/:id', AnuncioController.indexCategoria)
/**
* @swagger 
* /fornecedores:
*  get:
*    description: Use essa requisição para listar todos os fornecedores
*    summary: Buscar todos os fornecedores
*    responses:
*       '200':
*           description: Requisição feita com sucesso
*/
routes.get('/fornecedores', FornecedorController.index)
/**
* @swagger 
* /estados:
*  get:
*    description: Use essa requisição para listar todos os estados
*    summary: Buscar todos os estados
*    responses:
*       '200':
*           description: Requisição feita com sucesso
*/
routes.get('/estados', EnderecoController.indexEstados)
/**
* @swagger 
* /cidades:
*  get:
*    description: Use essa requisição para listar todas as cidades
*    summary: Buscar todas as cidades
*    responses:
*       '200':
*           description: Requisição feita com sucesso
*/
routes.get('/cidades', EnderecoController.indexCidades)
/**
* @swagger 
* /comentario/{idAnuncio}:
*  get:
*    description: Use essa requisição para mostrar os comentários de um anuúncio
*    summary: Buscar comentários sobre o anúncio
*    parameters:
*       - in: path
*         name: idAnuncio
*         description: Digite o Id do anúncio
*         schema:
*           required: true
*           type: integer
*    responses:
*       '200':
*           description: Requisição feita com sucesso
*/
routes.get('/comentario/:idAnuncio', AnuncioController.showComentario)

/**
* @swagger
*   paths:
*      /login:
*        post:
*          summary: Processo de login.
*          consumes:
*            - application/json
*          parameters:
*            - in: body
*              name: user
*              description: Fazer login com um usuario existente.
*              schema:
*                type: object
*                required:
*                  - Email
*                  - Senha
*                properties:
*                  Email:
*                    type: string
*                  Senha:
*                    type: string
*          responses:
*            200:
*              description: Usuário logado
*/
routes.post('/login', UsuarioController.loginUser)
/**
* @swagger
*   paths:
*      /register:
*        post:
*          summary: Novo usuário.
*          consumes:
*            - application/json
*          parameters:
*            - in: body
*              name: user
*              description: Criar um novo usuário.
*              schema:
*                type: object
*                required:
*                  - Nome
*                  - Email
*                  - Senha
*                properties:
*                  Nome:
*                    type: string
*                  Email:
*                    type: string
*                  Senha:
*                    type: string
*          responses:
*            201:
*              description: Usuário criado
*/
routes.post('/register', UsuarioController.createUser)
/**
* @swagger
*   paths:
*      /upgrade/usuario:
*        post:
*          summary: Upgrade para fornecedor.
*          consumes:
*            - application/json
*          parameters:
*            - in: body
*              name: Fornecedor
*              description: Tornar a conta fornecedor podendo cadastrar seu anuncio.
*              schema:
*                type: object
*                required: true
*                  - CPFouCNPJ
*                properties:
*                  CPFouCNPJ:
*                    type: string
*            - in: header
*              name: auth-token
*              description: JWT de autorização
*              schema:
*                type: string
*                required: true
*          responses:
*            201:
*              description: Upgrade Para fornecedor realizado com sucesso.
*            400:
*              description: CPF Inválido.
*/
routes.post('/upgrade/usuario', verifyToken, FornecedorController.upgradeFornecedor)
/**
* @swagger
*   paths:
*      /create/endereco:
*        post:
*          summary: Cadastrando Endereço do Usuario.
*          consumes:
*            - application/json
*          parameters:
*            - in: body
*              name: user
*              description: Cadastrar seu endereço para poder ter o seu anuncio filtrado por proximidade.
*              schema:
*                type: object
*                required:
*                  - Cep
*                  - Rua
*                  - IdCidade
*                  - Numero
*                  - Complemento
*                  - Bairro
*                properties:
*                  Cep:
*                    type: string
*                  Rua:
*                    type: string
*                  IdCidade:
*                    type: integer
*                  Numero:
*                    type: string
*                  Complemento:
*                    type: string
*                  Bairro:
*                    type: string
*            - in: header
*              name: auth-token
*              description: JWT de autorização
*              schema:
*                type: string
*                required: true
*          responses:
*            200:
*              description: Email Cadastrado
*            400:
*              description: Informações Inválidas
*/
routes.post('/request/password', UsuarioController.recuperarSenha)
/**
* @swagger
*   paths:
*      /anuncio:
*        post:
*          summary: Cadastrando anuncio do usuario.
*          consumes:
*            - multipart/form-data
*          parameters:
*            - in: formData
*              name: Titulo
*              type: string
*              description: Titulo do Anuncio.
*            - in: formData
*              name: Facebook
*              type: string
*              description: Facebook do Anuncio.
*            - in: formData
*              name: Instagram
*              type: string
*              description: Instagram do Anuncio.
*            - in: formData
*              name: Site
*              type: string
*              description: Site do Anuncio.
*            - in: formData
*              name: Descricao
*              type: string
*              description: Descricao do Anuncio.
*            - in: formData
*              name: Telefone
*              type: string
*              description: Telefone do Anuncio.
*            - in: formData
*              name: IdCategoria
*              type: integer
*              description: Categoria do Anuncio.
*            - in: formData
*              name: files
*              type: file
*              description: Imagens do Anuncio.
*            - in: header
*              name: auth-token
*              description: JWT de autorização
*              contentType: undefined
*          responses:
*            200:
*              description: Anuncio cadastrado com sucesso.
*            400:
*              description: Erro ao cadastrar anuncio.
*/
routes.post('/anuncio', verifyToken, upload.array('files', 4), AnuncioController.createAnuncio)
/**
* @swagger
*   paths:
*      /request/password:
*        post:
*          summary: Recuperar a senha de login.
*          consumes:
*            - application/json
*          parameters:
*            - in: body
*              name: user
*              description: Enviar nome e email correspondentes para ter acesso a senha.
*              schema:
*                type: object
*                required:
*                  - Nome
*                  - Email
*                properties:
*                  Nome:
*                    type: string
*                  Email:
*                    type: string
*          responses:
*            200:
*              description: Senha Recuperada
*            400:
*              description: Informações Inválidas
*/
routes.post('/create/endereco', verifyToken, UsuarioController.createEndereco)
/**
* @swagger
*   paths:
*      /anuncio/{idAnuncio}/comentario:
*        post:
*          summary: Postar um comentário.
*          consumes:
*            - application/json
*          parameters:
*            - in: path
*              name: idAnuncio
*              required: true
*              type: integer
*              description: Parametro utilizado para verificar o id do anuncio
*            - in: body
*              name: Comentario
*              description: Escrever e postar um comentário relacioando ao anuncio.
*              schema:
*                type: object
*                required:
*                  - Comentario
*                properties:
*                  Comentario:
*                    type: string
*            - in: header
*              name: auth-token
*              description: JWT de autorização
*              schema:
*                type: string
*                required: true
*          responses:
*            200:
*              description: Comentario realizado com sucesso.
*            400:
*              description: Erro ao postar o comentario
*/
routes.post('/anuncio/:idAnuncio/comentario', verifyToken, AnuncioController.comentarioAnuncio)

/**
* @swagger
*   paths:
*      /update/profile:
*        put:
*          summary: Atualizando Informações do Usuario.
*          consumes:
*            - multipart/form-data
*          parameters:
*            - in: formData
*              name: Nome
*              type: string
*              description: Nome do Usuario.
*            - in: formData
*              name: Genero
*              type: string
*              description: Gênero do Usuario.
*            - in: formData
*              name: Cep
*              type: string
*              description: Cep do Usuario.
*            - in: formData
*              name: Rua
*              type: string
*              description: Endereço do Usuario.
*            - in: formData
*              name: Numero
*              type: string
*              description: Numero do Usuario.
*            - in: formData
*              name: Complemento
*              type: string
*              description: Complemento do Usuario.
*            - in: header
*              name: auth-token
*              description: JWT de autorização
*              contentType: undefined
*          responses:
*            200:
*              description: Perfil atualizado com sucesso.
*            400:
*              description: Erro ao atualizar seu perfil.
*/
routes.put('/update/profile', verifyToken, UsuarioController.updateUser)
/**
* @swagger
*   paths:
*      /update/profile/image:
*        put:
*          summary: Atualizar foto de perfil.
*          consumes:
*            - multipart/form-data
*          parameters:
*            - in: formData
*              name: file
*              type: file
*              description: Imagem de Perfil.
*            - in: header
*              name: auth-token
*              description: JWT de autorização
*              schema:
*                type: string
*                required: true
*          responses:
*            200:
*              description: Imagem alterada com sucesso.
*            400:
*              description: Erro ao fazer upload 
*/
routes.put('/update/profile/image', verifyToken, upload.single('file'), UsuarioController.updateImage)
/**
* @swagger
*   paths:
*      /update/anuncio:
*        put:
*          summary: Atualizando as informações do anuncio.
*          consumes:
*            - multipart/form-data
*          parameters:
*            - in: formData
*              name: Titulo
*              type: string
*              description: Titulo do Anuncio.
*            - in: formData
*              name: Facebook
*              type: string
*              description: Facebook do Anuncio.
*            - in: formData
*              name: Instagram
*              type: string
*              description: Instagram do Anuncio.
*            - in: formData
*              name: Site
*              type: string
*              description: Site do Anuncio.
*            - in: formData
*              name: Descricao
*              type: string
*              description: Descricao do Anuncio.
*            - in: formData
*              name: Telefone
*              type: string
*              description: Telefone do Anuncio.
*            - in: formData
*              name: IdCategoria
*              type: integer
*              description: Categoria do Anuncio.
*            - in: formData
*              name: files
*              type: file
*              description: Imagens do Anuncio.
*            - in: header
*              name: auth-token
*              description: JWT de autorização
*              contentType: undefined
*          responses:
*            200:
*              description: Anuncio atualizado com sucesso.
*            400:
*              description: Erro ao atualizar o anuncio.
*/
routes.put('/update/anuncio', verifyToken, upload.array('files', 4), AnuncioController.updateAnuncio)

routes.post('/testeupload', upload.single('file'), (req, res) => {
    console.log(req.file);

    return res.json({message: "Imagem cadastrada!"});
})


module.exports = routes;