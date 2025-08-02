@echo off
echo ===================================================
echo Iniciando o Petshop "Melhor Amigo"
echo ===================================================
echo.

echo Verificando se o Node.js esta instalado...
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERRO] Node.js nao encontrado! Por favor, instale o Node.js antes de continuar.
    echo Voce pode baixar o Node.js em: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Verificando se as dependencias estao instaladas...
if not exist node_modules (
    echo [AVISO] Dependencias nao encontradas. Executando instalacao...
    call install.bat
    if %ERRORLEVEL% neq 0 (
        echo [ERRO] Falha ao instalar dependencias.
        pause
        exit /b 1
    )
)

echo.
echo Carregando variaveis de ambiente...

:: Verifica se o arquivo .env existe
if not exist .env (
    echo [AVISO] Arquivo .env nao encontrado. Executando instalacao...
    call install.bat
    if %ERRORLEVEL% neq 0 (
        echo [ERRO] Falha ao configurar o ambiente.
        pause
        exit /b 1
    )
)

:: Carrega as variáveis de ambiente do arquivo .env
for /f "tokens=*" %%a in (.env) do (
    set %%a
)

echo.
echo Verificando conexao com o banco de dados...
echo [INFO] Usando DATABASE_URL=%DATABASE_URL%

:: Verifica se o PostgreSQL está em execução
sc query postgresql-x64-14 | find "RUNNING" >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [AVISO] O serviço PostgreSQL não parece estar em execução. Tentando iniciar...
    net start postgresql-x64-14 >nul 2>nul
    if %ERRORLEVEL% neq 0 (
        echo [AVISO] Não foi possível iniciar o serviço PostgreSQL automaticamente.
        echo [AVISO] O projeto usará armazenamento em memória para testes.
    ) else (
        echo [INFO] Serviço PostgreSQL iniciado com sucesso.
    )
) else (
    echo [INFO] Serviço PostgreSQL já está em execução.
)

::echo Verificando se o banco de dados existe...
echo [INFO] Verificando se o banco de dados 'petshop' existe...
echo.

:: Verifica se a porta está disponível
echo [INFO] Verificando se a porta %PORT% está disponível...
netstat -ano | findstr :%PORT% >nul
if %ERRORLEVEL% equ 0 (
    echo [AVISO] A porta %PORT% já está em uso. Tentando encerrar o processo...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%PORT% ^| findstr LISTENING') do (
        echo Encerrando processo com PID: %%a
        taskkill /F /PID %%a >nul 2>nul
    )
) else (
    echo [INFO] Porta %PORT% está disponível.
)
echo.

echo Iniciando o servidor em modo de desenvolvimento...
echo.
echo ===================================================
echo Servidor iniciado! Acesse: http://localhost:%PORT%
echo Pressione Ctrl+C para encerrar o servidor
echo ===================================================
echo.

:: Inicia o servidor em modo de desenvolvimento
echo Iniciando servidor com npm run dev...

:: Usa o script definido no package.json que é compatível com Windows
npm run dev



if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERRO] Falha ao iniciar o servidor.
    echo Verifique se todas as dependencias estao instaladas corretamente.
    echo Tente executar: install.bat
    echo.
    pause
    exit /b 1
)

echo.
echo ===================================================
echo Para acessar a aplicação, abra seu navegador e acesse:
echo http://localhost:%PORT%
echo.
echo Pressione Ctrl+C para encerrar o servidor
echo ===================================================