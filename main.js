const http = require('http')
const getbody = require('./body')
const { randomUUID } = require('crypto')
let DATA = []
const server = http.createServer(async (req, res) => {
    if (req.url === '/main' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(DATA))
    }else if(req.url ===  '/main' && req.method === 'POST'){
        res.writeHead(200, { 'Content-Type': 'application/json' })
        const body =  await getbody(req)
        const {name, age} = JSON.parse(body)
        const newDATA = {
            id: randomUUID(),
            name,
            age
        }
        const resp  =  {
            status: 'OK',
            data: newDATA
        }
        DATA.push(newDATA)
        res.write(JSON.stringify(resp))
        res.end()
    }else if(req.url.match(/\/main\/\w+/) && req.method === 'DELETE'){
        res.writeHead(200, { 'Content-Type': 'application/json' })
        const id = req.url.split('/')[2]
        DATA = DATA.filter(item => item.id !== id)
        const resp  =  {
            status: 'DELETE',
        }
        res.write(JSON.stringify(resp))
        res.end()
    }else if(req.url.match(/\/main\/\w+/) && req.method === 'PUT'){
        res.writeHead(200, { 'Content-Type': 'application/json' })
        const id = req.url.split('/')[2]
        index = DATA.findIndex(item => item.id === id)
        const body =  await getbody(req)
        const {name, age} = JSON.parse(body)
        const putDATA =  {
            id: DATA[index].id,
            name: name || DATA[index].name,
            age: age || DATA[index].age
        }
        DATA[index] = putDATA
        const resp  =  {
            status: 'OK',
            data: DATA
        }
        res.write(JSON.stringify(resp))
        res.end()

    }
})





const PORT = 3000
server.listen(PORT, () => {
    console.log(`Server Listening on port ${server.address().port}`);
})