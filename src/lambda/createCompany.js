import { Client } from "@hubspot/api-client";


export async function handler(event, context) {
  try {

    const hubspotClient = new Client({apiKey: process.env.HUBSPOT_SECRET})
    const properties = JSON.parse(event.body);
    
    console.log(JSON.stringify(properties, null, '  '));
    const apiResponse = await hubspotClient
      .crm.companies.basicApi.create({properties});
    const body = JSON.stringify(apiResponse);
    console.log(body);
    return {
      statusCode: 200,
      body,
    }
    } catch (err) {
      console.log(err)
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: err.message })
      }
  }
}