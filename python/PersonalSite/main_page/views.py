from django.shortcuts import render
# from django.http import HttpResponse
from yahoo_fin import stock_info as si


stock_array = ['KRFG', 'AMD', 'AMC', 'MVIS', 'NFLX', 'NVDA', 'DODFX', 'FXAIX', 'VSGAX']
# Create your views here.
def get_val(e):
    return e[1]

def order(e):
    return e[1]

def index(req):
    content = {
        'stocks': [],
        'stocks_order_percent': [],
        # 'stocks_table': [],
        # 'stocks_data': [],
    }
    data = {}
    stock = []
    for item in stock_array:
        data[item] = si.get_quote_data(item)
        content['stocks_order_percent'].append((item, data[item]['regularMarketChangePercent']))

    content['stocks_order_percent'].sort(key=get_val, reverse=True)
    for item in content['stocks_order_percent']:
        # print('data: '+str(data))
        # print('data[item]: '+str(data[item[0]]))
        if data[item[0]]['regularMarketPrice'] > data[item[0]]['regularMarketPreviousClose']:
            flag = 1
        elif data[item[0]]['regularMarketPrice'] == data[item[0]]['regularMarketPreviousClose']:
            flag = 0
        else:
            flag = -1
        stock.append([item[0], data[item[0]]['regularMarketPrice'], flag])
        content['stocks'].append((stock))
        stock = []
    # print(content['stocks_order_percent'])
    return render(req, 'main_page/index.html', content)