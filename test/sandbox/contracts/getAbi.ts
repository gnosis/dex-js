// import Logger from 'helpers/Logger'

import { abi as abiItems } from '@gnosis.pm/dex-contracts/build/contracts/StablecoinConverter.json'
require('dotenv').config()

/**
 *  SANDBOX: Get ABI from the contracts
 *  RUN:     yarn sandbox test/sandbox/contracts/getAbi.ts
 */
// const log = new Logger('sandbox:contracts:getAbi')

async function exec (): Promise<void> {
  console.log('StablecoinConverter has %d functions', abiItems.length)
  abiItems
    .filter(({ type }) => type === 'function')
    .forEach(({ name }) => {
      console.log('- ' + name)
    })
}

exec().catch(console.error)
// exec().catch(log.errorHandler)
