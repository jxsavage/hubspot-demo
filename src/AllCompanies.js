import React, { useContext, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { CRMContext } from "./CRMProvider";
import { 
  Button, FormControl, FormHelperText, Input,
  InputLabel, Link, Card, CardActionArea, CardActions,
  CardContent, Alert, Snackbar } from '@mui/material';


/**
 * Removes a company from the collection
 * by companyId
 * @param {string} companyId a companies ID
 * @param {object} companies collection of companies
 * @param {function} updateCompanies React Update function
 */
const deleteCompany = (companyId, companies, updateCompanies) => {
  const updatedCompanies = [];
  let deletedCompany = undefined;
  companies.forEach(company => {
    if (companyId !== company.id) {
      updatedCompanies.push(company);
    } else {
      deletedCompany = company;
    }
  });
  updateCompanies(updatedCompanies);
  return deletedCompany;
}
/**
 * Adds a new company to the collection
 * @param {object} company company entity
 * @param {Array} companies array of all companies
 * @param {function} updateCompanies React update function
 */
const addCompany = (company, companies, updateCompanies) => {
  const newCompanies = companies.map(c => c);
  newCompanies.push(company);
  updateCompanies(newCompanies); 
}
/**
 * Generic API call function to hit
 * lambda functions that execute
 * HubSpot API Queries
 * @param data Hubspot API Data
 * @param endpoint Rest API Endpoint
 * @param method HTTP Method
 * @returns HubSpot API response as JSON Object
 */
const apiCall = async (data, endpoint, method) => {
  const url = `/.netlify/functions/${endpoint}`;
  try {
    let body = undefined;
    if (typeof (data) === 'string') {
      body = data;
    } else {
      body = JSON.stringify(data);
    }
    const options = {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body,
    };

    const response = await fetch(url, options);

    const text = await response.text();

    const parsed = text ? JSON.parse(text) : {};
    console.log(parsed);
    return parsed;
  } catch (e) {
    console.log(e);
  }
}
/**
 * Returns a function with an embded
 * company id to delete if the button
 * is clicked.
 * @param {string} companyId 
 * @param {Array} companies 
 * @param {function} updateCompanies 
 * @returns 
 */
const handleDeleteClick = (companyId, companies, updateCompanies, triggerAlert) => {
  return () => {
    apiCall(companyId, 'deleteCompany', 'DELETE').then(() => {
      const deletedCompany = deleteCompany(companyId, companies, updateCompanies);
      console.log(`company ${companyId} deleted`);
      console.log(deletedCompany)
      triggerAlert(`Company ${deletedCompany.properties.name} successfully deleted!`, 'success');
    }).catch((e) => {
      console.log(e);
      throw (e);
    })
  }
}
/**
 * Handles text input field changes
 * by handling on change events and passing
 * the new value to the React setState function
 * that was passed during initialization.
 * @param {function} setValue 
 * @returns {function} function that can set state for a given value
 */
const handleFieldChange = (setValue) => {
  return (event) => {
    setValue(event.target.value)
  }
}
/**

 * @param {string} name 
 * @param {string} domain 
 * @returns void
 */
/**
 * Returns a function that will
 * create the given company when
 * the button is clicked/function is called.
 * Resets form if successful.
 * @param {*} name 
 * @param {*} domain 
 * @param {*} companies 
 * @param {*} updateCompanies 
 * @param {*} setCompanyName 
 * @param {*} setComanyDomain 
 * @returns 
 */
const handleCreateClick = (
  name, domain, companies, updateCompanies,
  setCompanyName, setComanyDomain, triggerAlert
  ) => {
  return () => {
    apiCall({ name, domain }, 'createCompany', 'POST').then((newCompany) => {
      console.log('company created');
      addCompany(newCompany, companies, updateCompanies);
      triggerAlert(`Company ${name} successfully created.`, 'success');
      setCompanyName('');
      setComanyDomain('');
    }).catch((e) => {
      console.log(e);
      throw (e);
    })
  }
}

export default function AllCompanies() {
  const { companies, updateCompanies } = useContext(CRMContext);

  const [name, setCompanyName] = useState('');
  const [domain, setCompanyDomain] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const triggerAlert = (message, severity) => {
    setSeverity(severity);
    setAlertMessage(message);
    setOpen(true);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Card variant="outlined" sx={{marginTop: 10, maxWidth: 900, margin: '0 auto' }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              All Companies
            </Typography>
            <List sx={{ margin: '10px', width: '100%', bgcolor: 'background.paper' }}>
        {companies.map((
          { id, properties },
          index
        ) => {
          //industry, phone,
          const { domain, name, city, state } = properties;
          return (
            <React.Fragment key={id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        <Link target="_blank" href={domain}>
                          {`${domain}`}
                        </Link>

                      </Typography>
                      {` ${(city || state) ? ' —' : ''} ${city ? city + ',' : ''} ${state ? state : ''}`}
                    </React.Fragment>
                  }
                />
                <Button variant='outlined'
                  onClick={
                    handleDeleteClick(
                      id, companies, updateCompanies, triggerAlert
                    )}>
                  Delete
                </Button>
              </ListItem>
              {(index !== companies.length - 1) && <Divider key={`divider-${index}`} variant="inset" component="li" />}
            </React.Fragment>
          )
        })}
      </List>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card variant="outlined" sx={{ maxWidth: 345, margin: '0 auto' }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Add a Company
            </Typography>
            <FormControl sx={{margin: '10px'}}>
              <InputLabel htmlFor="company-input">Company Name</InputLabel>
              <Input value={name} id="company-input" aria-describedby="company-name"
                onChange={handleFieldChange(setCompanyName)} />
              <FormHelperText id="my-helper-text"></FormHelperText>
            </FormControl>
            
            <FormControl sx={{margin: '10px'}}>
              <InputLabel htmlFor="domain-input">Company Website</InputLabel>
              <Input value={domain} id="domain-input" aria-describedby="domain-name"
                onChange={handleFieldChange(setCompanyDomain)} />
              <FormHelperText id="my-helper-text"></FormHelperText>
            </FormControl>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{textAlign: 'center'}}>
          <Button sx={{display: 'block', margin: '0 auto'}} variant='outlined'
            onClick={handleCreateClick(
              name, domain, companies,
              updateCompanies, setCompanyDomain,
              setCompanyName, triggerAlert
              )}>
            Add Company
          </Button>
        </CardActions>
      </Card>
    </>
  );
}