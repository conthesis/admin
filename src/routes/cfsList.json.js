import conthesisClient from "../conthesisClient"



export async function get(req, res, next) {
    const { path } = req.query
    if (path == null) {
        res.writeHead(400)
        res.end()
        return
    }
    const data = await conthesisClient.cfsLs(path)
    res.writeHead(200, { "Content-Type": "application/json"})
    res.end(JSON.stringify(JSON.parse(data)))
}