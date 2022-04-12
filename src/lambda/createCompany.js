import { Client } from "@hubspot/api-client";


export async function handler(event, context) {
  try {
    JSON.stringify(event, null, '  ')
    const hubspotClient = new Client({apiKey: process.env.HUBSPOT_SECRET})
    // const properties = {
    //   "city": "Cambridge",
    //   "domain": "biglytics.net",
    //   "industry": "Technology",
    //   "name": "Biglytics",
    //   "phone": "(877) 929-0687",
    //   "state": "Massachusetts"
    // };
    // const SimplePublicObjectInput = { properties };
    
    
    // const apiResponse = await hubspotClient.crm.companies.basicApi.create(SimplePublicObjectInput);
    // console.log(JSON.stringify(apiResponse.body, null, 2));
    } catch (e) {
      e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
  }
}