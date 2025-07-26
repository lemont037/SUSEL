<h1 align="center">👩‍💼 SUSEL - Sistema Unificado de Seleções</h1>
<p align="center">
  <img src="https://img.shields.io/badge/versão-0.0.1-blue" alt="Versão">
  <img src="https://img.shields.io/badge/docker-suportado-0db7ed?logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/github/license/lemont037/susel" alt="Licença">
  <img src="https://img.shields.io/github/last-commit/lemont037/susel" alt="Último commit">
  <img src="https://img.shields.io/github/issues/lemont037/susel" alt="Issues abertas">
</p>


**SUSEL** é uma plataforma moderna para gestão completa de **processos seletivos**, desde a **inscrição de candidatos**, **envio de documentos**, até o **acompanhamento de etapas e divulgação de resultados**.

Feito com tecnologias web de ponta, o SUSEL é ideal para instituições que desejam mais organização, transparência e eficiência nos seus processos de seleção.

## 🧰 Tecnologias Utilizadas

<table>
  <thead>
    <tr>
      <th>Categoria</th>
      <th>Tecnologia</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Backend</strong></td>
      <td>Node.js</td>
      <td>Backend leve e escalável</td>
    </tr>
    <tr>
      <td rowspan="2"><strong>Frontend</strong></td>
      <td>React.js</td>
      <td>Criação de componentes interativos e responsivos</td>
    </tr>
    <tr>
      <td>Next.js</td>
      <td>Framework completo para SSR, rotas e performance</td>
    </tr>
    <tr>
      <td><strong>Banco de Dados</strong></td>
      <td>MongoDB</td>
      <td>Banco de dados NoSQL para flexibilidade nos dados dos candidatos</td>
    </tr>
  </tbody>
</table>



## 📦 Como rodar localmente

### ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [MongoDB local](https://www.mongodb.com/docs/manual/installation/) ou [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### 🔧 Passos

#### 1. Clone o Repositório 
```bash
git clone https://github.com/lemont037/SUSEL.git
cd susel
```
#### 2. Crie um arquivo .env na raiz do seu projeto e adicione as variáveis de ambiente necessárias.

> Este arquivo não está incluído no repositório por questões de segurança, então você deve criá-lo manualmente. O arquivo deve conter o seguintes conteúdo:
```
PORT = 3001
MONGO_URI = mongodb://localhost:27017/susel
JWT_SECRET = 'crie uma chave com crypto'
JWT_REFRESH_SECRET = 'crie uma chave com crypto'
JWT_EXPIRES_IN = 'tempo desejado (s, m, h, d)'
```
#### 3. Instalar as dependências:
Antes de rodar o projeto, instale as dependências tanto para o backend quanto para o frontend.

#### 3.1 Backend
Navegue até a pasta do backend e instale as dependências:
```
cd backend
npm install
```
#### 3.2 Frontend

Navegue até a pasta do frontend e instale as dependências:
```
cd ../frontend
npm install
```
#### 4. Rodando o Projeto

Agora que você tem todas as dependências instaladas, você pode rodar o backend e o frontend.

#### 4.1 Rodando o Backend

No backend, o script server já está configurado para rodar o servidor usando Nodemon. O Nodemon irá reiniciar automaticamente o servidor sempre que houver alterações no código.

```
cd backend
npm run server
```
Isso irá iniciar o servidor backend na porta configurada no arquivo .env (default: 3001).
#### 4.2 Rodando o Frontend

No frontend, o script dev está configurado para rodar o Next.js em modo de desenvolvimento.

```
cd frontend
npm run dev
```
Isso irá iniciar o servidor Next.js na porta 3000 por padrão.

#### 5. Acessando o Projeto
- Frontend: Acesse o frontend na URL http://localhost:3000 no seu navegador.

- Backend: A API do backend estará acessível em http://localhost:3001.

#### 6. Testando a Conexão com o MongoDB

O backend utiliza o MongoDB localmente. Certifique-se de que o MongoDB está rodando na sua máquina.
```
mongod
```
Ou abra o aplicativo MongoDB Compass.
> Caso esteja usando o MongoDB Atlas ou outro serviço de banco de dados, ajuste a variável MONGO_URI no seu arquivo .env para refletir a URI de conexão do seu banco.

## Licença

Este projeto está licenciado sob a MIT License - consulte o arquivo LICENSE para mais detalhes.