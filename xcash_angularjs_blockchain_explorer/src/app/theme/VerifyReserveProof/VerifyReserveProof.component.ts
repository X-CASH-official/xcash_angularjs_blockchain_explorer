import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {httpdataservice} from '../../services/http-request.service'

@Component({
  selector: 'app-VerifyReserveProof',
  templateUrl: './VerifyReserveProof.component.html',
  styleUrls: ['./VerifyReserveProof.component.scss']
})
export class VerifyReserveProofComponent implements OnInit {
  title:string = "Verify Reserve Proof";
  VerifyReserveProofhtml:boolean = false; 
  verifyreserveproofresults:number;
  public_address:string;
  reserve_proof:string;
  message:string;
  reserve_proof_settings:string;
  reserve_proof_amount:number;
  reserve_proof_spent_amount:number;
  reserve_proof_api_message:string;


  
  constructor(private route: ActivatedRoute,private httpdataservice: httpdataservice) { } 

  ngOnInit() {
    clearInterval(this.httpdataservice.Timer);
    this.public_address = this.route.snapshot.queryParamMap.get("public_address");
    this.reserve_proof = this.route.snapshot.queryParamMap.get("reserve_proof");
    this.message = this.route.snapshot.queryParamMap.get("message");
  }

  VerifyReserveProof(public_address:string,reserve_proof:string,message:string)
  { 
    this.VerifyReserveProofhtml = false;
    // get the data
    this.public_address = public_address;   
    this.reserve_proof = reserve_proof;   
    this.message = message; 

    this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_VERIFY_RESERVE_PROOF + "?public_address=" + this.public_address + "&reserve_proof=" + this.reserve_proof + "&data=" + this.message).subscribe(
      (res) =>
      {
        this.reserve_proof_settings = res["reserve_proof_settings"];
        this.reserve_proof_amount = res["reserve_proof_amount"];
        this.reserve_proof_spent_amount = res["reserve_proof_amount_spent"];
        this.reserve_proof_api_message = res["message"];
        this.verifyreserveproofresults = this.reserve_proof_api_message === "The reserve proof is valid for this address, and no funds have been spent since creating this reserve proof" ? 1 : 0;
        this.VerifyReserveProofhtml = true;
      },
      (error) => 
      {
        this.VerifyReserveProofhtml = false;
        this.title = "Verify Reserve Proof - Error";
      }
    );  
  }
}
