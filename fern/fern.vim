nmap qq <Plug>(fern-action-mark)
nmap qd <Plug>(fern-action-mark:clear)
let @q='qqj'
augroup ng
  autocmd!
  autocmd BufReadPre,FileReadPre     *.mp3 break  
  autocmd BufReadPre,FileReadPre     *.m4a break  
  autocmd BufReadPre,FileReadPre     *.mp4 break
  autocmd BufReadPre,FileReadPre     *.avi break
  "autocmd BufReadCmd,FileReadCmd     *.mp4 b#
augroup end
Fern /home/
