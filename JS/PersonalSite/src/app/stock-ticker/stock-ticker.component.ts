import { Component } from "@angular/core";
// var yahooFinance = require('yahoo-finance');
import * as yahooFinance from 'yahoo-finance';
@Component({
    selector: 'app-stock-ticker',
    templateUrl: './stock-ticker.component.html'
})
export class StockTickerComponent{
    ngOnInit(){
        const stock_arr = ['KRFG', 'AMD', 'AMC', 'MVIS', 'NFLX', 'NVDA', 'DODFX', 'FXAIX', 'VSGAX'];
        for(var i = 0; i < stock_arr.length; i++){
            // yahooFinance.quote({
            //     symbol: stock_arr[i],
            //     modules: ['price']
            // })
        }
    }
    

}
// previous day close
// current price
// stock percent gain compared to previous day close
