import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';


export const SearchVehicle = ({ searchText, setSearchText }) => {
  return (
    <TextField
      id='search-vehicle'
      label='Buscar Vehículo'
      variant='outlined'
      value={searchText}
      inputProps={{ 'aria-label': 'Buscar Vehículo' }}
      onChange={e => setSearchText(e.target.value)}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MagnifyingGlass />
          </InputAdornment>
        ),
      }}
    />
  );
};
