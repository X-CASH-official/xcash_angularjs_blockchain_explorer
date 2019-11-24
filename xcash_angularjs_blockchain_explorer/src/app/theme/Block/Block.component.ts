import {Component, OnInit} from '@angular/core';
import {httpdataservice} from '../../services/http-request.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Block',
  templateUrl: './Block.component.html',
  styleUrls: ['./Block.component.scss']
})
export class BlockComponent implements OnInit {
  title:string = "Block Data";
  block_height:string;
  block_hash:string;
  block_timestamp:number;  
  block_size:string;
  block_mining_reward_hash:string;
  block_reward:string;
  block_difficulty:string;
  block_tx_amount:string;
  block_tx_hashes_array:any[] = [];
  block_tx_fees:any[] = [];
  block_tx_paymentid_settings:any[] = [];
  block_tx_privacy_settings:any[] = [];
  block_tx_ringsizes:any[] = [];
  block_tx_sizes:any[] = [];
  block_tx_array:any[] = [];
  htmlcode:boolean = false; 
    
  constructor(private route: ActivatedRoute,private httpdataservice: httpdataservice) { }  

  ngOnInit() {
    clearInterval(this.httpdataservice.Timer);
    var data = "get_block_transaction_data_settings=" + this.route.snapshot.queryParamMap.get("data");
      this.httpdataservice.post_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_BLOCK_TRANSACTION_DATA,data).subscribe(
        (res) =>
        {
          this.block_height = res["block_height"];
          this.block_hash = res["block_hash"];
          this.block_timestamp = res["block_timestamp"];
          this.block_size = parseFloat(res["block_size"]).toFixed(2) + " KB";
          this.block_mining_reward_hash = res["block_mining_reward_tx_hash"];
          this.block_reward = res["block_reward"];
          this.block_difficulty = res["block_difficulty"];
          this.block_tx_amount = res["block_tx_amount"];
          this.block_tx_hashes_array = res["block_tx_hashes"].split("|");
          this.block_tx_fees = res["block_tx_fees"].split("|");
          this.block_tx_paymentid_settings = res["block_tx_paymentid_settings"].split("|");
          this.block_tx_privacy_settings = res["block_tx_privacy_settings"].split("|");
          this.block_tx_ringsizes = res["block_tx_ringsizes"].split("|");
          this.block_tx_sizes = res["block_tx_sizes"].split("|"); 

          for (var count = 0; count < this.block_tx_hashes_array.length; count++)
          {
            this.block_tx_array.push({
            "id":count+1,
            "block_tx_hash":this.block_tx_hashes_array[count],
            "block_tx_fees":(this.block_tx_fees[count] / this.httpdataservice.WALLET_DECIMAL_PLACES_AMOUNT).toFixed(3),
            "block_tx_paymentid_settings":this.block_tx_paymentid_settings[count],
            "block_tx_privacy_settings":this.block_tx_privacy_settings[count],
            "block_tx_ringsizes":this.block_tx_ringsizes[count],
            "block_tx_sizes":parseFloat(this.block_tx_sizes[count]).toFixed(2) + " KB"
            })
          }
          this.htmlcode = true;
        },
        (error) => 
        {
          this.title = "Block Data - Error";
        }
      );         
  }
 
}
