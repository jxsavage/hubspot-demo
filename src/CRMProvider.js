import React, { useEffect, createContext, useState } from 'react';

export const CRMContext = createContext({});
function fetchApi(endpoint, args = {}) {
  return async () => {
    const data = await fetch(`/.netlify/functions/${endpoint}`, {
      method: 'GET',
      ...args,
    });
    return data;
  }
  
}
const CRMProvider = ({children}) => {

  // const [CRMDetails, updateCRM] = useState({companies: [], contacts: []}); 
  const [companies, updateCompanies] = useState([]);
  const [contacts, updateContacts] = useState([]);
  useEffect(() => {
    fetchApi('getCompanies')().then((response) => {
      response.json().then((r) => {
        updateCompanies(r);
      })
    })
  }, []);
  useEffect(() => {
    fetchApi('getContacts')().then((response) => {
      response.json().then((r) => {
        updateContacts(r);
      })
    })
  }, []);
  
  return (
    <CRMContext.Provider value={{companies, contacts, updateCompanies, updateContacts}}>
      {children}
    </CRMContext.Provider>
  )
}
export default CRMProvider;
