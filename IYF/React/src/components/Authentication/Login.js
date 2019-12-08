// import React from 'react';
// import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import Paper from '@material-ui/core/Paper';
// import withStyles from '@material-ui/core/styles/withStyles';

// const styles = theme => ({

//     main: {
//         width: 'auto',
//         display: 'block', // Fix IE 11 issue.
//         marginLeft: theme.spacing.unit * 3,
//         marginRight: theme.spacing.unit * 3,
//         [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
//             width: 400,
//             marginLeft: 'auto',
//             marginRight: 'auto',
//         },
//     },
//     paper: {
//         marginTop: theme.spacing.unit * 8,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
//     },
//     avatar: {
//         margin: theme.spacing.unit,
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing.unit,
//     },
//     submit: {
//         marginTop: theme.spacing.unit * 3,
//     },
// });


// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             password: ''
//         }
//     }
//     render() {
//         return (
//             <div>
//                 <MuiThemeProvider>
//                     <div>
//                         <AppBar
//                             title="Login"
//                         />
//                         <TextField
//                             hintText="Enter your Username"
//                             floatingLabelText="Username"
//                             onChange={(event, newValue) => this.setState({ username: newValue })}
//                         />
//                         <br />
//                         <TextField
//                             type="password"
//                             hintText="Enter your Password"
//                             floatingLabelText="Password"
//                             onChange={(event, newValue) => this.setState({ password: newValue })}
//                         />
//                         <br />
//                         <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
//                     </div>
//                 </MuiThemeProvider>
//             </div>
//         );
//     }
// }
// return (
//     <div style={{ backgroundImage: `url(require("/Images/Documents.jpg"))` }}>
//         <main className={classes.main}>
//             <CssBaseline />
//             <Paper className={classes.paper}>
//                 <form className={classes.form} onSubmit={props.getUser}>
//                     <FormControl margin="normal" required fullWidth>
//                         <InputLabel htmlFor="name">Prisijungimo vardas</InputLabel>
//                         <Input id="name" name="name" autoComplete="name" autoFocus 
//                         onChange={(event, newValue) => this.setState({ username: newValue })}/>
//                     </FormControl>
//                     <FormControl margin="normal" required fullWidth>
//                         <InputLabel htmlFor="password">Slaptažodis</InputLabel>
//                         <Input name="password" type="password" id="password" autoComplete="current-password" 
//                             onChange={(event, newValue) => this.setState({ password: newValue })} />
//                     </FormControl>
//                     <FormControlLabel
//                         control={<Checkbox value="remember" color="primary" />}
//                         label="Prisiminti"
//                     />
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         className={classes.submit}
//                         primary={true} style={style} onClick={(event) => this.handleClick(event)}
//                     >
//                         Prisijungti
//           </Button>
//                 </form>
//             </Paper>
//         </main>
//     </div>
// );
// }

// Home.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Home);