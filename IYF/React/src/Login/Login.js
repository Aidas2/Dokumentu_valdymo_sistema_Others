import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({

    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Login extends Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            user_name: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

// Axios.post("http://localhost:8081/api/auth/signin", data)
//       .then(res => {
//         localStorage.setItem(
//             "accessToken",
//             JSON.stringify(res.data.accessToken)
//         );
// Axios.defaults.headers.Authorization = `Bearer ${JSON.parse(
//     localStorage.getItem("accessToken")
// )}`;
// Axios.get("http://localhost:8081/api/users/me")
//     .then(ress => {
//         localStorage.setItem("user", JSON.stringify(ress.data));
//         this.props.setLoggedState();
//         console.log(ress.data);
//     })
//     .catch(err => {
//         console.log(err);
//     });
//       })
//       .catch (e => {
//     this.setState({ wrongUsernameOrPassword: true });
// });
//   };

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;
        return (
                <div className = "container">
                    <main className={classes.main}>
                        <CssBaseline />
                        <Paper className={classes.paper}>
                            <form className={classes.form} onSubmit={props.getUser}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="name">Prisijungimo vardas</InputLabel>
                                    <Input id="name" name="name" autoComplete="name" autoFocus />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password">Slaptažodis</InputLabel>
                                    <Input name="password" type="password" id="password" autoComplete="current-password" />
                                </FormControl>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Prisiminti"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Prisijungti
          </Button>
                            </form>
                        </Paper>
                    </main>
                </div>
            );
        }
}


export default withStyles(styles)(Login);