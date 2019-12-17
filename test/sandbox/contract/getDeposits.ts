import { batchExchangeContract } from 'contracts'
import Logger from 'helpers/Logger'

require('dotenv').config()

/**
 *  SANDBOX: Prints events topics
 *  RUN:     yarn sandbox test/sandbox/contract/getDeposits.ts
 */
const log = new Logger('sandbox:contract/getDeposits')

async function exec (): Promise<void> {
  log.info('Get new deposits for contract: %s', batchExchangeContract.options.address)
  batchExchangeContract.events
    .Deposit({ fromBlock: 0, toBlock: 'latest' })
    .on('connected', subscriptionId => log.info('Connected with subscription: %s', subscriptionId))
    .on('data', deposit => {
      log.info('New deposit: %o', deposit)
    })
    .on('changed', deposit => {
      log.info('Deposit changed: %o', deposit)
    })
    .on('error', log.errorHandler)
}

exec().catch(log.errorHandler)
