import { Component } from "@angular/core";
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
        let k = yahooFinance.historical({symbol: 'krfg', from:'2021-01-01', to: '2021-02-01'})
        // let k = yahooFinance.quote({symbol: 'krfg', modules: ['price']});
    }
    

}
// previous day close
// current price
// stock percent gain compared to previous day close
