import React, { useContext, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { CRMContext } from "./CRMProvider";
import { Button, FormControl, FormHelperText,  Input, InputLabel, Link } from '@mui/material';


export default function AllCompanies() {
  const { companies } = useContext(CRMContext);
  // const handleCreateClick = () => {
    
  // }
  const [, setCompanyName] = useState('');
  const [, setCompanyDomain] = useState('');
  const handleFieldChange = (setter) => {
    return (event) => {
      setter(event.target.value)
    }
  }
  return (
    <>
    <List sx={{margin: '10px', width: '100%', bgcolor: 'background.paper' }}>
      {companies.map((
        { properties },
        index
        ) => {
          //industry, phone,
          const {domain, name, city,  state} = properties;
        return (
          <>
            <ListItem key={index} alignItems="flex-start">
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
                      <Link href={domain}>
                      {`${domain}`}
                      </Link>
                      
                    </Typography>
                    {` ${(city || state)?' —':''} ${city?city+',':''} ${state?state:''}`}
                  </React.Fragment>
                }
              />
              <Button variant='outlined'>Delete</Button>
            </ListItem>
            {(index !== companies.length - 1) && <Divider key={`divider-${index}`} variant="inset" component="li" />}
          </>
        )
      })}
    </List>
    <Typography variant="h4" sx={{marginBottom: '10px'}}>Add a Company</Typography>
      <FormControl>
        <InputLabel htmlFor="company-input">Company Name</InputLabel>
        <Input id="company-input" aria-describedby="company-name"
         onChange={handleFieldChange(setCompanyName)} />
        <FormHelperText id="my-helper-text"></FormHelperText>
      </FormControl>
      <br/>
      <FormControl>
        <InputLabel htmlFor="domain-input">Company Website</InputLabel>
        <Input id="domain-input" aria-describedby="domain-name" 
          onChange={handleFieldChange(setCompanyDomain)} />
        <FormHelperText id="my-helper-text"></FormHelperText>
      </FormControl>
      <br/>
      <Button variant='outlined'>Add Company</Button>
    </>
  );
}