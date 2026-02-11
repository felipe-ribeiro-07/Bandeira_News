# 🖋️ Editorial Stack - Sistema de Gerenciamento de Notícias

Um projeto Full Stack desenvolvido com uma estética editorial de luxo, integrando um motor de busca de notícias, portal biográfico e um sistema administrativo completo para gestão de conteúdo.

## 🏗️ Arquitetura e Padrões
O projeto segue o padrão **MVC (Model-View-Controller)** para garantir a escalabilidade e organização do código:
- **Models:** Gerenciamento de dados e integração com o Banco de Dados.
- **Views:** Interfaces dinâmicas renderizadas (EJS/Handlebars).
- **Controllers:** Lógica de negócio e mediação entre rotas e dados.

## 🛠️ Tecnologias e Ferramentas

### Back-end
- **Runtime:** Node.js
- **Framework:** Express.js
- **Template Engine:** Handlebars
- **Autenticação:** Express-Session / BCrypt (Segurança de senhas)

### Banco de Dados (Relacional)
- **Engine:** PostgreSQL
- **ORM:** Sequelize (ou queries puras)
- **Entidades:** - `Users`: Gestão de administradores e permissões.
  - `Noticias`: Repositório geral de conteúdo.
  - `NoticiasGE`: Segmento especializado para notícias do ge.globo.

## 🚀 Funcionalidades do Sistema

- **CRUD Completo:** Criação, leitura, edição e exclusão de notícias.
- **Sistema de Rotas:** Rotas protegidas para administração e rotas públicas para leitura.
- **Auth System:** Login seguro para gerenciamento do portal.


## 🎨 Identidade Visual (Front-end)
- **Estética:** Design inspirado em revistas modernas (Modern Editorial).
- **Paleta de Cores:** Verde Ação, Roxo Editorial e Marrom Institucional.
- **Animações:** AOS (Animate On Scroll) e Particles.js.

## 📁 Estrutura de Pastas (MVC)

```text
├── controllers/       # Lógica das rotas (Ex: noticiaController.js)
├── models/            # Definição das tabelas e esquemas
├── routes/            # Definição dos endpoints (Ex: adminRoutes.js)
├── views/             # Arquivos .ejs ou .html de interface
├── public/            # Arquivos estáticos (CSS, JS, Imagens)
├── database/          # Configuração da conexão com o banco
├── index.js           # Ponto de entrada da aplicação
└── package.json       # Dependências e scripts