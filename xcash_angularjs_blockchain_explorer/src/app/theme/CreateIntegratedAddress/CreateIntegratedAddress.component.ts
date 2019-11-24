import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {httpdataservice} from '../../services/http-request.service'
declare var create_integrated_address: any;

@Component({
  selector: 'app-CreateIntegratedAddress',
  templateUrl: './CreateIntegratedAddress.component.html',
  styleUrls: ['./CreateIntegratedAddress.component.scss']
})
export class CreateIntegratedAddressComponent implements OnInit {
  title:string = "Create Integrated Address";
  createintegratedaddresshtml:boolean = false;   
  public_address:string;
  payment_id:string;
  integrated_address:string;
  
  constructor(private route: ActivatedRoute,private httpdataservice: httpdataservice) { } 

  ngOnInit() {
    clearInterval(this.httpdataservice.Timer);
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

    randString(length:number) {
    var str = '';
    var charset = '0123456789abcdef';
    while (length--) {
    str += charset[Math.floor((Math.random() * charset.length))];
    }
    return str;
    }

  createintegratedaddress(public_address:string,payment_id:string)
  { 
    if (public_address.length !== 98)
    {
      this.title = "Create Integrated Address - Error";
      return;
    }
    this.createintegratedaddresshtml = false;
    this.public_address = public_address;
    this.payment_id = payment_id.length === 16 ? payment_id : this.randString(16);
    this.integrated_address = create_integrated_address(this.public_address,this.payment_id);
    this.createintegratedaddresshtml = true;
  }
}
