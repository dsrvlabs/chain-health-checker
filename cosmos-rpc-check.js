var request = require('request');
const { promises: fs } = require('fs');

var headers = {
  'Content-Type': 'application/json',
};

const timeout = 100000; // 10 second
const cosmosDirectory = 'cosmos';

const requestRPC = (url, chainName) => {
  request(
    {
      url: `${url}/abci_info`,
      method: 'GET',
      headers: headers,
      timeout,
    },
    function (_, response, _) {
      console.log(`${response?.statusCode} ${chainName} ${url}`);
    }
  );
};

const main = async () => {
  const files = await fs.readdir(cosmosDirectory, 'utf8');

  for (const file of files) {
    const jsonFile = await fs.readFile(`${cosmosDirectory}/${file}`, 'utf8');
    const json = JSON.parse(jsonFile.toString());

    if (typeof json.rpc === 'object') {
      for (const rpc of json.rpc) {
        requestRPC(rpc.address);
      }
    } else {
      requestRPC(json.rpc);
    }
  }
};

main().catch((err) => core.setFailed(err.message));
