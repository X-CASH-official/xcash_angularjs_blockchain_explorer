import {Component, OnInit} from '@angular/core';
import {httpdataservice} from '../../services/http-request.service'
import {Response} from '@angular/http';

@Component({
  selector: 'app-TXPool',
  templateUrl: './TXPool.component.html',
  styleUrls: ['./TXPool.component.scss']
})

export class TXPoolComponent implements OnInit { 
  txpoolcount:number;
  txpoolcountcopy:number = -1;
  txpoolhtml:boolean = false; 
  txpoolarray: any[] = [];
  htmlcode:boolean = false;
  
  constructor(private httpdataservice: httpdataservice) { }

  convertseconds(totalseconds:number)
  {    
    var hours:number = Math.floor(totalseconds / 3600);
    totalseconds -= (hours * 3600);
    var minutes:number = Math.floor(totalseconds / 60);
    totalseconds -= (minutes * 60);
    var seconds:number = totalseconds
    var dateandtime:string = hours < 10 ? "0" + hours.toString()  + ":": hours.toString() + ":";
    dateandtime += minutes < 10 ? "0" + minutes.toString() + ":" : minutes.toString() + ":";
    dateandtime += seconds < 10 ? "0" + seconds.toString() : seconds.toString();
    return dateandtime;
  }
 
  ngOnInit() {
    clearInterval(this.httpdataservice.Timer);
    var data:string = "tx_pool_settings=0";
    this.httpdataservice.post_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_TX_POOL_DATA,data).subscribe(
      (res) =>
      {
        // get the number of transactions
        this.txpoolcount = res["tx_ringsize"] == "" ? 0 : res["tx_ringsize"].indexOf("|") === -1 ? 1 : res["tx_ringsize"].split("|").length;
        if (this.txpoolcount !== this.txpoolcountcopy)
        { 
        this.txpoolarray = [];
        // convert each item to an array
        var tx_hash_array = res["tx_hash"].split("|");
        var tx_ringsize_array = res["tx_ringsize"].split("|");
        var tx_timestamp_array = res["tx_timestamp"].split("|");
        var tx_fee_array = res["tx_fee"].split("|");
        var tx_size_array = res["tx_size"].split("|");
        var tx_paymentidsettings_array = res["tx_paymentidsettings"].split("|");
        var tx_privacy_settings_array = res["tx_privacy_settings"].split("|");

        for (var count = 0; count < this.txpoolcount; count++)
        {
          this.txpoolarray[count] = {
          "tx_id":count + 1,
          "tx_hash":tx_hash_array[count],
          "tx_ringsize":tx_ringsize_array[count],
          "tx_timestamp":tx_timestamp_array[count],
          "tx_time_in_pool":this.convertseconds(Math.round(((new Date).getTime() / 1000) - tx_timestamp_array[count])),
          "tx_fee":(tx_fee_array[count] / this.httpdataservice.WALLET_DECIMAL_PLACES_AMOUNT).toFixed(3),
          "tx_size":parseFloat(tx_size_array[count]).toFixed(2) + " KB",
          "tx_paymentidsettings":tx_paymentidsettings_array[count],
          "tx_privacy_settings":tx_privacy_settings_array[count]
        };
        }

        // save the txpoolarray
        this.txpoolcountcopy = this.txpoolcount;

        // sort the txpoolarray by the timestamp
        this.txpoolarray.sort((a, b) => b.tx_timestamp - a.tx_timestamp);

         // change the tx_id
         for (var count = 0; count < this.txpoolarray.length; count++)
         {
           this.txpoolarray[count].tx_id = count + 1;
         }
        this.htmlcode = true;
        this.txpoolhtml = true;
        }
      },
      (error) => 
      {
        //this.TXPooljson;
      }
    );    


    this.httpdataservice.Timer = setInterval(() =>
      {    
    var data:string = "tx_pool_settings=0";
    this.httpdataservice.post_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_TX_POOL_DATA,data).subscribe(
      (res) =>
      {
        // get the number of transactions
        this.txpoolcount = res["tx_ringsize"] == "" ? 0 : res["tx_ringsize"].indexOf("|") === -1 ? 1 : res["tx_ringsize"].split("|").length;
        if (this.txpoolcount !== this.txpoolcountcopy)
        { 
        this.txpoolarray = [];
        // convert each item to an array
        var tx_hash_array = res["tx_hash"].split("|");
        var tx_ringsize_array = res["tx_ringsize"].split("|");
        var tx_timestamp_array = res["tx_timestamp"].split("|");
        var tx_fee_array = res["tx_fee"].split("|");
        var tx_size_array = res["tx_size"].split("|");
        var tx_paymentidsettings_array = res["tx_paymentidsettings"].split("|");
        var tx_privacy_settings_array = res["tx_privacy_settings"].split("|");

        for (var count = 0; count < this.txpoolcount; count++)
        {
          this.txpoolarray[count] = {
          "tx_id":count + 1,
          "tx_hash":tx_hash_array[count],
          "tx_ringsize":tx_ringsize_array[count],
          "tx_timestamp":tx_timestamp_array[count],
          "tx_time_in_pool":this.convertseconds(Math.round(((new Date).getTime() / 1000) - tx_timestamp_array[count])),
          "tx_fee":(tx_fee_array[count] / this.httpdataservice.WALLET_DECIMAL_PLACES_AMOUNT).toFixed(3),
          "tx_size":parseFloat(tx_size_array[count]).toFixed(2) + " KB",
          "tx_paymentidsettings":tx_paymentidsettings_array[count],
          "tx_privacy_settings":tx_privacy_settings_array[count]
        };
        }

        // save the txpoolarray
        this.txpoolcountcopy = this.txpoolcount;

        // sort the txpoolarray by the timestamp
        this.txpoolarray.sort((a, b) => b.tx_timestamp - a.tx_timestamp);

         // change the tx_id
         for (var count = 0; count < this.txpoolarray.length; count++)
         {
           this.txpoolarray[count].tx_id = count + 1;
         }

        this.txpoolhtml = true;
        }
      },
      (error) => 
      {
        //this.TXPooljson;
      }
    );    
    },10000);
  }
}
