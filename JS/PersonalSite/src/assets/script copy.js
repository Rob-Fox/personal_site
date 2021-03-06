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
let inte;
socket.onclose = function(e){
    console.error('Socket closed unexpectedly.');
    console.error(e);
    clearInterval(inte);
}

window.onload = function(){
    inte = setInterval(update_stocks, 1000*60*5);
    if(screen.width < 604){
        var hide = document.getElementById('sticky-sidebar');
        hide.style.display = 'none';
        var show = document.getElementById('ticker');
        show.style.display = 'block';
        document.getElementById('main-wrapper').style.marginTop = '0px';
        document.getElementById('marquee-hr').style.marginTop = '-5px';
    }
    else{
        var hide = document.getElementById('ticker');
        hide.style.display = 'none';
        var show = document.getElementById('sticky-sidebar');
        show.style.display = 'block';
    }
}
function adjust_elements(){
    if(screen.width < 604){
        var hide = document.getElementById('sticky-sidebar');
        hide.style.display = 'none';
        var show = document.getElementById('ticker');
        show.style.display = 'block';
        document.getElementById('main-wrapper').style.marginTop = '0px';
        document.getElementById('marquee-hr').style.marginTop = '-5px';
    }
    else{
        var hide = document.getElementById('ticker');
        hide.style.display = 'none';
        var show = document.getElementById('sticky-sidebar');
        show.style.display = 'block';
    }

}
window.onresize = adjust_elements;