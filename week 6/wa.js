const { Client } = require('whatsapp-web.js');
var qrcode = require('qrcode-terminal');
const { cli } = require('winston/lib/winston/config');

const client = new Client();

const initWa = async () => {
    console.log('init wa');
    await client.on('qr', (qr) => {
        // Generate and scan this code with your phone
        console.log('QR RECEIVED', qr);
        qrcode.generate(qr, {small: true});
    });
    
    client.on('authenticated', (session) => {
        console.log('AUTHENTICATED', session);
    });
    
    client.on('ready', () => {
        console.log('Client is ready!');
    });
    
    // local auth
    
    client.on('message', msg => {
        if (msg.body == '!ping') {
            msg.reply('pong');
        }else if(msg.body == 'jomok'){
            msg.reply('astagfirullah')
        }
    });
    
    client.initialize();
}

module.exports =  {client, initWa};