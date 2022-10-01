import React, {useState, useEffect} from "react";
import { InfinitySpin  } from 'react-loader-spinner'
import { fetchApiByName } from "services/api/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Box, LoadingBox } from "./Box/Box";
import { LoadMoreButton } from "./Button/Button";
import { ModalWindow } from "./Modal/Modal";
export const App = () => {
  const [hitsCount, setHitsCount] = useState(0)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [value, setValue] = useState('')
  const [images, setImages] = useState([])
  const [status, setStatus] = useState('idle')
  const [loadBtnStatus, setLoadBtnStatus] = useState('idle')
  const [modalStatus, setModalStatus] = useState(false)
  const [modalImg, setModalImg] = useState('')

  useEffect(() => {
    if (value === '') {
      return;
    }

    setLoadBtnStatus('loader')
    setStatus('loader')

    fetchApiByName(value, page).then(r => {

      if (r.hits.length === 0) {
        setStatus('rejected')
        return
      }

      if (r.totalHits > r.hits.length) {
        setLoadBtnStatus('resolved')
      }

      setImages(prevImages => [...prevImages, ...r.hits]);
      setStatus('resolved');
      setTotal(r.totalHits);
      setHitsCount(prevHitsCount => prevHitsCount + r.hits.length)

    })
    
  }, [value, page])

  useEffect(() => {
    if (hitsCount >= total) {
      setLoadBtnStatus('rejected')
    }
  }, [hitsCount, total])
  
  
  const addNewImagesToGallery = () => {
      setPage(page + 1)
    }
  
  const getInputValue = (value) => {
    setImages([])
    setHitsCount(0)
    setPage(1)
    setValue(value)
  }

  const onImageClick = (largeImg) => {
    setModalStatus(true);
    setModalImg(largeImg)
  }

  const onClose = () => {
    setModalStatus(false)
  }
  
  
  
  return <Box>
    <Searchbar onSubmit={getInputValue} />
    <ImageGallery images={images} onImageClick={onImageClick } />
    <LoadingBox>
      {status === 'rejected' && <p>Nothing found</p>}
        {status === 'loader' && <InfinitySpin width='200'color="#4fa94d" />}
      {loadBtnStatus === 'resolved' && <LoadMoreButton onClick={addNewImagesToGallery} />}
      
    </LoadingBox>
    {modalStatus && <ModalWindow largeImg={modalImg} onClose={onClose} />}
    </Box>
    
    
  };