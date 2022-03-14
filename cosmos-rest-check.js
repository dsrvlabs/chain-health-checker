var request = require('request');
const { promises: fs } = require('fs');

var headers = {
  'Content-Type': 'application/json',
};

const timeout = 100000; // 10 second
const cosmosDirectory = 'cosmos';

const requestREST = (url, chain) => {
  request(
    {
      url: `${url}/node_info`,
      method: 'GET',
      headers: headers,
      timeout,
    },
    function (_, response, _) {
      console.log(`${response?.statusCode} ${chain} ${url}`);
    }
  );
};

const main = async () => {
  const files = await fs.readdir(cosmosDirectory, 'utf8');

  for (const file of files) {
    const jsonFile = await fs.readFile(`${cosmosDirectory}/${file}`, 'utf8');
    const json = JSON.parse(jsonFile.toString());

    if (typeof json.rest === 'object') {
      for (const rest of json.rest) {
        requestREST(rest.address, json.chainName);
      }
    } else {
      requestREST(json.rest, json.chainName);
    }
  }
};

main().catch((err) => core.setFailed(err.message));
