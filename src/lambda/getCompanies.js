import { Client } from "@hubspot/api-client";


export async function handler(event, context) {
  try {
    const hubspotClient = new Client({apiKey: process.env.HUBSPOT_SECRET})
    const companies = await hubspotClient.crm.companies
      .getAll(100, undefined, [
        'city', 'industry', 'phone', 'state', 'domain', 'name'
    ]);
    return {
      statusCode: 200,
      body: JSON.stringify(companies),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }
  }
}
