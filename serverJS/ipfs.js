const IPFS = require("ipfs-http-client")

const client = IPFS()

async function init() {
    const { cid } = await client.add("hello world")
    console.log(cid)
}
init()