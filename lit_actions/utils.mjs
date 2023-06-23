import getlitConfig from './getlit.json' assert { type: 'json' };
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';

const errorLog = (msg) => {
  console.log('\x1b[31m%s\x1b[0m', msg);
};

async function runCommand(command) {
  return new Promise((resolve, reject) => {
    const child = exec(
      command,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout.trim());
      },
      {
        env: {
          ...process.env,
          FORCE_COLOR: true,
        },
      }
    );
    child.stdout.on('data', (data) => {
      console.log(`${data.toString().replace(/\n$/, '')}`);
    });

    child.stderr.on('data', (data) => {
      console.warn(`${data.toString().replace(/\n$/, '')}`);
    });

    child.on('close', (code) => {
      // console.log(`child process exited with code ${code}`);
      // exit();
    });
  });
}

let client;

try {
  const LitJsSdk = await import('@lit-protocol/lit-node-client-nodejs').then(
    (LitJsSdk) => LitJsSdk
  );

  client = new LitJsSdk.LitNodeClientNodeJs({
    litNetwork: 'serrano',
    // debug: false
  });
  await client.connect();
} catch (e) {
  errorLog(
    `🚨 Cannot find package! Running "yarn add @lit-protocol/lit-node-client-nodejs"...\n`
  );

  await runCommand('yarn add @lit-protocol/lit-node-client-nodejs');

  console.log(
    '\x1b[32m%s\x1b[0m',
    `Package installed! Please run "getlit test <action>" again\n`
  );
  process.exit();
}

const getLitActionCode = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const fullpath = process.argv[1];
  const fileName = fullpath.match(/([^\/]+)(?=\.t\.action\.\w+$)/)[0];

  const outFilePath = `${__dirname}/out/${fileName}.action.js`;

  let code;

  try {
    code = await fs.promises.readFile(outFilePath);
    return code.toString();
  } catch (e) {
    errorLog(
      '\n\x1b[31m%s\x1b[0m',
      `❌ ${outFilePath} not found\n\n   Please run "getlit build" first\n`
    );
  }
};

// you need an AuthSig to auth with the nodes
// normally you would obtain an AuthSig by calling LitJsSdk.checkAndSignAuthMessage({chain})
const authSig = await LitNodeClientNodeJs.checkAndSignAuthMessage({ ethereum});

// const authSig = {
//   sig: "0x2bdede6164f56a601fc17a8a78327d28b54e87cf3fa20373fca1d73b804566736d76efe2dd79a4627870a50e66e1a9050ca333b6f98d9415d8bca424980611ca1c",
//   derivedVia: "web3.eth.personal.sign",
//   signedMessage:
//     "localhost wants you to sign in with your Ethereum account:\n0x0439427C42a099E7E362D86e2Bbe1eA27300f6Cb\n\nThis is a key for Partiful\n\nURI: https://localhost/login\nVersion: 1\nChain ID: 1\nNonce: 1LF00rraLO4f7ZSIt\nIssued At: 2022-06-03T05:59:09.959Z",
//   address: "0x0439427C42a099E7E362D86e2Bbe1eA27300f6Cb",
// };

// const authSig = getlitConfig['authSig'];
const pkpPublicKey = getlitConfig['pkpPublicKey'];

export { client, authSig, pkpPublicKey, getLitActionCode, errorLog };
