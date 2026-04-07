# PowerShell script to kill process using port 3001
# Usage: .\kill-port.ps1 [port]
# Example: .\kill-port.ps1 3001

param(
    [int]$Port = 3001
)

Write-Host "🔍 Checking for processes using port $Port..." -ForegroundColor Cyan

$connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue

if ($connection) {
    $processId = $connection.OwningProcess
    $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
    
    if ($process) {
        Write-Host "✅ Found process: $($process.ProcessName) (PID: $processId)" -ForegroundColor Yellow
        Write-Host "🛑 Stopping process..." -ForegroundColor Yellow
        
        try {
            Stop-Process -Id $processId -Force
            Write-Host "✅ Process killed successfully!" -ForegroundColor Green
            Write-Host "   You can now run 'npm run dev' again" -ForegroundColor Green
        } catch {
            Write-Host "❌ Error killing process: $_" -ForegroundColor Red
            Write-Host "   Try running PowerShell as Administrator" -ForegroundColor Yellow
        }
    } else {
        Write-Host "⚠️  Port $Port is in use but process not found" -ForegroundColor Yellow
        Write-Host "   Try restarting your computer or using a different port" -ForegroundColor Yellow
    }
} else {
    Write-Host "✅ Port $Port is free - no process found" -ForegroundColor Green
    Write-Host "   You can run 'npm run dev' now" -ForegroundColor Green
}

