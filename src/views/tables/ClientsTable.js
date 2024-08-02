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
import { useClientState } from 'src/globalStates/clientState'
// ** Firebase Imports
import { database } from 'src/firebase'
import { collection, getDocs, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { getStorage, ref, deleteObject } from 'firebase/storage'
import {ConfirmDialog} from 'src/views/dialogs/ConfirmDialog'

//** Toastify */
import { toast } from 'react-toastify'

const columns = [
  { id: 'name', label: 'Nombre', minWidth: 170 },
  {
    id: 'phone',
    label: 'No. de Contacto',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'email',
    label: 'P. de Venta',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'debt',
    label: 'Deuda',
    minWidth: 170,
    align: 'right',
  },
  ,
  {
    id: 'actions',
    label: 'Acciones',
    minWidth: 170,
    align: 'right'
  }
]

export const ClientsTable = ({ clients, open, setOpen, setEditMode }) => {
  // ** Table States
  const [page, setPage] = useState(0)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { setSelectedClient, selectedClient } = useClientState()
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleEdit = client => {
    setSelectedClient(client)
    setEditMode(true)
  }
  const handleDelete = async client => {
    console.log("Attempting to delete vehicle with ID:", client.id); // Debug log
    try {
      // Uncomment and adjust if needed to delete associated storage objects
      // const storage = getStorage();
      // const storageRef = ref(storage, `images/vehicles/${vehicle.id}`);
      // await deleteObject(storageRef);

      await deleteDoc(doc(database, 'clients', client.id));
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
            {clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(client => (
              <TableRow
                hover
                role='checkbox'
                tabIndex={-1}
                key={client.id}
                onClick={() => setSelectedClient(client)}
              >
                <TableCell>
                  <Typography>{client.lastName}, {client.firstName}</Typography>
                </TableCell>
                <TableCell align='right'>{client.phone}</TableCell>
                <TableCell align='right'>
                  {client.email}
                </TableCell>
                <TableCell align='right'>
                  {client.debt}
                </TableCell>
                <TableCell align='right'>
                  <IconButton sx={styles.editIcon} onClick={() => handleEdit(client)}>
                    <NotePencil size={20} onClick={() => handleEdit(client)} />
                  </IconButton>
                  <IconButton sx={styles.deleteIcon}>
                    <Trash size={20} onClick={() => handleDelete(client)} />

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
        count={clients.length}
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
