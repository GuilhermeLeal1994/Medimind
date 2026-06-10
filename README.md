# 🧠 MediMind - Sistema de Controle de Medicamentos
<p align="center">
  <img src="public/favicon.png" alt="MediMind" width="500">
</p>

O MediMind é uma aplicação web interativa e amigável projetada para o monitoramento de tratamentos de saúde e cronogramas de medicamentos. Desenvolvido com foco em acessibilidade e usabilidade, o sistema permite o cadastro e gerenciamento de medicamentos, vitaminas e suplementos.

Além disso, a plataforma oferece acompanhamento visual dos horários de administração por meio de alertas coloridos, histórico automático de tomadas, sistema de gamificação por medalhas e persistência local dos dados, proporcionando uma experiência prática e intuitiva ao usuário.

# 🛠️ Extensões Recomendadas (VS Code)

Para obter a melhor experiência de desenvolvimento, recomenda-se instalar as seguintes extensões no Visual Studio Code:

- Angular Language Service
- Suporte ao Angular com autocompletar, navegação e validação de templates HTML.
- TypeScript Hero ou JavaScript and TypeScript Nightly
- Melhor gerenciamento de imports e recursos avançados do TypeScript.
- Prettier - Code Formatter
- Padronização automática da formatação do código.
- Tailwind CSS IntelliSense (Opcional)
- Recomendado caso sejam utilizados utilitários do Tailwind CSS.

# 🚀 Como Executar o Projeto:

Certifique-se de possuir instalado:

# Ferramenta/Versão
- Node.js	24.11.1
- npm	11.6.2
- Angular CLI	21.2.14
- TypeScript	5.9.3
- Git	2.52.0

Caso não possua o Angular CLI instalado:

npm install -g @angular/cli

# 1. Clonar o Repositório

git clone <URL_DO_REPOSITORIO>

Ou, caso já possua os arquivos, navegue até a pasta do projeto:

cd controle_de_medicamentos

# 2. Instalar as Dependências

Instale todas as bibliotecas necessárias:

npm install

Este comando criará a pasta node_modules e instalará automaticamente todas as dependências do projeto.

# 3. Executar o Servidor de Desenvolvimento

Para iniciar a aplicação localmente:

ng serve

# 4. Acessar o Sistema

Após a compilação ser concluída com sucesso, abra o navegador e acesse:

http://localhost:4200

# 📁 Principais Tecnologias:

- Tecnologia	Versão
- Angular	21.2.16
- Angular CLI	21.2.14
- TypeScript	5.9.3
- RxJS	7.8.2
- Angular SSR	21.2.14
- Vitest	4.1.8

# 🏗️ Estrutura e Arquitetura:

- Framework Principal: Angular 21 utilizando Componentes Standalone.
- Linguagem: TypeScript.
- Armazenamento: LocalStorage (API nativa do navegador) para persistência local dos dados.
- Estilização: CSS3 com identidade visual inspirada no setor HealthTech, utilizando uma paleta de cores voltada para acessibilidade e conforto visual.
- Arquitetura: Organização modular dos componentes e separação entre interface e lógica de negócio.

# ✨ Funcionalidades:

- Cadastro e gerenciamento de medicamentos;
- Cadastro e gerenciamento de vitaminas;
- Cadastro e gerenciamento de suplementos;
- Sistema de autenticação;
- Dashboard interativo;
- Alertas visuais para horários de administração;
- Histórico automático de tomadas;
- Persistência local dos dados;
- Sistema de gamificação por medalhas.

# 📌 Observações

As dependências do projeto são gerenciadas pelos arquivos package.json e package-lock.json. Basta executar:

npm install

para que todas as bibliotecas necessárias sejam instaladas automaticamente.

# 👨‍💻 Autores

Guilherme Leal
João Vitor Melo

O projeto foi desenvolvido para a disciplina de Front-End do curso de Análise e Desenvolvimento de Sistemas.

<p align="center">
  <img src="public/medimind-login.png" alt="MediMind" width="250">
</p>

