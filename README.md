# Petshop "Melhor Amigo" - Site de Serviços para Pets

## 🚀 Guia Rápido para Marinheiros de Primeira Viagem

**Primeira vez executando o projeto? Siga estes passos simples:**

### Passo 1: Instalar Dependências
```bash
install.bat
```
Este script irá:
- Verificar se Node.js está instalado
- Instalar todas as dependências necessárias
- Configurar o banco de dados SQLite automaticamente
- Criar o arquivo de configuração `.env`

### Passo 2: Iniciar os Serviços
```bash
run.bat
```
Este script irá:
- Verificar se a porta 5001 está disponível
- Iniciar o servidor backend (API)
- Iniciar o servidor frontend (interface)
- Abrir automaticamente no navegador

### Passo 3: Acessar o Site
Após executar os scripts acima, o site estará disponível em:
```
http://localhost:5001
```

**⚠️ IMPORTANTE**: É necessário executar os serviços (Passo 2) ANTES de tentar acessar a página no navegador. Sem os serviços rodando, a página não carregará corretamente.

### Credenciais de Acesso Administrativo
- **Usuário**: admin
- **Senha**: infinity

---

## Descrição do Projeto

**"Melhor Amigo"** é uma aplicação web completa e moderna desenvolvida para petshops, criada com foco na experiência do usuário e facilidade de gerenciamento. O projeto combina um frontend responsivo e intuitivo com um backend robusto, oferecendo uma solução completa para estabelecimentos que cuidam de pets.

### 🎯 O que é o "Melhor Amigo"?
É uma plataforma digital que conecta donos de pets com serviços de qualidade, permitindo:
- **Para Clientes**: Agendamento fácil de serviços, visualização de produtos e contato direto
- **Para Administradores**: Gestão completa do negócio através de um painel administrativo intuitivo
- **Para o Negócio**: Presença digital profissional com funcionalidades que aumentam a eficiência operacional

### 🛠️ Arquitetura Tecnológica
O projeto utiliza uma arquitetura **full-stack moderna** com TypeScript, garantindo type-safety em todo o código:

**Stack Principal:**
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript  
- **Banco de Dados**: SQLite (padrão) / PostgreSQL (opcional)
- **Build Tool**: Vite (desenvolvimento rápido e otimizado)

O sistema foi projetado para ser **fácil de instalar e executar**, com scripts automatizados que verificam dependências, configuram o ambiente e iniciam todos os serviços necessários com apenas dois comandos.

## Funcionalidades

### Para Clientes
- Visualização de serviços oferecidos
- Agendamento de serviços (banho, tosa, etc.)
- Visualização de produtos disponíveis por categoria
- Envio de mensagens de contato
- Inscrição em newsletter
- Galeria de fotos de pets atendidos

### Para Administradores
- Login administrativo seguro
- Gerenciamento completo de agendamentos (visualização de todos os agendamentos recebidos)
- Gerenciamento completo de produtos (adicionar, visualizar e deletar produtos)
- Visualização e gerenciamento de mensagens de contato
- Gerenciamento completo da galeria de fotos (adicionar e deletar imagens)
- Interface administrativa organizada em abas para melhor usabilidade

## Tecnologias Utilizadas

### Frontend
- **React**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Radix UI**: Biblioteca de componentes acessíveis
- **React Query**: Biblioteca para gerenciamento de estado e requisições
- **React Hook Form**: Biblioteca para gerenciamento de formulários
- **Wouter**: Biblioteca leve para roteamento
- **Zod**: Biblioteca para validação de esquemas
- **Framer Motion**: Biblioteca para animações
- **Lucide React**: Biblioteca de ícones

### Backend
- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web para Node.js
- **Drizzle ORM**: ORM (Object-Relational Mapping) para banco de dados
- **SQLite**: Banco de dados local padrão (better-sqlite3)
- **PostgreSQL**: Banco de dados relacional (opcional)
- **TypeScript**: Superset tipado de JavaScript
- **nanoid**: Biblioteca para geração de IDs únicos

### Ferramentas de Build e Desenvolvimento
- **Vite**: Ferramenta de build e desenvolvimento
- **ESBuild**: Bundler JavaScript rápido
- **TypeScript**: Para tipagem estática
- **tsx**: Executor de TypeScript para Node.js

## Estrutura do Projeto

```
├── client/                  # Código do frontend
│   ├── index.html          # Arquivo HTML principal
│   └── src/                # Código fonte do frontend
│       ├── App.tsx        # Componente principal da aplicação
│       ├── components/    # Componentes reutilizáveis
│       ├── hooks/         # Hooks personalizados
│       ├── lib/           # Bibliotecas e utilitários
│       ├── pages/         # Páginas da aplicação
│       └── main.tsx       # Ponto de entrada da aplicação React
├── server/                 # Código do backend
│   ├── db.ts              # Configuração do banco de dados
│   ├── index.ts           # Ponto de entrada do servidor
│   ├── routes.ts          # Definição das rotas da API
│   ├── storage.ts         # Lógica de armazenamento e acesso aos dados
│   └── vite.ts            # Configuração do Vite para o servidor
├── shared/                 # Código compartilhado entre frontend e backend
│   └── schema.ts          # Esquemas de dados e validação
├── attached_assets/        # Arquivos estáticos (imagens, etc.)
├── package.json           # Dependências e scripts do projeto
├── README.md              # Documentação do projeto
├── install.bat            # Script para instalação de dependências
├── run.bat                # Script para execução do projeto
└── outros arquivos de configuração (tsconfig.json, vite.config.ts, etc.)
```

## Requisitos do Sistema

- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes do Node.js)
- PostgreSQL (opcional - o sistema pode funcionar com armazenamento em memória para testes)

## Configuração do Banco de Dados

O projeto suporta três tipos de armazenamento:

1. **SQLite** (padrão): Arquivo local `database.sqlite` - **Não requer configuração adicional**
2. **PostgreSQL**: Para produção ou desenvolvimento avançado
3. **Memória**: Fallback automático quando outros não estão disponíveis

#### Configuração SQLite (Padrão)
O SQLite é usado automaticamente. O arquivo de banco será criado como `database.sqlite` na raiz do projeto.

#### Configuração PostgreSQL (Opcional)
Para usar PostgreSQL, descomente e configure a variável `DATABASE_URL` no arquivo `.env`:

```
# Descomente a linha abaixo para usar PostgreSQL
# DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
```

#### Armazenamento em Memória (Fallback)
Se nem SQLite nem PostgreSQL estiverem disponíveis, o sistema utilizará automaticamente armazenamento em memória para fins de teste.

### Ordem de Prioridade
1. **SQLite** (se disponível) - Persistência local
2. **PostgreSQL** (se configurado) - Banco de dados robusto
3. **Memória** (fallback) - Para testes e desenvolvimento

**Nota importante**: O diretório `data/` está incluído no `.gitignore` para não versionar os arquivos do banco SQLite.

## APIs Disponíveis

O sistema oferece as seguintes APIs REST:

### Autenticação
- `POST /api/admin/login` - Login administrativo

### Agendamentos
- `POST /api/bookings` - Criar novo agendamento
- `GET /api/bookings` - Listar todos os agendamentos (admin)

### Galeria
- `GET /api/gallery` - Listar todas as imagens da galeria
- `POST /api/gallery` - Adicionar nova imagem à galeria (admin)
- `DELETE /api/gallery/:id` - Deletar imagem da galeria (admin)

### Contatos
- `POST /api/contacts` - Enviar mensagem de contato
- `GET /api/contacts` - Listar todas as mensagens (admin)

### Produtos
- `GET /api/products` - Listar todos os produtos
- `POST /api/products` - Adicionar novo produto (admin)
- `DELETE /api/products/:id` - Deletar produto (admin)

## Instalação

Para instalar as dependências do projeto, você tem as seguintes opções:

### Opção 1: Script automatizado (Recomendado)
```
install.bat
```

### Opção 2: Comando manual
```
npm install
```

O script `install.bat` oferece as seguintes vantagens:
- Verifica se Node.js e npm estão instalados
- Limpa o cache do npm automaticamente
- Cria o arquivo `.env` com configurações padrão se não existir
- Tenta reinstalar dependências em caso de falha
- Configura o projeto para usar SQLite por padrão

## Execução

Para executar o projeto, você tem as seguintes opções:

### Opção 1: Script automatizado (Recomendado)
```
run.bat
```

### Opção 2: Comando manual
```
npm run dev
```

### Opção 3: Para Windows com variáveis de ambiente
```
npm run dev:win
```

O servidor será iniciado na porta 5001 por padrão. Você pode acessar o site através do navegador no endereço:

```
http://localhost:5001
```

### Notas importantes sobre a execução

1. O script `run.bat` verifica automaticamente se a porta 5001 está disponível e tenta liberar a porta caso esteja em uso.
2. O projeto usa SQLite por padrão (não requer configuração adicional). Se o PostgreSQL estiver configurado, será usado automaticamente.
3. O servidor utiliza o módulo `tsx` para executar o TypeScript diretamente, sem necessidade de compilação prévia.
4. No Windows, o script `dev` funciona sem variáveis de ambiente. Use `dev:win` se precisar definir NODE_ENV explicitamente.

## Resolução de Problemas

### 🆘 Para Marinheiros de Primeira Viagem

**Problema: "A página não carrega" ou "Erro de conexão"**
- ✅ **Solução**: Certifique-se de que executou o `run.bat` ANTES de tentar acessar http://localhost:5001
- ✅ **Verificação**: Veja se apareceu a mensagem "Server running on port 5001" no terminal

**Problema: "Node.js não é reconhecido como comando"**
- ✅ **Solução**: Instale o Node.js em https://nodejs.org (versão 18 ou superior)
- ✅ **Verificação**: Abra um novo terminal e digite `node --version`

**Problema: "Erro ao executar install.bat"**
- ✅ **Solução**: Execute o terminal como administrador
- ✅ **Alternativa**: Use `npm install` diretamente

**Problema: "A página mostra erro 404 ou não encontra arquivos"**
- ✅ **Solução**: Aguarde alguns segundos após executar `run.bat` - o servidor precisa de tempo para inicializar
- ✅ **Verificação**: Veja se não há mensagens de erro no terminal

### Porta em uso
Se você encontrar o erro "EADDRINUSE" (endereço já em uso), significa que a porta 5001 já está sendo utilizada por outro processo. Você pode:

1. Usar o script `run.bat` que tenta liberar a porta automaticamente
2. Alterar a porta no arquivo `.env` definindo `PORT=outra_porta`
3. Encerrar manualmente o processo que está usando a porta

### Problemas de instalação
Se encontrar erros durante a instalação:

1. Use o script `install.bat` que limpa o cache e reinstala dependências automaticamente
2. Verifique se Node.js (versão 18+) e npm estão instalados corretamente
3. Execute `npm cache clean --force` e tente novamente

### Problemas com banco de dados
- **SQLite**: Funciona automaticamente, sem configuração necessária
- **PostgreSQL**: Se configurado mas não disponível, o sistema fará fallback para SQLite
- **Permissões**: Certifique-se de que o diretório do projeto tem permissões de escrita para criar o arquivo SQLite

### Problemas no Windows
- Use `npm run dev:win` se precisar definir variáveis de ambiente explicitamente
- Certifique-se de estar usando PowerShell ou Command Prompt como administrador se necessário

## Acesso Administrativo

Para acessar a área administrativa, utilize as seguintes credenciais:

- **Usuário**: admin
- **Senha**: infinity

### Funcionalidades do Painel Administrativo

O painel administrativo é organizado em 4 abas principais:

#### 1. Agendamentos
- Visualização de todos os agendamentos recebidos
- Informações detalhadas: nome do cliente, telefone, serviço solicitado, data e horário
- Ordenação por data de criação (mais recentes primeiro)

#### 2. Contatos
- Visualização de todas as mensagens de contato recebidas
- Informações incluem: nome, email, telefone (opcional), mensagem e status de newsletter
- Identificação visual para clientes inscritos na newsletter

#### 3. Galeria
- **Adicionar imagens**: Upload de novas imagens para a galeria com URL e descrição
- **Visualizar imagens**: Grid responsivo com todas as imagens da galeria
- **Deletar imagens**: Botão de exclusão que aparece ao passar o mouse sobre cada imagem
- **Confirmação de exclusão**: Sistema de confirmação antes de deletar imagens
- Feedback visual com notificações de sucesso/erro

#### 4. Produtos
- **Adicionar produtos**: Formulário completo para cadastro de novos produtos
  - Nome, descrição, preço, categoria e URL da imagem
  - Categorias disponíveis: "Brinquedos Interativos" e "Produtos de Higiene"
- **Visualizar produtos**: Lista de todos os produtos cadastrados com informações detalhadas
- **Deletar produtos**: Botão de exclusão com confirmação para cada produto
- Organização por categoria e data de criação

## Contribuição

Para contribuir com o projeto, siga os passos abaixo:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.