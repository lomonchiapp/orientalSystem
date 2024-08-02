import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const ConfirmDialog = ({open, setOpen, content, onConfirm, title}) => {

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    onConfirm()
    handleClose()
  }

  if (!open) {
    return null
  }

  return (
      <Dialog
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: '500px'
        }
      }}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContentText id="alert-dialog-description">
          {content}
          </DialogContentText>
        <DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleConfirm} autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
  );
}
