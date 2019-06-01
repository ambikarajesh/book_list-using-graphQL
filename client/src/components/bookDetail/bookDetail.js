import React, { Component } from 'react';
import {getBook} from '../queries/queries';
import {graphql} from 'react-apollo';
class bookDetail extends Component {
    fetchBook = () => {
        let data = this.props.data;
        if(data.loading){
            return <div>Data Loading...</div>
        }else{
            return (<div>
                <p>{data.book.name}</p>
                <p>{data.book.category}</p>
                <p>{data.book.author.name}</p>
                <ul>
                    {data.book.author.book.map(book=>{
                        return(<li>
                            <p>{book.name}</p>
                            <p>{book.category}</p>
                        </li>)
                    })}
                </ul>
            </div>)
        }
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Book Detail</h1>
                {this.props.selected? this.props.data ? this.fetchBook() : null: null}
            </div>
        );
    }
}

export default graphql(getBook, {
    options:(props) => {
        return{
            variables:{
                id:props.selected
            }
        }
    }
})(bookDetail);