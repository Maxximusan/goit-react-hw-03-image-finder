import PropTypes from "prop-types";
import { Component } from 'react'
// import { toast } from 'react-toastify';


export class Searchbar extends Component {

state = {
    searchQuery: '',
    page: 1,
    }
    
handleNameChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
    };
    
 handleSubmit = event => {
     event.preventDefault();

     if (this.state.searchQuery.trim() === '') {
        //  toast.info('Enter something.');
         alert('WHAT A FUCK? Enter Something')
         return;
     }

     this.setState({ searchQuery: '', page: 1 });
     this.props.onSubmit(this.state.searchQuery)
    };


render() {
    return (
    <>
<header className="searchbar">
  <form className="form" onSubmit={this.handleSubmit}>
    <button type="submit" className="button">
      <span className="button-label">Search</span>
    </button>

    <input
      className="input"
      type="text"
                value={this.state.searchQuery}
                onChange={this.handleNameChange}
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
            
            />
            
        </form>
            </header>
            
    </>
    )
    }
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};