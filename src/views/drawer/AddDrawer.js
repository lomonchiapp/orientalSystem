import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText } from '@mui/material';

export const AddDrawer = ({form, selectedItem, open, setOpen}) => {

  return (
    <div>
      <Drawer sx={{
        width: 400,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 400,
          boxSizing: 'border-box',
        }
      }} anchor='right' open={open} onClose={() => setOpen(false)}>
        {form}
      </Drawer>
    </div>
  );
}
