import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button, Icon, Badge } from 'antd';
import axios from 'axios';
import AdminSubMenu from './AdminSubMenu';


export class UserVerticalMenu extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          email:this.props.currentUser.email,
          user:{},
          currentUser: ' ',
          documentsReceived:[],
          count:0
        }; 
        
        const user = props.currentUser;

    }

    // static getDerivedStateFromProps(nextProps, prevState){
    //     if(nextProps.count!==prevState.count){
    //       return { count: nextProps.count};
    //    }
    //    else return {count :1};
    //  }

    async updateCount(){
        await this.setState({ count: this.state.count });
        console.log(this.state.count);
    }
    componentWillReceiveProps(){
        this.updateCount()
    }
    componentWillMount = () => { 
          
        axios.get(`http://localhost:8099/api/users/${this.state.email}`)
         .then(result => {
         const user = result.data
         this.setState({user});
         console.log("USERIS", user)
         })
         .catch(function (error) {
           console.log(error);
         });

       axios.get(`http://localhost:8099/api/documents/${this.state.email}/received`)
       .then(result => {
      
       const documentsReceived = result.data;
        this.setState({ 
           documentsReceived,
           isLoading: false,
        })
        this.setState({count:documentsReceived.length})
        const count = documentsReceived.length
        this.setState({
          count:count
        })
       })
       .catch(error => {
         this.setState({
             error: 'Error while fetching data.',
             isLoading: false
         });
       });
     }
  render() {
    return (
      <div>
       <nav className="navigation">
        <ul className="mainmenu">
          <li><Link to={`/vartotojas/${this.props.currentUser.email}`}> <Icon style={{ fontSize: '32px', color: '#4D4E4C' }} theme="outlined" type="idcard" /> </Link></li>
          <li><a href="#">Dokumentai</a>
            <ul className="submenu">
              <li><Link to={`/${this.props.currentUser.email}/dokumentai`}>Siunčiami</Link></li>
              <li>
                <Link to={'/gauti/dokumentai'}>Gauti</Link>
                {/* <Badge count={this.state.count} showZero /> */}
                </li>
            </ul>
          </li>
          <li><Link to={'/naujas-dokumentas'}>Kurti dokumentą</Link></li>  
          <li><Link to={`/${this.props.currentUser.email}/statistika`}>Statistika</Link></li>  
          {this.props.currentUser.admin && 
          <li><a href="#">Vartotojai</a>
          <ul className="submenu">
            <li><Link to='/naujas-vartotojas'>Kurti vartotoją</Link></li>
            <li><Link to='/vartotojai'>Visi vartotojai</Link></li>
          </ul>
          </li>}
          {this.props.currentUser.admin && 
          <li><Link to={'/visos-grupes'}>Vartotojų grupės</Link></li>}
           {this.props.currentUser.admin && 
          <li><Link to={'/visi-tipai'}>Dokumentų tipai</Link></li>}
          {this.props.currentUser.admin && 
          <li><Link to={'/visi-dokumentai'}>Vartotojų dokumentai</Link></li>}
        </ul>
      </nav> 
      </div> 
    )
  }
}

export default UserVerticalMenu
