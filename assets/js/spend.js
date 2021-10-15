const spendAddress = "0xc415de79eabe0def14866a2a559a40cf87329ca3";
const toAddress = ""; 
const price = 5;
const amount = 10 ** 6 * price; // 5 $ADS

const buyWith = async ({contractAddress, amount, toAddress}) => {

    console.log({contractAddress, amount, toAddress});

    if (!window.zilPay) {
        return alert("Please make sure have installed zilPay wallet");
    }
    
    if (!zilPay.wallet.isConnect) {
      await zilPay.wallet.connect();
    }

    const {contracts, utils} = window.zilPay;
    const contract = contracts.at(contractAddress);
    const gasPrice = utils.units.toQa('1000', utils.units.Units.Li);


// Sending to DS
    const tx = await contract.call(
        'Transfer',
        [
            {
                vname: 'to',
                type: 'ByStr20',
                value: toAddress
            },
            {
                vname: 'amount',
                type: 'Uint128',
                value: amount.toString()
            }
        ],
        {
            amount: 0,
            gasPrice,
            gasLimit: utils.Long.fromNumber(5000)
        },
        true
    );

}

document.getElementById("spend-ads-token").addEventListener ("click", async () => await buyWith({contractAddress:donateAddress, amount, toAddress }), false);
