import {Component, OnInit} from '@angular/core';
import {httpdataservice} from '../../services/http-request.service'
import {Response} from '@angular/http';
import 'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-NodesList',
  templateUrl: './NodesList.component.html',
  styleUrls: ['./NodesList.component.scss']
})
export class NodesListComponent implements OnInit { 
  htmlcode:boolean = true; 
  NodesListtitle:string = "Online Nodes List";
  htmlcodechart:boolean = false; 
  remote_nodes_array:any[] = [
  {"node_name":"USSEED1.X-CASH.ORG","node_port":"18281","node_continent":"North America","node_country":"United States","node_city":"Oregon","node_cli":"xcash-wallet-cli --daemon-address USSEED1.X-CASH.ORG:18281"},
  {"node_name":"USSEED2.X-CASH.ORG","node_port":"18281","node_continent":"North America","node_country":"United States","node_city":"Virgina","node_cli":"xcash-wallet-cli --daemon-address USSEED2.X-CASH.ORG:18281"},
  {"node_name":"EUSEED1.X-CASH.ORG","node_port":"18281","node_continent":"Europe","node_country":"Germany","node_city":"Frankfurt","node_cli":"xcash-wallet-cli --daemon-address EUSEED1.X-CASH.ORG:18281"},
  {"node_name":"EUSEED3.X-CASH.ORG","node_port":"18281","node_continent":"Europe","node_country":"France","node_city":"Paris","node_cli":"xcash-wallet-cli --daemon-address EUSEED3.X-CASH.ORG:18281"},
  {"node_name":"ASIASEED2.X-CASH.ORG:18281","node_port":"18281","node_continent":"Asia","node_country":"Singapore","node_city":"Singapore","node_cli":"xcash-wallet-cli --daemon-address ASIASEED2.X-CASH.ORG:18281"}
];
    
  constructor(private httpdataservice: httpdataservice) { }
 
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

ngAfterViewInit(){
    this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_NODES_LIST).subscribe(
          (res) =>
          {
            var data = res["nodes_list"].split("|");
            for (var count = 0; count < data.length; count++)
            {
              document.getElementById("circle" + data[count]).classList.add("online");
            }
            // load the official nodes
            document.getElementById("circle2479").classList.add("onlineofficialnodes"); 
            document.getElementById("circle2086").classList.add("onlineofficialnodes"); 
            document.getElementById("circle1568").classList.add("onlineofficialnodes"); 
            document.getElementById("circle1529").classList.add("onlineofficialnodes");
            document.getElementById("circle598").classList.add("onlineofficialnodes");                      
          },
          (error) => 
          {
            this.htmlcode = false;
            this.NodesListtitle = "Online Nodes List - Error";
          }
        );
  }

  ngOnInit() {
   
  }
}
