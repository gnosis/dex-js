import { batchExchangeContract } from 'contracts'
import Logger from 'helpers/Logger'

require('dotenv').config()

/**
 *  SANDBOX: Get token address from token id
 *  RUN:     yarn sandbox test/sandbox/contract/tokenIdToAddressMap.ts
 */
const log = new Logger('sandbox:contract/tokenIdToAddressMap')

async function exec (): Promise<void> {
  const tokenId = 1
  log.info('Get token address for token: %d', tokenId)
  const tokenAddress = await batchExchangeContract.methods.tokenIdToAddressMap(tokenId).call()
  log.info('Address: %s', tokenAddress)
}

exec().catch(log.errorHandler)
