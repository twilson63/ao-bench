import { connect, createDataItemSigner } from '@permaweb/aoconnect'
import fs from 'fs'


const PROCESS = "Ey3LbDWBhAEyOZ_TIPHVKK9_wMHikwPRfCROOiVuh0A"
const jwk = JSON.parse(fs.readFileSync('wallet.json', 'utf-8'))

async function main() {
  let t = new Date();
  let id = null;
  for (var i = 0; i < 70; i++) {
    
    id = await connect().message({
      process: PROCESS,
      data: "1234",
      tags: [],
      signer: createDataItemSigner(jwk)
    })
    if (i % 7 === 0) {
      
      await connect().result({
        process: PROCESS,
        message: id
      })
      console.log(((new Date()) - t) / 1000)
      t = new Date()
      //console.log(new Date())
    }

  }
}


main()
