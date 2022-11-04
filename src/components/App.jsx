import React from 'react';
// import { ToastContainer } from 'react-toastify';
import { apiFetchGallery } from 'Api/ApiPixabay'
import { Searchbar } from 'components/Searchbar/Searchbar'

// иодалку сделаю как репета показывад.
// иконка?


export class App extends React.Component {
  state = {
    data: null,
    searchQuery: '',
    page: 1
  }
  componentDidMount() {
    apiFetchGallery('dog').then(result => {
      const findQuery = result.data
      console.log(findQuery);
      this.setState({ data: findQuery}) 
      console.log(this.state.data);
    })
     console.log(this.state.data);
    // fetch('https://pixabay.com/api/?q=cat&page=1&key=30128304-708965977259e04966a50b0c9&image_type=photo&orientation=horizontal')
    //      .then(res => res.json())
    //   .then(console.log)
    //   .catch(error => console.log(error))
    
  }

  componentDidUpdate() { }
  

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
        {/* <ToastContainer
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
        /> */}
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
    {/* {this.state.pokemon && (<div>{this.state.pokemon.name}</div>)} */}