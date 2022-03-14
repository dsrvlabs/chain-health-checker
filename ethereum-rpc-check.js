var request = require('request');
const { promises: fs } = require('fs');

var headers = {
  'Content-Type': 'application/json',
};

var ethereumBody = `
{
    "jsonrpc": "2.0",
    "method": "eth_getBalance",
    "params": ["0x7fD1fb82A0421dA694243cB8B47E93AB511ea6f0", "latest"],
    "id": 1
  }
`;

const directory = 'ethereum';

const requestRPC = (url, chain, address) => {
  request(
    {
      url: `${url}`,
      method: 'POST',
      headers: headers,
      timeout: 10000,
      body: ethereumBody,
    },
    function (_, response, _) {
      if (response === undefined) {
        console.log(`${response?.statusCode} ${chain} ${url}`);
      }
    }
  );
};

const main = async () => {
  const files = await fs.readdir(directory, 'utf8');

  for (const file of files) {
    const jsonFile = await fs.readFile(`${directory}/${file}`, 'utf8');
    const json = JSON.parse(jsonFile.toString());

    for (const rpc of json.rpc) {
      requestRPC(rpc, json.name);
    }
  }
};

main().catch((err) => core.setFailed(err.message));
