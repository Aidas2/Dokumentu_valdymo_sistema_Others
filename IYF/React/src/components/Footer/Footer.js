import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: 500,
    position: "fixed",
    alignItems: "center"
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 2
  }
});

class Footer extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        return (
            <footer position="sticky" className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              DoSistema
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              &copy; 2019 - Dokumentų valdymo sistema
              <br />
              {/* <a href="https://github.com/Salavija/IYF" target="_blank">
                Nuoroda į kodą GitHub'e
              </a> */}
            </Typography>
          </footer>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
