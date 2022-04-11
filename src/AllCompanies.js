import React, { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


export default function AllCompanies({ companies }) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {companies.map((
        { companyName, companyDomain, companyCity, },
        index
        ) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={companyName} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={companyName}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`${companyDomain}`}
                    </Typography>
                    {`— ${companyCity}`}
                  </React.Fragment>
                }
              />
            </ListItem>
            {(index !== companies.length - 1) && <Divider variant="inset" component="li" />}
          </>
        )
      })}
    </List>
  );
}