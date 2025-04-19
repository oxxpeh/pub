#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
    ver 0.01
    2025/04/20
    2025/04/19
"""
__author__ = 'oxxpeh'


import asyncio as ii_as
import datetime as ii_dt
import pyodide as ii_pyd
import pyscript as ii_pys

from js import document as ij_dc
from js import window as ij_wd


cc_url = 'https://raw.githubusercontent.com/oxxpeh/pub/main/javascript/2025_04_fetch_plorly/fig.yaml'


async def ff_get(url: str) -> ii_pyd.ffi.JsProxy:
    """指定されたURLからデータを取得する。

    Args:
        url (str): データを取得するためのURL。

    Returns:
        ii_pyd.ffi.JsProxy: 取得したデータをjsのyamlで返す。
    """
    resp = await ij_wd.fetch(url)
    #ij_wd.console.log(f"@ -- resp {resp} ")
    aas = await resp.text()
    ij_wd.console.log(f"@ -- aas {aas} ")
    rt = ij_wd.jsyaml.load(aas)
    ij_wd.console.log(f"@ -- rt {rt} ")
    return rt


def ff_mk_pl(fig: ii_pyd.ffi.JsProxy) -> None:
    """指定されたデータを使用してプロットを作成する。

    Args:
        fig (ii_pyd.ffi.JsProxy): プロットのデータと設定を含む辞書。

    Returns:
        None
    """
    ij_wd.console.log(f"@ -- fig plot ")
    ij_wd.Plotly.newPlot('ele_plot', fig)


def ff_out_dt(aas_hd: str, ele_id: str, is_app: bool = False) -> None:
    """指定されたヘッダーと現在の日時を表示する。

    Args:
        aas_hd (str): 出力時に頭につける文字列。
        ele_id (str): 出力先のHTML要素のID。
        is_app (bool, optional): 追加表示するかどうか。デフォルトはFalse。

    Returns:
        None
    """
    dt = ii_dt.datetime.now()
    aas_dt = dt.strftime('%Y年%m月%d日 %H:%M:%S.%f')[:-3]
    ii_pys.display(f"{aas_hd} {aas_dt}", target=ele_id, append=is_app)


async def ff_main() -> None:
    """メイン処理を実行する非同期関数。

    この関数は、YAMLファイルを取得し、プロットを作成し、終了メッセージを表示します。

    Returns:
        None
    """
    fig_yaml = await ff_get(cc_url)
    # ij_wd.console.log(f"@ -- type {type(fig_yaml)} ")
    # ij_wd.console.log(f"@ -- urltype {type(cc_url)} ")
    # ij_wd.console.log(f"@ -- resp {resp} ")
    ff_mk_pl(fig_yaml)
    ff_out_dt('PyEnd', 'ele_out2', True)


ff_out_dt('PyStart', 'ele_out1')
loop = ii_as.get_event_loop()
# loop.create_task(ff_main())
loop.run_until_complete(ff_main())
# loop.create_task(ff_sl(5))
# fig_yaml = loop.run_until_complete(ff_get(cc_url))
# ff_mk_pl(fig_yaml)
# dt = ii_dt.datetime.now()
# aas_dt = dt.strftime('%Y年%m月%d日 %H:%M:%S.%f')[:-3]
# ii_pys.display(f"End {aas_dt}", target="ele_out1", append=True)
