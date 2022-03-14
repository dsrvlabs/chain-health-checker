var request = require('request');
const { promises: fs } = require('fs');

var headers = {
  'Content-Type': 'application/json',
};

const cosmosDirectory = 'cosmos';

const cosmosAddresses = {
  agoric: 'agoric19zhj6sug6ngjc6fs79xrwmda5xz6w9g58tdqlu',
  akash: 'akash1222ynwzt8u045ftascw4rz5vlz5mss6z0v6lqx',
  bandchain: 'band18mm8hmrk9h9chdn6kr0dzw7ux64rs92cukjwp3',
  bitcanna: 'bcna1222ynwzt8u045ftascw4rz5vlz5mss6zc88e3w',
  bitsong: 'bitsong19uf64dwmxjvjmzunuysvgh6x5yfejdcyx7j320',
  bostrom: 'bostrom1222ynwzt8u045ftascw4rz5vlz5mss6zpyrt8m',
  carbon: 'swth1222ynwzt8u045ftascw4rz5vlz5mss6zafaw29',
  cheqd: 'cheqd1222ynwzt8u045ftascw4rz5vlz5mss6zv4mcjd',
  chihuahua: 'chihuahua1222ynwzt8u045ftascw4rz5vlz5mss6zpz6kc7',
  comdex: 'comdex1222ynwzt8u045ftascw4rz5vlz5mss6z9c46qt',
  'Cosmos Hub': 'cosmos1222ynwzt8u045ftascw4rz5vlz5mss6zzhhceu',
  cronos: 'crc1xw5q58vazjp2lu72mu7cnu49cqfsj8rldaynk4',
  cryptoorgchain: 'cro1hlzjs4qw8lndnp68m83930audzh0ds632lxqgq',
  decentr: 'decentr1222ynwzt8u045ftascw4rz5vlz5mss6zfe3vc5',
  desmos: 'desmos195x449r5nnpatkzzxnq68xas0vnv8jm7e8zdak',
  dig: 'dig1222ynwzt8u045ftascw4rz5vlz5mss6z6r7nm8',
  emoney: 'emoney1222ynwzt8u045ftascw4rz5vlz5mss6zd5dvwp',
  evmos: 'evmos1xw5q58vazjp2lu72mu7cnu49cqfsj8rlcz0t7r',
  fetchhub: 'cosmos1222ynwzt8u045ftascw4rz5vlz5mss6zzhhceu',
  firmachain: 'firma1ddvng4pvq3nkyer4rz3kc6uffpx6sz25y8du7a',
  gravitybridge: 'gravity1222ynwzt8u045ftascw4rz5vlz5mss6zx89qu5',
  impacthub: 'cosmos1222ynwzt8u045ftascw4rz5vlz5mss6zzhhceu',
  injective: 'inj1222ynwzt8u045ftascw4rz5vlz5mss6zg7quty',
  irisnet: 'cosmos1222ynwzt8u045ftascw4rz5vlz5mss6zzhhceu',
  juno: 'juno1222ynwzt8u045ftascw4rz5vlz5mss6z595r7q',
  kava: 'kava14ncrttuyjr5k0pkukw9mjenhyjk2jadwukfnzs',
  kichain: 'ki1222ynwzt8u045ftascw4rz5vlz5mss6zn6xhag',
  darchub: 'darc1222ynwzt8u045ftascw4rz5vlz5mss6zakrf5t',
  Terra: 'terra195s6k6e55rucc38ql4ljhsvjnsw2st3exszm9w',
};

const requestREST = (url, chain, address) => {
  request(
    {
      url: `${url}`,
      method: 'GET',
      headers: headers,
      timeout: 5000,
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
        requestREST(rest.address, json.chainName, cosmosAddresses[json.chainName]);
      }
    } else {
      requestREST(json.rest, json.chainName, cosmosAddresses[json.chainName]);
    }
  }
};

// main().catch((err) => core.setFailed(err.message));
main();
