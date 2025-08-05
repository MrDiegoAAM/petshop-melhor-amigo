@echo off
echo ===================================================
echo Instalando dependencias do Petshop "Melhor Amigo"
echo ===================================================
echo.

echo Verificando permissoes administrativas...
net session >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [AVISO] Este script pode precisar de permissoes administrativas para instalar dependencias globais.
    echo.
    echo Voce esta executando como administrador? (s/n)
    set /p admin_choice="Digite sua escolha: "
    if /i "%admin_choice%"=="n" (
        echo.
        echo COMO EXECUTAR COMO ADMINISTRADOR:
        echo 1. Feche este terminal
        echo 2. Clique com botao direito no PowerShell ou Prompt de Comando
        echo 3. Selecione "Executar como administrador"
        echo 4. Navegue ate este diretorio: cd "%~dp0"
        echo 5. Execute novamente: install.bat
        echo.
        echo Deseja continuar mesmo assim? (s/n)
        set /p continue_choice="Digite sua escolha: "
        if /i "%continue_choice%"=="n" (
            echo Instalacao cancelada. Execute como administrador para melhor experiencia.
            pause
            exit /b 1
        )
    )
    echo.
    echo [INFO] Continuando instalacao... (algumas dependencias globais podem falhar)
) else (
    echo [OK] Executando com permissoes administrativas.
)
echo.

echo Verificando se o Node.js esta instalado...
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERRO] Node.js nao encontrado! Por favor, instale o Node.js antes de continuar.
    echo.
    echo INSTRUCOES PARA INSTALAR O NODE.JS:
    echo 1. Acesse: https://nodejs.org/
    echo 2. Baixe a versao LTS (recomendada)
    echo 3. Execute o instalador e siga as instrucoes
    echo 4. Reinicie o terminal apos a instalacao
    echo 5. Execute novamente este arquivo: install.bat
    echo.
    echo ALTERNATIVA - Usar Chocolatey (se instalado):
    echo choco install nodejs
    echo.
    echo ALTERNATIVA - Usar winget (Windows 10/11):
    echo winget install OpenJS.NodeJS
    echo.
    echo Deseja tentar instalar automaticamente via winget? (s/n)
    set /p choice="Digite sua escolha: "
    if /i "%choice%"=="s" (
        echo Tentando instalar Node.js via winget...
        winget install OpenJS.NodeJS
        if %ERRORLEVEL% equ 0 (
            echo.
            echo Node.js instalado com sucesso! Reinicie o terminal e execute install.bat novamente.
            echo.
        ) else (
            echo.
            echo Falha na instalacao automatica. Por favor, instale manualmente.
            echo.
        )
    )
    pause
    exit /b 1
)

echo Node.js encontrado: 
node --version
echo.

echo Verificando se o npm esta instalado...
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERRO] npm nao encontrado! Por favor, reinstale o Node.js para incluir o npm.
    echo.
    pause
    exit /b 1
)

echo npm encontrado: 
npm --version
echo.

echo Instalando dependencias do projeto...
echo (Este processo pode demorar alguns minutos)
echo.

:: Verifica se o package.json existe
if not exist package.json (
    echo [ERRO] Arquivo package.json nao encontrado!
    echo Este projeto requer um package.json existente.
    echo Por favor, certifique-se de estar no diretorio correto do projeto.
    echo.
    pause
    exit /b 1
) else (
    echo Verificando se o package.json tem as dependencias necessarias...
    findstr "express" package.json >nul 2>nul
    if %ERRORLEVEL% neq 0 (
        echo [AVISO] Dependencia 'express' nao encontrada no package.json.
        echo Certifique-se de que todas as dependencias necessarias estejam instaladas.
    )
)

:: Instala as dependências principais
echo Instalando dependencias principais...

:: Limpa o cache do npm para evitar problemas de instalação
echo Limpando cache do npm...
npm cache clean --force

:: Instala todas as dependências do package.json
echo Instalando todas as dependencias do package.json...
npm install

if %ERRORLEVEL% neq 0 (
    echo [AVISO] Falha ao instalar dependencias. Tentando com cache limpo...
    
    echo Limpando cache do npm novamente...
    npm cache clean --force
    
    echo Removendo node_modules se existir...
    if exist node_modules (
        rmdir /s /q node_modules
    )
    
    echo Tentando instalar novamente...
    npm install
    
    if %ERRORLEVEL% neq 0 (
        echo.
        echo [ERRO] Ocorreu um erro durante a instalacao das dependencias.
        echo Por favor, verifique as mensagens de erro acima e tente novamente.
        echo Voce pode tentar executar manualmente: npm install
        echo.
        pause
        exit /b 1
    )
)

echo.
echo Instalando dependencias globais necessarias...

:: Tenta instalar tsx globalmente com privilégios elevados
echo Tentando instalar tsx globalmente...
npm install -g tsx

if %ERRORLEVEL% neq 0 (
    echo.
    echo [AVISO] Nao foi possivel instalar tsx globalmente. Tentando instalar localmente...
    
    :: Garante que tsx está instalado localmente
    npm install --save-dev tsx
    
    if %ERRORLEVEL% neq 0 (
        echo [ERRO] Falha ao instalar tsx. Tentando uma última alternativa...
        
        :: Tenta usar npx para instalar tsx
        npx tsx --version >nul 2>nul
        
        if %ERRORLEVEL% neq 0 (
            echo [ERRO] Falha ao instalar tsx. O servidor pode nao funcionar corretamente.
            echo Por favor, execute o script como administrador ou instale tsx manualmente.
            echo npm install -g tsx
            echo.
            pause
        ) else (
            echo [INFO] tsx está disponível via npx.
        )
    ) else (
        echo [INFO] tsx instalado localmente com sucesso.
    )
) else (
    echo [INFO] tsx instalado globalmente com sucesso.
)

echo.
echo Configurando arquivo .env...

if not exist .env (
    echo Criando arquivo .env com configuracoes padrao...
    echo PORT=5001 > .env
    echo NODE_ENV=development >> .env
    echo # DATABASE_URL=postgresql://postgres:postgres@localhost:5432/petshop >> .env
    echo.
    echo [INFO] Arquivo .env criado com configuracoes padrao.
    echo O projeto usara SQLite por padrao (nao requer configuracao adicional).
    echo Para usar PostgreSQL, descomente e configure a linha DATABASE_URL no arquivo .env.
)

echo.
echo Verificando se as dependencias foram instaladas corretamente...
if not exist node_modules\express (
    echo [AVISO] Dependencia 'express' nao encontrada. Tentando limpar cache e reinstalar...
    
    echo Limpando cache do npm...
    npm cache clean --force
    
    echo Removendo node_modules...
    rmdir /s /q node_modules
    
    echo Reinstalando todas as dependencias...
    npm install
    
    if %ERRORLEVEL% neq 0 (
        echo [ERRO] Falha ao reinstalar dependencias.
        echo Por favor, tente instalar manualmente: npm install
    ) else (
        echo Dependencias reinstaladas com sucesso!
    )
) else (
    echo Todas as dependencias necessarias foram instaladas corretamente.
)

echo.
echo ===================================================
echo Instalacao concluida com sucesso!
echo.
echo Para executar o projeto, use o comando: run.bat
echo ===================================================
echo.

pause