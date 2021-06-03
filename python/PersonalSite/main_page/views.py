from django.shortcuts import render, redirect
from django.core.mail import send_mail
from yahoo_fin import stock_info as si
from .models import Contact as Contact
from django.contrib import messages


stock_array = ['KRFG', 'AMD', 'AMC', 'MVIS', 'NFLX', 'NVDA', 'DODFX', 'FXAIX', 'VSGAX']
def get_val(e):
    return e[1]

def order(e):
    return e[1]
# Create your views here.
def index(req):
    content = {
        'stocks': [],
        'stocks_order_percent': [],
        'about': 'This site was made using Python with the Django framework. On the right is a stock tracker that uses the yahoo finance api to get updated stock data when the page is loaded and updates asynchronously every 5 minutes by using websockets to request new data from the server.  Below is a viewport which renders an animated cube using p5js and images of photos I have taken are set as the texture of the faces and displayed.',

    }
    data = {}
    stock = []
    for item in stock_array:
        data[item] = si.get_quote_data(item)
        content['stocks_order_percent'].append((item, data[item]['regularMarketChangePercent']))

    content['stocks_order_percent'].sort(key=get_val, reverse=True)
    for item in content['stocks_order_percent']:
        if data[item[0]]['regularMarketPrice'] > data[item[0]]['regularMarketPreviousClose']:
            flag = 1
        elif data[item[0]]['regularMarketPrice'] == data[item[0]]['regularMarketPreviousClose']:
            flag = 0
        else:
            flag = -1
        stock.append([item[0], data[item[0]]['regularMarketPrice'], flag])
        content['stocks'].append((stock))
        stock = []
    return render(req, 'main_page/index.html', content)

def form_view(req):
    errors = Contact.objects.validator(req.POST)
    if len(errors):
        for tag,error in errors.items():
            messages.error(req, error, extra_tags=tag)
        return redirect('/')
    else:
        Name = req.POST['Name']
        Company = req.POST['Company']
        Email = req.POST['Email']
        Subject = req.POST['Name']+'@'+req.POST['Company']
        Message = req.POST['Message']
        Sender = 'jobmail@robertfox.com'
        Send_to = 'myemail' #UPDATE THIS

        contact = Contact.objects.create(name=Name, email=Email, company=Company, message=Message)
        contact.save()

        success = send_mail(Subject, Message, Sender, [Send_to], fail_silently=False)
        print(success)
        return redirect('/')