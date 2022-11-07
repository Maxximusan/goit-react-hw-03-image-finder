import React from 'react';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { apiFetchGallery } from 'Api/ApiPixabay'
import { Searchbar } from 'components/Searchbar/Searchbar'
import { ImageGallery } from 'components/ImageGallery/ImageGallery'
import { Button } from 'components/Button/Button'
import { Loader } from 'components/Loader/Loader'
import css from 'components/App.module.css'
import {ErrorReject} from 'components/ErrorRjected'

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected'
// }

export class App extends React.Component {
  state = {
   
    searchQuery: 'q',
    page: 1,
    images: [],
    totalHits: 0,
    error: '',
    // status: Status.IDLE,
    isLoading: false
    
  }
  componentDidMount() {
    
    console.log(this.state.searchQuery);
    // apiFetchGallery('dog').then(result => {
    //   const findQuery = result.data
    //   console.log(findQuery);
    //   console.log(findQuery.hits);
    //   this.setState({ data: findQuery}) 
    //   console.log(this.state.data);
    // })
     
    // fetch('https://pixabay.com/api/?q=cat&page=1&key=30128304-708965977259e04966a50b0c9&image_type=photo&orientation=horizontal')
    //      .then(res => res.json())
    //   .then(console.log)
    //   .catch(error => console.log(error))
    
  }

  
  componentDidUpdate(prevProps, prevState) { 
    const prevImages = prevState.searchQuery;
    const nextImages = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    console.log(prevImages);
    console.log(nextImages);
    console.log(prevPage);
    console.log(nextPage);

    if (prevImages !== nextImages) {
      
      
      this.setState({
        // isLoading: false,
        page: 1,
        images: [],
      });
      this.fetchGallery(nextImages, nextPage);
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      this.fetchGallery(nextImages, nextPage);
     
    }

     if (this.state.error.length > 0 ) {
        toast.error(this.state.error)
        }
    
  }
  
  fetchGallery(nextImages, nextPage) {
    apiFetchGallery(nextImages, nextPage)
      .then(
        (result) => {

          this.setState(prevState => {
            return {
              isLoading: false,
              images: [...prevState.images, ...result.data.hits],
              prevState,
              totalHits: result.data.totalHits,
              searchQuery: nextImages
            };

          });
          if (result.data.totalHits === 0) {
            throw new Error ('Nothing found for your request, please, try again something else')
          }
            
          console.log(this.state.images);
          console.log(this.state.totalHits);
          console.log(this.state.searchQuery);
        })
    .catch(error => this.setState({error: error.message}) )

  }


  onSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, isLoading: true, error:''});
    console.log(searchQuery);
    
 };

  onLoadMore = () => {
     this.setState(prevState => ({
       page: prevState.page + 1,
       isLoading: true
    }));
  }
  // async onSubmit() {
  //   const { searchQuery } = this.state
  //   try {
  //   const { data } = await apiFetchGallery(searchQuery)
  //   this.setState({
  //     data: data.hits
  //   })
  //     console.log(data);
  //   }
  //   catch(error) {}
  // }
  
  render() {
    const { images, error, totalHits, isLoading} = this.state

    // if (status === Status.IDLE) {
    //   return (
    //   <>
    //     <Searchbar onSubmit={this.onSubmit} />
    //   </>
    // )}

    // if (status === Status.PENDING) {
    // return <Loader />;
    // }
    
    // if (status === Status.REJECTED) {
    //   return 
    //   // return toast.error('Nothing found for your request, please, try again something else')
    //   // return <ErrorReject />
    //   // return <>{error && toast.error('Error, try again later!')}</>
      
    // }

    // if (status === Status.RESOLVED) {
      
    return (
      <div className={css.App}>
         
        <Searchbar onSubmit={this.onSubmit} />
        <ErrorReject errorMessage={error} />
        <ImageGallery images={images} />
        { isLoading && <Loader />}
        {images.length !== totalHits && (
          <Button loadMore={this.onLoadMore} />)}
       
    </div>
      );
      }
  // }
};


//  style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
  