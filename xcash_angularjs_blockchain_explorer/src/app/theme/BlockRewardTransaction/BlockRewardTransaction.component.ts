import {Component, OnInit} from '@angular/core';
import {httpdataservice} from '../../services/http-request.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-BlockRewardTransaction',
  templateUrl: './BlockRewardTransaction.component.html',
  styleUrls: ['./BlockRewardTransaction.component.scss']
})
export class BlockRewardTransactionComponent implements OnInit {
  title:string = "Block Reward Transaction Data";
  tx_hash:string = this.route.snapshot.queryParamMap.get("data");
  tx_public_key:string;
  tx_block_height:string;
  tx_block_timestamp:number;
  tx_version:string;
  tx_ringct_version:string;
  tx_size:string;
  tx_unlock_block:string;
  tx_extra:string;
  tx_address:string;
  tx_address_amount:number;
  unlockedblockprogress:number;
  htmlcode:boolean = false; 
    
  constructor(private route: ActivatedRoute,private httpdataservice: httpdataservice) { }  

  ngOnInit() {
    clearInterval(this.httpdataservice.Timer);
    var data = "tx_hash=" + this.route.snapshot.queryParamMap.get("data");
      this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_TRANSACTION_DATA + "?" + data).subscribe(
        (res) =>
        {
          this.tx_block_height = res["tx_block_height"];
          this.tx_block_timestamp = res["tx_block_timestamp"];
          this.tx_version = res["tx_version"];
          this.tx_ringct_version = res["tx_ringct_version"];
          this.tx_size = parseFloat(res["tx_size"]).toFixed(2) + " KB";
          this.tx_unlock_block = res["tx_unlock_block"];
          this.tx_extra = res["tx_extra"];
          this.tx_public_key = res["tx_extra"].substr(2,64);
          this.tx_address = res["tx_address"];
          this.tx_address_amount = res["tx_address_amount"];

          this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_LAST_BLOCK_DATA).subscribe(
            (res) =>
            {
              this.unlockedblockprogress = ((res["block_height"] - parseInt(this.tx_block_height)) / 59) * 100;
              this.htmlcode = true;
            },
            (error) => 
            {
              
            }
          );   

         this.httpdataservice.Timer = setInterval(() =>
            {
            this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_LAST_BLOCK_DATA).subscribe(
              (res) =>
              {
                this.unlockedblockprogress = ((res["block_height"] - parseInt(this.tx_block_height)) / 59) * 100;
              },
              (error) => 
              {
                
              }
            );         
          },60000);
        },
        (error) => 
        {
          this.title = "Block Reward Transaction Data - Error";
        }
      );         
  }
}