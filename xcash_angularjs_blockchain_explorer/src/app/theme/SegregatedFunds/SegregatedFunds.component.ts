import {Component, OnInit} from '@angular/core';
import {httpdataservice} from '../../services/http-request.service'
import {Response} from '@angular/http';
import 'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-SegregatedFunds',
  templateUrl: './SegregatedFunds.component.html',
  styleUrls: ['./SegregatedFunds.component.scss']
})
export class SegregatedFundsComponent implements OnInit {
  htmlcode:boolean = false;
  verifypreminefundstitle:string;
  htmlcodechart:boolean = false;
  verifyreserveproofresults_amount:number = 0;
  verifyreserveproofresults_amountspent:number = 0;
  reserve_proof_settings:string;
  address_settings:string;
  verifypreminefundsairdroptitle:string;
  htmlcodeairdropchart:boolean = false;
  verifyreserveproofresults_airdrop:any[] = [];
  verifyreserveproofresults_airdrop_amount:number = 0;
  verifyreserveproofresults_airdrop_amountspent:number = 0;

  verifypreminefundsxcashtitle:string;
  htmlcodexcashchart:boolean = false;
  verifyreserveproofresults_xcash:any[] = [];
  verifyreserveproofresults_xcash_amount:number = 0;
  verifyreserveproofresults_xcash_amountspent:number = 0;

  verifypreminefundsxcashrewardstitle:string;
  htmlcodexcashrewardschart:boolean = false;
  verifyreserveproofresults_xcashrewards:any[] = [];
  verifyreserveproofresults_xcashrewards_amount:number = 0;
  verifyreserveproofresults_xcashrewards_amountspent:number = 0;

  verifypreminefundsxcashinvestorstitle:string;
  htmlcodexcashinvestorschart:boolean = false;
  verifyreserveproofresults_xcashinvestors:any[] = [];
  verifyreserveproofresults_xcashinvestors_amount:number = 0;
  verifyreserveproofresults_xcashinvestors_amountspent:number = 0;

  constructor(private httpdataservice: httpdataservice) { }

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

  ngOnInit() {
    clearInterval(this.httpdataservice.Timer);
    var counter = 1;
        // airdrop
        this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_VERIFY_PREMINE_FUNDS_AIRDROP).subscribe(
          (res) =>
          {
            var str = res["data"].split("||");
            var verifyreserveproofresults_airdrop_htmlresults;
            for (var count = 0; count < str.length; count++)
            {
              var data = str[count].split("|");
              if (data[5] === "The reserve proof is valid for this address, and no funds have been spent since creating this reserve proof")
              {
                verifyreserveproofresults_airdrop_htmlresults = 1;
                this.verifyreserveproofresults_airdrop_amount += parseFloat(data[3]);
              }
              else
              {
                verifyreserveproofresults_airdrop_htmlresults = 0;
              }
              this.verifyreserveproofresults_airdrop.push({
                "settings":verifyreserveproofresults_airdrop_htmlresults,
                "address":data[0],
                "reserveproof":data[1],
                "reserveproofsettings":data[2],
                "amount":data[3],
                "spentamount":data[4],
                "message":data[5],
              });
            }
            this.verifyreserveproofresults_amount += this.verifyreserveproofresults_airdrop_amount;
            counter++;
            this.verifyreserveproofresults_airdrop_amountspent = 20000000000 - this.verifyreserveproofresults_airdrop_amount;
            this.verifyreserveproofresults_airdrop_amount = Math.round(this.verifyreserveproofresults_airdrop_amount);
            this.verifyreserveproofresults_airdrop_amountspent = Math.round(this.verifyreserveproofresults_airdrop_amountspent);
            this.verifypreminefundsairdroptitle = "Airdrop Funds";

            var data2 = {bindto: '#preminefundsairdropchart',data:{columns:[],type:'donut', colors: {Unspent_Funds:'#fa741c',Spent_Funds:'#1189a5'}}};
            data2.data.columns.push(['Unspent_Funds', this.verifyreserveproofresults_airdrop_amount]);
            data2.data.columns.push(['Spent_Funds', this.verifyreserveproofresults_airdrop_amountspent]);
            setTimeout(() => {
              this.htmlcodeairdropchart = true;
              c3.generate(data2);
            }, 1000);
          },
          (error) =>
          {
            counter++;
            this.htmlcodeairdropchart = false;
            this.verifypreminefundsairdroptitle = "Airdrop Funds - Error";
          }
        );

        // xcash
        this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_VERIFY_PREMINE_FUNDS_XCASH).subscribe(
          (res) =>
          {
            var str = res["data"].split("||");
            var verifyreserveproofresults_xcash_htmlresults;
            for (var count = 0; count < str.length; count++)
            {
              var data = str[count].split("|");
              if (data[5] === "The reserve proof is valid for this address, and no funds have been spent since creating this reserve proof")
              {
                verifyreserveproofresults_xcash_htmlresults = 1;
                this.verifyreserveproofresults_xcash_amount += parseFloat(data[3]);
              }
              else
              {
                verifyreserveproofresults_xcash_htmlresults = 0;
              }
              this.verifyreserveproofresults_xcash.push({
                "settings":verifyreserveproofresults_xcash_htmlresults,
                "address":data[0],
                "reserveproof":data[1],
                "reserveproofsettings":data[2],
                "amount":data[3],
                "spentamount":data[4],
                "message":data[5],
              });
            }
            this.verifyreserveproofresults_amount += this.verifyreserveproofresults_xcash_amount;
            counter++;
            this.verifyreserveproofresults_xcash_amountspent = 10000000000 - this.verifyreserveproofresults_xcash_amount;
            this.verifyreserveproofresults_xcash_amount = Math.round(this.verifyreserveproofresults_xcash_amount);
            this.verifyreserveproofresults_xcash_amountspent = Math.round(this.verifyreserveproofresults_xcash_amountspent);
            this.verifypreminefundsxcashtitle = "XCASH Funds";

            var data2 = {bindto: '#preminefundsxcashchart',data:{columns:[],type:'donut', colors: {Unspent_Funds:'#fa741c',Spent_Funds:'#1189a5'}}};
            data2.data.columns.push(['Unspent_Funds', this.verifyreserveproofresults_xcash_amount]);
            data2.data.columns.push(['Spent_Funds', this.verifyreserveproofresults_xcash_amountspent]);
            setTimeout(() => {
              this.htmlcodexcashchart = true;
              c3.generate(data2);
            }, 1000);
          },
          (error) =>
          {
            counter++;
            this.htmlcodexcashchart = false;
            this.verifypreminefundsxcashtitle = "XCASH Funds - Error";
          }
        );

        // xcash_rewards
        this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_VERIFY_PREMINE_FUNDS_XCASH_REWARDS).subscribe(
          (res) =>
          {
            var str = res["data"].split("||");
            var verifyreserveproofresults_xcash_rewards_htmlresults;
            for (var count = 0; count < str.length; count++)
            {
              var data = str[count].split("|");
              if (data[5] === "The reserve proof is valid for this address, and no funds have been spent since creating this reserve proof")
              {
                verifyreserveproofresults_xcash_rewards_htmlresults = 1;
                this.verifyreserveproofresults_xcashrewards_amount += parseFloat(data[3]);
              }
              else
              {
                verifyreserveproofresults_xcash_rewards_htmlresults = 0;
              }
              this.verifyreserveproofresults_xcashrewards.push({
                "settings":verifyreserveproofresults_xcash_rewards_htmlresults,
                "address":data[0],
                "reserveproof":data[1],
                "reserveproofsettings":data[2],
                "amount":data[3],
                "spentamount":data[4],
                "message":data[5],
              });
            }
            this.verifyreserveproofresults_amount += this.verifyreserveproofresults_xcashrewards_amount;
            counter++;
            this.verifyreserveproofresults_xcashrewards_amountspent = 5000000000 - this.verifyreserveproofresults_xcashrewards_amount;
            this.verifyreserveproofresults_xcashrewards_amount = Math.round(this.verifyreserveproofresults_xcashrewards_amount);
            this.verifyreserveproofresults_xcashrewards_amountspent = Math.round(this.verifyreserveproofresults_xcashrewards_amountspent);
            this.verifypreminefundsxcashrewardstitle = "XCASH Rewards Funds";

            var data2 = {bindto: '#preminefundsxcashrewardschart',data:{columns:[],type:'donut', colors: {Unspent_Funds:'#fa741c',Spent_Funds:'#1189a5'}}};
            data2.data.columns.push(['Unspent_Funds', this.verifyreserveproofresults_xcashrewards_amount]);
            data2.data.columns.push(['Spent_Funds', this.verifyreserveproofresults_xcashrewards_amountspent]);
            setTimeout(() => {
              this.htmlcodexcashrewardschart = true;
              c3.generate(data2);
            }, 1000);
          },
          (error) =>
          {
            counter++;
            this.htmlcodexcashrewardschart = false;
            this.verifypreminefundsxcashrewardstitle = "XCASH Rewards Funds - Error";
          }
        );

         // xcash_investors
         this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_VERIFY_PREMINE_FUNDS_XCASH_INVESTORS).subscribe(
          (res) =>
          {
            var str = res["data"].split("||");
            var verifyreserveproofresults_xcash_investors_htmlresults;
            for (var count = 0; count < str.length; count++)
            {
              var data = str[count].split("|");
              if (data[5] === "The reserve proof is valid for this address, and no funds have been spent since creating this reserve proof")
              {
                verifyreserveproofresults_xcash_investors_htmlresults = 1;
                this.verifyreserveproofresults_xcashinvestors_amount += parseFloat(data[3]);
              }
              else
              {
                verifyreserveproofresults_xcash_investors_htmlresults = 0;
              }
              this.verifyreserveproofresults_xcashinvestors.push({
                "settings":verifyreserveproofresults_xcash_investors_htmlresults,
                "address":data[0],
                "reserveproof":data[1],
                "reserveproofsettings":data[2],
                "amount":data[3],
                "spentamount":data[4],
                "message":data[5],
              });
            }
            this.verifyreserveproofresults_amount += this.verifyreserveproofresults_xcashinvestors_amount;
            counter++;
            this.verifyreserveproofresults_xcashinvestors_amountspent = 5000000000 - this.verifyreserveproofresults_xcashinvestors_amount;
            this.verifyreserveproofresults_xcashinvestors_amount = Math.round(this.verifyreserveproofresults_xcashinvestors_amount);
            this.verifyreserveproofresults_xcashinvestors_amountspent = Math.round(this.verifyreserveproofresults_xcashinvestors_amountspent);
            this.verifypreminefundsxcashinvestorstitle = "XCASH investors Funds";

            var data2 = {bindto: '#preminefundsxcashinvestorschart',data:{columns:[],type:'donut', colors: {Unspent_Funds:'#fa741c',Spent_Funds:'#1189a5'}}};
            data2.data.columns.push(['Unspent_Funds', this.verifyreserveproofresults_xcashinvestors_amount]);
            data2.data.columns.push(['Spent_Funds', this.verifyreserveproofresults_xcashinvestors_amountspent]);
            setTimeout(() => {
              this.htmlcodexcashinvestorschart = true;
              c3.generate(data2);
            }, 1000);
          },
          (error) =>
          {
            counter++;
            this.htmlcodexcashinvestorschart = false;
            this.verifypreminefundsxcashinvestorstitle = "XCASH investors Funds - Error";
          }
        );
        this.httpdataservice.Timer = setInterval(() => {
          if (counter === 5)
          {
            this.verifyreserveproofresults_amountspent = 40000000000 - this.verifyreserveproofresults_amount;
            this.verifyreserveproofresults_amount = Math.round(this.verifyreserveproofresults_amount);
            this.verifyreserveproofresults_amountspent = Math.round(this.verifyreserveproofresults_amountspent);

            var data2 = {bindto: '#preminefundschart',data:{columns:[],type:'donut', colors: {Unspent_Funds:'#fa741c',Spent_Funds:'#1189a5'}}};
            data2.data.columns.push(['Unspent_Funds', this.verifyreserveproofresults_amount]);
            data2.data.columns.push(['Spent_Funds', this.verifyreserveproofresults_amountspent]);
            setTimeout(() => {
              this.htmlcodechart = true;
              c3.generate(data2);
            }, 1000);
          }
          }, 100);

        this.htmlcode = true;

  }
}
