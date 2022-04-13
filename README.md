# Welcome to Jake Savage's Hubspot API Demo
I look forward to talking to you about this project and hopefully my future career at HubSpot! I've provided a quick guide to hopefully find what you are looking for and a brief overview of the functionality.
## So far this web application can:
- Fetch all companies from my HubSpot account.
- Delete a company and update the UI accordingly.
- Create a company and update the UI accordingly.
- Show notification of successful creation and deletion.

## Files and folders of interest:

### src/lambda folder
All of the actual HubSpot API calls are located in this directory. Storing them as lambda functions on the remote server protect the API key from being leaked.

### src/CRMProvider.js
Makes the initial call to the getCompanies lambda function and allows us to share that data with other components in the application.

### src/AllCompanies.js
The majority of the front end UI logic and the functions to call createCompany, and deleteCompany lambda functions are located here. I've provided comments to make the code easier to read.
