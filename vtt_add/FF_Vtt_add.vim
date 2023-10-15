vim9script

def! g:FF_Adds(arg_str: string, arg_adds: number): string
    var ll_time = split(arg_str, ':')
    var ll_ss = split(ll_time[2], '\.')
    # echo ll_time
    # echo ll_ss
    # return adds 
    var r_hh = str2nr(ll_time[0])
    var r_mm = str2nr(ll_time[1])
    var r_ss = str2nr(ll_ss[0])
    var r_ms = str2nr(ll_ss[1])
    var a_ms = printf("%03d", r_ms)
    # echo typename(r_hh)
    # echo typename(r_mm)
    # echo typename(r_ss)
    # echo typename(a_ms)
    # var a_tm: string
    var r_sa: number
    r_sa = 60 * 60 * r_hh + 60 * r_mm + r_ss
    var r_sd = r_sa + arg_adds + 3600 * 15
    var a_tm = strftime($"%H:%M:%S.{a_ms}", r_sd)
    # echo strftime($"%H:%M:%S.{a_ms}", r_sd)
    # return strftime($"%H:%M:%S.{a_ms}", r_sa + arg_adds + 3600 * 15)
    # var a_tm = 100
    return a_tm
enddef

def! g:FF_Chadds(arg_ss_time: any): number
    # var sss_time = substitute(arg_ss_time, ' ', '', 'g')
    if typename(arg_ss_time) == 'number'
        return arg_ss_time
    endif
    var ll_time = split(arg_ss_time, ':')
    var r_hh = str2nr(ll_time[0])
    var r_mm = str2nr(ll_time[1])
    # var r_ss = str2float(ll_time[2])
    var r_ss = str2nr(ll_time[2])
    var r_sa = 60 * 60 * r_hh + 60 * r_mm + r_ss
    # echo $"{ll_time[2]} {r_ss}"
    return r_sa
enddef

def! g:FF_Vtt_ini(): number
    : %s@\(.*\)@00:00:00.000 --> 00:00:00.000\r\1\r@
    : 1s@^@\r\r\r\r@
    setline(1, ['WEBVTT', 'Kind: captions', 'Language: ja'])
    return 0
enddef

def! g:FF_Vtt_add(arg_adds: any, arg_st: number): any
    var no_line = line("$")
    var rr_adds = g:FF_Chadds(arg_adds)
    for nn in range(arg_st, no_line)
        var aan = getline(nn)
        var ll_mat = split(aan, '-->')
        if len(ll_mat) == 2
            var ll_mod_tm = []
            for nnn in range(2)
                ll_mat[nnn] = substitute(ll_mat[nnn], ' ', '', 'g')
                ll_mod_tm = add( ll_mod_tm, g:FF_Adds(ll_mat[nnn], rr_adds))
            endfor
            # echo ll_mod_tm
            call setline(nn, $"{ll_mod_tm[0]} --> {ll_mod_tm[1]}")
        endif
    endfor
    return 0
enddef

def! g:FF_Vtt_adj(arg_adjs: number, arg_st: number): number
    var rr_line = line("$")
    var rr_stt = 1
    if  arg_st > 10 
	rr_stt = arg_st - 10
    endif
    var rr_oldno = rr_stt	
    var aa_oldaan: string
    for nn in range(rr_stt, rr_line)
        var aan = getline(nn)
        var ll_mat = split(aan, '-->')
	# echo $"for {nn} {rr_oldno} {len(ll_mat)} {ll_mat}"
        if len(ll_mat) == 2
    	    if nn < arg_st
    	        rr_oldno = nn	
		aa_oldaan = aan
		# echo $"mat {nn}"
    	        continue
    	    endif
            var ll_mod_tm = []
            ll_mat[0] = substitute(ll_mat[0], ' ', '', 'g')
            var aa_mod_tm = g:FF_Adds(ll_mat[0], -arg_adjs)
	    var aa_modl = substitute(aa_oldaan, "--> ..:..:..\....", $"--> {aa_mod_tm}", "")
	    setline(rr_oldno, aa_modl)
	    rr_oldno = nn
       	    aa_oldaan = aan
	endif
    endfor
    return 0
enddef

command! -nargs=0 Vtti call g:FF_Vtt_ini()
command! -nargs=+ Vtta call g:FF_Vtt_add(<args>)
command! -nargs=+ Vttj call g:FF_Vtt_adj(<args>)
