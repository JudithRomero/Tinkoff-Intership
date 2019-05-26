const https = require('https')
const fs = require('fs')
const path = require('path')


const get = async (url) => new Promise((res, rej) => {
  const request = https.get(url, res)
  request.on('error', rej)
})

const getResponseJson = async (response) => new Promise((res) => {
  response.setEncoding('utf8')
  const chunks = []
  response.on('data', x => chunks.push(x))
  response.on('end', () => res(JSON.parse(chunks.join(''))))
})

const saveImage = async (name, lastName, response) => new Promise(res => {
  if (!fs.existsSync('images')) {
    fs.mkdirSync('images')
  }
  const fileName = path.join('.', 'images', `${name}_${lastName}.jpg`)
  const file = fs.createWriteStream(fileName)
  response.pipe(file)
  file.on('finish', () => file.close(() => res(fileName)))
})

const getUser = async (id) => {
  const res = await get(`https://reqres.in/api/users/${id}`)
  const { data } = await getResponseJson(res)
  return data
}

const rnd = () => Math.random().toString(32).substr(2)

const saveUsers = async (ids) => {
  const users = (await Promise.all(ids.map(getUser))).filter(Boolean)
  const paths = await Promise.all(users.map(u => get(u.avatar).then(res => saveImage(u.first_name, u.last_name, res))))
  fs.writeFileSync('data.json', JSON.stringify(users.map((u, i) => ({
    id: [rnd(), rnd()].join('').substr(0, 11),
    name: [u.first_name, u.last_name].join(' '),
    avatar: paths[i]
  })), null, 2))
}

(async() => saveUsers([...Array(10).keys()].map(i => i + 1)))()
