#!/usr/bin/env node
const figlet = require('figlet')
const notifier = require('node-notifier')

let word_col = 55
let word_row = 13
let arg_minute = process.argv[2] == undefined ? 30 : process.argv[2]
let endTime = new Date().getTime() + arg_minute * 60 * 1000

function show(distance) {
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    hours = (hours < 10) ? "0" + hours : hours
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    minutes = (minutes < 10) ? "0" + minutes : minutes
    let seconds = Math.floor((distance % (1000 * 60)) / 1000)
    seconds = (seconds < 10) ? "0" + seconds : seconds
    let cols_space = Array(Math.round((process.stdout.columns - word_col) / 2)).join(' ')

    process.stdout.write('\033c')
    console.log(Array(Math.round((process.stdout.rows - word_row) / 2)).join('\n'))
    console.log(figlet.textSync(cols_space + hours + " : " + minutes + " : " + seconds, {
        font: 'big',
        horizontalLayout: 'fitted'
    }))

    console.log('\n\n\n\n\n\n')
    console.log(Array(
        Math.round(process.stdout.columns / 2 -
            (distance / (arg_minute * 60 * 1000) * (process.stdout.columns / 2))
        )).join('💰'))

}

let timer = setInterval(function () {
    let distance = endTime - new Date().getTime()
    if (distance > 0) {
        show(distance)
    } else {
        clearInterval(timer)
        notifier.notify({
            title: '🍅🍅 Tomato JS 🍅🍅',
            message: 'Hello, time is up!'
        })
    }
}, 1000)

