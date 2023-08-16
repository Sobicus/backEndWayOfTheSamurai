const http = require('http');
const fs = require('fs')

const delayThruPromise = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}
const readFilePromise = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

const server = http.createServer(async (req, res) => {
    switch (req.url) {
        case '/about': {
            //synchronous
            const data = fs.readFileSync('pages/about.html')
            res.write(data)
            res.end()
            break
        }
        case '/home': {
            //asynchronous
            fs.readFile('pages/home.html', (err, data) => {
                if (err) res.write('500, page not found')
                else res.write(data)
                res.end()
            })
            break
        }
        case '/delay': {
            setTimeout(() => {
                res.write('delay 3 sec')
                res.end()
            }, 3000)
            break
        }
        case '/delaywithpromise': {
            delayThruPromise(3000)
            res.write('delay 3 sec with promise')
            res.end()
            break
        }
        case '/main': {
            try {
                const data = await readFilePromise('pages/main.html')
                res.write(data)
                res.end()
            } catch (err) {
                res.write('500, page not found')
                res.end()
            }
            break
        }
        case '/': {
            const data = 'My maine page'
            res.write(data)
            res.end()
            break
        }
        default: {
            res.write('404 not found')
            res.end()

        }
    }
})

server.listen(3003)
