# 👩‍💼 SUSEL – Sistema Unificado de Seleções

**SUSEL** é uma plataforma moderna para gestão completa de **processos seletivos**, desde a **inscrição de candidatos**, **envio de documentos**, até o **acompanhamento de etapas e divulgação de resultados**.

Feito com tecnologias web de ponta, o SUSEL é ideal para instituições que desejam mais organização, transparência e eficiência nos seus processos de seleção.

---

## 🚀 Funcionalidades

- 📋 Inscrição online com cadastro de dados e envio de documentos
- 📎 Upload e verificação de documentos obrigatórios
- 🗓️ Acompanhamento de etapas e cronogramas
- 📢 Notificações automáticas por e-mail
- 🧾 Resultados com classificação em tempo real
- 🛠️ Painel administrativo com gestão de vagas e candidatos
- 🔒 Autenticação segura com JSON Web Tokens (JWT)

---

## 🧰 Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **Node.js** | Backend leve e escalável |
| **MongoDB** | Banco de dados NoSQL para flexibilidade nos dados dos candidatos |
| **React.js** | Criação de componentes interativos e responsivos |
| **Next.js** | Framework completo para SSR, rotas e performance |
| **Docker** | Contêineres para desenvolvimento e deploy consistentes |

---

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
