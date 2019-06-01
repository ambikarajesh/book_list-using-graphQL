import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo';
import {getAuthors, storeBookMutation, getBooks} from '../queries/queries';

class addBook extends Component {
    state = {
        name:"",
        category:"",
        authorId:""
    }
    inputChangeHandler = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }
    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state)
        this.props.storeBookMutation({
            variables:{
                name:this.state.name,
                category:this.state.category,
                authorId:this.state.authorId
            },
            refetchQueries:[{query:getBooks}]
        });
    }
    fetchAuthors = () => {
        let data = this.props.getAuthors;
        if(data.loading){
            return <option disabled>Data Loading...</option>
        }else{
            return data.authors.map(author=>{
                return <option key={author.id} value = {author.id}>{author.name}</option>
            })
        }
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <form onSubmit = {this.submitHandler}>
                    <input type = "text" value={this.state.name} name = 'name' onChange={this.inputChangeHandler}/>
                    <input type = "text" value={this.state.category} name = 'category' onChange={this.inputChangeHandler}/>
                    <select value = {this.state.authorId} name = 'authorId' onChange={this.inputChangeHandler}>
                        {this.props ? this.fetchAuthors(): null}
                    </select>
                    <button>+</button>
                </form>
            </div>
        );
    }
}

export default compose(
    graphql(getAuthors, {name:"getAuthors"}),
    graphql(storeBookMutation, {name:"storeBookMutation"})
)(addBook);