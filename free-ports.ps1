# PowerShell script to free ports 3000 and 3001 for development
# Usage: .\free-ports.ps1

Write-Host "🔍 Checking for processes using ports 3000 and 3001..." -ForegroundColor Cyan

$ports = @(3000, 3001)
$freed = $false

foreach ($port in $ports) {
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    
    if ($connection) {
        $processId = $connection.OwningProcess
        $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
        
        if ($process) {
            Write-Host "✅ Found process using port $port : $($process.ProcessName) (PID: $processId)" -ForegroundColor Yellow
            Write-Host "🛑 Stopping process..." -ForegroundColor Yellow
            
            try {
                Stop-Process -Id $processId -Force
                Write-Host "✅ Port $port freed successfully!" -ForegroundColor Green
                $freed = $true
            } catch {
                Write-Host "❌ Error killing process: $_" -ForegroundColor Red
                Write-Host "   Try running PowerShell as Administrator" -ForegroundColor Yellow
            }
        } else {
            Write-Host "⚠️  Port $port is in use but process not found" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✅ Port $port is free" -ForegroundColor Green
    }
}

if ($freed) {
    Write-Host "`n✨ Ports are now free! You can run 'npm run dev' now" -ForegroundColor Green
} else {
    Write-Host "`n✨ All ports are free! You can run 'npm run dev' now" -ForegroundColor Green
}

