function get_data(){
    socket.send(JSON.stringify({
        'message': 'update',
    }));
}

async function update_stocks(){
    console.log('looking for update');
    let result = await get_data();
    console.log('results are in');
    return result;
}

const socket = new WebSocket('ws://'+window.location.host+'/ws/');

socket.onmessage = function(e){
    const data = JSON.parse(e.data);
    for(var i = 0; i < data.message.length; i++){
        var stock_name = data.message[i][0];
        var stock_live = data.message[i][1];
        var stock_flag = data.message[i][2];
        var stock_percent = data.message[i][3];

        var els = document.getElementById(stock_name).children;
        
        console.log(els[0])
    }
}

socket.onclose = function(e){
    console.error('Socket closed unexpectedly.');
    console.error(e);
}

// setInterval(update_stocks, 1000*60*5);
window.onload = function(){
    update_stocks()
    // setInterval(update_stocks, 2000);
    // clearInterval()
}