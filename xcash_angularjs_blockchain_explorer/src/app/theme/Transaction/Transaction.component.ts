import {Component, OnInit} from '@angular/core';
import {httpdataservice} from '../../services/http-request.service'
import { ActivatedRoute } from '@angular/router';
declare var verifytx: any;
declare var verifymessage: any;

@Component({
  selector: 'app-Transaction',
  templateUrl: './Transaction.component.html',
  styleUrls: ['./Transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  title:string = "Transaction Data";
  tx_hash:string = this.route.snapshot.queryParamMap.get("data");
  tx_public_key:string;
  tx_private_key:string;
  tx_signature:string;
  tx_payment_id:string;
  tx_payment_id_settings:string;
  tx_confirmations:string;
  tx_previous_confirmations:number;
  tx_block_height:string;
  tx_block_timestamp:string;
  tx_version:string;
  tx_privacy_settings:string;
  tx_ringct_version:string;
  tx_fee:number;
  tx_size:string;
  tx_unlock_block:string;
  unlockedblockprogress:number;
  tx_extra:string;
  tx_ringsize:string;
  tx_addresses:string;
  tx_ecdh_data:string;
  tx_key_images_ring_address_array:any[] = [];
  tx_key_images:any[] = [];  
  tx_key_images_ring_address:any[] = [];
  tx_key_images_ring_tx_hash:any[] = [];
  tx_key_images_ring_address_tx_ring_addresses:any[] = [];
  tx_key_images_ring_address_tx_block_height:any[] = [];
  tx_key_images_ring_address_tx_ring_size:any[] = [];
  tx_key_images_ring_address_tx_block_timestamp:any[] = [];
  tx_key_images_ring_address_tx_extra:any[] = [];

  tx_address_array:any[] = [];
  public_tx_address_array:any[] = [];
  public_tx_data:any[] = [];

  senderaddress:string;
  receiveraddress:string;
  receiveramount:number;
  amounttitle:string;

  decode_tx_cli:string;
  verify_sender_cli:string;

  htmlcode:boolean = false;
  
  constructor(private route: ActivatedRoute,private httpdataservice: httpdataservice) { }  

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  copyMessage(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  get_tx_privacy_settings(tx_hash:string, tx_address:string, tx_addresses:string, tx_extra:string, tx_ecdh_data:string)
  {
    var tx_privacy_settings = "";
    if (tx_extra === "private_tx" || tx_extra === "block_reward_transaction")
    {
      tx_privacy_settings = "private";
    }
    else
    {
       var tx_public_key = tx_extra.substr(tx_extra.length - 64);
       var public_tx_data = this.httpdataservice.get_public_tx_data(tx_extra);
       var decoded_tx_array1 = verifytx(tx_hash,public_tx_data[0].address1,tx_public_key,public_tx_data[0].tx_private_key,tx_addresses,JSON.parse(tx_ecdh_data),"tx_private_key");
       var decoded_tx_array2 = verifytx(tx_hash,public_tx_data[0].address2,tx_public_key,public_tx_data[0].tx_private_key,tx_addresses,JSON.parse(tx_ecdh_data),"tx_private_key");
       for (var count = 0; count < decoded_tx_array1.length; count++)
       {
          if (decoded_tx_array1[count].amount !== "RINGCT_AMOUNT" && decoded_tx_array1[count].address === tx_address)
          {
            tx_privacy_settings = public_tx_data[0].address1;
          }
          if (decoded_tx_array2[count].amount !== "RINGCT_AMOUNT" && decoded_tx_array2[count].address === tx_address)
          {
            tx_privacy_settings = public_tx_data[0].address2;
          }
       } 
       if (tx_privacy_settings == "")
       {
         tx_privacy_settings = "private";
       }
    }
    return tx_privacy_settings;     
  }




get_transaction_data()
{
  var data = "tx_hash=" + this.route.snapshot.queryParamMap.get("data");
      this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_TRANSACTION_DATA + "?" + data).subscribe(
        (res) =>
        {
          this.tx_block_height = res["tx_block_height"];
          this.tx_block_timestamp = res["tx_block_timestamp"];
          this.tx_version = res["tx_version"];
          this.tx_ringct_version = res["tx_ringct_version"];
          this.tx_fee = res["tx_fee"] / this.httpdataservice.WALLET_DECIMAL_PLACES_AMOUNT;
          this.tx_size = parseFloat(res["tx_size"]).toFixed(2) + " KB";
          this.tx_unlock_block = res["tx_unlock_block"];
          this.tx_extra = res["tx_extra"];
          this.tx_public_key = res["tx_extra"].substr(res["tx_extra"].length - 64);
          this.tx_privacy_settings = this.tx_extra.length >= 256 ? "public" : "private";
          this.tx_payment_id = this.httpdataservice.get_payment_id(this.tx_extra);
          this.tx_payment_id_settings = this.tx_extra.substr(0,6) === this.httpdataservice.UNENCRYPTED_PAYMENT_ID ? "unencrypted" : this.tx_extra.substr(0,6) === this.httpdataservice.ENCRYPTED_PAYMENT_ID ? "encrypted" : "none";
          if (this.tx_payment_id !== "none")
          {
            this.tx_payment_id_settings = this.httpdataservice.get_payment_id_settings(this.tx_extra);
          }
          this.tx_ringsize = res["tx_ringsize"];
          this.tx_addresses = res["tx_addresses"];
          this.tx_ecdh_data = res["tx_ecdh_data"];
          this.tx_key_images = res["tx_key_images"].split("|");
          //this.tx_key_images_ring_address = res["tx_key_images_ring_address"].split("||");
          //this.tx_key_images_ring_tx_hash = res["tx_key_images_ring_tx_hash"].split("||");          
          this.tx_key_images_ring_address_tx_ring_addresses = res["tx_key_images_ring_address_tx_ring_addresses"].split("|");
          this.tx_key_images_ring_address_tx_block_height = res["tx_key_images_ring_address_tx_block_height"].split("||");
          this.tx_key_images_ring_address_tx_ring_size = res["tx_key_images_ring_address_tx_ring_size"].split("||");
          this.tx_key_images_ring_address_tx_block_timestamp = res["tx_key_images_ring_address_tx_block_timestamp"].split("||");
          this.tx_key_images_ring_address_tx_extra = res["tx_key_images_ring_address_tx_extra"].split("||");
          // get the public or private tx data
          if (this.tx_privacy_settings === "private")
          {
            this.tx_address_array = this.tx_addresses.split("|");
          }
          else
          {
            this.tx_address_array = this.tx_addresses.split("|");
            this.public_tx_data = this.httpdataservice.get_public_tx_data(this.tx_extra);
            this.tx_signature = this.public_tx_data[0].tx_signature;
            this.tx_private_key = this.public_tx_data[0].tx_private_key;
            // calculate who is the sender and receiver address and the amounts
            // make sure each address can be decoded in the transaction
            var decoded_tx_array1 = verifytx(this.tx_hash,this.public_tx_data[0].address1,this.tx_public_key,this.public_tx_data[0].tx_private_key,this.tx_addresses,JSON.parse(this.tx_ecdh_data),"tx_private_key");
            var decoded_tx_array2 = verifytx(this.tx_hash,this.public_tx_data[0].address2,this.tx_public_key,this.public_tx_data[0].tx_private_key,this.tx_addresses,JSON.parse(this.tx_ecdh_data),"tx_private_key");
            var decoded_tx_array = [];
            for (var count = 0, counter = 0; count < decoded_tx_array1.length; count++)
            {
               if (decoded_tx_array1[count].amount !== "RINGCT_AMOUNT")
               {
                 decoded_tx_array.push({"address":this.public_tx_data[0].address1,"amount":decoded_tx_array1[count].amount});
                 counter++;
               }
               if (decoded_tx_array2[count].amount !== "RINGCT_AMOUNT")
               {
                 decoded_tx_array.push({"address":this.public_tx_data[0].address2,"amount":decoded_tx_array2[count].amount});
                 counter++;
               }
            } 
            if (counter !== 2)
            {
              if (counter === decoded_tx_array1.length + decoded_tx_array2.length && this.public_tx_data[0].address1 === this.public_tx_data[0].address2)
              {
                // check the transaction signature to confirm one of the transaction addresses is the from transaction address
                var verifymessageaddress1results = verifymessage(this.public_tx_data[0].tx_signature,this.public_tx_data[0].address1,this.public_tx_data[0].tx_private_key);
                var verifymessageaddress2results = verifymessage(this.public_tx_data[0].tx_signature,this.public_tx_data[0].address2,this.public_tx_data[0].tx_private_key);
                if (verifymessageaddress1results === true && verifymessageaddress2results === true)
                {
                  this.amounttitle = "Amount plus change amount (the unspent remainder of the sender's spent output, sent back to the sender's address)";
                  this.public_tx_address_array.push({
                    "sender_address":this.public_tx_data[0].address1,
                    "receiver_address":this.public_tx_data[0].address2,
                    "amount":decoded_tx_array1[0].amount + decoded_tx_array1[1].amount,
                    "settings":1
                   });
                }
                else
                {
                  this.tx_privacy_settings = 'private';
                }                   
              }
              else
              {
                this.tx_privacy_settings = 'private';
              }              
            }
            else
            {
              // check the transaction signature to confirm one of the transaction addresses is the from transaction address
              var verifymessageaddress1results = verifymessage(this.public_tx_data[0].tx_signature,this.public_tx_data[0].address1,this.public_tx_data[0].tx_private_key);
              var verifymessageaddress2results = verifymessage(this.public_tx_data[0].tx_signature,this.public_tx_data[0].address2,this.public_tx_data[0].tx_private_key);
              if (verifymessageaddress1results === false && verifymessageaddress2results === false)
              {
                this.tx_privacy_settings = 'private';
              }
              else
              {
                if (verifymessageaddress1results === true)
                {
                  for (var count = 0; count < decoded_tx_array.length; count++)
                  {
                    if (decoded_tx_array[count].address === this.public_tx_data[0].address2)
                    {
                     this.amounttitle = "Amount";
                     var change_amount = count === 0 ? decoded_tx_array[1].amount : decoded_tx_array[0].amount;
                     this.public_tx_address_array.push({
                       "sender_address":this.public_tx_data[0].address1,
                       "receiver_address":this.public_tx_data[0].address2,
                       "amount":decoded_tx_array[count].amount,
                       "change_amount": change_amount,
                       "settings":0
                      });
                    }
                  }     
                }
                else
                {
                  for (var count = 0; count < decoded_tx_array.length; count++)
                  {
                    if (decoded_tx_array[count].address === this.public_tx_data[0].address1)
                    {
                     this.amounttitle = "Amount";
                     var change_amount = count === 0 ? decoded_tx_array[1].amount : decoded_tx_array[0].amount;
                     this.public_tx_address_array.push({
                       "sender_address":this.public_tx_data[0].address2,
                       "receiver_address":this.public_tx_data[0].address1,
                       "amount":decoded_tx_array[count].amount,
                       "change_amount": change_amount,
                       "settings":0
                      });
                    }
                  }  
                }                           
              }
            }
          }
          
           // decode any public transactions for key images
           var tx_key_images_ring_address_data = res["tx_key_images_ring_address"].split("||").join("|");
           var tx_key_images_ring_tx_hash_data = res["tx_key_images_ring_tx_hash"].split("||").join("|");
           var tx_key_images_ring_address_tx_extra = res["tx_key_images_ring_address_tx_extra"].split("||").join("|");
           var tx_key_images_ring_address_tx_ecdh_data = res["tx_key_images_ring_address_tx_ecdh_data"].split("||").join("|");
           var tx_key_images_ring_address_tx_ring_addresses = res["tx_key_images_ring_address_tx_ring_addresses"].split("|||").join("||");
           var tx_key_images_ring_tx_hash_data_array = tx_key_images_ring_tx_hash_data.split("|");
           var tx_key_images_ring_address_data_array = tx_key_images_ring_address_data.split("|");
           var tx_key_images_ring_address_tx_extra_array = tx_key_images_ring_address_tx_extra.split("|");
           var tx_key_images_ring_address_tx_ecdh_data_array = tx_key_images_ring_address_tx_ecdh_data.split("|");
           var tx_key_images_ring_address_tx_ring_addresses_array = tx_key_images_ring_address_tx_ring_addresses.split("||");
           for (var count = 0; count < tx_key_images_ring_tx_hash_data_array.length; count++)
           {
             var tx_privacy_settings_key_images = this.get_tx_privacy_settings(tx_key_images_ring_tx_hash_data_array[count],tx_key_images_ring_address_data_array[count],tx_key_images_ring_address_tx_ring_addresses_array[count],tx_key_images_ring_address_tx_extra_array[count],tx_key_images_ring_address_tx_ecdh_data_array[count]);
             if (tx_privacy_settings_key_images !== "private")
             {
              res["tx_key_images_ring_address"] = res["tx_key_images_ring_address"].split(tx_key_images_ring_address_data_array[count]).join(tx_privacy_settings_key_images);
             }
           }
            this.tx_key_images_ring_address = res["tx_key_images_ring_address"].split("||");
            this.tx_key_images_ring_tx_hash = res["tx_key_images_ring_tx_hash"].split("||");  

          for (var count = 0; count < this.tx_key_images.length; count++)
          {
            var tx_key_image_array:any[] = [];
            for (var counter = 0; counter < parseInt(this.tx_ringsize); counter++)
            {
              tx_key_image_array.push({ 
                "tx_key_images_ring_address":this.tx_key_images_ring_address[count].split("|")[counter],
                "tx_key_images_ring_tx_hash":this.tx_key_images_ring_tx_hash[count].split("|")[counter],
                "tx_key_images_ring_address_tx_block_height":this.tx_key_images_ring_address_tx_block_height[count].split("|")[counter],
                "tx_key_images_ring_address_tx_ring_size":this.tx_key_images_ring_address_tx_ring_size[count].split("|")[counter],
                "tx_key_images_ring_address_tx_block_timestamp":this.tx_key_images_ring_address_tx_block_timestamp[count].split("|")[counter]
              }); 
            }
            this.tx_key_images_ring_address_array.push(tx_key_image_array);           
          }



          if (this.tx_privacy_settings === "public")
          {
            // format the cli messages
            this.decode_tx_cli = "check_tx_key " + this.tx_hash + " " + this.tx_private_key + " " + this.public_tx_address_array[0].receiver_address;
            this.verify_sender_cli = "verify verifysender.txt " + this.public_tx_address_array[0].sender_address + " " + this.tx_signature;
          }
        },
        (error) => 
        {
          this.title = "Transaction Data - Error";
        }
      );   
}





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
          this.tx_fee = res["tx_fee"] / this.httpdataservice.WALLET_DECIMAL_PLACES_AMOUNT;
          this.tx_size = parseFloat(res["tx_size"]).toFixed(2) + " KB";
          this.tx_unlock_block = res["tx_unlock_block"];
          this.tx_extra = res["tx_extra"];
          this.tx_public_key = res["tx_extra"].substr(res["tx_extra"].length - 64);
          this.tx_privacy_settings = this.tx_extra.length >= 256 ? "public" : "private";
          this.tx_payment_id = this.httpdataservice.get_payment_id(this.tx_extra);
          this.tx_payment_id_settings = this.tx_extra.substr(0,6) === this.httpdataservice.UNENCRYPTED_PAYMENT_ID ? "unencrypted" : this.tx_extra.substr(0,6) === this.httpdataservice.ENCRYPTED_PAYMENT_ID ? "encrypted" : "none";
          if (this.tx_payment_id !== "none")
          {
            this.tx_payment_id_settings = this.httpdataservice.get_payment_id_settings(this.tx_extra);
          }
          this.tx_ringsize = res["tx_ringsize"];
          this.tx_addresses = res["tx_addresses"];
          this.tx_ecdh_data = res["tx_ecdh_data"];
          this.tx_key_images = res["tx_key_images"].split("|");
          //this.tx_key_images_ring_address = res["tx_key_images_ring_address"].split("||");
          //this.tx_key_images_ring_tx_hash = res["tx_key_images_ring_tx_hash"].split("||");          
          this.tx_key_images_ring_address_tx_ring_addresses = res["tx_key_images_ring_address_tx_ring_addresses"].split("|");
          this.tx_key_images_ring_address_tx_block_height = res["tx_key_images_ring_address_tx_block_height"].split("||");
          this.tx_key_images_ring_address_tx_ring_size = res["tx_key_images_ring_address_tx_ring_size"].split("||");
          this.tx_key_images_ring_address_tx_block_timestamp = res["tx_key_images_ring_address_tx_block_timestamp"].split("||");
          this.tx_key_images_ring_address_tx_extra = res["tx_key_images_ring_address_tx_extra"].split("||");

          // get the public or private tx data
          if (this.tx_privacy_settings === "private")
          {
            this.tx_address_array = this.tx_addresses.split("|");
          }
          else
          {
            this.tx_address_array = this.tx_addresses.split("|");
            this.public_tx_data = this.httpdataservice.get_public_tx_data(this.tx_extra);
            this.tx_signature = this.public_tx_data[0].tx_signature;
            this.tx_private_key = this.public_tx_data[0].tx_private_key;
            // calculate who is the sender and receiver address and the amounts
            // make sure each address can be decoded in the transaction
            var decoded_tx_array1 = verifytx(this.tx_hash,this.public_tx_data[0].address1,this.tx_public_key,this.public_tx_data[0].tx_private_key,this.tx_addresses,JSON.parse(this.tx_ecdh_data),"tx_private_key");
            var decoded_tx_array2 = verifytx(this.tx_hash,this.public_tx_data[0].address2,this.tx_public_key,this.public_tx_data[0].tx_private_key,this.tx_addresses,JSON.parse(this.tx_ecdh_data),"tx_private_key");
            var decoded_tx_array = [];
            for (var count = 0, counter = 0; count < decoded_tx_array1.length; count++)
            {
               if (decoded_tx_array1[count].amount !== "RINGCT_AMOUNT")
               {
                 decoded_tx_array.push({"address":this.public_tx_data[0].address1,"amount":decoded_tx_array1[count].amount});
                 counter++;
               }
               if (decoded_tx_array2[count].amount !== "RINGCT_AMOUNT")
               {
                 decoded_tx_array.push({"address":this.public_tx_data[0].address2,"amount":decoded_tx_array2[count].amount});
                 counter++;
               }
            } 
            if (counter !== 2)
            {
              if (counter === decoded_tx_array1.length + decoded_tx_array2.length && this.public_tx_data[0].address1 === this.public_tx_data[0].address2)
              {
                // check the transaction signature to confirm one of the transaction addresses is the from transaction address
                var verifymessageaddress1results = verifymessage(this.public_tx_data[0].tx_signature,this.public_tx_data[0].address1,this.public_tx_data[0].tx_private_key);
                var verifymessageaddress2results = verifymessage(this.public_tx_data[0].tx_signature,this.public_tx_data[0].address2,this.public_tx_data[0].tx_private_key);
                if (verifymessageaddress1results === true && verifymessageaddress2results === true)
                {
                  this.amounttitle = "Amount plus change amount (the unspent remainder of the sender's spent output, sent back to the sender's address)";
                  this.public_tx_address_array.push({
                    "sender_address":this.public_tx_data[0].address1,
                    "receiver_address":this.public_tx_data[0].address2,
                    "amount":decoded_tx_array1[0].amount + decoded_tx_array1[1].amount,
                    "settings":1
                   });
                }
                else
                {
                  this.tx_privacy_settings = 'private';
                }                   
              }
              else
              {
                this.tx_privacy_settings = 'private';
              }              
            }
            else
            {
              // check the transaction signature to confirm one of the transaction addresses is the from transaction address
              var verifymessageaddress1results = verifymessage(this.public_tx_data[0].tx_signature,this.public_tx_data[0].address1,this.public_tx_data[0].tx_private_key);
              var verifymessageaddress2results = verifymessage(this.public_tx_data[0].tx_signature,this.public_tx_data[0].address2,this.public_tx_data[0].tx_private_key);
              if (verifymessageaddress1results === false && verifymessageaddress2results === false)
              {
                this.tx_privacy_settings = 'private';
              }
              else
              {
                if (verifymessageaddress1results === true)
                {
                  for (var count = 0; count < decoded_tx_array.length; count++)
                  {
                    if (decoded_tx_array[count].address === this.public_tx_data[0].address2)
                    {
                     this.amounttitle = "Amount";
                     var change_amount = count === 0 ? decoded_tx_array[1].amount : decoded_tx_array[0].amount;
                     this.public_tx_address_array.push({
                       "sender_address":this.public_tx_data[0].address1,
                       "receiver_address":this.public_tx_data[0].address2,
                       "amount":decoded_tx_array[count].amount,
                       "change_amount": change_amount,
                       "settings":0
                      });
                    }
                  }     
                }
                else
                {
                  for (var count = 0; count < decoded_tx_array.length; count++)
                  {
                    if (decoded_tx_array[count].address === this.public_tx_data[0].address1)
                    {
                     this.amounttitle = "Amount";
                     var change_amount = count === 0 ? decoded_tx_array[1].amount : decoded_tx_array[0].amount;
                     this.public_tx_address_array.push({
                       "sender_address":this.public_tx_data[0].address2,
                       "receiver_address":this.public_tx_data[0].address1,
                       "amount":decoded_tx_array[count].amount,
                       "change_amount": change_amount,
                       "settings":0
                      });
                    }
                  }  
                }                           
              }
            }
          }
          
           // decode any public transactions for key images
           var tx_key_images_ring_address_data = res["tx_key_images_ring_address"].split("||").join("|");
           var tx_key_images_ring_tx_hash_data = res["tx_key_images_ring_tx_hash"].split("||").join("|");
           var tx_key_images_ring_address_tx_extra = res["tx_key_images_ring_address_tx_extra"].split("||").join("|");
           var tx_key_images_ring_address_tx_ecdh_data = res["tx_key_images_ring_address_tx_ecdh_data"].split("||").join("|");
           var tx_key_images_ring_address_tx_ring_addresses = res["tx_key_images_ring_address_tx_ring_addresses"].split("|||").join("||");
           var tx_key_images_ring_tx_hash_data_array = tx_key_images_ring_tx_hash_data.split("|");
           var tx_key_images_ring_address_data_array = tx_key_images_ring_address_data.split("|");
           var tx_key_images_ring_address_tx_extra_array = tx_key_images_ring_address_tx_extra.split("|");
           var tx_key_images_ring_address_tx_ecdh_data_array = tx_key_images_ring_address_tx_ecdh_data.split("|");
           var tx_key_images_ring_address_tx_ring_addresses_array = tx_key_images_ring_address_tx_ring_addresses.split("||");
           for (var count = 0; count < tx_key_images_ring_tx_hash_data_array.length; count++)
           {
             var tx_privacy_settings_key_images = this.get_tx_privacy_settings(tx_key_images_ring_tx_hash_data_array[count],tx_key_images_ring_address_data_array[count],tx_key_images_ring_address_tx_ring_addresses_array[count],tx_key_images_ring_address_tx_extra_array[count],tx_key_images_ring_address_tx_ecdh_data_array[count]);
             if (tx_privacy_settings_key_images !== "private")
             {
              res["tx_key_images_ring_address"] = res["tx_key_images_ring_address"].split(tx_key_images_ring_address_data_array[count]).join(tx_privacy_settings_key_images);
             }
           }
            this.tx_key_images_ring_address = res["tx_key_images_ring_address"].split("||");
            this.tx_key_images_ring_tx_hash = res["tx_key_images_ring_tx_hash"].split("||");  

          for (var count = 0; count < this.tx_key_images.length; count++)
          {
            var tx_key_image_array:any[] = [];
            for (var counter = 0; counter < parseInt(this.tx_ringsize); counter++)
            {
              tx_key_image_array.push({ 
                "tx_key_images_ring_address":this.tx_key_images_ring_address[count].split("|")[counter],
                "tx_key_images_ring_tx_hash":this.tx_key_images_ring_tx_hash[count].split("|")[counter],
                "tx_key_images_ring_address_tx_block_height":this.tx_key_images_ring_address_tx_block_height[count].split("|")[counter],
                "tx_key_images_ring_address_tx_ring_size":this.tx_key_images_ring_address_tx_ring_size[count].split("|")[counter],
                "tx_key_images_ring_address_tx_block_timestamp":this.tx_key_images_ring_address_tx_block_timestamp[count].split("|")[counter]
              }); 
            }
            this.tx_key_images_ring_address_array.push(tx_key_image_array);           
          }



          if (this.tx_privacy_settings === "public")
          {
            // format the cli messages
            this.decode_tx_cli = "check_tx_key " + this.tx_hash + " " + this.tx_private_key + " " + this.public_tx_address_array[0].receiver_address;
            this.verify_sender_cli = "verify verifysender.txt " + this.public_tx_address_array[0].sender_address + " " + this.tx_signature;
          }

          // get the tx_confirmations
          var data = "tx_hash=" + this.route.snapshot.queryParamMap.get("data");
            this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_TRANSACTION_CONFIRMATIONS + "?" + data).subscribe(
              (res) =>
              {
                this.tx_confirmations = res["tx_confirmations"]; 
                this.tx_previous_confirmations = res["tx_confirmations"];          
              },
              (error) => 
              {
                this.tx_confirmations = "Error";
              }
            );  
            
            this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_LAST_BLOCK_DATA).subscribe(
              (res) =>
              {
                this.unlockedblockprogress = ((res["block_height"] - parseInt(this.tx_block_height)) / (parseInt(this.tx_unlock_block) - parseInt(this.tx_block_height) - 1)) * 100;
                this.htmlcode = true;
              },
              (error) => 
              {
                
              }
            );       
            
            this.httpdataservice.Timer = setInterval(() =>
            {
            var data = "tx_hash=" + this.route.snapshot.queryParamMap.get("data");
            this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_TRANSACTION_CONFIRMATIONS + "?" + data).subscribe(
              (res) =>
              {
                this.tx_confirmations = res["tx_confirmations"];    
                if (this.tx_previous_confirmations < 0 && parseInt(res["tx_confirmations"]) > 0)
                {
                  this.get_transaction_data();
                  this.tx_previous_confirmations = parseInt(res["tx_confirmations"]);
                }     
              },
              (error) => 
              {
                this.tx_confirmations = "Error";
              }
            );
            this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_LAST_BLOCK_DATA).subscribe(
              (res) =>
              {
                this.unlockedblockprogress = ((res["block_height"] - parseInt(this.tx_block_height)) / (parseInt(this.tx_unlock_block) - parseInt(this.tx_block_height) - 1)) * 100;
              },
              (error) => 
              {
                
              }
            );                             
          },60000);

        },
        (error) => 
        {
          this.title = "Transaction Data - Error";
        }
      );      
  }
}