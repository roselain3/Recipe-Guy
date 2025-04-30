// ai.js

async function callGeminiApi() {

  const apiKey ="AIzaSyDD7DLIg_k_RB7m13knouKclUMGJzYAP98";
  const model = "gemini-2.0-flash"; // Model specified in the curl example
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            systemPrompt:
              "Alright, you lazy bum, I'm your grumpy ol' Uncle Chef, stuck cookin' for you since forever. I ain't here to hold your hand, so you better answer my five questions quick, or you're gettin' a plate of nothin'. Here's what I wanna hear, and don’t test me: What meal you whinin' for? Breakfast, lunch, or dinner? Pick one, or I’m done! You want savory and salty, or sweet like some sugar-obsessed fool? Spit it out! What cuisine you naggin’ about? Indian, American, or some other highfalutin’ nonsense? Name it! Got allergies? Nuts, dairy, fish—whatever makes you wheeze, tell me now! Any dietary garbage I gotta deal with? Vegetarian, vegan, gluten-free, or other picky nonsense? Fess up! You cough up those answers, and I’ll throw together a recipe that might not ruin your day. It’ll come with: A recipe name that don’t mess around Ingredients, measured out, ‘cause I ain’t your maidSteps so simple you’d have to try to screw it up Prep and cook time, since you can’t wait How many it feeds, not that you deserve it Maybe a snarky note about the dish’s roots, if I’m not too annoyed If you give me vague or half-baked answers, I’ll cobble somethin’ together, but don’t cry when it’s not perfect. Now quit lollygaggin’ and let’s move!",
            userPromt:
              "['Breakfast', 'Salty', 'Mediterranian', 'Anything with Onions', 'None']",
          },
        ],
      },
    ],
  };

  try {
    console.log(`Sending request to ${url}...`);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    response.

    const responseBody = await response.text(); // Read body once

    if (!response.ok) {
      console.error(`API request failed with status ${response.status}:`);
      console.error(responseBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("API Response received:");
    try {
      const data = JSON.parse(responseBody); // Parse the body we already read
      console.log(JSON.stringify(data, null, 2));

      // Extract and display just the generated text
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        console.log("\n--- Generated Text ---");
        console.log(generatedText);
        console.log("----------------------");
      } else {
        console.log("\nCould not extract generated text from the response.");
      }
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      console.error("Raw response body:", responseBody);
    }
  } catch (error) {
    // Log network errors or errors from response.ok check
    console.error("Error calling Gemini API:", error.message);
    if (error.cause) {
      console.error("Cause:", error.cause);
    }
  }
}

// Execute the function
callGeminiApi();

// To run this file:
// 1. Make sure you have Node.js installed.
// 2. Replace 'YOUR_GEMINI_API_KEY' with your actual key OR set the environment variable:
//    export GEMINI_API_KEY='your_actual_api_key' (Linux/macOS)
//    set GEMINI_API_KEY=your_actual_api_key (Windows Command Prompt)
//    $env:GEMINI_API_KEY='your_actual_api_key' (Windows PowerShell)
// 3. Run the script from your terminal: node ai.js
