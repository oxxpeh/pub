# 子育てについてのチャート
```mermaid
  flowchart TB
  xx02{子育て中}
  xx03{子供二人以上}
  xx04(これからもがんばってください)
  xx05{パートナーはいますか}
  xx06{子育てする気は}
  xx07{時間とお金は十分}
  xx08{自分の子供じゃないとダメ}
  xx09[対策必要  やる気]
  xx10{時間とお金は十分}
  xx12{パートナー探してますか}
  xx13[対策必要  時間と金]
  xx14{時間とお金は十分}
 

  xx02 -- Y --> xx03
  xx03 -- Y --> xx04
  xx02 -- N --> xx05
  xx05 -- Y --> xx06
  xx06 -- Y --> xx07
  xx07 -- Y --> xx08
  xx07 -- N --> xx13
  xx06 -- N --> xx09
  xx05 -- N --> xx10
  xx10 -- Y --> xx12
  xx10 -- N --> xx13
  xx03 -- N --> xx14
  xx14 -- N --> xx13
  xx14 -- Y --> xx08
