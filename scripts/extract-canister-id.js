// import fs and path
import fs from 'fs';
import path from 'path';
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const network = process.env.DFX_NETWORK || 'local';
const envPath = path.join(__dirname, '..', '.env');

// Path to the JSON file dfx generates
let canisterIdsPath = path.join(__dirname, '..', `.dfx/${network}/canister_ids.json`);
if(network == 'ic'){
  canisterIdsPath = path.join(__dirname, '../', `canister_ids.json`);
}

const canisterIds = JSON.parse(fs.readFileSync(canisterIdsPath, 'utf-8'));

// The name of the canister as defined in dfx.json
const canisterName = 'backend';

// Extract the ID (depending on environment, e.g., "local" or "ic")
const backendCanisterId = canisterIds[canisterName][network];

// Read the existing .env file
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf-8');
}

// Update or add the environment variables
const envLines = envContent.split('\n').filter(Boolean);
const newEnvLines = envLines.filter(line => !line.startsWith('NUXT_PUBLIC_BACKEND_CANISTER_ID=') && !line.startsWith('NUXT_PUBLIC_DFX_NETWORK='));
newEnvLines.push(`NUXT_PUBLIC_BACKEND_CANISTER_ID='${backendCanisterId}'`);
newEnvLines.push(`NUXT_PUBLIC_DFX_NETWORK='${network}'`);

// Write the updated content back to the .env file
fs.writeFileSync(envPath, newEnvLines.join('\n') + '\n');

console.log(`Wrote ${backendCanisterId} for canister ${canisterName} and network ${network} to .env`)