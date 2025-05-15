const WWebJS = require('whatsapp-web.js');
const request = require('request');
const qrcode = require('qrcode-terminal');

const replies    = require('./i18n/replies');
const utils      = require('./utils/common');
const cleverbot  = require('./utils/cleverbot');
const WWebUtils  = require('./utils/wwebjs-utils');

const API_KEY = 'jmYoohTOhUJwqqaVc3EYSA==R63LdKnTmWm5YOl4'
var ustate = {};


const COMMAND_PRIMERS = [ '/', '!', '\\' ];

const users   = new utils.JSONHandler("./data/users.json");
const globals = new utils.JSONHandler("./data/globals.json");

const chatbots = {}

function greet(client,message){
    const extendedGreetings = "Greetings of the day: Cleverbot may not be the best but does the work.\nYou can continue to chat with the bot, or issue specific commands as per the need which should be sent after a '/'.\nRemember, to 'exit' out after issuing such commands to continue with the bot.\nHere are some commands for you:\n1) Memes: generates new memes for funtime\n2) Facts: its always fun to learn something new\n3) Docs: to retrieve college documents\n4) Dictionary\n5) Quotes\n6) greet: Re-greet yourself "
    message.reply(extendedGreetings)
}

function c_facts(client,message){
    var limit = 1
        request.get({
          url: 'https://api.api-ninjas.com/v1/facts?limit=' + limit,
          headers: {
            'X-Api-Key': API_KEY
          },
        }, function(error, response, body) {
          if(error) return console.error('Request failed:', error);
          else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
          else {
            const jsonArray = JSON.parse(body);
            
            if (jsonArray.length > 0 && jsonArray[0].fact) {
                const factValue = jsonArray[0].fact;
                message.reply(factValue);
        }
        }
        });
}
function c_meme(client, message){
    
    if(message.body === 'ping') {
        message.reply('pong');
    }
    else if (message.body == "exit"){               
        console.log ("Reverting user state")  
        message.reply("Back to the bot :)") 
        ustate[message.from].state = 0                         
    }
    else if (message.body == "show menu")
        c_start()
    else{
        
        
    }

}


async function handleMessage(client, message) {
    const user_id = message.author || message.from;

    //! In production, comment the lines below!
    // Safeguard against messages from others, for testing purposes.
    if(user_id != "918130586088@c.us")
        return;

    let body = message.body || '';

    if(message.type != "location" && COMMAND_PRIMERS.includes(body.charAt(0))) {        //checks for commands
        let command_str = body.slice(1).trim(), pos = command_str.match(/\s/u)?.index ?? -1,
            command     = (pos != -1 ? command_str.slice(0, pos) : command_str)
                            .toLocaleLowerCase().replaceAll("-","").replaceAll("_","");
        let query = pos == -1 ? '' : command_str.slice(command.length + 1).trim();

        console.log(`> Executing /${command_str} ...`);

        switch (command) {
            case "greet":
                console.log("Executing 'start' command");
                greet(client,message);
                break;
            
            case "meme":
                console.log("Executing 'meme' command");
                message.reply("Deploying memes and play ping pong")
                ustate[message.from].state=1
                break;

            case "facts":
                c_facts(client,message)
                break;
        
            default:
                console.log(`Command '${command}' not recognized`);
        }
        }
    
    else {                                                   // 1st if checks whether the chatbots have already an instance created, if not create a new instance. If this statement is removed, then it will create a new instance for every new message
        if (!chatbots.hasOwnProperty(message.from)) {       //chatbots is an object. All JavaScript objects have some functions they inherit from the Object class. This is one of them.  defined by the JavaScript standard, and is auto inherited
            chatbots[message.from] = new cleverbot(); 
            greet(client, message);     //if not, it creates a chatbot instance using message.from key like an array
        }
        try {
            const reply = await chatbots[message.from].ask(message.body);  //awaits means, program will wait for the message
            client.sendMessage(message.from, reply);
        }
        catch(err) {
            console.error(err);
        }
    }
}

if(require.main === module) {
    (function() {
        const client = new WWebJS.Client({
            authStrategy: new WWebJS.LocalAuth(),
            puppeteer: {
                headless: false
            }
        });

        client.on('qr', qr => {
            qrcode.generate(qr, {small: true});
        });
        client.on('auth_failure', msg => {
            console.error('> Authenication failed:', msg);
            client.destroy().then(()=>{ client.initialize(); })
            .catch((reason)=>{ console.error(reason); process.exit(1); });
        });
        client.on('disconnected', reason => {
            console.log('> Logout: ', reason);
            client.destroy().then(()=>{ client.initialize(); })
            .catch((reason)=>{ console.error(reason); process.exit(1); });
        });
        client.on('authenticated', () => {
            console.log('AUTHENTICATED');
        });
        client.on('auth_failure', msg => {
            // Fired if session restore was unsuccessful
            console.error('AUTHENTICATION FAILURE', msg);
        });

        client.on('ready', () => {
            console.log("Client ready.");
        });
        client.on('message',  message => {
            if (!ustate[message.from]) {
                ustate[message.from] = { state: 0 };
            }
            if (ustate[message.from].state == 1 )           
                c_meme(client,message)
            else 
                handleMessage(client, message);
        });

        client.initialize();
    })();
}

module.exports = exports = {
    handleMessage
};
