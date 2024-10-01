import { connect, createDataItemSigner } from '@permaweb/aoconnect'
import fs from 'fs'

const BENCH = 7
const CYCLE = 70
const LATENCY = 600
const PROCESS = "MlmtDHo0GN-kCUcxEpJAfeSM1bCsb4JvjQlnjfJrOi4"
const jwk = JSON.parse(fs.readFileSync('wallet.json', 'utf-8'))

async function main() {
  let t = new Date();
  let id = null;
  for (var i = 0; i < CYCLE; i++) {

    id = await connect().message({
      process: PROCESS,
      data: "1234",
      tags: [],
      signer: createDataItemSigner(jwk)
    })
    if (i % BENCH === 0) {

      await connect().result({
        process: PROCESS,
        message: id
      })
      const now = new Date()
      if (i !== 0) { console.log((now - t - LATENCY) / 1000) }
      t = now
    }

  }
}


main()
