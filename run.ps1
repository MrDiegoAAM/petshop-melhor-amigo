# Script PowerShell para executar o Petshop "Melhor Amigo"
# Versão otimizada para PowerShell com detecção automática do Node.js

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "Iniciando o Petshop 'Melhor Amigo'" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

# Função para verificar se Node.js está disponível
function Test-NodeJS {
    try {
        $null = Get-Command node -ErrorAction Stop
        return $true
    }
    catch {
        return $false
    }
}

# Função para adicionar Node.js ao PATH
function Add-NodeToPath {
    param([string]$NodePath)
    
    if (Test-Path "$NodePath\node.exe") {
        Write-Host "[INFO] Adicionando Node.js ao PATH: $NodePath" -ForegroundColor Yellow
        $env:PATH = "$NodePath;" + $env:PATH
        $global:NodePath = $NodePath
        return $true
    }
    return $false
}

# Função para executar npm
function Invoke-Npm {
    param([string[]]$Arguments)
    
    if ($global:NodePath) {
        & "$global:NodePath\npm.cmd" @Arguments
    }
    else {
        & npm @Arguments
    }
}

Write-Host "Verificando se o Node.js está instalado..." -ForegroundColor White

# Primeiro verifica se Node.js já está no PATH
if (Test-NodeJS) {
    Write-Host "[SUCESSO] Node.js detectado no PATH!" -ForegroundColor Green
    $nodeVersion = & node --version
    Write-Host "Versão: $nodeVersion" -ForegroundColor Green
    
    # Tenta encontrar o caminho do Node.js mesmo se estiver no PATH
    $nodePath = (Get-Command node -ErrorAction SilentlyContinue).Source
    if ($nodePath) {
        $global:NodePath = Split-Path $nodePath -Parent
        Write-Host "[INFO] Caminho do Node.js: $global:NodePath" -ForegroundColor Yellow
    }
    Write-Host ""
}
else {
    Write-Host "[INFO] Node.js não encontrado no PATH. Procurando em locais padrão..." -ForegroundColor Yellow
    
    # Lista de locais comuns onde Node.js pode estar instalado
    $nodePaths = @(
        "C:\Program Files\nodejs",
        "C:\Program Files (x86)\nodejs",
        "$env:USERPROFILE\AppData\Local\Programs\nodejs",
        "$env:USERPROFILE\AppData\Roaming\npm"
    )
    
    $nodeFound = $false
    
    foreach ($path in $nodePaths) {
        if (Test-Path "$path\node.exe") {
            Write-Host "[INFO] Node.js encontrado em: $path" -ForegroundColor Yellow
            
            if (Add-NodeToPath $path) {
                try {
                    $nodeVersion = & node --version
                    Write-Host "[SUCESSO] Node.js agora está disponível!" -ForegroundColor Green
                    Write-Host "Versão: $nodeVersion" -ForegroundColor Green
                    Write-Host ""
                    $nodeFound = $true
                    break
                }
                catch {
                    Write-Host "[AVISO] Node.js encontrado mas não funciona corretamente." -ForegroundColor Red
                }
            }
        }
    }
    
    if (-not $nodeFound) {
        Write-Host "[ERRO] Node.js não encontrado! Por favor, instale o Node.js antes de continuar." -ForegroundColor Red
        Write-Host ""
        Write-Host "INSTRUÇÕES PARA INSTALAR O NODE.JS:" -ForegroundColor Yellow
        Write-Host "1. Acesse: https://nodejs.org/" -ForegroundColor White
        Write-Host "2. Baixe a versão LTS (recomendada)" -ForegroundColor White
        Write-Host "3. Execute o instalador e siga as instruções" -ForegroundColor White
        Write-Host "4. Reinicie o terminal após a instalação" -ForegroundColor White
        Write-Host "5. Execute novamente este arquivo: .\run.ps1" -ForegroundColor White
        Write-Host ""
        Write-Host "ALTERNATIVA - Usar winget (Windows 10/11):" -ForegroundColor Yellow
        Write-Host "winget install OpenJS.NodeJS" -ForegroundColor White
        Write-Host ""
        
        $choice = Read-Host "Deseja tentar instalar automaticamente via winget? (s/n)"
        if ($choice -eq "s" -or $choice -eq "S") {
            Write-Host "Tentando instalar Node.js via winget..." -ForegroundColor Yellow
            try {
                & winget install OpenJS.NodeJS
                Write-Host ""
                Write-Host "Node.js instalado! Por favor, reinicie o terminal e execute .\run.ps1 novamente." -ForegroundColor Green
            }
            catch {
                Write-Host "Falha na instalação automática. Por favor, instale manualmente." -ForegroundColor Red
            }
        }
        
        Write-Host ""
        Read-Host "Pressione Enter para sair"
        exit 1
    }
}

# Verifica se as dependências estão instaladas
Write-Host "Verificando se as dependências estão instaladas..." -ForegroundColor White
if (-not (Test-Path "node_modules")) {
    Write-Host "[AVISO] Dependências não encontradas. Instalando..." -ForegroundColor Yellow
    Write-Host "Executando: npm install" -ForegroundColor White
    
    try {
        Invoke-Npm @("install")
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[SUCESSO] Dependências instaladas!" -ForegroundColor Green
        }
        else {
            Write-Host "[ERRO] Falha ao instalar dependências." -ForegroundColor Red
            Read-Host "Pressione Enter para sair"
            exit 1
        }
    }
    catch {
        Write-Host "[ERRO] Falha ao executar npm install." -ForegroundColor Red
        Read-Host "Pressione Enter para sair"
        exit 1
    }
}
else {
    Write-Host "[SUCESSO] Dependências encontradas!" -ForegroundColor Green
}

# Verifica se o arquivo .env existe
Write-Host "Verificando configuração do ambiente..." -ForegroundColor White
if (-not (Test-Path ".env")) {
    Write-Host "[AVISO] Arquivo .env não encontrado. Execute install.bat primeiro." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 1
}
else {
    Write-Host "[SUCESSO] Arquivo .env encontrado!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Iniciando o servidor..." -ForegroundColor Cyan
Write-Host "Executando: npm run dev" -ForegroundColor White
Write-Host ""

# Inicia o servidor
try {
    Invoke-Npm @("run", "dev")
}
catch {
    Write-Host ""
    Write-Host "[ERRO] Falha ao iniciar o servidor." -ForegroundColor Red
    Write-Host ""
    Write-Host "SOLUÇÕES:" -ForegroundColor Yellow
    Write-Host "1. Execute install.bat como administrador" -ForegroundColor White
    Write-Host "2. Verifique se todas as dependências estão instaladas" -ForegroundColor White
    Write-Host "3. Verifique se o arquivo .env está configurado corretamente" -ForegroundColor White
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 1
}