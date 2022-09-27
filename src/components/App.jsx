import React from "react";
import { InfinitySpin  } from 'react-loader-spinner'
import { fetchApiByName } from "services/api/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Box } from "./Box/Box";
import { LoadMoreButton } from "./Button/Button";
export class App extends React.Component {
  state = {
    hitsCount: 0,
    total: 0,
    page: 1,
    value: '',
    images: [],
    status: 'idle',
    loadBtnStatus: 'idle',
  }
  async componentDidUpdate(prevProps, prevState) {
    const {value, page} = this.state
    if (value !== prevState.value) {

      this.setState({ status: 'loader' })
      
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
      
    }


    if (page !== prevState.page && page !== 1 && this.state.hitsCount < this.state.total) {

      this.setState({ status: 'loader' })
      
      const images = await fetchApiByName(value, page)

      this.setState({
        images: [...this.state.images, ...images.hits],
        status: 'resolved',
        loadBtnStatus: 'resolved',
        hitsCount: this.state.hitsCount + images.hits.length
      })

    }
  }
  
  addNewImagesToGallery = () => {
      this.setState({page: this.state.page + 1})
    }
  
  getInputValue = (value) => {
    this.setState({value})
  }
  
  render() {
    const {status, images, loadBtnStatus} = this.state
  return  <Box>
    <Searchbar onSubmit={this.getInputValue} />
    {status === 'rejected' && <p>Nothing found</p>}
        {status === 'loader' && <InfinitySpin width='200'color="#4fa94d" />}
        {status === 'resolved' && <ImageGallery images={images} /> }
        {loadBtnStatus === 'resolved' && <LoadMoreButton onClick={ this.addNewImagesToGallery} /> }
    </Box>
    
    
  };
};
