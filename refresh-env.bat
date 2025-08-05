@echo off
echo Atualizando variaveis de ambiente...

:: Tenta usar refreshenv se disponível (Chocolatey)
where refreshenv >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo Usando refreshenv...
    call refreshenv
    goto :check_node
)

:: Método alternativo: lê o registro do Windows
echo Lendo variaveis de ambiente do registro...
for /f "skip=2 tokens=2*" %%A in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v PATH 2^>nul') do set "SYSTEM_PATH=%%B"
for /f "skip=2 tokens=2*" %%A in ('reg query "HKCU\Environment" /v PATH 2^>nul') do set "USER_PATH=%%B"

:: Combina os PATHs
if defined USER_PATH (
    set "PATH=%SYSTEM_PATH%;%USER_PATH%"
) else (
    set "PATH=%SYSTEM_PATH%"
)

:: Adiciona caminhos comuns do Node.js se existirem
if exist "C:\Program Files\nodejs\node.exe" (
    set "PATH=C:\Program Files\nodejs;%PATH%"
    echo Node.js encontrado em: C:\Program Files\nodejs
)

if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set "PATH=C:\Program Files (x86)\nodejs;%PATH%"
    echo Node.js encontrado em: C:\Program Files (x86)\nodejs
)

if exist "%USERPROFILE%\AppData\Roaming\npm" (
    set "PATH=%USERPROFILE%\AppData\Roaming\npm;%PATH%"
    echo npm global encontrado em: %USERPROFILE%\AppData\Roaming\npm
)

:check_node
echo.
echo Verificando se Node.js esta disponivel...
where node >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [SUCESSO] Node.js detectado!
    node --version
    echo.
    where npm >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        echo [SUCESSO] npm detectado!
        npm --version
        echo.
        echo Variaveis de ambiente atualizadas com sucesso!
        exit /b 0
    ) else (
        echo [AVISO] npm nao detectado.
        exit /b 1
    )
) else (
    echo [ERRO] Node.js ainda nao detectado.
    echo Por favor, reinicie o terminal.
    exit /b 1
)