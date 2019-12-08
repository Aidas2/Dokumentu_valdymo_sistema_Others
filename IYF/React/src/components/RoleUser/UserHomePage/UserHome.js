import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import LineDocChart from "./LineDocChart";
import { Link } from "react-router-dom";
import Img from "../../../images/Documents.jpg"

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between"
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up("md")]: {
      paddingRight: 0
    }
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3
  },
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  },
  markdown: {
    padding: `${theme.spacing.unit * 3}px 0`
  },
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200]
  },
  sidebarSection: {
    marginTop: theme.spacing.unit * 3
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`
  }
});

const featuredPosts = [
  {
    title: "Dokumentų valdymas",
    description:
      "Valdykite savo dokumentus: įdėkite į sistemą, redaguokite, trinkite. Pateikite norimoms vartotojų grupėms. Tvirtinkite arba atmeskite Jums pateiktus dokumentus."
  },
  {
    title: "Vartotojų valdymas",
    description:
      "Registruokite naujus vartotojus sistemoje. Priskirkite juos grupėms, grupėms suteikite galinybę matyti tam tikrus dokumentus, juos atmesti arba patvirtinti."
  }
];

function UserHome(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <br />
      <div className={classes.layout}>
        <main>
          {/* Main featured post */}
          <Paper className={classes.mainFeaturedPost}>
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                  >
                    Dokumentų valdymo sistema
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    Dokumentų valdymo sistemos tikslas - leisti kurti,
                    pasirašyti ir saugoti organizacijos dokumentus. Sistema
                    leidžia kurti vartotojų grupes, kurios gali teikti ir
                    pasirašyti dokumentus.
                  </Typography>
                  <Grid container spacing={16}>
                    {" "}
                    <Grid item>
                      <Button
                        variant="contained"
                        component={Link}
                        to="/documents"
                        color="default"
                      >
                        Dokumentai
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        component={Link}
                        to="/users"
                        color="default"
                      >
                        Vartotojai
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Paper>
          {/* End main featured post */}
          {/* Sub featured posts */}
          <Grid container spacing={40} className={classes.cardGrid}>
            {featuredPosts.map(post => (
              <Grid item key={post.title} xs={12} md={6}>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography component="h2" variant="h5">
                        {post.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {post.date}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        {post.description}
                      </Typography>
                    </CardContent>
                  </div>
                  <Hidden xsDown>
                    <CardMedia
                      className={classes.cardMedia}
                      image={Img}
                      title="Image title"
                    />
                  </Hidden>
                </Card>
              </Grid>
            ))}
          </Grid>
          <br />
          <LineDocChart />
        </main>
      </div>
    </React.Fragment>
  );
}

UserHome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserHome);

// import React from 'react';

// import { Button, Form } from 'reactstrap';

// const headingP = <h3>Welcome Peasant!</h3>;
// const actionsP = <h5>Choose the action</h5>;
// const style = { margin: '20px', textAlign: 'center' };

// export default class UserHome extends React.Component {

//     render() {
//         return (
//             <Form>
//                 <div style={style}>
//                     {headingP}
//                     {actionsP}
//                     <Link to={"/create-new-document"}>
//                         <Button outline color="success">Sukurti dokumenta</Button>{' '}
//                     </Link>
//                     <Link to={"./Documents/DocumentEdit/DocEdition.js"}>
//                         <Button outline color="primary">Taisyti dokumenta</Button>{' '}
//                     </Link>
//                     <Button outline color="secondary">Trinti dokumenta</Button>{' '}
//                     <Button outline color="info">Perziuret visus dokus</Button>{' '}
//                     <Button outline color="warning">Perziureti konkretu dokumenta</Button>{' '}
//                     <Button outline color="danger">Pateikti dokumenta</Button>
//                 </div>

//         );
//     }
// }
// import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Grid from '@material-ui/core/Grid';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import { withStyles } from '@material-ui/core/styles';
// import { Link } from "react-router-dom";
// import Paper from "@material-ui/core/Paper";

// const styles = theme => ({
//     appBar: {
//         position: 'relative',
//     },
//     icon: {
//         marginRight: theme.spacing.unit * 2,
//     },
//     heroUnit: {
//         backgroundColor: theme.palette.background.paper,
//     },
//     heroContent: {
//         maxWidth: 600,
//         margin: '0 auto',
//         padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
//     },
//     heroButtons: {
//         marginTop: theme.spacing.unit * 4,
//     },
//     layout: {
//         width: 'auto',
//         marginLeft: theme.spacing.unit * 3,
//         marginRight: theme.spacing.unit * 3,
//         [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
//             width: 1100,
//             marginLeft: 'auto',
//             marginRight: 'auto',
//         },
//     },
//     cardGrid: {
//         padding: `${theme.spacing.unit * 8}px 0`,
//     },
//     card: {
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//     },
//     cardMedia: {
//         paddingTop: '56.25%', // 16:9
//     },
//     cardContent: {
//         flexGrow: 1,
//     },
//     footer: {
//         backgroundColor: theme.palette.background.paper,
//         padding: theme.spacing.unit * 6,
//     },

//     layout: {
//         width: 'auto',
//         marginLeft: theme.spacing.unit * 3,
//         marginRight: theme.spacing.unit * 3,
//         [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
//             width: 1100,
//             marginLeft: 'auto',
//             marginRight: 'auto',
//         },
//     },
//     toolbarMain: {
//         borderBottom: `1px solid ${theme.palette.grey[300]}`,
//     },
//     toolbarTitle: {
//         flex: 1,
//     },
// });

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// function Album(props) {
//     const { classes } = props;

//     return (
// <div>
//             <Paper className={classes.mainFeaturedPost}>
//                 <Grid container>
//                     <Grid item md={6}>
//                         <div className={classes.mainFeaturedPostContent}>
//                             <Typography component="h1" variant="h3" color="inherit" gutterBottom>
//                                 Title of a longer featured blog post
//                   </Typography>
//                             <Typography variant="h5" color="inherit" paragraph>
//                                 Multiple lines of text that form the lede, informing new readers quickly and
//                                 efficiently about what&apos;s most interesting in this post&apos;s contents…
//                   </Typography>
//                         </div>
//                     </Grid>
//                 </Grid>
//             </Paper>
//             <CssBaseline />
//             <main>
//                 {/* Hero unit */}
//                 <div className={classes.heroUnit}>
//                     <div className={classes.heroContent}>
//                         <Typography component="h3" variant="h2" align="center" color="textPrimary" gutterBottom>
//                             Dokumentų valdymo sistema
//             </Typography>
//                         <Typography variant="h6" align="center" color="textSecondary" paragraph>
// Sveiki atvykę
//             </Typography>
//                         <div className={classes.heroButtons}>
//                             <Grid container spacing={16} justify="center">
//                                 <Grid item>
//                                     <Button variant="contained" component={Link}
//                                         to="/documents" color="primary">
//                                         Dokumentai
//                   </Button>
//                                 </Grid>
//                                 <Grid item>
//                                     <Button variant="outlined" color="primary">
//                                         Sukurti naują
//                   </Button>
//                                 </Grid>
//                             </Grid>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }

// Album.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Album);
