import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { create } from 'jss';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const rows = [
    { id: 'document_id', numeric: true, disablePadding: false, label: 'ID' },
    { id: 'title', numeric: false, disablePadding: true, label: 'Pavadinimas' },
    { id: 'author', numeric: false, disablePadding: true, label: 'Autorius' },
    { id: 'type', numeric: false, disablePadding: true, label: 'Tipas' },
    {
        id: 'describtion',
        numeric: false,
        disablePadding: true,
        label: 'Aprašymas',
    },
    { id: 'action', numeric: false, disablePadding: true, label: 'Veiksmas' },

];


class EnhancedTableHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: props.documents,
        };
    }

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    //     handleRemove = movie => {
    //         const url = `http://localhost:3000/movies/${movie.id}`;

    //         axios
    //             .delete(url)
    //             .then(res => {
    //                 this.setState(previousState => {
    //                     return {
    //                         movies: previousState.movies.filter(m => m.id !== movie.id)
    //                     };
    //                 });
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             });
    //     };

    //     // ...
    // }

    // componentDidMount() {
    //     axios.get("http://localhost:8081/documents")
    //     .then((answer) =>{
    //         this.state({ documents: answer.data })
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }
    render() {
        const {
            onSelectAllClick,
            order,
            orderBy,
            numSelected,
            rowCount,
        } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
export default EnchantedTableHead;