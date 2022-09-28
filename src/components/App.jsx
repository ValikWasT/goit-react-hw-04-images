import React from "react";
import { InfinitySpin  } from 'react-loader-spinner'
import { fetchApiByName } from "services/api/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Box, LoadingBox } from "./Box/Box";
import { LoadMoreButton } from "./Button/Button";
import { ModalWindow } from "./Modal/Modal";
export class App extends React.Component {
  state = {
    hitsCount: 0,
    total: 0,
    page: 1,
    value: '',
    images: [],
    status: 'idle',
    loadBtnStatus: 'idle',
    modalStatus: false,
    modalImg: '',
  }
  async componentDidUpdate(prevProps, prevState) {
    const {value, page, hitsCount, total} = this.state
    
    
    if (value !== prevState.value) {

      this.setState({ status: 'loader', loadBtnStatus: 'loader'  })
      
      const images = await fetchApiByName(value, 1)

      if (images.hits.length === 0) {
        this.setState({ status: 'rejected' });
        return
      }

      this.setState({
        images: images.hits,
        page: 1, status: 'resolved',
        loadBtnStatus: 'resolved',
        total: images.totalHits,
        hitsCount: images.hits.length
      })

      if (images.totalHits <= images.hits.length) {
        this.setState({ loadBtnStatus: 'rejected', })
        return
      } 
    }


    if (page !== prevState.page && page !== 1 && hitsCount < total) {

      this.setState({ status: 'loader', loadBtnStatus: 'loader' })
      
      const images = await fetchApiByName(value, page)

      this.setState({
        images: [...this.state.images, ...images.hits],
        status: 'resolved',
        loadBtnStatus: 'resolved',
        hitsCount: hitsCount + images.hits.length
      })


      if (images.totalHits <= images.hits.length + hitsCount) {
        this.setState({ loadBtnStatus: 'rejected', })
        return
      } 

    }
  }
  
  addNewImagesToGallery = () => {
      this.setState({page: this.state.page + 1})
    }
  
  getInputValue = (value) => {
    this.setState({value})
  }

  onImageClick = (largeImg) => {
    this.setState({ modalStatus: true, modalImg: largeImg })
    
  }

  onClose = () => {
    this.setState({modalStatus: false})
  }
  
  
  render() {
    const {status, images, loadBtnStatus, modalStatus, modalImg} = this.state
  return  <Box>
    <Searchbar onSubmit={this.getInputValue} />
    <ImageGallery images={images} onImageClick={this.onImageClick } />
    <LoadingBox>
      {status === 'rejected' && <p>Nothing found</p>}
        {status === 'loader' && <InfinitySpin width='200'color="#4fa94d" />}
      {loadBtnStatus === 'resolved' && <LoadMoreButton onClick={this.addNewImagesToGallery} />}
      
    </LoadingBox>
    {modalStatus && <ModalWindow largeImg={modalImg} onClose={this.onClose} />}
    </Box>
    
    
  };
};
