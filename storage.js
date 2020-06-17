const path = require('path')
const fs = require('fs')
const STORAGE_FILE = path.join(process.env.HOME || process.env.USERPROFILE, '.tomato-storage')

exports = module.exports = {
    load: function () {
        if (fs.existsSync(STORAGE_FILE)) {
            let fdata = fs.readFileSync(STORAGE_FILE).toString().split("\n")
            let day_tomato = {}
            fdata.forEach(function (line) {
                if (line != "") {
                    let d = line.split(":")
                    if (day_tomato[d[0]]) {
                        day_tomato[d[0]] += parseInt(d[1])
                    } else {
                        day_tomato[d[0]] = parseInt(d[1])
                    }
                }
            })
            return day_tomato
        } else {
            return false
        }
    },

    saveOne: function (minute) {
        let dt = new Date()
        let today = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
        fs.appendFileSync(STORAGE_FILE, today + ":" + minute + "\n")
    }
}

