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
    Intermediate Step: using scratch space, write a one paragraph description about the business.
    Ask: Generate a list of 5 SEO keywords that the business described above could target to get more traffic to their site. Think like a google bot and optimize for the most valuable but most niche words.
    
    `
  const openai_response = await openai.chat.completions.create({
    model: "gpt-4-0125-preview",
    messages: [
      { role: "user", content: input },
      { role: "system", content: "You are a helpful ai that generates 5 SEO keywords. You always always execute the function you are given" }
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
                      description: "a comma seperated list of 5 keywords"
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


module.exports.generate_project_title = async (event) => {
  const event_body = JSON.parse(event.body)
  const business_description = event_body?.input
  const input = `
    Input: ${business_description}
    Intermediate Step: using scratch space, write a one paragraph description about the business.
    Ask: Generate a 3 word tag line that abstractly represents the business description. Think like an SEO expert. 
    `
  const openai_response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      { role: "user", content: input },
      { role: "system", content: "You are a helpful ai that generates tags lines with a length of 3 words based on a provided business description" }
    ],
    functions: [
      {
          name: "generate_tag_line",
          description: "Generate a 3 word tag line from a business description",
          parameters: {
              type: "object", // specify that the parameter is an object
              properties: {
                  title: {
                      type: "string", // specify the parameter type as a string
                      description: "3 word tag line that represents the business description"
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

  // extract title
  const title = functionCallArgs.title

  // return results
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      success: true,
      data: title,
    }),
  };
};


// CREATE
module.exports.generate_search_terms = async (event) => {
  const event_body = JSON.parse(event.body)
  const input_data = event_body?.input

  const json_schema = `
    interface GoogleSearchQuery {
      searchQuery: string
    }


    interface BlogTeaser {
      title: string
      teaserText: string
      blogImageUnsplashSearchTerm: string // search term used to search unsplash.com for an image for the blog post
    }

    interface Keyword {
      keyword: string
    }

    interface GoogleSearchWithTitle {
      googleSearch: GoogleSearchQuery;
      blogTeaser: BlogTeaser;
      keywords: Keyword[];
    }

    // Create an array of google search results with correspnding blog titles and targetted keywords
    const googleSearchWithTitles: GoogleSearchWithTitle[]
  `

  const input = `
    Input: ${input_data}
    Ask: Based on the given SEO terms and business description, provide a google search someone would do when searching for the provided terms and generate blog titles for them.
    Respond in JSON format. The JSON response schema should be googleSearchWithTitles from this schema: ${json_schema}
  `

  const openai_response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      { role: "user", content: input },
      { role: "system", content: "You are an API that generates an array of 3 thoughtful and helpful google searches along with blog titles that would rank highly for those searches to help the company sound authoritative on topics in their niche" }
    ],
    response_format: { "type": "json_object" },
  });

  const searches = JSON.parse(openai_response.choices[0].message.content)

  // return results
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      success: true,
      data: searches,
    }),
  };
};

module.exports.generate_content_teasers = async (event) => {
  const event_body = JSON.parse(event.body)
  const input_data = event_body?.input

  const json_schema = `
    interface GoogleSearchQuery {
      searchQuery: string
    }


    interface BlogTeaser {
      title: string
      teaserText: string
      blogImageUnsplashSearchTerm: string // search term used to search unsplash.com for an image for the blog post
    }

    interface Keyword {
      keyword: string
    }

    interface GoogleSearchWithTitle {
      googleSearch: GoogleSearchQuery;
      blogTeaser: BlogTeaser;
      keywords: Keyword[];
    }

    // Create an array of google search results with correspnding blog titles and targetted keywords
    const googleSearchWithTitles: GoogleSearchWithTitle[]
  `

  const input = `
    Input: ${input_data}
    Ask: Based on the given SEO terms and business description, provide a google search someone would do when searching for the provided terms and generate blog titles for them.
    Respond in JSON format. The JSON response schema should be googleSearchWithTitles from this schema: ${json_schema}
  `

  const openai_response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      { role: "user", content: input },
      { role: "system", content: "You are an API that generates an array of 3 thoughtful and helpful google searches along with blog titles that would rank highly for those searches to help the company sound authoritative on topics in their niche" }
    ],
    response_format: { "type": "json_object" },
  });

  const searches = JSON.parse(openai_response.choices[0].message.content)

  // return results
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      success: true,
      data: searches,
    }),
  };
};

module.exports.generate_content_outline = async (event) => {
  const event_body = JSON.parse(event.body)
  const input_data = event_body?.input
  const json_schema = `
    interface Point {
        text: string;
    }

    interface Contents {
        title: string;
        points: Point[];
    }

    interface Outline {
      overview: string; // paragraph with atleast 4 sentences
      tableOfContents: Contents[]; // atleast 7 items in the table of contents
    }

    interface OutlineResult {
      outline: Outline;
      timestamp: number;
    }
  `

  const input = `
    ${input_data}
    Ask: Give me a full outline for a blog post based on provided title and subtext, returned as a json representation of a OutlineResult from this schema: ${json_schema}
    Approach:
    1) Start with a brain dump of all the takeaways the user should take away from the blog post
    2) Break up those takeaways into larger sections
    3) Fill in gaps in sections
    4) Revise, remove, and reorganize details in each section
  `

  const openai_response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      { role: "user", content: input },
      { role: "system", content: "You are an API that generates overviews and outlines for digital content." }
    ],
    response_format: { "type": "json_object" },
  });

  const searches = JSON.parse(openai_response.choices[0].message.content)

  // return results
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      success: true,
      data: searches,
    }),
  };
};

// CREATE
module.exports.generate_search_terms_old = async (event) => {
  const event_body = JSON.parse(event.body)
  const input_data = event_body?.input
  const input = `
    Input: ${input_data}
    Ask: Based on the given SEO terms and business description, provide a google search someone would do when searching for the provided terms.
    `
  const openai_response = await openai.chat.completions.create({
    model: "gpt-4-0125-preview",
    messages: [
      { role: "user", content: input },
      { role: "system", content: "You are a helpful ai that generates google searches. You always always execute the function you are given" }
    ],
    functions: [
      {
          name: "generate_google_search_from_seo_term",
          description: "Generate google searches queries that someone would do when searching for the provided term",
          parameters: {
              type: "object", // specify that the parameter is an object
              properties: {
                  googleSearch: {
                      type: "string", // specify the parameter type as a string
                      description: "A comma seperated list of google search queries"
                  }
              },
              required: ["googleSearch"]
          }
      }
    ]
  });
    //const finishReason = openai_response.choices[0].finish_reason;
  
  // construct json from response
  const functionCallArgs = JSON.parse(openai_response.choices[0].message.function_call.arguments)

  // extract google search
  const googleSearch = functionCallArgs.googleSearch

  // return results
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      success: true,
      data: googleSearch,
    }),
  };
};