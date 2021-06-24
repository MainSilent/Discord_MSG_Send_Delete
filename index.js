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
    body: JSON.stringify({ "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" })
}

function epoch() {
    request(options, (err, res) => {
        if (err) console.log(err);
        body = JSON.parse(res.body)
        if (res.statusCode == 200) {
            console.log("Message sent");
    
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
            })
        } else {
            console.log(res.body);
            console.log("Failed to send message\n")
        }
    })    
}

setInterval(() => {
    epoch()
}, Math.floor(Math.random() * 18) + 10)