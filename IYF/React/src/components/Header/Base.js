import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing.unit,
    },
    contentWrapper: {
        margin: '40px 16px',
    },
});

function Base(props) {
    const { classes } = props;

    return (


        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={16} alignItems="center"></Grid>

                    <Grid />
                </Toolbar>
            </AppBar>
        </Paper>
    );
}
Base.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Base);