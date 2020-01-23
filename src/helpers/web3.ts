import assert from 'assert'
import Web3 from 'web3'
import Logger from 'helpers/Logger'

export function createWeb3 (url?: string): Web3 {
  const log = new Logger('helpers:web3')
  const nodeUrl = url || process.env.NODE_URL

  log.info('Connecting to ethereum using web3: %s', nodeUrl)
  assert(nodeUrl, 'url param, or NODE_URL env var is required')
  return new Web3(nodeUrl as string)
}
