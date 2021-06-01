import json
from channels.generic.websocket import WebsocketConsumer
from yahoo_fin import stock_info as si

stock_array = ['KRFG', 'AMD', 'AMC', 'MVIS', 'NFLX', 'NVDA', 'DODFX', 'FXAIX', 'VSGAX']

def get_val(e):
    return e[3]

class Consumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        # print(close_code)
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        if message == 'update':
            arr = []
            data = {}
            for item in stock_array:
                data[item] = si.get_quote_data(item)
                if data[item]['regularMarketPrice'] > data[item]['regularMarketPreviousClose']:
                    flag = 1
                elif data[item]['regularMarketPrice'] == data[item]['regularMarketPreviousClose']:
                    flag = 0
                else:
                    flag = -1
                arr.append([item, data[item]['regularMarketPrice'], flag, data[item]['regularMarketChangePercent']])
                data = {}
            arr.sort(key=get_val, reverse=True)
            self.send(text_data=json.dumps({
                'message': arr,
            }))