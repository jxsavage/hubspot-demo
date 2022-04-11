import React, { useEffect, createContext, useState } from 'react';

export const CRMContext = createContext({
  companies: [],
  contacts: []
});
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
  const defaultState = {companies: [], contacts: []};
  const CRMState = defaultState;
  const [CRMDetails, updateCRMDetails] = useState(CRMState); 
  useEffect(() => {
    fetchApi('getCompanies')().then((response) => {
      const companies = JSON.parse(response.body.msg);
      updateCRMDetails({
        ...CRMDetails,
        companies,
      })
    })
  })
  return (
    <CRMContext.Provider value={CRMDetails}>
      {children}
    </CRMContext.Provider>
  )
}
export default CRMProvider;
