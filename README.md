[![npm version](https://img.shields.io/npm/v/@gnosis.pm/dex-js.svg?style=flat)](https://npmjs.org/package/@gnosis.pm/dex-js 'View this project on npm')
&nbsp;
[![Build Status](https://travis-ci.org/gnosis/dex-js.svg?branch=develop)](https://travis-ci.org/gnosis/dex-js)
&nbsp;
[![Coverage Status](https://coveralls.io/repos/github/gnosis/dex-js/badge.svg?branch=master)](https://coveralls.io/github/gnosis/dex-js?branch=master)

Develop:
&nbsp;
[![Build Status](https://travis-ci.org/gnosis/dex-js.svg?branch=develop)](https://travis-ci.org/gnosis/dex-js)
&nbsp;
[![Coverage Status](https://coveralls.io/repos/github/gnosis/dex-js/badge.svg?branch=develop)](https://coveralls.io/github/gnosis/dex-js?branch=develop)

# dFusion JS

## Usage

```bash
# Using yarn
yarn add @gnosis.pm/dex-js --save

#Alternatively
npm install @gnosis.pm/dex-js --save
```

Import the contract:

```js
// TODO: Not yet, this is how it would be nice to use
import { DfusionContract } from ' @gnosis.pm/dex-js'

// Instanciate the sma
const web3 = new Web3()
const dfusionContract = new DfusionContract({ web3 })

// alternativelly provide the address
const dfusionContract = new DfusionContract({ web3, address: '0x89593E017D4A88c60347257DAfB95384a422da09' })
```

## Run test

```bash
# Install dependencies
yarn install

# Run
yarn test
```
