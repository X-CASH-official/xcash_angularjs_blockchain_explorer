import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {httpdataservice} from '../../services/http-request.service'
declare var verifymessage: any;

@Component({
  selector: 'app-VerifySender',
  templateUrl: './VerifySender.component.html',
  styleUrls: ['./VerifySender.component.scss']
})
export class VerifySenderComponent implements OnInit {
  title:string = "Verify Sender";
  verifysenderhtml:boolean = false; 
  verifymessageaddressresults:boolean;
  public_address:string;
  tx_private_key:string;
  tx_signature:string;

  
  constructor(private route: ActivatedRoute,private httpdataservice: httpdataservice) { } 

  ngOnInit() {
    clearInterval(this.httpdataservice.Timer);
    this.public_address = this.route.snapshot.queryParamMap.get("public_address");
    this.tx_private_key = this.route.snapshot.queryParamMap.get("tx_private_key");
    this.tx_signature = this.route.snapshot.queryParamMap.get("tx_signature");
  }

  verifysender(public_address:string,tx_private_key:string,tx_signature:string)
  { 
    this.verifysenderhtml = false;
    // get the data
    this.public_address = public_address;   
    this.tx_private_key = tx_private_key;   
    this.tx_signature = tx_signature; 

    if (this.public_address.length !== 98 || this.tx_private_key.length !== 64 || this.tx_signature.length !== 93)
    {
      this.title = "Verify Sender - Error";
      return;
    }    
    this.verifymessageaddressresults = verifymessage(this.tx_signature,this.public_address,this.tx_private_key);
    this.verifysenderhtml = true;
  }
}
