const readline = require("readline");

const { client, makeMessage } = require("./defaults");
const { handleMessage }       = require("../BridgeBot");

const stream = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});
stream.prompt();
stream.on("line", line => {
    if(line == "exit") stream.close();
    else { handleMessage(client, makeMessage(line)); }
});
stream.on("close", () => { process.exit(0); });