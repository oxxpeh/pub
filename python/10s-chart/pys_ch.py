#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
    ver 0.02
    2025/04/27
    2025/03/15
"""
__author__ = 'oxxpeh'


import asyncio as ii_as
import datetime as ii_dt
import io as ii_io
import json as ii_js
import pandas as ii_pd
#import panel as ii_pn
#import pickle as ii_pc
import plotly as ii_pl
import plotly.subplots as ii_ps
import pyscript as ii_pys
#import requests as ii_rq
import time as ii_tm

#from js import document as ij_dc
#from js import window as ij_wd


aas_cl_prp =  'rgb(128,0,255)'
aas_cl_red =  'rgb(192,0,0)'
aas_cl_yll =  'rgb(224,224,0)'
aas_cl_grn =  'rgb(0,192,0)'
aas_cl_cyn =  'rgb(0,224,224)'
aas_cl_blu =  'rgb(0,0,192)'
aas_cl_gry =  'rgb(128,128,128)'

dd_00 = {}
dd_00['is_stop'] = False
dd_00['url_tgt'] = ''
dd_00['url'] = {}
dd_00['url']['btc_jpy'] = 'https://raw.githubusercontent.com/oxxpeh/pub/main/python/10s-chart/gmo_sck_tck_BTC_JPY.pck'
dd_00['df_4p'] = ii_pd.DataFrame(columns=['date','opn', 'hgh', 'low', 'cls'])
dd_00['df_4p'].set_index('date', inplace=True)


async def ff_get_tck():
    resp = await ii_pys.fetch(dd_00['url']['btc_jpy'])
    byte_resp =  await resp.bytearray()
    # df_tck = ii_pd.read_pickle(ii_io.BytesIO(byte_resp))
    while 1:
       try:
           df_tck = ii_pd.read_pickle(ii_io.BytesIO(byte_resp))
       except (EOFError, ii_pc.UnpicklingError) as Er:
           ii_pys.window.console.log('%s pck wait', str(Er))
           ii_tm.sleep(1)
       else:
           break
    #rt = ii_rq.get(dd_00['url_tgt'])
    #df_tck = ii_pc.loads(rt.content)
    if not 'prc' in df_tck:
        df_tck['prc'] = df_tck['ask']
    return(df_tck)


async def ff_lp_main():
    """
    """
    if dd_00['url_tgt'] == '':
        ii_pys.window.console.log(f" tgt none {dd_00['url_tgt']}")
        return
    else:
        ii_pys.window.console.log(f" tgt select {dd_00['url_tgt']}")
        #return
    dd_00['dt_nws'] = ii_dt.datetime.now()
    ii_pys.display(f"lp st {dd_00['dt_nws']:%Y年%m月%d日 %H:%M:%S.%f}です。", target="ele_daten", append=False)
    df_tck = await ff_get_tck()
    ff_mk_4p(df_tck,'10s')
    dd_00['aai_10n'] = dd_00['dt_nws'].second // 10
    fig_10 = ff_mk_fig(dd_00['df_4pe'].tail(90))
    graphJSON = ii_js.dumps(fig_10, cls=ii_pl.utils.PlotlyJSONEncoder)
    plot = ii_pys.window.Plotly.newPlot("ele_chart", ii_pys.window.JSON.parse(graphJSON))
    dt_nw = ii_dt.datetime.now()
    dt_d = dt_nw - dd_00['dt_nws']
    ii_pys.display(f"lp edは{dt_nw:%Y年%m月%d日 %H:%M:%S.%f}です。{dt_d}", target="ele_datenn", append=False)
    ii_pys.window.console.log(f"@ -- st {dd_00['dt_nws']:%Y年%m月%d日 %H:%M:%S.%f} ")
    ii_pys.window.console.log(f"@ -- ed {dt_nw:%Y年%m月%d日 %H:%M:%S.%f} ")
    ii_pys.window.console.log(f"@ -- rep {dd_00['df_4p'].tail(1)} ")
    ii_pys.window.console.log(f"@ -- rep {df_tck.tail(1)} ")
    #ii_tm.sleep(1-(dt_nw - dd_00['dt_nws']))
    # nn += 1


def ff_mk_4p(df_tck, aas_smp='1T'):
    df_4pn = df_tck[['prc']].resample(aas_smp).first()
    df_4pn.rename(columns={'prc':'opn'}, inplace=True)
    df_4pn['hgh'] = df_tck[['prc']].resample(aas_smp).max()
    df_4pn['low'] = df_tck[['prc']].resample(aas_smp).min()
    df_4pn['cls'] = df_tck[['prc']].resample(aas_smp).last()
    if len(dd_00['df_4p']) != 0:
        dt_l = dd_00['df_4p'].index[-2]
        dd_00['df_4p'] = ii_pd.concat([dd_00['df_4p'][:-2], df_4pn[df_4pn.index >= dt_l  ]]).tail(350)
        ii_pys.window.console.log(f"@ -- 4p {dd_00['df_4p'].tail(1)} ")
    else:
        dd_00['df_4p'] = df_4pn
        ii_pys.window.console.log("@ -- df_4p none")
    dd_00['df_4pe'] = dd_00['df_4p'].copy()
    dd_00['df_4pe']['ema12'] = dd_00['df_4p']['cls'].ewm(span=12, adjust=False).mean()
    dd_00['df_4pe']['ema25'] = dd_00['df_4p']['cls'].ewm(span=25, adjust=False).mean()
    dd_00['df_4pe']['ema75'] = dd_00['df_4p']['cls'].ewm(span=75, adjust=False).mean()
    dd_00['df_4pe']['ema200'] = dd_00['df_4p']['cls'].ewm(span=200, adjust=False).mean()
    #dd_00['df_4pe']['EMA_short'] = dd_00['df_4pe']['cls'].ewm(span=12, adjust=False).mean()
    dd_00['df_4pe']['EMA_long'] = dd_00['df_4pe']['cls'].ewm(span=26, adjust=False).mean()
    # MACDを計算
    dd_00['df_4pe']['MACD'] = dd_00['df_4pe']['ema12'] - dd_00['df_4pe']['EMA_long']
    # シグナルラインを計算
    dd_00['df_4pe']['sig'] = dd_00['df_4pe']['MACD'].ewm(span=9, adjust=False).mean()
    dd_00['df_4pe']['m_hst'] = dd_00['df_4pe']['MACD'] - dd_00['df_4pe']['sig']
    ii_pys.window.console.log(f"@ -- 4pe {dd_00['df_4pe'].tail(1)} ")
    #df_4p.reset_index(inplace=True)
    #return(df_4p.tail(120))


def ff_mk_fig(df_4p):
    oo_fig = ii_ps.make_subplots(
    rows = 2, cols = 1, shared_xaxes = True, vertical_spacing = 0.02,
    row_heights=[0.8, 0.2])
    Xdf_4p = df_4p.index.tolist()
    Ymx = df_4p.hgh.max()
    Ymn = df_4p.low.min()
    gr_cnd = ii_pl.graph_objs.Candlestick(
        name = 'Candle',
        x = Xdf_4p,
        open = df_4p.opn.tolist(),
        high = df_4p.hgh.tolist(),
        low = df_4p.low.tolist(),
        close = df_4p.cls.tolist())
    gr_12 = ii_pl.graph_objs.Scatter(
        x = Xdf_4p,
        y = df_4p.ema12.to_list(),
        name = 'ema12',
        line = dict(color = aas_cl_prp))
    gr_25 = ii_pl.graph_objs.Scatter(
        x = Xdf_4p,
        y = df_4p.ema25.to_list(),
        name = 'ema25',
        line = dict(color = aas_cl_yll))
    gr_75 = ii_pl.graph_objs.Scatter(
        x = Xdf_4p,
        y = df_4p.ema75.to_list(),
        name = 'ema75',
        line = dict(color = aas_cl_cyn))
    gr_200 = ii_pl.graph_objs.Scatter(
        x = Xdf_4p,
        y = df_4p.ema200.to_list(),
        name = 'ema200',
        line = dict(color = aas_cl_red))
    oo_fig.add_trace(gr_cnd, row = 1, col = 1)
    oo_fig.add_trace(gr_12, row = 1, col = 1)
    oo_fig.add_trace(gr_25, row = 1, col = 1)
    oo_fig.add_trace(gr_75, row = 1, col = 1)
    oo_fig.add_trace(gr_200, row = 1, col = 1)
    gr_3_1 = ii_pl.graph_objs.Scatter(
        x = Xdf_4p,
        y = df_4p.MACD.to_list(),
        name = 'macd',
        ##line = dict(dash = 'dash', color = aas_RCLgreen)
        line = dict(color = aas_cl_grn)
    )
    gr_3_2 = ii_pl.graph_objs.Scatter(
        x = Xdf_4p,
        y = df_4p.sig.to_list(),
        name = 'signal',
        line = dict(color = aas_cl_red)
    )
    colors = ['green' if value > 0 else 'red' for value in df_4p.m_hst.to_list()]
    gr_3_3 = ii_pl.graph_objs.Bar(
        x = Xdf_4p,
        y = df_4p.m_hst.to_list(),
        name = 'm_hst',
        marker = dict(color = colors),
        showlegend=False
    )
    oo_fig.add_trace(gr_3_1, row = 2, col = 1)
    oo_fig.add_trace(gr_3_2, row = 2, col = 1)
    oo_fig.add_trace(gr_3_3, row = 2, col = 1)
    oo_fig.update_layout(
        xaxis_rangeslider_visible=False,
        xaxis={'dtick': 60*1000 },
        yaxis={'dtick': 100000, 'side': 'right' },
        yaxis2={'side': 'right' },
        width=1280, height=720,
        legend={'x':0.00,          # X位置（0-1の範囲、1は右端）
        'y':1,          # Y位置（0-1の範囲、0は下端）
        'xanchor':'left',  # X位置の基準（右端）
        'yanchor':'top'  # Y位置の基準（下端）
        }
    )
    return(oo_fig)
    #out_fig = ii_pl.offline.plot(oo_fig, output_type='div',  include_plotlyjs = 'directory')
    #return(out_fig)


async def ff_set_cur(event):
    select_element = ii_pys.document.getElementById("ll_cur")
    selected_value = select_element.value
    if selected_value:
        dd_00['url_tgt'] = dd_00['url'][selected_value]
        ii_pys.window.console.log(f"tgt {dd_00['url_tgt']}")
        await ff_as_start()


async def ff_as_start():
    # if dd_00['url_tgt'] == '':
    #     dd_00['url_tgt'] = dd_00['url']['btc_jpy']
    while dd_00['is_stop'] == False:
        await ff_lp_main()
        #await ii_as.sleep(0.7)
        await ii_as.sleep(30)
    ff_wr_log(f"@ -- dd_00['is_stop'] : {dd_00['is_stop']}")


def ff_wr_log(aas_log, aas_ele='ele_d_log'):
    dt = ii_dt.datetime.now()
    aas_dt = dt.strftime('%H:%M:%S.%f)')[:-4]
    # ii_pys.display(f"{(dt:%Y-%m-%d %H:%M:%S.%f)} PyScript Started", target="ele_d_log", append=True)
    ii_pys.display(f"{aas_dt} {aas_log}", target=aas_ele, append=True)


ff_wr_log("PyScript boot")

#await ff_as_start()

##dd_00['loop'] = ii_as.get_event_loop()
##dd_00['loop'].run_until_complete(ff_xx())

#cb = ii_pn.state.add_periodic_callback(ff_lp_main, 950)
#ff_wr_log(f" cb.run :{cb.running}")
