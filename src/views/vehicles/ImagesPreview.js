import React from 'react'
import { Box, Button, Grid, Stack } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'

export const ImagesPreview = ({images}) => {
  return (
    <Swiper
      modules={[Navigation]}
      style={styles.slider}
      slidesPerView={1}
      navigation={true}
      speed={1000}
      autoplay={{
        delay: 0,
        disableOnInteraction: true,
      }}
      loop={true}
      className='mySwiper'
    >
      {images.map((image, index) => {
        return (
            <SwiperSlide key={index} styles={styles.slide}>
                <img src={image} alt="Preview" style={styles.slideLogo} />
            </SwiperSlide>
        )
      })}
      
    </Swiper>
  )
}

const styles = {
    slider: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      width:'200px',
      height:'100px',
      border: '1px solid lightgrey',
      margin:'auto',
        borderRadius:'5px',
        marginBottom:10,
    },
    slide: {
       
    },
    slideLogo: {
      width: '200px',
      aspectRatio:'2/1',
      objectFit: 'contain',
    },
    }