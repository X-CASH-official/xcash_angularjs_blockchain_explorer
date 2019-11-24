import {Component, OnInit,ViewEncapsulation} from '@angular/core';
import {httpdataservice} from '../../services/http-request.service'
import 'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-Price',
  templateUrl: './Price.component.html',
  styleUrls:
  [
  'Price.component.scss',
  '../../../../node_modules/c3/c3.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PriceComponent implements OnInit {
  title:string = "X-CASH Price Data";
  htmlcode:boolean = false;
  btc_price:number = 0;
  ltc_price:number = 0;
  usd_price:number = 0;
  btc_marketcap:number = 0;
  ltc_marketcap:number = 0;
  usd_marketcap:number = 0;
  btc_volume:number = 0;
  ltc_volume:number = 0;
  usd_volume:number = 0;
  usd_total_volume:number = 0;
  price_chart_title:string;
  market_cap_chart_title:string;
  volume_chart_title:string;
  
  constructor(private httpdataservice: httpdataservice) { }

  ngOnInit() {
    clearInterval(this.httpdataservice.Timer);
    this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_MARKET_DATA).subscribe(
      (res) =>
      {
        this.btc_price = res['price']['btc'];
        this.ltc_price = res['price']['ltc'];
        this.usd_price = res['price']['usd'];
        this.btc_marketcap = res['market_cap']['btc'];
        this.ltc_marketcap = res['market_cap']['ltc'];
        this.usd_marketcap = res['market_cap']['usd'];
        this.btc_volume = res['volume']['btc'];
        this.ltc_volume = res['volume']['ltc'];
        this.usd_volume = res['volume']['usd'];
        this.usd_total_volume = res['volume']['total'];
        this.htmlcode = true;

        setTimeout(() => {
        this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_HISTORICAL_MARKET_DATA).subscribe(
          (res) =>
          {
            var start_date = new Date(res["prices"]["start_time"]);
            var end_date = new Date(res["prices"]["end_time"]);
            this.price_chart_title = "Price Chart (In USD) From " + start_date.getDate() + "/" + (start_date.getMonth() + 1) + "/" + start_date.getFullYear() + " To " + end_date.getDate() + "/" + (end_date.getMonth() + 1) + "/" + end_date.getFullYear();
            var price_data = {bindto: '#price_chart',data:{columns:[],types: {price: 'area-spline'},colors: {price:'#8af1f0'},groups:[['price']]}};
            price_data.data.columns[0] = res["prices"]["data"];
            c3.generate(price_data);
    
            start_date = new Date(res["market_caps"]["start_time"]);
            end_date = new Date(res["market_caps"]["end_time"]);
            this.market_cap_chart_title = "Market Cap Chart (In USD) From " + start_date.getDate() + "/" + (start_date.getMonth() + 1) + "/" + start_date.getFullYear() + " To " + end_date.getDate() + "/" + (end_date.getMonth() + 1) + "/" + end_date.getFullYear();
            var market_cap = {bindto: '#market_cap_chart',data:{columns:[],types: {market_cap: 'area-spline'},colors: {market_cap:'#8af1f0'},groups:[['market_cap']]}};
            market_cap.data.columns[0] = res["market_caps"]["data"];
            c3.generate(market_cap);
    
            var start_date = new Date(res["volumes"]["start_time"]);
            var end_date = new Date(res["volumes"]["end_time"]);
            this.volume_chart_title = "Volume Chart (In USD) From " + start_date.getDate() + "/" + (start_date.getMonth() + 1) + "/" + start_date.getFullYear() + " To " + end_date.getDate() + "/" + (end_date.getMonth() + 1) + "/" + end_date.getFullYear();
            var volume_data = {bindto: '#volume_chart',data:{columns:[],types: {volume: 'area-spline'},colors: {volume:'#8af1f0'},groups:[['volume']]}};
            volume_data.data.columns[0] = res["volumes"]["data"];
            c3.generate(volume_data);       
          }
        );
      }, 2000);
      },
      (error) => 
      {        
        this.title = "X-CASH Price Data - Error";
        this.htmlcode = false;
      }
    );

    

  
  }
}
