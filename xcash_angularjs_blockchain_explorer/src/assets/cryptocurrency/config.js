const WALLET_DECIMAL_PLACES_AMOUNT = 1000000;
const UNENCRYPTED_PAYMENT_ID = "022100";
const ENCRYPTED_PAYMENT_ID = "020901";
const TX_PRIVATE_KEY = "02227c";
const TX_SIGNATURE = "025f7c";
const TX_ADDRESS = "02647c";

var config = {
    coinUnitPlaces: 6,
    txMinConfirms: 10,
    coinSymbol: 'XCA',
    openAliasPrefix: "xca",
    coinName: 'XCASH',
    coinUriPrefix: 'XCASH:',
    addressPrefix: 0x5c134,
    integratedAddressPrefix: 0x3fc134,
    feePerKB: new JSBigInt('10000000000'),
    dustThreshold: new JSBigInt('1000000'),
    txChargeRatio: 0.5,
    defaultMixin: 1,
    idleTimeout: 10,
    idleWarningDuration: 20,
    maxBlockNumber: 500000000,
    avgBlockTime: 60,
    debugMode: false
};

function hexadecimaltostring(text)
{
var str = "";
for (var count = 0; count < text.length; count += 2)
{
str += String.fromCharCode(parseInt(text.substr(count,2),16));
}
return str;
}