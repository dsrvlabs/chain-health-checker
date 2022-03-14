var request = require('request');
const { promises: fs } = require('fs');

var headers = {
  'Content-Type': 'application/json',
};

const timeout = 100000; // 10 second
const cosmosDirectory = 'cosmos';

const main = async () => {
  const files = await fs.readdir(cosmosDirectory, 'utf8');

  for (const file of files) {
    const jsonFile = await fs.readFile(`${cosmosDirectory}/${file}`, 'utf8');
    const json = JSON.parse(jsonFile.toString());

    if (typeof json.rpc === 'object') {
      for (const rpc of json.rpc) {
        request(
          {
            url: `${rpc.address}/abci_info`,
            method: 'GET',
            headers: headers,
            timeout,
          },
          function (_, response, _) {
            console.log(`${response?.statusCode} ${file} ${rpc.address}`);
          }
        );
      }
    } else {
      request(
        {
          url: `${json.rpc}/abci_info`,
          method: 'GET',
          headers: headers,
          timeout,
        },
        function (_, response, _) {
          console.log(`${response?.statusCode} ${file} ${json.rpc}`);
        }
      );
    }
  }
};

main().catch((err) => core.setFailed(err.message));
