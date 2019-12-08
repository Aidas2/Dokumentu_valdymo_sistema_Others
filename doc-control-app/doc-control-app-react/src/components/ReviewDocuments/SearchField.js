import React from 'react';

const SearchField = (props) => {
    return (
        <div className="row" style={{ margin: "10px" }}>
            <label htmlFor="searchField">Paieškos frazė:&nbsp;</label>
            <input
                name="searchField"
                type="text"
                value={props.searchField}
                onChange={props.handleChangeOfSearchField}>
            </input>
        </div>
    );
}

export default SearchField;