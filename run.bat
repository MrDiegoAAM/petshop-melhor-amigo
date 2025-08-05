@echo off
echo ===================================================
echo Iniciando o Petshop "Melhor Amigo"
echo ===================================================
echo.

echo Verificando se o Node.js esta instalado...

:: Primeiro verifica se Node.js está no PATH
where node >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [SUCESSO] Node.js detectado no PATH!
    goto :continue_execution
)

:: Se não estiver no PATH, procura nos locais padrão
echo [INFO] Node.js nao encontrado no PATH. Procurando em locais padrao...

:: Verifica locais comuns de instalação e testa diretamente
set "NODEJS_PATH=C:\Program Files\nodejs"
if exist "%NODEJS_PATH%\node.exe" (
    echo [INFO] Node.js encontrado em: %NODEJS_PATH%
    echo [INFO] Testando Node.js...
    "%NODEJS_PATH%\node.exe" --version >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        echo [SUCESSO] Node.js funciona corretamente!
        "%NODEJS_PATH%\node.exe" --version
        set "PATH=%NODEJS_PATH%;%PATH%"
        echo.
        goto :continue_execution
    )
)

set "NODEJS_PATH_X86=C:\Program Files (x86)\nodejs"
if exist "%NODEJS_PATH_X86%\node.exe" (
    echo [INFO] Node.js encontrado em: %NODEJS_PATH_X86%
    echo [INFO] Testando Node.js...
    "%NODEJS_PATH_X86%\node.exe" --version >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        echo [SUCESSO] Node.js funciona corretamente!
        "%NODEJS_PATH_X86%\node.exe" --version
        set "PATH=%NODEJS_PATH_X86%;%PATH%"
        echo.
        goto :continue_execution
    )
)

set "NODEJS_PATH_USER=%USERPROFILE%\AppData\Local\Programs\nodejs"
if exist "%NODEJS_PATH_USER%\node.exe" (
    echo [INFO] Node.js encontrado em: %NODEJS_PATH_USER%
    echo [INFO] Testando Node.js...
    "%NODEJS_PATH_USER%\node.exe" --version >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        echo [SUCESSO] Node.js funciona corretamente!
        "%NODEJS_PATH_USER%\node.exe" --version
        set "PATH=%NODEJS_PATH_USER%;%PATH%"
        echo.
        goto :continue_execution
    )
)

:: Se chegou aqui, Node.js não foi encontrado ou não funciona
echo [ERRO] Node.js nao encontrado! Por favor, instale o Node.js antes de continuar.
    echo.
    echo INSTRUCOES PARA INSTALAR O NODE.JS:
    echo 1. Acesse: https://nodejs.org/
    echo 2. Baixe a versao LTS (recomendada)
    echo 3. Execute o instalador e siga as instrucoes
    echo 4. Reinicie o terminal apos a instalacao
    echo 5. Execute novamente este arquivo: run.bat
    echo.
    echo ALTERNATIVA - Usar winget (Windows 10/11):
    echo winget install OpenJS.NodeJS
    echo.
    echo ALTERNATIVA - Executar instalacao automatica:
    echo Execute: install.bat (como administrador)
    echo.
    echo Deseja tentar instalar automaticamente via winget? (s/n)
    set /p choice="Digite sua escolha: "
    if /i "%choice%"=="s" (
        echo Tentando instalar Node.js via winget...
        winget install OpenJS.NodeJS
        if %ERRORLEVEL% equ 0 (
            echo.
            echo Node.js instalado com sucesso! Atualizando variaveis de ambiente...
            echo.
            
            :: Usa o script auxiliar para atualizar variáveis de ambiente
            call refresh-env.bat
            if %ERRORLEVEL% equ 0 (
                echo [SUCESSO] Node.js detectado! Continuando execucao...
                echo.
                goto :continue_execution
            ) else (
                echo [AVISO] Node.js instalado mas ainda nao detectado neste terminal.
                echo.
                echo SOLUCOES:
                echo 1. Feche este terminal e abra um novo como administrador
                echo 2. Execute: run.bat
                echo 3. Ou reinicie o computador se o problema persistir
                echo.
                pause
                exit /b 1
            )
        ) else (
            echo.
            echo Falha na instalacao automatica. Por favor, instale manualmente ou execute install.bat.
            echo.
        )
    )
    pause
    exit /b 1

:continue_execution
echo Verificando se as dependencias estao instaladas...
if not exist node_modules (
    echo [AVISO] Dependencias nao encontradas. Executando instalacao...
    echo [INFO] Para melhor experiencia, execute install.bat como administrador.
    echo.
    call install.bat
    if %ERRORLEVEL% neq 0 (
        echo [ERRO] Falha ao instalar dependencias.
        echo [DICA] Tente executar install.bat como administrador:
        echo 1. Feche este terminal
        echo 2. Abra PowerShell como administrador
        echo 3. Navegue ate este diretorio
        echo 4. Execute: install.bat
        echo.
        pause
        exit /b 1
    )
)

echo.
echo Carregando variaveis de ambiente...

:: Verifica se o arquivo .env existe
if not exist .env (
    echo [AVISO] Arquivo .env nao encontrado. Executando instalacao...
    echo [INFO] Para melhor experiencia, execute install.bat como administrador.
    echo.
    call install.bat
    if %ERRORLEVEL% neq 0 (
        echo [ERRO] Falha ao configurar o ambiente.
        echo [DICA] Tente executar install.bat como administrador primeiro.
        echo.
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
    echo.
    echo SOLUCOES POSSIVEIS:
    echo 1. Execute install.bat como administrador primeiro
    echo 2. Verifique se o Node.js esta instalado: node --version
    echo 3. Verifique se as dependencias estao instaladas: npm list
    echo 4. Limpe o cache: npm cache clean --force
    echo.
    echo COMO EXECUTAR INSTALL.BAT COMO ADMINISTRADOR:
    echo 1. Feche este terminal
    echo 2. Clique com botao direito no PowerShell
    echo 3. Selecione "Executar como administrador"
    echo 4. Navegue ate este diretorio
    echo 5. Execute: install.bat
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