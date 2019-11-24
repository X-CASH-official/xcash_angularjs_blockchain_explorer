import {Component, OnInit} from '@angular/core';
import {httpdataservice} from '../../services/http-request.service'
import {Response} from '@angular/http';

@Component({
  selector: 'app-SendHexadecimalTX',
  templateUrl: './SendHexadecimalTX.component.html',
  styleUrls: ['./SendHexadecimalTX.component.scss']
})
export class SendHexadecimalTXComponent implements OnInit {
  senthexadecimaltransactionhtml:boolean = false; 
  senthexadecimaltransactionhtmlresult:string = "";
  
  constructor(private httpdataservice: httpdataservice) { }

  ngOnInit() {
    clearInterval(this.httpdataservice.Timer);
  }

  validatehexadecimaltransaction(tx_data:string)
  {
    var data:string = "tx_data_hexadecimal=" + tx_data + "&settings=1";
    this.httpdataservice.post_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_SEND_HEXADECIMAL_TRANSACTION,data).subscribe(
      (res) =>
      {
        this.senthexadecimaltransactionhtmlresult = res['send_hexadecimal_transaction_results'] !== "Success" ? "The hexadecimal transaction is invalid.<br><br>The reason is: " + res['send_hexadecimal_transaction_results'] : "The hexadecimal transaction is valid."
      },
      (error) => 
      {
        this.senthexadecimaltransactionhtmlresult = "An error hash occured";
      }
    );
    this.senthexadecimaltransactionhtml = true;
  }

  sendhexadecimaltransaction(tx_data:string)
  {
    var data:string = "tx_data_hexadecimal=" + tx_data + "&settings=0";
    this.httpdataservice.post_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_SEND_HEXADECIMAL_TRANSACTION,data).subscribe(
      (res) =>
      {
        this.senthexadecimaltransactionhtmlresult = res['send_hexadecimal_transaction_results'] !== "Success" ? "The hexadecimal transaction could not be sent.<br><br>The reason is: " + res['send_hexadecimal_transaction_results'] : "The hexadecimal transaction has been sent successfully."
      },
      (error) => 
      {
        this.senthexadecimaltransactionhtmlresult = "An error hash occured";
      }
    );
    this.senthexadecimaltransactionhtml = true;
  }

}
