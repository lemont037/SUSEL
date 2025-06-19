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


## 🚀 Funcionalidades

- 📋 Inscrição online com cadastro de dados e envio de documentos
- 📎 Upload e verificação de documentos obrigatórios
- 🗓️ Acompanhamento de etapas e cronogramas
- 📢 Notificações automáticas por e-mail
- 🧾 Resultados com classificação em tempo real
- 🛠️ Painel administrativo com gestão de vagas e candidatos
- 🔒 Autenticação segura com JSON Web Tokens (JWT)


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
    <tr>
      <td><strong>Infraestrutura</strong></td>
      <td>Docker</td>
      <td>Contêineres para desenvolvimento e deploy consistentes</td>
    </tr>
  </tbody>
</table>



## 📦 Como rodar localmente

### ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [MongoDB local ou MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### 🔧 Passos

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/susel.git
cd susel

# Copie e configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas chaves de conexão

# Suba os serviços com Docker
docker-compose up --build
