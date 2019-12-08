import React from 'react';
// import PropTypes from 'prop-types';
import TypesList from './Types';
import axios from 'axios';

class TypesListGet extends React.Component {
    constructor() {
        super();

        this.state = {
            documentType: []
        }
    }
    typesComponentDidMount = e => {
        e.preventDefault();
        axios
          .get("http://localhost:8081/api/documents/types")
          .then(response => {
            this.setState({ data: response.data });
          })
          .catch(error => console.log(error.response));
    }

    render() {
        return (
            <div>

                <TypesList documentTypes={this.state.documentType} />

            </div>
        );
    }
} 
export default TypesListGet;