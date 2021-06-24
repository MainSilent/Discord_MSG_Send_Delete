const request = require('request')
const randomstring = require("randomstring");

const token = "ODUwNTg4ODUzMzc4NDgyMTg2.YNP1Jg.xA_tn5vc5eTLqLd-9_x98eRVXc8"
const channel_id = "827792818449678338"

const options = {
    method: 'POST',
    url: `https://discord.com/api/v8/channels/${channel_id}/messages`,
    headers: { 
        authorization: token,
        'Content-Type': 'application/json'
    },
}

function epoch() {
    return new Promise(function (resolve, reject) {
        options.body = JSON.stringify({ "content": randomstring.generate(Math.floor(Math.random() * 500) + 50) })
        request(options, (err, res) => {
            if (err) console.log(err);
            body = JSON.parse(res.body)
            if (res.statusCode == 200) {
                console.log("Message sent");
                
                setTimeout(() => {
                    request({
                        method: "DELETE",
                        url: `https://discord.com/api/v8/channels/${body.channel_id}/messages/${body.id}`,
                        headers: { authorization: token }
                    }, (err, res) => {
                        if (err) console.log(err);
                        if (res.statusCode == 204) {
                            console.log("Message deleted\n");
                        } else {
                            console.log(res.body);
                            console.log("Failed to delete message\n")
                        }
                        resolve()
                    })
                }, 1000)
            } else {
                console.log(res.body);
                console.log("Failed to send message\n")
                resolve()
            }
        })    
    })
}

function interval(next) {
    console.log(`Next Message in ${next / 1000} seconds`)

    setTimeout(async () => {
        await epoch()
        next = (Math.floor(Math.random() * 18) + 10) * 1000
        interval(next)
    }, next)
}

interval(3000)
