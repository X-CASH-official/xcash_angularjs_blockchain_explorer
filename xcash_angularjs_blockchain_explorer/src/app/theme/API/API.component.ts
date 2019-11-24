import {Component, OnInit} from '@angular/core';
import {httpdataservice} from '../../services/http-request.service'
import {Response} from '@angular/http';

@Component({
  selector: 'app-API',
  templateUrl: './API.component.html',
  styleUrls: ['./API.component.scss']
})
export class APIComponent implements OnInit {
  apijson_blockchain_data:string;
  jsondata_blockchain_data:any = {
    "maximum_supply": 100000000000,
    "generated_supply": 48951532927,
    "circulating_supply": 9950364506,
    "maxium_block_size": "585.94 KB",
    "average_block_size": "0.10 KB",
    "block_height": 93857,
    "current_blockchain_difficulty": 324991620,
    "current_blockchain_hashrate": "5.42 MH/S",
    "current_estimated_blockchain_size": "6.42 GB",
    "total_tx": 500,
    "private_tx_count": 250,
    "public_tx_count": 250,
    "total_tx_pool": 2,
    "blockchain_current_version": 9,
    "blockchain_current_version_block_height": 106000,
    "blockchain_current_version_date": 16-10-2018,
    "blockchain_next_version": 10,
    "blockchain_next_version_block_height": 157000,
    "blockchain_next_version_estimated_date": 1-11-2018,
  };
  apijson_generated_supply:string = "100000000000";
  apijson_circulating_supply:string = "100000000000";
  apijson_current_block_height:string;
  apijson_get_last_block_data:any;
  apijson_get_block_data:string = JSON.stringify({
    "block_height":1000,
    "block_hash":"6ea0a00e2917c84247649837647129e4b5c2b525d9f58edf64a0b4dc7332574f",
    "block_size":0.08984375,"block_tx_amount":0,
    "block_reward":114222.919687,
    "block_timestamp":1532855846,
    "block_difficulty":239229
  },undefined," ");
  apijson_get_transaction_data:string = JSON.stringify({"tx_block_height":80653,
  "tx_block_timestamp":1537718916,
  "tx_version":2,
  "tx_settings":"transaction",
  "tx_ringct_version":2,
  "tx_fee":1373736,
  "tx_size":13.1533203125,
  "tx_unlock_block":80663,
  "tx_extra":"020901f1e3b5980515f84602227c2cf1287b69c97c0a3fed8d9834a57edea758b5a454112da375457ef3e72bc4017c025f7c53696756316479593244683233426d78693952457766704a346e42374d34763365514e48435339417a54594a71767554654a57544d6261546d3975523331623350475970476a394261485166766a58565257513450386f5634756d7a657c02647c58434131634838517335684c596e7a515444754a716b4a6951455a62675173554d334267413676426f6435543545696e6461733573696b4b4a614c626b684d335942573750746f4a593642744e4c6b5a7561686b734c46583565535044636d434c4c7c02647c584341316b7a6f52335a4c4e67357a784e6d7872593846594b74674576505a714332786f52706d3161784370516372725a666f4b54536b534e7341534473706474336a315763456e514a7975754235565053423536575779333641347351745168657c01ae37e5a6952df8717d6b00d23d563211a4f6f919fe5804b68e1cd11f36f6f2ca",
  "tx_ringsize":2,
  "tx_addresses":"789a368c7797ab95422058cbda10fe40e82a82e8db19494afea96ea29e732480|750ee2003bf9e0949747e495387570ad472ca2f9bc38fec6b56ddefa9b493670",
  "tx_ecdh_data":"{\"type\":2,\"txnFee\":1373736,\"pseudoOuts\":[\"67fa2c12e2ce0265427df65e533af7a74cdf75bdf3ee88b8f006e8173f53ca29\",\"6e4e439f1ac48f0e7c2d2f125f2e03bf1fe5db0f5a10b4a0842057c61d6405ff\"],\"ecdhInfo\":[{\"mask\":\"5d4a0f9911c081b1c35685fac16f3a696ef6381990084efdc1ed5e6af2cc440c\",\"amount\":\"2e540dcb03a82afd1357d7adabc50bba8a34727036a12bd5ca45bdc7905fbf0b\"},{\"mask\":\"62ffac9565f6e521deb099b688ae549fa9e18bbea9c0a6af112df13584a8e505\",\"amount\":\"671299c0e290caf5973185451f28d4bee822974690aa3e3b1c85d6016b95df01\"}],\"outPk\":[\"1c9dbced0edb338a7fb4a530ab86337e68caf816c0bf3c9dfd2c0d989939044b\",\"3bdc1b7939bedd94d8786b1418dfc41faac14bed9a24592b341963f96fbcc2b3\"]}","tx_key_images":"f61a7aa913fe7ee01738c8a156cd5d5ad8f086750e0b8f4d4dd3e0865b8f73c6|31a34736b0969e7f02dfab243952276b8cc2c6e59c03d30333bac8f1a6d06db2",
  "tx_key_images_ring_address":"c0e5b1cefb748e59620128a7bca07f15ad3fc8016afc2b72a28e339f0350c8d9|d26e137e478489286b84234273950e4f0568c9d23920e6a3ec68b5cb4abdda25||db05fee919bb2560ba868e903d1bd878b06bfb59874d04ca21e643ea0afd068f|9d9b64695521bf6f4e5f02583d846372da4bd7349735ee3d8559fab3f46fc202",
  "tx_key_images_ring_tx_hash":"362b8b07070555e9c4a5774d07d3987dabc02eae56db435c6b5abbdcd31ca5d3|3f5550b09160089159add7e9c925ce19af184790a1b7e4f78962cbe695bae9f2||d76040f1eaf356eee3c48dcd1d015046c2c599b681174a7a1ceee285f75fbe6b|8046adf7536f83c9ce0b96bd0538849fd9003044b646f48b33000d08b1ab7c28",
  "tx_key_images_ring_address_tx_ring_addresses":"c0e5b1cefb748e59620128a7bca07f15ad3fc8016afc2b72a28e339f0350c8d9|ddc2bee43845eea5a423ae922451d1e62c17fab3cfd6dcfb09da34f56bb975e2||16be6a20b2b97f6d0ffabbdc33ccc1d12763bbb2305dd03309f560d4bf475682|d26e137e478489286b84234273950e4f0568c9d23920e6a3ec68b5cb4abdda25|||4fabf76bfb105c56c8ea62b5ad86f8cb3edcffbf81915af57cb5019b667d107d|db05fee919bb2560ba868e903d1bd878b06bfb59874d04ca21e643ea0afd068f||9d9b64695521bf6f4e5f02583d846372da4bd7349735ee3d8559fab3f46fc202|c1fe82c2a8e6664cdf82f46821a02e40e137735cc7820683a275a6a93071e99b",
  "tx_key_images_ring_address_tx_block_height":"72874|77516||50328|80621",
  "tx_key_images_ring_address_tx_extra":"private_tx|private_tx||private_tx|022100111111111111111111111111111111111111111111111111111111111111111102227cda83271851ce928ed9c735f16a7efd107e375dffa186dc454390c7fdb33208077c025f7c53696756314d6a45344a7731777a4357656753704d786671665054466d59574547726e6d64645547515a5052713468654b416f3265616757775636416a5179554532773235694d315846416465796e704b5945374643566345646554667c02647c584341316b7a6f52335a4c4e67357a784e6d7872593846594b74674576505a714332786f52706d3161784370516372725a666f4b54536b534e7341534473706474336a315763456e514a7975754235565053423536575779333641347351745168657c02647c58434131634838517335684c596e7a515444754a716b4a6951455a62675173554d334267413676426f6435543545696e6461733573696b4b4a614c626b684d335942573750746f4a593642744e4c6b5a7561686b734c46583565535044636d434c4c7c015874d93881c8886c811b09c1fcafed95ebd24e1fe0e9e6654cdf1e1a4cf9e7ce",
  "tx_key_images_ring_address_tx_ecdh_data":"private_tx|private_tx||private_tx|{\"type\":2,\"txnFee\":1373806,\"pseudoOuts\":[\"797f64aa81e4b2b9d7c19b1865ab0322a7d9bf6977f4a553b6ff942237869099\",\"4abe94606afdbd2b92092d9d2adc15a17f413bd3234b919bcb8cbbf164719ed6\"],\"ecdhInfo\":[{\"mask\":\"79293ae4f3a84067a836df7421ad3233f56418ca3a7ec7647bda94c5f076b10b\",\"amount\":\"4c31cf4f3d2d2bf39b3b45221d1914ee4a2e0d62bd082cafdf58cf1361657103\"},{\"mask\":\"1228dc6ef4ddd5ee515454c96e5303314335e89e8311ef9fc073ca3254fbec07\",\"amount\":\"c103de4c6c9d1296db1950ed5aa95cf9c168467a452d2a2ef41c93cdbf0f4f0d\"}],\"outPk\":[\"ad19abf8fe378b8568e3c60354fb6c92347ef04ec1ecf57bd08509bead6e7204\",\"29fbf33027df6eaee28b498f664cad853a3824411431e7633808b523333f1a56\"]}",
  "tx_key_images_ring_address_tx_ring_size":"4|2||2|2",
  "tx_key_images_ring_address_tx_block_timestamp":"1537241405|1537518977||1535796237|1537718102"
  },undefined," ");
  apijson_get_transaction_confirmations:string = JSON.stringify({"tx_confirmations":45708},undefined," ");
  apijson_verify_reserve_proof1:string = JSON.stringify({
    "reserve_proof_settings":"invalid",
    "reserve_proof_amount":0,
    "reserve_proof_amount_spent":0,
    "message":"The reserve proof is invalid for this address"
  },undefined," ");
  apijson_verify_reserve_proof2:string = JSON.stringify({
    "reserve_proof_settings":"valid",
    "reserve_proof_amount":500,
    "reserve_proof_amount_spent":250,
    "message":"The reserve proof is valid for this address, but funds have been spent after creating this reserve proof, meaning that the above amount is incorrect"
  },undefined," ");
  apijson_verify_reserve_proof3:string = JSON.stringify({
    "reserve_proof_settings":"valid",
    "reserve_proof_amount":500,
    "reserve_proof_amount_spent":0,
    "message":"The reserve proof is valid for this address, and no funds have been spent since creating this reserve proof"
  },undefined," ");
  apijson_create_integrated_address:string = JSON.stringify({
    "public_address":"XCA1cH8Qs5hLYnzQTDuJqkJiQEZbgQsUM3BgA6vBod5T5Eindas5sikKJaLbkhM3YBW7PtoJY6BtNLkZuahksLFX5eSPDcmCLL",
    "payment_id":"1729bc4feb1fba91",
    "integrated_address":"XCBzxazydAqeYWYsBbWKLqbhB1ZsVoWxi1Lu3crDLLURZU1AczC9GKXGdN53wAi7WvdF4pZwUKuEJHdu8rEaTRFSXXGrv4cXYiigKzp5Dsj39u"
  },undefined," ");  
  htmlcode:boolean = false; 
    
  constructor(private httpdataservice: httpdataservice) { }

  ngOnInit() {
    clearInterval(this.httpdataservice.Timer);
    this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_BLOCKCHAIN_DATA).subscribe(
      (res) =>
      {
        this.apijson_blockchain_data = JSON.stringify(res,undefined," ");
      },
      (error) => 
      {
        this.apijson_blockchain_data = JSON.stringify(this.jsondata_blockchain_data,undefined," ");
      }
    );    
    this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_GENERATED_SUPPLY).subscribe(
      (res) =>
      {
        this.apijson_generated_supply = res.toString();
      }
    );
    this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_CIRCULATING_SUPPLY).subscribe(
      (res) =>
      {
        this.apijson_circulating_supply = res.toString();
      }
    );
    this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_CURRENT_BLOCK_HEIGHT).subscribe(
      (res) =>
      {
        this.apijson_current_block_height = JSON.stringify(res,undefined," ");
      }
    );
    this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_LAST_BLOCK_DATA).subscribe(
      (res) =>
      {
        this.apijson_get_last_block_data = JSON.stringify(res,undefined," ");
        this.htmlcode = true;
      }
    );
  }
}
