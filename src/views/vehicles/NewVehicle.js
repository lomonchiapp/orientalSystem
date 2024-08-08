import React, { useState } from 'react';
import { Grid, Typography, Box, TextField, Button, FormControl, Divider } from '@mui/material';
import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CheckCircle, Upload } from '@phosphor-icons/react';
import { VehicleCategories } from '../inputs/VehicleCategories';
import { VehicleBrands } from '../inputs/VehicleBrands';
import { ImagesPreview } from './ImagesPreview';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

// Initialize Firestore and Storage
const database = getFirestore();
const storage = getStorage();

export const NewVehicle = ({setOpen}) => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [name, setName] = useState('');
  const [cc, setCc] = useState('');
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [salePrice, setSalePrice] = useState('');
  const [initPrice, setInitPrice] = useState('');

  const handleImageUpload = event => {
    const files = Array.from(event.target.files)
    setImages(prevImages => [...prevImages, ...files])

    const filePreviews = files.map(file => URL.createObjectURL(file))
    setPreviews(prevPreviews => [...prevPreviews, ...filePreviews])
  }
  const createVehicle = async event => {
    event.preventDefault();

    const vehicleData = {
      name,
      cc,
      category,
      brand,
      salePrice: parseFloat(salePrice.replace(/[^0-9.]/g, '')),
      initPrice: parseFloat(initPrice.replace(/[^0-9.]/g, '')),
    };

    try {
      // Add vehicle data to Firestore and get the document reference
      const docRef = await addDoc(collection(database, 'vehicles'), vehicleData);
      console.log('Document written with ID: ', docRef.id);
      setOpen(false)
      // Upload images and get their URLs
      const uploadPromises = images.map(file => {
        const fileExtension = file.name.slice(file.name.lastIndexOf('.'));
        const storageRef = ref(storage, `images/vehicles/${docRef.id}/${uuidv4()}${fileExtension}`);
        return uploadBytes(storageRef, file)
          .then(snapshot => {
            console.log('Uploaded a blob or file!', snapshot);
            return getDownloadURL(snapshot.ref);
          });
      });

      const urls = await Promise.all(uploadPromises);

      // Update the document with the image URLs
      await updateDoc(docRef, { images: urls })
      console.log('Document updated with image URLs')

    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handlePriceChange = event => {
    // Remove non-numeric characters
    const numericValue = event.target.value.replace(/[^0-9]/g, '');
    // Format as price (simple formatting)
    const formattedPrice = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const priceWithPrefix = `$${formattedPrice}`;
    setSalePrice(priceWithPrefix);
  };

  const handleInitPriceChange = event => {
    // Remove non-numeric characters
    const numericValue = event.target.value.replace(/[^0-9]/g, '');
    // Format as price (simple formatting)
    const formattedPrice = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const priceWithPrefix = `$${formattedPrice}`;
    setInitPrice(priceWithPrefix);
  };

  return (
    <form onSubmit={createVehicle}>
      <Grid sx={styles.formContainer} spacing={3}>
        <Box maxWidth={300} sx={{ mb: 3 }}>
          <Typography variant='h5'>Nuevo Vehículo</Typography>
          <Typography variant='body2'>Llena los campos para agregar un nuevo vehículo.</Typography>
        </Box>
        <Divider />
        <Box>
          <TextField
            value={name}
            onChange={e => setName(e.target.value)}
            sx={styles.textInput}
            label='Nombre'
            name='name'
            required
          />
        </Box>
        {/* Select Vehicle Category */}
        <Box>
          <VehicleCategories setCategory={setCategory} />
        </Box>
        {/* Select Vehicle Brand */}
        <Box>
          <VehicleBrands setBrand={setBrand} />
        </Box>
        {/* Image Field */}
        <FormControl>
          <Button
            startIcon={images.length > 0 ? <CheckCircle /> : <Upload />}
            variant={images.length > 0 ? 'contained' : 'outlined'}
            component='label'
            sx={{ my: 4, height: 46 }}
          >
            {images.length > 0 ? `Imagenes Seleccionadas ${images.length}` : 'Subir Imagenes'}
            <input multiple style={styles.uploadInput} type='file' onChange={handleImageUpload} />
          </Button>
          {/* Image placeholder */}
          {images.length > 0 ? <ImagesPreview images={previews} /> : null}
          {/* CC field */}
        </FormControl>
        <Grid>
          <TextField
            value={cc}
            onChange={e => setCc(e.target.value)}
            sx={styles.textInput}
            label='Cilindraje'
            name='cc'
            required
          />
        </Grid>
        <Grid>
          <FormControl>
            {/* Sale Price Field */}
          <TextField
            value={salePrice}
            onChange={handlePriceChange}
            sx={styles.textInput}
            label='Precio de Venta'
            name='salePrice'
            required
          />
          </FormControl>
        </Grid>
        <Grid>
          {/* Initial Price Field */}
            <FormControl>
          <TextField
            onChange={handleInitPriceChange}
            value={initPrice}
            sx={styles.textInput}
            label='Precio Inicial'
            name='initPrice'
            required
          />

          </FormControl>
        </Grid>
        <Grid>
          <Button type='submit' variant='contained' color='primary'>
            Agregar Vehículo
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    ml: 10,
    marginTop: '2rem'
  },
  uploadInput: {
    display: 'none'
  },
  textInput: {
    width: '100%',
    mb: 3
  }
};