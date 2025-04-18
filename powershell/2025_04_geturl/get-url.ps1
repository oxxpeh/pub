# -- ver 0.01
# -- 2025/04/18
# -- 2025/04/18
# -- 
<#
proxy.pac向け
クリップボードからセカンドかサードの終わり8文字
#>

$url =Get-Clipboard 
# サンプルURL
#$url = "https://abcdefghij.example123456789.co.uk/path/to/resource"

# URLからドメイン部分を抽出
$uri = New-Object System.Uri($url)
$dn = $uri.Host
#$host = $uri
# ドメインを分割
$domainParts = $dn -split '\.'

# セカンドレベルドメインとトップレベルドメインを取得
$sd = $domainParts[-2]  # セカンドレベルドメイン
$fd = $domainParts[-1]      # トップレベルドメイン
$td = $domainParts[-3]    

# セカンドレベルドメインの終わりから8文字を取得
#$l8s= $sd.Substring($secondLevelDomain.Length - 8)

# 結果を表示
#Write-Host "セカンドレベルドメインの終わりから8文字: $lastEightChars"
#Write-Host "トップレベルドメイン: $topLevelDomain"

if ($sd.Length -lt 3) {
    if ($td.Length -lt 8) {
        $out =  $td + "." + $sd + "." + $fd 
    }else{
        $l8t= $td.Substring($td.Length - 8)
        $out =  $l8t + "." + $sd + "." + $fd
    }
    #Write-Host "セカンドレベルドメインの終わりから8文字: $lastEightChars"
    #Write-Host "サードレベルドメイン: $thirdLevelDomain"
} else {
    #Write-Host "セカンドレベルドメインの終わりから8文字: $lastEightChars"
    if ($sd.Length -lt 8) {
        $out =  $sd + "." + $fd 
    }else{
        $l8s= $sd.Substring($sd.Length - 8)
        $out = $l8s + "." + $fd
    }

}
# write-host "cut: $out"
$out2 = 'dnsDomainIs(host, "' + $out + '")||'
set-Clipboard $out2
$source_beep = @"
using System;
using System.Runtime.InteropServices;

public static class WinApi
{
    [DllImport("kernel32.dll")]
    public static extern bool Beep(int freq,int duration);
}
"@
Add-Type -TypeDefinition $source_beep
 [WinApi]::Beep(440, 200)
#end