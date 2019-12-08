import React from 'react';
import Document from './Document';
import EnchancedTable from './EnchancedTable';
// import DetailedList from './DetailedList'


class Docs extends React.Component {

    render() {
        return (
            <div>
                <Document />
                {/* <DetailedList /> */}
                <EnchancedTable />
            </div>
        );
    };
}

export default Docs;