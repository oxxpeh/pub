#!/bin/bash

# -- ver 0.01
# -- 2023/09/XX
# -- 2023/09/19
# -- src

while getopts a:ht aa_opt ;do
  case ${aa_opt} in
      "a" ) is_a="True" ;  aas_opt_a="${OPTARG}" ;;
      "h" ) is_h="True" ;  echo "@-- help
    -a: need value
    -t test" ; exit ;;
      "t" ) is_t="True" ;;
  esac
done

shift $( expr $OPTIND - 1 )
function ff_pr()
{
    nn=$1
    aa_ed=$2
    while (( 0x${nn} <= 0x${aa_ed} )) ; do
        echo -en "\\u${nn} "
        nn=$(echo $((0x${nn} +1)) | xargs printf '%x')
        if [[ ${nn: -1:1} == 0 ]] ; then echo "" ; fi
    done
}

nn=eb20
aa_ed=eb40
aa_cd='Seti-UI,e5fa,e6ac
Devicons,e700,e7c5
Font Awesome,f000,f2e0
Font Awesome Extension,e200,e2a9
Material Design Icons,f0001,f1af0
Weather,e300,e3e3
Octicons,f400,f532
Octicons+,2665,2665
Octicons+,26A1,26A1
Powerline,e0a0,e0a2
Powerline,e0b0,e0b3
Powerline-ex,e0a3,e0a3
Powerline-ex,e0b4,e0c8
Powerline-ex,e0ca,e0ca
Powerline-ex,e0cc,e0d4
IEC Power Symbols,23fb,23fe
IEC Power Symbols,2b58,2b58
Font Logos,f300,f32f
Pomicons,e000,e00a
Codicons,ea60,ebeb
Heavy Angle,276c,2771
Box,2500,259f
'

#ff_pr ${nn} ${aa_ed}

IFS=$'\n'
ll_line=(${aa_cd})
for nn in ${ll_line[@]}
do
    # echo ${nn}
    # echo "@--"
    IFS=','
    ll=(${nn})
    echo "@-- ${ll[0]} ${ll[1]} ${ll[2]}"
    #echo "@-- ${ll[1]} ${ll[2]}"
    ff_pr ${ll[1]} ${ll[2]}
    echo ""
done
# echo ${aa_cd}
