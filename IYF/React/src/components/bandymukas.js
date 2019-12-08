constructor(props) {
    super(props);
    this.state = {
        selectedTable: '',
        selectedColumns: [],
        tables: [],
        columns: [],
        tableData: [],
        auth: 'Basic ' + btoa(props.user + ':' + props.pass),
    };
    this.onTableChange = this.onTableChange.bind(this);
    this.onColumnChange = this.onColumnChange.bind(this);
    this.renderTableHeaders = this.renderTableHeaders.bind(this);
    this.renderTableBody = this.renderTableBody.bind(this);
    this.getColumnList = this.getColumnList.bind(this);
    this.getData = this.getData.bind(this);
}

componentDidMount() {
    Object.assign(axios.defaults, { headers: { authorization: this.state.auth } });
    axios.get(`${this.props.baseUrl}`)
        .then(res => {
            const tables = res.data.value;
            this.setState({ tables });
            this.setState({ selectedTable: tables[0].name });
        })
        .catch(function (error) {
            if (error.response) {
                alert('Code: ' + error.response.data.error.code +
                    '\r\nMessage: ' + error.response.data.error.message);
            } else {
                console.log('Error', error.message);
            }
        });
    this.getColumnList();
}

getColumnList(selectedTable) {
    if (!selectedTable) {
        selectedTable = this.state.selectedTable;
    }
    Object.assign(axios.defaults, { headers: { authorization: this.state.auth } });
    axios.get(`${this.props.baseUrl}/${selectedTable}/$metadata?@json`)
        .then(res => {
            let columns = res.data.items[0]["odata:cname"];
            this.setState({
                columns,
                selectedColumns: [],
            });
        })
        .catch(error => {
            if (error.response) {
                alert('Code: ' + error.response.data.error.code +
                    '\r\nMessage: ' + error.response.data.error.message);
            } else {
                console.log('Error', error.message);
            }
        });
}

renderTableList() {
    let tablesHTML = [];
    for (let i = 0; i < this.state.tables.length; i++) {
        let table = this.state.tables[i];
        tablesHTML.push(<option key={table.url} value={table.name}>{table.name}</option>);
    }
    return tablesHTML;
}

renderColumnList() {
    let columnsHTML = [];
    for (let i = 0; i < this.state.columns.length; i++) {
        let column = this.state.columns[i];
        columnsHTML.push(<option key={column} value={column}>{column}</option>);
    }
    return columnsHTML;
}
renderTable() {
    return (
        <table>
            <thead>
                {this.renderTableHeaders()}
            </thead>
            {this.renderTableBody()}
        </table>
    );
}



renderTableHeaders() {
    let headers = [];
    for (let i = 0; i < this.state.selectedColumns.length; i++) {
        let col = this.state.selectedColumns[i];
        headers.push(<th key={col} style={{
            backgroundColor: '#177CB8',
            color: 'white',
            border: '1px solid grey',
            borderCollapse: 'collapse',
            padding: '5px'
        }}>{col}</th>)
    }
    return (<tr>{headers}<; /tr>);
  }

    renderTableBody() {
            let rows = [];
    this.state.tableData.forEach(function(row) {
            rows.push(
                <tr key={btoa('row' + rows.length)}>
                    {this.state.selectedColumns.map(col =>
                        <td key={col} style={{
                            border: '1px solid grey',
                            borderCollapse: 'collapse',
                            padding: '5px'
                        }}>{row[col]}</td>
                    )}
                </tr>
            )
        }.bind(this));
    return (&lt;tbody>{rows}</tbody>);
}


getData() {
    let columnList = '';
    columnList = this.state.selectedColumns.join(',');
    Object.assign(axios.defaults, { headers: { authorization: this.state.auth } });
    axios.get(`${this.props.baseUrl}/${this.state.selectedTable}/?$select=${columnList}`)
        .then(res => {
            const tableData = res.data.value;
            this.setState({ tableData });
        })
        .catch(error => {
            if (error.response) {
                alert('Code: ' + error.response.data.error.code +
                    '\r\nMessage: ' + error.response.data.error.message);
            } else {
                console.log('Error', error.message);
            }
        });
}

onTableChange(event) {
    const selectedTable = event.target.value;
    this.setState({
        selectedTable,
        tableData: [],
    });
    this.getColumnList(selectedTable);
}

onColumnChange(event) {
    let options = event.target.options;
    let selectedColumns = [];
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            selectedColumns.push(options[i].value);
        }
    }
    this.setState({
        selectedColumns,
        tableData: [],
    });
}

render() {
    return (
        <div>
            <h1 style={{ fontSize: '1.2em', color: '#177CB8', marginBottom: '0' }}>CData API Server React Demo</h1>
            <br />
            <label>Select a Table</label>
            <br />
            <select className='tableDropDown' onChange={this.onTableChange}>
                {this.renderTableList()}
            </select>
            <br />
            <br />
            <label>Select {this.state.selectedTable} Columns</label>
            <br />
            <select className='columnMultiSelect' onChange={this.onColumnChange} multiple>
                {this.renderColumnList()}
            </select>
            <br />
            <br />
            {this.state.selectedColumns.length > 0 ? <button onClick={this.getData}>Get [{this.state.selectedTable}] Data</button> : null}
            <br />
            <br />
            {this.state.tableData.length > 0 ? this.renderTable() : null}
        </div>
    );
}