#!/bin/bash
aa_url_hd="https://www.soumu.go.jp"
#ll_no=(44 45 46 47 48 49)
ll_no=(45 46 47 48 49)
declare -A dd_pref=(
  ["北海道"]="01"
  ["青森"]="02"
  ["岩手"]="03"
  ["宮城"]="04"
  ["秋田"]="05"
  ["山形"]="06"
  ["福島"]="07"
  ["茨城"]="08"
  ["栃木"]="09"
  ["群馬"]="10"
  ["埼玉"]="11"
  ["千葉"]="12"
  ["東京"]="13"
  ["神奈川"]="14"
  ["新潟"]="15"
  ["富山"]="16"
  ["石川"]="17"
  ["福井"]="18"
  ["山梨"]="19"
  ["長野"]="20"
  ["岐阜"]="21"
  ["静岡"]="22"
  ["愛知"]="23"
  ["三重"]="24"
  ["滋賀"]="25"
  ["京都"]="26"
  ["大阪"]="27"
  ["兵庫"]="28"
  ["奈良"]="29"
  ["和歌山"]="30"
  ["鳥取"]="31"
  ["島根"]="32"
  ["岡山"]="33"
  ["広島"]="34"
  ["山口"]="35"
  ["徳島"]="36"
  ["香川"]="37"
  ["愛媛"]="38"
  ["高知"]="39"
  ["福岡"]="40"
  ["佐賀"]="41"
  ["長崎"]="42"
  ["熊本"]="43"
  ["大分"]="44"
  ["宮崎"]="45"
  ["鹿児島"]="46"
  ["沖縄"]="47"
)
# aa_pref=${1}
# aa_no_pref=${dd_pref["${1}"]}
for nn_pr in ${dd_pref[@]} ; do
    for nn in ${ll_no[@]} ; do
        # echo "@ -- ${nn_pr}"
        # if [[ ! -f ${nn}.html ]] ; then
        #     curl --compressed -o ${nn}.html "https://www.soumu.go.jp/senkyo/senkyo_s/data/shugiin/shikuchouson.html"
        # fi
        if [[ ! -f ${nn_pr}/${nn}_${nn_pr}.html ]] ; then
            mkdir -p "${nn_pr}"
            curl --compressed -o ${nn_pr}/${nn}_${nn_pr}.html "https://www.soumu.go.jp/senkyo/senkyo_s/data/shugiin${nn}/shikuchouson_${nn_pr}.html"
        fi
        ll_xls=($(  grep -oP '"/.*?xls"' ${nn_pr}/${nn}_${nn_pr}.html | sed 's/"//g'  ))
        # echo "@-- ${ll_xls[1]}"
        if [[ ! -f ${nn_pr}/${nn}_${nn_pr}.xls ]] ; then
            # echo "@ --curl -o ${nn_pr}/${nn}_${nn_pr}.xls $aa_url_hd${ll_xls[0]} "
            curl -o ${nn_pr}/${nn}_${nn_pr}.xls "$aa_url_hd${ll_xls[0]}"
            sleep 2
        fi
    done
done