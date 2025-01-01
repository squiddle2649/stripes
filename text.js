const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname,"script.txt")
const script = fs.readFileSync(filePath, 'utf-8')
const wordsArray = script.split(' ')
console.log(wordsArray.length)