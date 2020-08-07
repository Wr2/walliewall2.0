import React,  {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser, clearUser} from '../../Dux/authReducer';
import axios from 'axios';
import Logo from '../Nav/wallieWall_logo.png';
import './nav.css';


class Nav extends Component {
    constructor(props){
        super(props);
            this.state = {
                w_user: [],
                dropdownView: false

            }
        }

        toggleDropdown = () => {
            this.setState({dropdownView: !this.state.dropdownView})
          }

        componentDidMount(){
            this.logMeIn()
        }
        
        logMeIn = () => (
            axios.get('/auth/me')
            .then(res => {
                this.props.getUser(res.data);
            })
            .catch(err => console.log(err, 'Timed Out'))
        )
        handleLogout = () => {
            axios.get('/auth/logout')
            .then (() => {
            
            this.props.clearUser()
            this.props.history.push('/')
            })
            .catch(err => console.log(err, 'You up and Logged Out'))
            }

render(){
    console.log(this.props)
        return (
            <div className='Nav'>
                
                <nav className='desktop-menu'>
                    <ul>
                       <li>
                       {this.props.aR.w_user.id ?<Link to='/'
                             onClick={this.handleLogout} >Logout</Link> : null}
                        </li>
                        <li>
                            <Link to='/Contact'>Contact</Link>
                        </li>
                        
                        <li>
                        {this.props.aR.w_user.id ? <Link to='/Search'>Search</Link>  : null}
                        </li>
                        <li>
                        {this.props.aR.w_user.id ? <Link to='/profile'>Profile</Link> : null}
                        </li>
                        <li>
                        {this.props.aR.w_user.id ? <Link to='/Dash'>Dash</Link> : <Link to='/'>Home</Link>}
                        </li>
                        <div className='logo'>
                            <img src={Logo} alt="Logo" />
                        </div>
                    </ul>
                </nav>
                <div className='dropdown' onClick={this.toggleDropdown}>///</div>
          {this.state.dropdownView
            ? (
              <nav className='mobile-menu'>
                 <ul>
                       <li>
                       {this.props.aR.w_user.id ?<Link to='/'
                             onClick={this.handleLogout} >Logout</Link> : null}
                        </li>
                        <li>
                            <Link to='/Contact'>Contact</Link>
                        </li>
                        
                        <li>
                        {this.props.aR.w_user.id ? <Link to='/Search'>Search</Link>  : null}
                        </li>
                        <li>
                        {this.props.aR.w_user.id ? <Link to='/profile'>Profile</Link> : null}
                        </li>
                        <li>
                        {this.props.aR.w_user.id ? <Link to='/Dash'>Dash</Link> : <Link to='/'>Home</Link>}
                        </li>
                        <div className='logo'>
                            <img src={Logo} alt="Logo" />
                        </div>
                    </ul>
              </nav>
            )
            : null}
            </div> 
        ) 
    }
}


const mapStateToProps = (reduxState) => {
    return{
        aR: reduxState.authReducer,
        uR: reduxState.userReducer  
    }
}
    
export default connect(mapStateToProps, {getUser, clearUser})(Nav);