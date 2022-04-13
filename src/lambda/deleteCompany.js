import { Client } from "@hubspot/api-client";


export async function handler(event, context) {
  try {

    const hubspotClient = new Client({apiKey: process.env.HUBSPOT_SECRET})
    const companyId = event.body
    
    console.log(companyId);
    const apiResponse = await hubspotClient
      .crm.companies.basicApi.archive(companyId);
    const body = JSON.stringify(apiResponse);
    // console.log(body);
    return {
      statusCode: 200,
      body,
    }
    } catch (err) {
      console.log(JSON.stringify(err, null, '  '))
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: err.message })
      }
  }
}