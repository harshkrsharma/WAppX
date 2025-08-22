const inputText = '[{"fact": "In China, there is a species of yam that is used to make a dye"}]';

try {
    const jsonArray = JSON.parse(inputText);
    
    if (jsonArray.length > 0 && jsonArray[0].fact) {
        const factValue = jsonArray[0].fact;
        console.log(factValue); // Output: In China, there is a species of yam that is used to make a dye
    } else {
        console.log('No "fact" property found in the JSON array.');
    }
} catch (error) {
    console.error('Invalid JSON format:', error);
    // used
}
