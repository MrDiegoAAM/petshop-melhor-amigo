# Petshop "Melhor Amigo" - Site de Serviços para Pets - Projeto Infinity School (Nível Difícil)

⚠️Vídeo demonstrativo em https://youtu.be/B6Fde4X5Tgo ⚠️
Guia Rápido para Marinheiros de Primeira Viagem

**Primeira vez executando o projeto? Siga estes passos simples:**

### Passo 1: Instalar Dependências
```bash
install.bat (Sim, criei um script para preparar o ambiente)
```
**⚠️ IMPORTANTE**: Execute o terminal como **administrador** para melhor experiência.

**Como executar como administrador:**
1. Clique com botão direito no PowerShell ou Prompt de Comando
2. Selecione "Executar como administrador"
3. Navegue até o diretório do projeto
4. Execute: `install.bat`

Este script irá:
- Verificar permissões administrativas
- Verificar se Node.js está instalado
- Instalar todas as dependências necessárias
- Configurar o banco de dados SQLite automaticamente
- Criar o arquivo de configuração `.env`

### Passo 2: Iniciar os Serviços

**Opção Recomendada (PowerShell):**
```powershell
PowerShell -ExecutionPolicy Bypass -File .\run.ps1
```

**Opção Alternativa (CMD):**
```bash
run.bat (Usei esse script para levantar o PostGreSQL, depois simplifiquei o projeto para usar o SQLite)
```

O script PowerShell (`run.ps1`) é mais robusto e irá:
- Detectar automaticamente o Node.js em locais padrão de instalação
- Adicionar Node.js ao PATH temporariamente se necessário
- Verificar se as dependências estão instaladas
- Verificar se o arquivo .env está configurado
- Iniciar o servidor backend e frontend
- Usar `npm.cmd` diretamente para evitar problemas de política de execução

**💡 Dica**: O script PowerShell resolve automaticamente problemas comuns de compatibilidade e política de execução do Windows.

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
- **Sistema de autenticação completo com sessões**:
  - Login administrativo seguro com validação
  - Sessões persistentes que mantêm o usuário logado
  - Logout seguro que encerra a sessão
  - Verificação automática de autenticação
  - Ícone dinâmico que muda quando logado (exibe `logado.jpg`)
  - Acesso inteligente: botão Admin abre diretamente o painel se já autenticado
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
- **Express Session**: Middleware para gerenciamento de sessões
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
│   ├── logado.jpg         # Ícone exibido quando usuário está autenticado
│   └── outras imagens...  # Imagens de produtos, galeria, etc.
├── package.json           # Dependências e scripts do projeto
├── README.md              # Documentação do projeto
├── install.bat            # Script para instalação de dependências
├── run.bat                # Script para execução do projeto
└── outros arquivos de configuração (tsconfig.json, vite.config.ts, etc.)
```

## Requisitos do Sistema

- **Node.js** (versão 18 ou superior) - [Download aqui](https://nodejs.org/)
- **npm** (gerenciador de pacotes do Node.js - incluído com Node.js)
- **Permissões Administrativas** (recomendado para instalação de dependências globais)
- **PostgreSQL** (opcional - o sistema pode funcionar com SQLite por padrão)

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

**Notas importantes**: 
- O diretório `data/` está incluído no `.gitignore` para não versionar os arquivos do banco SQLite
- Os arquivos em `attached_assets/` são servidos estaticamente pelo Vite e acessíveis diretamente pela URL (ex: `/logado.jpg`)

## APIs Disponíveis

O sistema oferece as seguintes APIs REST:

### Autenticação
- `POST /api/admin/login` - Login administrativo
- `POST /api/admin/logout` - Logout administrativo
- `GET /api/admin/status` - Verificar status de autenticação

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
**⚠️ Execute como administrador para melhor experiência!**

### Opção 2: Comando manual
```
npm install
```

O script `install.bat` oferece as seguintes vantagens:
- **Verifica permissões administrativas** e orienta o usuário
- Verifica se Node.js e npm estão instalados
- **Oferece instalação automática do Node.js** via winget (Windows 10/11)
- Limpa o cache do npm automaticamente
- Cria o arquivo `.env` com configurações padrão se não existir
- Tenta reinstalar dependências em caso de falha
- Configura o projeto para usar SQLite por padrão
- **Instala dependências globais** necessárias (como tsx)

## Execução

Para executar o projeto, você tem as seguintes opções:

### Opção 1: Script PowerShell (Mais Recomendado)
```powershell
PowerShell -ExecutionPolicy Bypass -File .\run.ps1
```
**🚀 Script mais robusto** que resolve problemas de compatibilidade automaticamente!

### Opção 2: Script CMD (Alternativo)
```
run.bat
```
**🚀 Script inteligente** que resolve problemas automaticamente!

### Opção 3: Comando manual
```
npm run dev
```

### Opção 4: Para Windows com variáveis de ambiente
```
npm run dev:win
```

O servidor será iniciado na porta 5001 por padrão. Você pode acessar o site através do navegador no endereço:

```
http://localhost:5001
```

### Notas importantes sobre a execução

1. **Script PowerShell (`run.ps1`)**: Mais robusto, detecta Node.js automaticamente e resolve problemas de política de execução
2. **Script CMD (`run.bat`)**: Alternativa que verifica automaticamente Node.js, dependências e configurações
3. **Auto-instalação**: Se dependências não estiverem instaladas, instala automaticamente
4. **Detecção automática de Node.js**: Procura Node.js em locais padrão de instalação do Windows
5. **Resolução de PATH**: Adiciona Node.js ao PATH temporariamente se necessário
6. **Compatibilidade npm**: Usa `npm.cmd` diretamente para evitar problemas de política de execução
7. **Compatibilidade**: Funciona com SQLite (padrão) ou PostgreSQL (se configurado)
8. **TypeScript direto**: Usa `tsx` para executar TypeScript sem compilação prévia

## Resolução de Problemas

### 🆘 Para Marinheiros de Primeira Viagem

**Problema: "A página não carrega" ou "Erro de conexão"**
- ✅ **Solução**: Certifique-se de que executou o `run.bat` ANTES de tentar acessar http://localhost:5001
- ✅ **Verificação**: Veja se apareceu a mensagem "Server running on port 5001" no terminal

**Problema: "Node.js não é reconhecido como comando"**
- ✅ **Solução**: Instale o Node.js em https://nodejs.org (versão 18 ou superior)
- ✅ **Verificação**: Abra um novo terminal e digite `node --version`

**Problema: "Erro ao executar install.bat"**
- ✅ **Solução Principal**: Execute o terminal como administrador
  1. Clique com botão direito no PowerShell/Prompt
  2. Selecione "Executar como administrador"
  3. Navegue até o diretório do projeto
  4. Execute: `install.bat`
- ✅ **Alternativa**: Use `npm install` diretamente (pode falhar em dependências globais)

**Problema: "A página mostra erro 404 ou não encontra arquivos"**
- ✅ **Solução**: Aguarde alguns segundos após executar o script - o servidor precisa de tempo para inicializar
- ✅ **Verificação**: Veja se não há mensagens de erro no terminal

**Problema: "Política de execução do PowerShell"**
- ✅ **Solução**: Use o comando completo: `PowerShell -ExecutionPolicy Bypass -File .\run.ps1`
- ✅ **Alternativa**: Use o script CMD: `run.bat`

**Problema: "npm não é reconhecido" mesmo com Node.js instalado**
- ✅ **Solução**: Use o script PowerShell `run.ps1` que detecta automaticamente o Node.js
- ✅ **Verificação**: O script mostrará a versão do Node.js detectada

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
- **Recomendado**: Use o script PowerShell `run.ps1` que resolve automaticamente problemas de PATH e npm
- Use `npm run dev:win` se precisar definir variáveis de ambiente explicitamente
- Certifique-se de estar usando PowerShell ou Command Prompt como administrador se necessário
- Se houver problemas com política de execução, use: `PowerShell -ExecutionPolicy Bypass -File .\run.ps1`

## Acesso Administrativo

Para acessar a área administrativa, utilize as seguintes credenciais:

- **Usuário**: admin
- **Senha**: infinity

### Funcionalidades do Painel Administrativo

O painel administrativo possui um **sistema de autenticação robusto** com as seguintes características:

#### Sistema de Autenticação
- **Sessões Persistentes**: Uma vez logado, o usuário permanece autenticado mesmo ao fechar e reabrir o navegador
- **Verificação Automática**: O sistema verifica automaticamente o status de autenticação a cada minuto
- **Ícone Dinâmico**: O ícone do usuário na navegação muda para `logado.jpg` quando autenticado
- **Acesso Inteligente**: 
  - Se não autenticado: botão "Admin" abre modal de login
  - Se já autenticado: botão "Admin" abre diretamente o painel administrativo
- **Logout Seguro**: Botão de logout que encerra a sessão e retorna ao ícone padrão
- **Diferenciação de Botões**: 
  - Botão "X": apenas fecha o modal (mantém usuário logado)
  - Botão "Logout": faz logout e fecha o modal

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
