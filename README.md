# 🧠 MediMind - Sistema de Controle de Medicamentos

<p align="center">
  <img src="public/favicon.png" alt="MediMind" width="500">
</p>

O **MediMind** é uma aplicação web interativa e amigável projetada para o monitoramento de tratamentos de saúde e cronogramas de medicamentos. Desenvolvido com foco em acessibilidade e usabilidade, o sistema permite o cadastro e gerenciamento de medicamentos, vitaminas e suplementos.

Além disso, a plataforma oferece acompanhamento visual dos horários de administração por meio de alertas coloridos, histórico automático de tomadas, sistema de gamificação por medalhas e persistência local dos dados, proporcionando uma experiência prática e intuitiva ao usuário.

---

# 🛠️ Extensões Recomendadas (VS Code)

Para obter a melhor experiência de desenvolvimento, recomenda-se instalar as seguintes extensões no Visual Studio Code:

* Angular Language Service;
* TypeScript Hero ou JavaScript and TypeScript Nightly;
* Prettier - Code Formatter;
* Tailwind CSS IntelliSense (Opcional).

---

# 🚀 Como Executar o Projeto

## Pré-requisitos

Antes de executar o projeto, certifique-se de que as seguintes ferramentas estão instaladas em sua máquina:

| Ferramenta  | Versão Recomendada  |
| ----------- | ------------------- |
| Node.js     |     24.11.1         |
| npm         |     11.6.2          |
| Angular CLI |     21.2.14         |
| TypeScript  |     5.9.3           |
| Git         |     2.52.0          |

Caso não possua o Angular CLI instalado:

```bash
npm install -g @angular/cli
```
Verificando as versões instaladas

Abra o terminal e execute os seguintes comandos:

node -v
npm -v
ng version
tsc -v
git --version

O resultado deverá ser semelhante a:

```bash
v24.11.1
11.6.2
Angular CLI: 21.2.14
Version 5.9.3
git version 2.52.0
```

Instalação das ferramentas
1. Node.js e npm

Baixe e instale a versão recomendada do Node.js pelo site oficial:
```bash
https://nodejs.org/
```
O npm é instalado automaticamente junto com o Node.js.
Após a instalação, verifique:
```bash
node -v
npm -v
```
2. Angular CLI

Caso não possua o Angular CLI instalado, execute:
```bash
npm install -g @angular/cli
```
Para confirmar a instalação:
```bash
ng version
```
Caso seja necessário instalar uma versão específica:
```bash
npm install -g @angular/cli@21.2.14
```
3. TypeScript
O TypeScript normalmente é instalado como dependência do projeto, mas também pode ser instalado globalmente:
```bash
npm install -g typescript
```
Para verificar:
```bash
tsc -v
```
Ou para instalar a versão recomendada:
```bash
npm install -g typescript@5.9.3
```
4. Git
Faça o download no site oficial:
```bash
https://git-scm.com/downloads
```
Após a instalação, verifique:
```bash
git --version
```
---

## 1. Clonar o Repositório

Clone o projeto utilizando:

```bash
git clone https://github.com/GuilhermeLeal1994/Medimind.git
```

Acesse a pasta do projeto:

```bash
cd Medimind
```

---

## 2. Instalar as Dependências

Instale todas as bibliotecas necessárias:

```bash
npm install
```

Este comando criará a pasta `node_modules` e instalará automaticamente todas as dependências do projeto.

---

## 3. Executar o Servidor de Desenvolvimento

Para iniciar a aplicação localmente:

```bash
ng serve
```

---

## 4. Acessar o Sistema

Após a compilação ser concluída com sucesso, abra o navegador e acesse:

```text
http://localhost:4200
```

---

# 📁 Principais Tecnologias

| Tecnologia  | Versão  |
| ----------- | ------- |
| Angular     | 21.2.16 |
| Angular CLI | 21.2.14 |
| TypeScript  | 5.9.3   |
| RxJS        | 7.8.2   |
| Angular SSR | 21.2.14 |
| Vitest      | 4.1.8   |

---

# 🏗️ Estrutura e Arquitetura

* Framework Principal: Angular 21 utilizando Componentes Standalone;
* Linguagem: TypeScript;
* Armazenamento: LocalStorage (API nativa do navegador) para persistência local dos dados;
* Estilização: CSS3 com identidade visual inspirada no setor HealthTech;
* Arquitetura: Organização modular dos componentes e separação entre interface e lógica de negócio.

---

# ✨ Funcionalidades

* Cadastro e gerenciamento de medicamentos;
* Cadastro e gerenciamento de vitaminas;
* Cadastro e gerenciamento de suplementos;
* Sistema de autenticação;
* Dashboard interativo;
* Alertas visuais para horários de administração;
* Histórico automático de tomadas;
* Persistência local dos dados;
* Sistema de gamificação por medalhas.

---

# 📌 Observações

As dependências do projeto são gerenciadas pelos arquivos `package.json` e `package-lock.json`.

Basta executar:

```bash
npm install
```

para que todas as bibliotecas necessárias sejam instaladas automaticamente.

---

# 👨‍💻 Autores

**Guilherme Leal**

**João Vitor Melo**

Projeto desenvolvido para a disciplina de Front-End do curso de Análise e Desenvolvimento de Sistemas.

---


# 📸 Interface do Sistema

<p align="center">
  <img src="public/medimind-login.png" alt="Tela de Login do MediMind" width="750">
</p>

O projeto foi desenvolvido para a disciplina de Front-End do curso de Análise e Desenvolvimento de Sistemas.
