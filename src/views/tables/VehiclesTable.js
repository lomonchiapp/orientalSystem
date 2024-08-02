/* eslint-disable lines-around-comment */
/* eslint-disable padding-line-between-statements */
/* eslint-disable newline-before-return */
// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Image, NotePencil, Pencil, Trash } from '@phosphor-icons/react'
import { IconButton, Typography } from '@mui/material'
import { useVehicleState } from 'src/globalStates/vehicleState'
// ** Firebase Imports
import { database } from 'src/firebase'
import { collection, getDocs, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { getStorage, ref, deleteObject } from 'firebase/storage'
import {ConfirmDialog} from 'src/views/dialogs/ConfirmDialog'

//** Toastify */
import { toast } from 'react-toastify'

const columns = [
  { id: 'image', label: 'Imagen', minWidth: 100 },
  { id: 'name', label: 'Nombre', minWidth: 170 },
  {
    id: 'cc',
    label: 'Cilindraje',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'salePrice',
    label: 'P. de Venta',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'initPrice',
    label: 'P. Inicial',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  ,
  {
    id: 'actions',
    label: 'Acciones',
    minWidth: 170,
    align: 'right'
  }
]

export const VehiclesTable = ({ vehicles, open, setOpen, setEditMode, searchText }) => {
  // ** Table States
  const [page, setPage] = useState(0)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { setSelectedVehicle, selectedVehicle } = useVehicleState()
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchText.toLowerCase())
  )

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleEdit = vehicle => {
    setSelectedVehicle(vehicle)
    setEditMode(true)
  }
  const handleDelete = async vehicle => {
    console.log("Attempting to delete vehicle with ID:", vehicle.id); // Debug log
    try {
      // Uncomment and adjust if needed to delete associated storage objects
      // const storage = getStorage();
      // const storageRef = ref(storage, `images/vehicles/${vehicle.id}`);
      // await deleteObject(storageRef);

      await deleteDoc(doc(database, 'vehicles', vehicle.id));
      toast.success('Vehículo eliminado con éxito');
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast.error('Error al eliminar el vehículo');
    }
}
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(vehicle => (
              <TableRow
                hover
                role='checkbox'
                tabIndex={-1}
                key={vehicle.id}
                onClick={() => setSelectedVehicle(vehicle)}
              >
                <TableCell>
                  {vehicle.image === undefined ? (
                    <Image src={vehicle.image} alt={vehicle.name} />
                  ) : (
                    <img src={vehicle.image} alt={vehicle.name} style={styles.thumbnail} />
                  )}
                </TableCell>
                <TableCell>
                  <Typography>{vehicle.name}</Typography>
                  <Typography variant='body2' color='textSecondary'>
                  {vehicle.category?.name ?? 'Sin Categoria'}
                  </Typography>
                </TableCell>
                <TableCell align='right'>{vehicle.cc} cc</TableCell>
                <TableCell align='right'>
                  {vehicle.salePrice === undefined
                    ? 'No Disponible'
                    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(vehicle.salePrice)}
                </TableCell>
                <TableCell align='right'>
                  {vehicle.initPrice === undefined
                    ? 'No Disponible'
                    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(vehicle.initPrice)}
                </TableCell>
                <TableCell align='right'>
                  <IconButton sx={styles.editIcon} onClick={() => handleEdit(vehicle)}>
                    <NotePencil size={20} onClick={() => handleEdit(vehicle)} />
                  </IconButton>
                  <IconButton sx={styles.deleteIcon}>
                    <Trash size={20} onClick={() => handleDelete(vehicle)} />

                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={vehicles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
const styles = {
  thumbnail: {
    aspectRatio: '2/1',
    height: 40
  },
  editIcon: {
    cursor: 'pointer'
  },
  deleteIcon: {
    cursor: 'pointer',
    '&:hover': {
      color: '#f44336'
    }
  }
}
