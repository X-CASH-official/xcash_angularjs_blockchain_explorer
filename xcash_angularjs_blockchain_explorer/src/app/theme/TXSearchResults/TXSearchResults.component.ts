import {Component, OnInit} from '@angular/core';
import {httpdataservice} from '../../services/http-request.service'
import { ActivatedRoute } from '@angular/router';
declare var verifytx: any;
declare var verifymessage: any;

@Component({
  selector: 'app-TXSearchResults',
  templateUrl: './TXSearchResults.component.html',
  styleUrls: ['./TXSearchResults.component.scss']
})

export class TXSearchResultsComponent implements OnInit { 
  txsearchresultshtml:boolean = false;
  title:string = "Search Results";
  tx_data_array:any[] = [];
  public_tx_sender_data_array:any[] = [];
  public_tx_receiver_data_array:any[] = [];
  public_tx_sender_data_amount:number = 0;
  public_tx_receiver_data_amount:number = 0;
  public_tx_sender_data_title:string;
  public_tx_receiver_data_title:string;
  tx_hashes:string;
  tx_privacy_settings:string;
  htmlcode = false;
  
  constructor(private route: ActivatedRoute,private httpdataservice: httpdataservice) { }  

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
    var data;
    var data_array = this.route.snapshot.queryParamMap.get("data").split("|");
    
       data = "settings=" + data_array[0] + "&tx_data=" + data_array[1];
       this.httpdataservice.post_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_TRANSACTION_DATA_SEARCH_RESULTS,data).subscribe(
        (res) =>
        {
          if (JSON.stringify(res).indexOf("Error") !== -1)
          {
            this.title = "Search Results for " + data_array[1] + " - Error"; 
            this.txsearchresultshtml = false;  
          }
          else
          {
            this.title = "Search Results for " + data_array[1]; 
            this.tx_data_array = res["tx_data"];
            if (data_array[0] !== "public_address")
            {
              this.tx_privacy_settings = "private";
              for (var count = 0; count < this.tx_data_array.length; count++)
              {
                this.tx_data_array[count]._id = count + 1;
                this.tx_data_array[count].tx_fee = (this.tx_data_array[count].tx_fee / this.httpdataservice.WALLET_DECIMAL_PLACES_AMOUNT).toFixed(3); 
                this.tx_data_array[count].tx_size = (this.tx_data_array[count].tx_size).toFixed(2) + " KB";             
              }
              this.htmlcode = true;
              this.txsearchresultshtml = true;
            }
            if (data_array[0] === "public_address")
            {
              this.tx_privacy_settings = "public";
              for (var counter = 0; counter < this.tx_data_array.length; counter++)
              {
              // verify it is a public transaction
              // calculate who is the sender and receiver address and the amounts
              // make sure each address can be decoded in the transaction
              var decoded_tx_array1 = verifytx(this.tx_data_array[counter].tx,this.tx_data_array[counter].tx_public_addresses.split("|")[0],this.tx_data_array[counter].tx_public_key,this.tx_data_array[counter].tx_private_key,this.tx_data_array[counter].tx_addresses,JSON.parse(this.tx_data_array[counter].tx_ecdh_data),"tx_private_key");
              var decoded_tx_array2 = verifytx(this.tx_data_array[counter].tx,this.tx_data_array[counter].tx_public_addresses.split("|")[1],this.tx_data_array[counter].tx_public_key,this.tx_data_array[counter].tx_private_key,this.tx_data_array[counter].tx_addresses,JSON.parse(this.tx_data_array[counter].tx_ecdh_data),"tx_private_key");
              var decoded_tx_array = [];
              for (var count1 = 0, count2 = 0; count1 < decoded_tx_array1.length; count1++)
              {
               if (decoded_tx_array1[count1].amount !== "RINGCT_AMOUNT")
               {
                 decoded_tx_array.push({"address":this.tx_data_array[counter].tx_public_addresses.split("|")[0],"amount":decoded_tx_array1[count1].amount});
                 count2++;
               }
               if (decoded_tx_array2[count1].amount !== "RINGCT_AMOUNT")
               {
                 decoded_tx_array.push({"address":this.tx_data_array[counter].tx_public_addresses.split("|")[1],"amount":decoded_tx_array2[count1].amount});
                 count2++;
               }
              } 
              if (count2 === 2)
              {
                // check the transaction signature to confirm one of the transaction addresses is the from transaction address
                var verifymessageaddress1results = verifymessage(this.tx_data_array[counter].tx_signature,this.tx_data_array[counter].tx_public_addresses.split("|")[0],this.tx_data_array[counter].tx_private_key);
                var verifymessageaddress2results = verifymessage(this.tx_data_array[counter].tx_signature,this.tx_data_array[counter].tx_public_addresses.split("|")[1],this.tx_data_array[counter].tx_private_key);
                if (verifymessageaddress1results === true || verifymessageaddress2results === true)
                {
                  if (verifymessageaddress1results === true)
                  {
                  for (var count1 = 0; count1 < decoded_tx_array.length; count1++)
                   {
                    if (decoded_tx_array[count1].address === this.tx_data_array[counter].tx_public_addresses.split("|")[1])
                    {
                     var settings = data_array[1] === this.tx_data_array[counter].tx_public_addresses.split("|")[0] ? "sender" : "receiver";
                     if (settings === "sender")
                     {
                       this.public_tx_sender_data_array.push({
                         "_id":this.public_tx_sender_data_array.length + 1,
                         "tx":this.tx_data_array[counter].tx,
                         "tx_ringsize":this.tx_data_array[counter].tx_ringsize,
                         "tx_timestamp":this.tx_data_array[counter].tx_timestamp,
                         "tx_fee":(this.tx_data_array[counter].tx_fee / this.httpdataservice.WALLET_DECIMAL_PLACES_AMOUNT).toFixed(3),
                         "tx_size":(this.tx_data_array[counter].tx_size).toFixed(2) + " KB",
                         "tx_paymentid_settings":this.tx_data_array[counter].tx_paymentid_settings,
                         "tx_receiver":this.tx_data_array[counter].tx_public_addresses.split("|")[1],
                         "tx_amount":decoded_tx_array[count1].amount
                         })
                         this.public_tx_sender_data_amount += decoded_tx_array[count1].amount;
                     }
                     else if (settings === "receiver")
                     {
                      this.public_tx_receiver_data_array.push({
                        "_id":this.public_tx_receiver_data_array.length + 1,
                        "tx":this.tx_data_array[counter].tx,
                        "tx_ringsize":this.tx_data_array[counter].tx_ringsize,
                        "tx_timestamp":this.tx_data_array[counter].tx_timestamp,
                        "tx_fee":(this.tx_data_array[counter].tx_fee / this.httpdataservice.WALLET_DECIMAL_PLACES_AMOUNT).toFixed(3),
                        "tx_size":(this.tx_data_array[counter].tx_size).toFixed(2) + " KB",
                        "tx_paymentid_settings":this.tx_data_array[counter].tx_paymentid_settings,
                        "tx_sender":this.tx_data_array[counter].tx_public_addresses.split("|")[0],
                        "tx_amount":decoded_tx_array[count1].amount
                        })
                        this.public_tx_receiver_data_amount += decoded_tx_array[count1].amount;
                     }                     
                    }
                  }     
                }
                else if (verifymessageaddress2results === true)
                {
                for (var count1 = 0; count1 < decoded_tx_array.length; count1++)
                 {
                  if (decoded_tx_array[count1].address === this.tx_data_array[counter].tx_public_addresses.split("|")[0])
                  {
                   var settings = data_array[1] === this.tx_data_array[counter].tx_public_addresses.split("|")[1] ? "sender" : "receiver";
                   if (settings === "sender")
                   {
                     this.public_tx_sender_data_array.push({
                       "_id":this.public_tx_sender_data_array.length + 1,
                       "tx":this.tx_data_array[counter].tx,
                       "tx_ringsize":this.tx_data_array[counter].tx_ringsize,
                       "tx_timestamp":this.tx_data_array[counter].tx_timestamp,
                       "tx_fee":(this.tx_data_array[counter].tx_fee / this.httpdataservice.WALLET_DECIMAL_PLACES_AMOUNT).toFixed(3),
                       "tx_size":(this.tx_data_array[counter].tx_size).toFixed(2) + " KB",
                       "tx_paymentid_settings":this.tx_data_array[counter].tx_paymentid_settings,
                       "tx_receiver":this.tx_data_array[counter].tx_public_addresses.split("|")[0],
                       "tx_amount":decoded_tx_array[count1].amount
                       })
                       this.public_tx_sender_data_amount += decoded_tx_array[count1].amount;
                   }
                   else if (settings === "receiver")
                   {
                    this.public_tx_receiver_data_array.push({
                      "_id":this.public_tx_receiver_data_array.length + 1,
                      "tx":this.tx_data_array[counter].tx,
                      "tx_ringsize":this.tx_data_array[counter].tx_ringsize,
                      "tx_timestamp":this.tx_data_array[counter].tx_timestamp,
                      "tx_fee":(this.tx_data_array[counter].tx_fee / this.httpdataservice.WALLET_DECIMAL_PLACES_AMOUNT).toFixed(3),
                      "tx_size":(this.tx_data_array[counter].tx_size).toFixed(2) + " KB",
                      "tx_paymentid_settings":this.tx_data_array[counter].tx_paymentid_settings,
                      "tx_sender":this.tx_data_array[counter].tx_public_addresses.split("|")[1],
                      "tx_amount":decoded_tx_array[count1].amount
                      })
                      this.public_tx_receiver_data_amount += decoded_tx_array[count1].amount;
                   }                   
                  }
                }     
              }



              }
            }
              this.public_tx_sender_data_title = "Sent " + this.public_tx_sender_data_array.length.toString() + " Transactions for a total of " + this.public_tx_sender_data_amount.toString() + " X-CASH";
              this.public_tx_receiver_data_title = "Received " + this.public_tx_receiver_data_array.length.toString() + " Transactions for a total of " + this.public_tx_receiver_data_amount.toString() + " X-CASH";
              this.htmlcode = true;
              this.txsearchresultshtml = true;


              }
              
            }
               
          }                  
        },
        (error) => 
        {
          this.title = "Search Results for " + data_array[1] + " - Error"; 
          this.txsearchresultshtml = false;  
        }
      ); 
  }
}
