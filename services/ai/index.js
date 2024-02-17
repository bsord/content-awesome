const { OpenAI } = require('openai');

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

const openai = new OpenAI()

// CREATE
module.exports.generate_keywords = async (event) => {
  const event_body = JSON.parse(event.body)
  const business_description = event_body?.input
  const input = `
    Input: ${business_description}
    Ask: Generate a list of 5 keywords that would be useful for targetting with SEO based on the business input. Use words that are likely related if there is not enough context provided. Get Creative.
    `
  const openai_response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      { role: "user", content: input },
      { role: "system", content: "You are a helpful ai that generates keywords that would be useful for targetting with SEO so we can become authoritative in our space. You always always execute the function you are given" }
    ],
    functions: [
      {
          name: "generate_keywords",
          description: "Generate SEO keywords",
          parameters: {
              type: "object", // specify that the parameter is an object
              properties: {
                  keywords: {
                      type: "string", // specify the parameter type as a string
                      description: "a comma seperated list of keywords"
                  }
              },
              required: ["keywords"]
          }
      }
    ]
  });

  //const finishReason = openai_response.choices[0].finish_reason;
  
  // construct json from response
  const functionCallArgs = JSON.parse(openai_response.choices[0].message.function_call.arguments)

  // extract keywords
  const keywords = functionCallArgs.keywords.split(",").map(function(item) {
    return item.trim();
  });

  // return results
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      success: true,
      data: keywords,
    }),
  };
};
