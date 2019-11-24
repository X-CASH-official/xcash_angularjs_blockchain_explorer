import {Component, OnInit} from '@angular/core';
import {httpdataservice} from '../../services/http-request.service'

@Component({
  selector: 'app-Explorer',
  templateUrl: './Explorer.component.html',
  styleUrls: ['./Explorer.component.scss']
})
export class ExplorerComponent implements OnInit { 
  txpoolcount:number;
  txpoolcountcopy:number = -1;
  htmlcode:boolean = false; 
  tx_block_array: any[] = [];
  tx_array: any[] = [];
  
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
    this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_LAST_BLOCKS_TRANSACTION_DATA).subscribe(
      (res) =>
      {    
         // get the current block height
         this.txpoolcount = res["block_height"].split("||")[0];    
        if (this.txpoolcount !== this.txpoolcountcopy)
        { 
        this.tx_block_array = [];
        this.tx_array = [];
        // convert each item to an array
        var block_height = res["block_height"].split("||");
        var block_hash = res["block_hash"].split("||");
        var block_size = res["block_size"].split("||");
        var block_tx_amount = res["block_tx_amount"].split("||");
        var block_reward = res["block_reward"].split("||");
        var block_timestamp = res["block_timestamp"].split("||");
        var block_difficulty = res["block_difficulty"].split("||");
        var block_mining_reward_tx_hash = res["block_mining_reward_tx_hash"].split("||");        
        var block_tx_hashes = res["block_tx_hashes"].split("||");
        var block_tx_ringsizes = res["block_tx_ringsizes"].split("||");
        var block_tx_fees = res["block_tx_fees"].split("||");
        var block_tx_sizes = res["block_tx_sizes"].split("||");
        var block_tx_paymentid_settings = res["block_tx_paymentid_settings"].split("||");
        var block_tx_privacy_settings = res["block_tx_privacy_settings"].split("||");

        for (var count = 0; count < block_height.length; count++)
        {
          this.tx_block_array[count] = {
          "block_height":block_height[count],
          "block_hash":block_hash[count],
          "block_size":parseFloat(block_size[count]).toFixed(2) + " KB",
          "block_tx_amount":block_tx_amount[count],
          "block_reward":block_reward[count],
          "block_timestamp":block_timestamp[count],
          "block_difficulty":block_difficulty[count],
          "block_mining_reward_tx_hash":block_mining_reward_tx_hash[count]
        };
        var tx_key_image_array:any[] = [];
            for (var counter = 0; counter < block_tx_amount[count]; counter++)
            {
              tx_key_image_array.push({ 
                "block_tx_hashes":block_tx_hashes[count].split("|")[counter],
                "block_tx_ringsizes":block_tx_ringsizes[count].split("|")[counter],
                "block_tx_fees":(block_tx_fees[count].split("|")[counter] / this.httpdataservice.WALLET_DECIMAL_PLACES_AMOUNT).toFixed(3),
                "block_tx_sizes":parseFloat(block_tx_sizes[count].split("|")[counter]).toFixed(2) + " KB",
                "block_tx_paymentid_settings":block_tx_paymentid_settings[count].split("|")[counter],
                "block_tx_privacy_settings":block_tx_privacy_settings[count].split("|")[counter]
              }); 
            }
            this.tx_array.push(tx_key_image_array); 
        }

        // save the tx_block_array
        this.txpoolcountcopy = this.txpoolcount;
        this.htmlcode = true;
        }
      },
      (error) => 
      {
       
      }
    );    


    this.httpdataservice.Timer = setInterval(() =>
      {    
        this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_LAST_BLOCKS_TRANSACTION_DATA).subscribe(
          (res) =>
          {    
             // get the current block height
             this.txpoolcount = res["block_height"].split("||")[0];    
            if (this.txpoolcount !== this.txpoolcountcopy)
            { 
            this.tx_block_array = [];
            this.tx_array = [];
            // convert each item to an array
            var block_height = res["block_height"].split("||");
            var block_hash = res["block_hash"].split("||");
            var block_size = res["block_size"].split("||");
            var block_tx_amount = res["block_tx_amount"].split("||");
            var block_reward = res["block_reward"].split("||");
            var block_timestamp = res["block_timestamp"].split("||");
            var block_difficulty = res["block_difficulty"].split("||");
            var block_mining_reward_tx_hash = res["block_mining_reward_tx_hash"].split("||");        
            var block_tx_hashes = res["block_tx_hashes"].split("||");
            var block_tx_ringsizes = res["block_tx_ringsizes"].split("||");
            var block_tx_fees = res["block_tx_fees"].split("||");
            var block_tx_sizes = res["block_tx_sizes"].split("||");
            var block_tx_paymentid_settings = res["block_tx_paymentid_settings"].split("||");
            var block_tx_privacy_settings = res["block_tx_privacy_settings"].split("||");
    
            for (var count = 0; count < block_height.length; count++)
            {
              this.tx_block_array[count] = {
              "block_height":block_height[count],
              "block_hash":block_hash[count],
              "block_size":parseFloat(block_size[count]).toFixed(2) + " KB",
              "block_tx_amount":block_tx_amount[count],
              "block_reward":block_reward[count],
              "block_timestamp":block_timestamp[count],
              "block_difficulty":block_difficulty[count],
              "block_mining_reward_tx_hash":block_mining_reward_tx_hash[count]
            };
            var tx_key_image_array:any[] = [];
                for (var counter = 0; counter < block_tx_amount[count]; counter++)
                {
                  tx_key_image_array.push({ 
                    "block_tx_hashes":block_tx_hashes[count].split("|")[counter],
                    "block_tx_ringsizes":block_tx_ringsizes[count].split("|")[counter],
                    "block_tx_fees":(block_tx_fees[count].split("|")[counter] / this.httpdataservice.WALLET_DECIMAL_PLACES_AMOUNT).toFixed(3),
                    "block_tx_sizes":parseFloat(block_tx_sizes[count].split("|")[counter]).toFixed(2) + " KB",
                    "block_tx_paymentid_settings":block_tx_paymentid_settings[count].split("|")[counter],
                    "block_tx_privacy_settings":block_tx_privacy_settings[count].split("|")[counter]
                  }); 
                }
                this.tx_array.push(tx_key_image_array); 
            }
    
            // save the tx_block_array
            this.txpoolcountcopy = this.txpoolcount;
            }
          },
          (error) => 
          {
           
          }
        ); 
    },10000);
  }
}