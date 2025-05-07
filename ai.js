// ai.js


function parseRecipeResponse(recipeText) {
  // Create a recipe display container
  const recipeContainer = document.createElement('div');
  recipeContainer.className = 'recipe-container';
  
  // Parse the markdown-like text into HTML
  let html = recipeText;
  
  // Convert markdown headers to HTML
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert bullet points
  html = html.replace(/\*\s+(.*?)(\n|$)/g, '<li>$1</li>');
  
  // Add proper list markup
  html = html.replace(/<li>.*?<\/li>/gs, match => `<ul>${match}</ul>`);
  
  // Convert paragraphs (any text followed by blank line)
  html = html.replace(/([^\n]+)\n\n/g, '<p>$1</p>');
  
  // Format recipe sections with better spacing
  html = html.replace(/<strong>([^<]+)<\/strong>/g, '<h3>$1</h3>');
  
  // Line breaks for readability
  html = html.replace(/\n/g, '<br>');
  
  recipeContainer.innerHTML = html;
  return recipeContainer;
}

async function callGeminiApi(userInputArray) {
  const apiKey = "AIzaSyBDCYxyvvVqXp-GopOVozKvEXwNGtSe4PY";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  // Format the user input array as a string
  const userInputFormatted = JSON.stringify(userInputArray);

  // Creating the prompt with the grumpy chef character
  const promptText = 
    "Hey there, I'm your no-nonsense recipe buddy. Let's cut to the chase. Answer these five questions so I can whip up something decent for you:\n\n" +
    "1. What meal are we talking about? Breakfast, lunch, or dinner? Pick one.\n\n" +
    "2. You want savory and salty, or sweet? Be clear.\n\n" +
    "3. What cuisine are you craving? Indian, American, or something else? Let me know.\n\n" +
    "4. Got any allergies? Nuts, dairy, fish—whatever it is, tell me now.\n\n" +
    "5. Any dietary preferences? Vegetarian, vegan, gluten-free, or anything else? Spill it.\n\n" +
    "I'll take your answers and give you:\n\n" +
    "- A recipe name that makes sense\n" +
    "- Ingredients with proper measurements\n" +
    "- Simple steps anyone can follow\n" +
    "- Prep and cook time\n" +
    "- How many it serves\n" +
    "- Maybe a fun fact about the dish, if I'm feeling generous\n\n" +
    "Be honest and specific, especially about allergies and dietary needs. If you're vague, I'll do my best, but don't blame me if it's not perfect. Now, let's get started!\n\n" +
    "HERE ARE THE USER'S ANSWERS: " + userInputFormatted;

  // Proper request structure for Gemini API
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: promptText
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 1024
    }
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

    const responseBody = await response.text();

    if (!response.ok) {
      console.error(`API request failed with status ${response.status}:`);
      console.error(responseBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("API Response received:");
    try {
      const data = JSON.parse(responseBody);
      console.log(JSON.stringify(data, null, 2));

      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        console.log("\n--- Generated Text ---");
        console.log(generatedText);
        console.log("----------------------");
        
        // Display the recipe in a nice format
        displayRecipe(generatedText);
      } else {
        console.log("\nCould not extract generated text from the response.");
      }
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      console.error("Raw response body:", responseBody);
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error.message);
    if (error.cause) {
      console.error("Cause:", error.cause);
    }
  }
}

// Function to display the recipe in the UI
function displayRecipe(recipeText) {
  // Create a new recipe container
  const recipeElement = parseRecipeResponse(recipeText);
  
  // Add styling to the recipe element
  recipeElement.style.maxWidth = '800px';
  recipeElement.style.margin = '20px auto';
  recipeElement.style.padding = '20px';
  recipeElement.style.backgroundColor = '#fff';
  recipeElement.style.border = '2px solid #ff6600';
  recipeElement.style.borderRadius = '10px';
  recipeElement.style.textAlign = 'left';
  
  // Create additional styling
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .recipe-container h3 {
      color: #ff6600;
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 1.4em;
    }
    .recipe-container ul {
      padding-left: 20px;
    }
    .recipe-container li {
      margin-bottom: 8px;
    }
    .recipe-container p {
      line-height: 1.5;
    }
  `;
  document.head.appendChild(styleEl);
  
  // Clear any existing recipe and append the new one
  const mainContent = document.body;
  
  // Create a button to go back and try again
  const backButton = document.createElement('button');
  backButton.textContent = 'Try Another Recipe';
  backButton.style.padding = '15px 30px';
  backButton.style.backgroundColor = '#ff6600';
  backButton.style.color = 'white';
  backButton.style.border = 'none';
  backButton.style.borderRadius = '5px';
  backButton.style.cursor = 'pointer';
  backButton.style.fontSize = '1.2em';
  backButton.style.marginTop = '20px';
  backButton.onclick = function() {
    window.location.reload();
  };
  
  // Create a container for the recipe and button
  const responseContainer = document.createElement('div');
  responseContainer.style.textAlign = 'center';
  responseContainer.appendChild(recipeElement);
  responseContainer.appendChild(backButton);
  
  // Append to the body
  mainContent.appendChild(responseContainer);
}

// Export function for use in other scripts
export { callGeminiApi };
