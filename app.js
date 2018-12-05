/**
 * Created by Kristian Nielsen on 04-12-2018.
 */
const express = require('express');
const app = express();

const history = (function(){

    const ips = {};

    const add = (ip, msg) => {
        if(!ips[ip]) ips[ip] = [];
        ips[ip].push(msg)
    };

    const print = () => {
        console.log('logging history...')
        for(let ip in ips){
            if(!ips.hasOwnProperty(ip)) continue;
            console.log(`recieved ${ips[ip].length} messages from ${ip}`);
        }
    };

    return {
        add, print
    }
})()

// setInterval(() => {
//     history.print();
// }, 5000)

app.get('/:msg', (req, res) => {
    const msg = req.params.msg;
    // console.log(req.hostname)
    history.add(req.ip, msg)
    const d = new Date();
    console.log(`${d.toLocaleTimeString()} | ${msg}`)
    history.print()
    res.end(msg);
});

app.listen(3000, (err) => {
    if(err){
        console.warn(err)
    }

    console.log('listening on port 3000')
});

