import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getBooks} from '../queries/queries';
import BookDetail from '../bookDetail/bookDetail';
class bookList extends Component {
    state = {
        selected:null
    }
    fetchBooks = () => {
        let data = this.props.data;
        if(data.loading){
            return <li>Data Loading...</li>
        }
        else{
            return data.books.map(book=>{
                return <li key={book.id} 
                           style = {{border:'1px solid #ccc', margin:'10px auto', width:'300px', cursor:'pointer'}}
                           onClick={()=> {this.setState({selected:book.id})}}>{book.name}</li>
            })
        }
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <ul style={{listStyle:'none'}}>
                    {this.props ? this.fetchBooks() : null}
                </ul>
                <BookDetail selected = {this.state.selected}/>
            </div>
        );
    }
}

export default graphql(getBooks)(bookList);