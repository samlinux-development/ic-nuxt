# Nuxt Minimal Starter for the Internet Computer

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more about nuxt.

A more in-depth explanation will be published next week on IcAcademy. Happy new Year!

## Running the project
Here you can find the [live demo](https://guxxd-cyaaa-aaaai-aq34a-cai.icp0.io/).

## Setup

Make sure to install dependencies:

```bash
# clone the repro
gh repo clone samlinux-development/ic-nuxt

# change into the directory
cd ic-nuxt

# install dependencies 
npm install 
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# start local replica in terminal if not running (I prefer to use a separate terminal)
dfx start

# install backend canister for local development
dfx deploy backend

# start local development server
npm run dev
```

## Builds

Build the application for production and playground:

```bash
# IC mainnet
npm run deploy-ic

# IC playground
npm run deploy-playground
```

## CLI commands

```bash
# add some demo data, you can also use Candid UI for that
dfx canister call backend addPushUp '("Roland",20)'
dfx canister call backend addPushUp '("Peter",35)'
dfx canister call backend addPushUp '("Susi",10)'

# get the data
dfx canister call backend getPushUps

# get the count
dfx canister call backend getPushUpCount

# get the total
dfx canister call backend getTotalPushUpCount

```
