const venom = require('venom-bot');
const fs = require('fs');

venom
    .create(
        'Atendimento',
        (base64Qrimg, asciiQR) => {
            console.log('Terminal qrcode: ', asciiQR);
            console.log('base64 image string qrcode: ', base64Qrimg);
        }, (statusSession) => {
            console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled
        }, {
            folderNameToken: 'tokens', //folder name when saving tokens
            mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
            headless: true, // Headless chrome
            devtools: false, // Open devtools by default
            useChrome: true, // If false will use Chromium instance
            debug: false, // Opens a debug session
            logQR: true, // Logs QR automatically in terminal
            browserWS: '', // If u want to use browserWSEndpoint
            browserArgs: [''], // Parameters to be added into the chrome browser instance
            disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
            disableWelcome: true, // Will disable the welcoming message which appears in the beginning
            updatesLog: true, // Logs info updates automatically in terminal
            autoClose: 60000, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
        }
    )
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });

async function start(client) {
    const config = require('./config.json');
    const contacts = await getContactList();
    
    let cont = 0;
    
    contacts.forEach(async contact => {
        await delay(2500);

        if(config.sendImage){
            // Envia imagem
            const imageData = require('./data/image.json');
            const image = {
                ...imageData,
                send: true,
                to: contact,
            };
            await imageSend(client, image);
        }

        if(config.sendText){
            // Envia mensagem de texto
            const content = {
                send: true,
                to: contact,
                text: await getMessageText(),
            };
            await textSend(client, content);
        }
    
        cont++;
        console.log('Mensagem: '+cont);
    });
}
async function getMessageText() {
    const text = fs.readFileSync('./data/message.txt', 'utf8');
    return text.toString();
}
async function getMessageImage() {
    const image = require('./data/image.json');
    return image;
}
function getContactList() {
    const constacts = require('./data/contacts.json');
    return constacts.contacts;
}
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}

async function getContactName(contact) {
    let name = contact.pushname;
    if (!name) {
        name = contact.verifiedName;
    }
    return name;
}

async function imageSend(client, image) {
    await client.sendImage(image.to, image.url, image.name, image.caption)
    .then((result) => {
        console.log('Image sended to '+image.to);
    })
    .catch((erro) => {
        console.error('Error when sending image to '+erro.to+'; Error: '+erro.text ); //return object error
    });
}
async function textSend(client, content) {
    client.sendText(content.to, content.text)
    .then((result) => {
        console.log('Text sended to '+content.to);
    })
    .catch((erro) => {
        console.error('Error when sending image to '+erro.to+'; Error: '+erro.text ); //return object error
    });
}
