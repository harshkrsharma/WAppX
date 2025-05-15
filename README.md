# WhatsApp Chatbot with Cleverbot Integration

This repository contains a WhatsApp chatbot built using the `whatsapp-web.js` library. The bot can interact with users, respond to specific commands, and utilize Cleverbot for conversation.

## Features

- **Greet Users**: Sends a greeting message with instructions.
- **Commands**: Responds to specific commands such as:
  - `/greet`: Sends a greeting message.
  - `/meme`: Responds with a meme or plays ping-pong.
  - `/facts`: Fetches and sends a random fact.
- **Cleverbot Integration**: Engages in conversation using Cleverbot.
- **Ping Pong**: Responds with "pong" when the user sends "ping".

## Installation

1. Clone the repository:
    
    git clone https://github.com/yourusername/whatsapp-chatbot.git
    cd whatsapp-chatbot
    

2. Install dependencies using command:
    
    npm install
    

3. Configure the API key in the code:
    Replace the `API_KEY` variable in the code with your actual API key.

4. Run the bot:
 
    node index.js
    

## Usage

1. Scan the QR Code: When you run the bot, a QR code will be generated in the terminal. Scan this code with your WhatsApp to authenticate.

2. Interact with the Bot: Send messages to your WhatsApp number to interact with the bot. Use the following commands:
   - /greet: Receive a greeting message.
   - /meme: Play ping-pong or get memes.
   - /facts: Get a random fact.

## File Structure

- index.js: Main file containing the bot logic.
- i18n/replies.js`: Contains predefined replies.
- utils/common.js: Utility functions.
- utils/cleverbot.js: Cleverbot integration.
- utils/wwebjs-utils.js: Utility functions for whatsapp-web.js.

## Dependencies

- `whatsapp-web.js`: Library for interacting with WhatsApp Web.
- `request`: Simplified HTTP request client.
- `qrcode-terminal`: QR code generator for terminal.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.
