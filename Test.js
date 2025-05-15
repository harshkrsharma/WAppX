const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const formData = new FormData();
formData.append('image', fs.createReadStream('cool.png'));

const headers = {
    ...formData.getHeaders(),
};

axios.post('https://api.api-ninjas.com/v1/imagetotext', formData, { headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error.response.data);
    });