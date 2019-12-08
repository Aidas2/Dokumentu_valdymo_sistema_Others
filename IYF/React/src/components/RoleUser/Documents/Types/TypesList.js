import React from 'react';
// import PropTypes from 'prop-types';

class TypesList extends React.Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ documentTypes: event.target.documentTypes });
    }

    handleSubmit(event) {
        alert('The documentType you picked is: ' + this.state.documentTypes);
        event.preventDefault();
    }

    render() {

        const { documentTypes } = this.props;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Pick the datadocumentType to describe your data file:
                  <select value={documentTypes} onChange={this.handleChange}>
                            {
                                (documentTypes && documentTypes.length > 0) && documentTypes.map((documentType) => {
                                    return (
                                      <option value="{documentType.title}">
                                        {" "}
                                        {
                                          documentType.data
                                        }
                                      </option>
                                    );
                                })
                            }
                        </select>
                    </label> <br />
                </form>
            </div>
        );
    }
}
export default TypesList;