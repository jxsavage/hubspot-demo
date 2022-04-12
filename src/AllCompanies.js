import React, { useContext } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { CRMContext } from "./CRMProvider";


export default function AllCompanies() {
  const { companies } = useContext(CRMContext);
  
  return (
    <List sx={{margin: '10px', width: '100%', bgcolor: 'background.paper' }}>
      {companies.map((
        { properties },
        index
        ) => {
          const {domain, name} = properties;
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
                      {`${domain}`}
                    </Typography>
                    {`— ${name}`}
                  </React.Fragment>
                }
              />
            </ListItem>
            {(index !== companies.length - 1) && <Divider key={`divider-${index}`} variant="inset" component="li" />}
          </>
        )
      })}
    </List>
  );
}