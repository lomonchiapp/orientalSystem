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
import { useSaleState } from 'src/globalStates/saleState'
// ** Firebase Imports
import { database } from 'src/firebase'
import { collection, getDocs, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { getStorage, ref, deleteObject } from 'firebase/storage'
import {ConfirmDialog} from 'src/views/dialogs/ConfirmDialog'

//** Toastify */
import { toast } from 'react-toastify'

const columns = [
  { id: 'client', label: 'Cliente', minWidth: 170 },
  {
    id: 'product',
    label: 'Producto',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'phone',
    label: 'No. de Contacto',
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

export const SalesTable = ({ sales, open, setOpen, setEditMode }) => {
  // ** Table States
  const [page, setPage] = useState(0)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { setSelectedSale } = useSaleState()
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
  const handleDelete = async sale => {
    console.log("Attempting to delete vehicle with ID:", sale.id); // Debug log
    try {
      // Uncomment and adjust if needed to delete associated storage objects
      // const storage = getStorage();
      // const storageRef = ref(storage, `images/vehicles/${vehicle.id}`);
      // await deleteObject(storageRef);
      await deleteDoc(doc(database, 'sales', sales.id));
      toast.success('Vehículo eliminado con éxito');
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast.error('Error al eliminar los datos de la venta');
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
            {sales.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(sale => (
              <TableRow
                hover
                role='checkbox'
                tabIndex={-1}
                key={sale.id}
                onClick={() => setSelectedSale(sale)}
              >
                <TableCell>
                  <Typography>{sale.lastName}, {sale.firstName}</Typography>
                </TableCell>
                <TableCell align='right'>{sale.phone}</TableCell>
                <TableCell align='right'>
                  {sale.email}
                </TableCell>
                <TableCell align='right'>
                  {sale.debt}
                </TableCell>
                <TableCell align='right'>
                  <IconButton sx={styles.editIcon} onClick={() => handleEdit(sale)}>
                    <NotePencil size={20} onClick={() => handleEdit(sale)} />
                  </IconButton>
                  <IconButton sx={styles.deleteIcon}>
                    <Trash size={20} onClick={() => handleDelete(sale)} />

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
        count={sales.length}
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
