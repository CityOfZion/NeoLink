import Neon, { api } from '@cityofzion/neon-js'
import { toNumber } from './math'

export function callInvoke (networkUrl, account, input) {
  return new Promise((resolve, reject) => {
    if (!Neon.CONST.ASSET_ID[input.assetType]) {
      reject(new Error('Invalid asset type specified'))
    }

    const txArgs = [input.arg1, input.arg2]
    const args = []
    txArgs.forEach((arg) => {
      if (arg) {
        args.push(arg)
      }
    })

    const myAccount = Neon.create.account(account.wif)

    const config = {
      net: networkUrl,
      privateKey: myAccount.privateKey,
      address: myAccount.address,
      intents: [{
        assetId: Neon.CONST.ASSET_ID[input.assetType],
        value: toNumber(input.amount),
        scriptHash: input.scriptHash,
      }],
      script: { scriptHash: input.scriptHash, operation: input.operation, args: args },
      gas: 0,
    }

    api.doInvoke(config)
      .then(res => resolve(res))
      .catch(e => reject(e))
  })
}
