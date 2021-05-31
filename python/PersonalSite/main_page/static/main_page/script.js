function get_data(){
    socket.send(JSON.stringify({
        'message': 'update',
    }));
}

async function update_stocks(){
    let result = await get_data();
    return result;
}
const socket = new WebSocket('ws://'+window.location.host+'/ws/');

socket.onmessage = function(e){
    var best_percent = []
    const data = JSON.parse(e.data);
    for(var i = 0; i < data.message.length; i++){
        var stock_name = data.message[i][0];
        var stock_live = data.message[i][1];
        var stock_flag = data.message[i][2];
        best_percent.push((i));
        var els = document.getElementById(stock_name).children;
        if(stock_flag == 1){
            els[1].innerHTML = stock_live + "<img style='height: 1em;margin-top:-3%;' src=../../static/main_page/up.png %}>";
        }
        else if(stock_flag == 0){
            els[1].innerHTML = stock_live + "<img style='height: 1em;margin-top:-3%;' src=../../static/main_page/neutral.png %}>";
        }
        else{
            els[1].innerHTML = stock_live + "<img style='height: 1em;margin-top:-3%;' src=../../static/main_page/down.png %}>";
        }
    }
    var elements = document.createDocumentFragment();
    var ul = document.getElementById('ul');
    var childs = ul.children;
    best_percent.forEach(function(idx){
        elements.appendChild(childs[idx].cloneNode(true));
    });
    ul.innerHTML = null;
    ul.appendChild(elements);
}

socket.onclose = function(e){
    console.error('Socket closed unexpectedly.');
    console.error(e);
}

window.onload = function(){
    setInterval(update_stocks, 1000*60*5);
}