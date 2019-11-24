import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {httpdataservice} from '../../services/http-request.service'
declare var verifytx: any;

@Component({
  selector: 'app-DecodeTX',
  templateUrl: './DecodeTX.component.html',
  styleUrls: ['./DecodeTX.component.scss']
})
export class DecodeTXComponent implements OnInit {
  title:string = "Decode Transaction";
  decodedtransactionhtml:boolean = false; 
  decoded_tx_array: any[] = [];
  decoded_tx_array_tx_private_key: any[] = [];
  decoded_tx_array_view_key: any[] = [];
  total_amount:number = 0;
  tx_hash:string = "";
  tx_private_key:string = "";
  receiver_address:string = "";
  tx_public_key:string;
  tx_addresses:string;
  tx_ecdh_data:string;
  
  constructor(private route: ActivatedRoute,private httpdataservice: httpdataservice) { } 

  ngOnInit() {
    clearInterval(this.httpdataservice.Timer);
    this.tx_hash = this.route.snapshot.queryParamMap.get("tx_hash");
    this.tx_private_key = this.route.snapshot.queryParamMap.get("tx_private_key");
    this.receiver_address = this.route.snapshot.queryParamMap.get("receiver_address");
  }

  decodetransaction(tx_hash:string,public_address:string,view_key:string)
  {
    // get the data for the transactions    
      this.tx_hash = tx_hash;   
      this.tx_private_key = view_key;   
      this.receiver_address = public_address;

      if (this.tx_hash.length !== 64 || this.tx_private_key.length !== 64 || this.receiver_address.length !== 98)
      {
        this.decodedtransactionhtml = false;
        this.title = "Decode Transaction - Error";
        return;
      }
   
    var data = "tx_hash=" + this.tx_hash;
    this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_TRANSACTION_DATA + "?" + data).subscribe(
      (res) =>
      {
        this.tx_public_key = res["tx_extra"].substr(res["tx_extra"].length - 64);
        this.tx_addresses = res["tx_addresses"];
        this.tx_ecdh_data = res["tx_ecdh_data"];

        this.decoded_tx_array_tx_private_key = verifytx(this.tx_hash,this.receiver_address,this.tx_public_key,this.tx_private_key,this.tx_addresses,JSON.parse(this.tx_ecdh_data),"tx_private_key");
        this.decoded_tx_array_view_key = verifytx(this.tx_hash,this.receiver_address,this.tx_public_key,this.tx_private_key,this.tx_addresses,JSON.parse(this.tx_ecdh_data),"view_key");

        if (this.decoded_tx_array_tx_private_key.toString().indexOf("Error") !== -1 && this.decoded_tx_array_view_key.toString().indexOf("Error") !== -1)
        {
          this.decodedtransactionhtml = false;
          this.title = "Decode Transaction " + this.decoded_tx_array[0];
          return;
        }       
        else if (this.decoded_tx_array_view_key.toString().indexOf("Error") !== -1)
        {
          this.decoded_tx_array = this.decoded_tx_array_tx_private_key;
        }
        else
        {
          this.decoded_tx_array = this.decoded_tx_array_view_key;
        }
        for (var count = 0; count < this.decoded_tx_array.length; count++)
        {
          if (this.decoded_tx_array[count].amount !== "RINGCT_AMOUNT")
          {
            this.total_amount += this.decoded_tx_array[count].amount;
          }          
        }
        this.decodedtransactionhtml = true;
      },
      (error) => 
      {
        this.decodedtransactionhtml = false;
        this.title = "Decode Transaction - Error";
      }
    );
    /*this.decoded_tx_array[0] = {"id":"1","addrress":"stealth_address_1","amount":"1"};
    this.decoded_tx_array[1] = {"id":"2","addrress":"stealth_address_1","amount":"2"};
    this.total_amount = 2;*/

    
  }

}
