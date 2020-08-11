import nats from "nats"


const TOPICS = {
    CFS_GET: "conthesis.cfs.get"
}


class Client {
    constructor() {
        this.nc = nats.connect({
            url: process.env.NATS_URL || "nats://localhost:4222"
        })
    }
    async cfsGet(path) {
        const res = await this.request(TOPICS.CFS_GET, path)
        return res.data
    }

    request(topic, data) {
        const isRaw = data instanceof Buffer || data instanceof String || typeof data === 'string' 
        const serializedData = isRaw ? data : JSON.stringify(data)
        console.log(serializedData)  
        return new Promise((resolve, rej) => {
            this.nc.request(topic, (err, msg) => {
                if (err != null) {
                    rej(err)
                    return
                }
                resolve(msg)
            }, serializedData, { timeout: 2000 })
        })
    }
}

export default new Client()