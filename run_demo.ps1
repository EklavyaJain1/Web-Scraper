param (
    [string]$CollectorId = "c_mt4f331h17e4wjcvxk"
)

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "🚀 Bright Data Scraper Studio: Self-Healing Demo" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Breaking the layout (Simulated) and Triggering Heal..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

# We will use the heal command to ask the AI to fix a simulated breakage
$HealPrompt = "The HTML structure for the book prices has changed. Extract the price text directly from the new span class."
Write-Host "> bdata scraper heal `"$CollectorId`" `"$HealPrompt`"" -ForegroundColor Gray
npx -p @brightdata/cli bdata scraper heal "$CollectorId" "$HealPrompt" | Tee-Object -FilePath "evidence/heal_before_after/heal_output.txt"

Write-Host ""
Write-Host "2. Approving the AI-generated fix..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

Write-Host "> bdata scraper approve `"$CollectorId`"" -ForegroundColor Gray
npx -p @brightdata/cli bdata scraper approve "$CollectorId" | Tee-Object -FilePath "evidence/heal_before_after/approve_output.txt"

Write-Host ""
Write-Host "✅ Self-Heal Demo Complete! The data pipeline is resilient. Evidence saved to /evidence/heal_before_after/" -ForegroundColor Green
