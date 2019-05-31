import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getBooksQuery = gql`
{
    books{
        id 
        name
    }
}
`
class bookList extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <ul>
                    <li>Book name</li>
                </ul>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(bookList);