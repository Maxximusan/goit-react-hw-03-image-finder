import React from 'react';
import { ToastContainer } from 'react-toastify';
import { apiFetchGallery } from 'Api/ApiPixabay'
import { Searchbar } from 'components/Searchbar/Searchbar'

// иодалку сделаю как репета показывад.
// иконка?


export class App extends React.Component {
  state = {
   
    searchQuery: 'q',
    page: 1,
    images: null,
    totalHits: 1,
    isLoaded: false,
    error:'',
    
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
        
        page: 1,
        images: [],
      });
      this.fetchGallery(nextImages, nextPage);
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      this.fetchGallery(nextImages, nextPage);
    }

  }
  
  fetchGallery(nextImages, nextPage) {
    apiFetchGallery(nextImages, nextPage)
      .then(
        (result) => {
          this.setState(prevState => {
            return {
              isLoaded: true,
              images: [...prevState.images, ...result.data.hits],
              prevState,
              totalHits: result.data.totalHits,
              searchQuery: nextImages
            };
          });
          console.log(this.state.images);
          console.log(this.state.totalHits);
          console.log(this.state.searchQuery);
        })
    .catch(error => this.setState({error}))

  }


  onSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
    console.log(searchQuery);
 };

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
    return (
      <div>
        {this.state.data && (<div>FUCKING API FUCKING CODE</div>)}
        <Searchbar onSubmit={this.onSubmit} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    </div>
    );
  }
};


//  style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
  