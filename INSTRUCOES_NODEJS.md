# Instruções para Instalar Node.js

## Por que preciso do Node.js?

O Node.js é necessário para executar este projeto de petshop, pois ele:
- Executa o servidor backend
- Gerencia as dependências do projeto (via npm)
- Compila e executa o código TypeScript

## Como Instalar o Node.js

### Método 1: Download Manual (Recomendado)

1. **Acesse o site oficial**: https://nodejs.org/
2. **Baixe a versão LTS** (Long Term Support) - é a mais estável
3. **Execute o instalador** baixado
4. **Siga as instruções** do instalador (aceite as configurações padrão)
5. **Reinicie o terminal** após a instalação

### Método 2: Via winget (Windows 10/11)

Abra o PowerShell como administrador e execute:
```powershell
winget install OpenJS.NodeJS
```

### Método 3: Via Chocolatey (se você tem o Chocolatey instalado)

Abra o PowerShell como administrador e execute:
```powershell
choco install nodejs
```

## Verificar se a Instalação Funcionou

Após instalar, abra um **novo terminal** e execute:

```powershell
node --version
npm --version
```

Se ambos os comandos retornarem números de versão, a instalação foi bem-sucedida!

## Próximos Passos

1. **Feche e reabra o terminal** (importante!)
2. **Execute o terminal como administrador** (recomendado):
   - Clique com botão direito no PowerShell ou Prompt de Comando
   - Selecione "Executar como administrador"
   - Navegue até o diretório do projeto
3. **Execute novamente**: `.\install.bat`
4. O script irá automaticamente instalar todas as dependências do projeto

## Problemas Comuns

- **"node não é reconhecido"**: Reinicie o terminal após a instalação
- **Erro de permissão**: Execute o PowerShell como administrador
- **Falha ao instalar dependências globais**: Execute como administrador
- **"npm install" falha**: Use o script `install.bat` como administrador
- **Instalação lenta**: É normal, o npm pode demorar alguns minutos

### Por que preciso de permissões administrativas?

O script `install.bat` tenta instalar algumas dependências globalmente (como `tsx`) que requerem permissões administrativas. Embora seja possível executar sem essas permissões, você pode encontrar limitações na funcionalidade.

## Suporte

Se ainda tiver problemas, verifique:
- Se você reiniciou o terminal após instalar o Node.js
- Se a instalação foi concluída sem erros
- Se você está executando o comando no diretório correto do projeto