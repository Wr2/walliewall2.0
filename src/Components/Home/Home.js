import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {getUser} from '../../Dux/authReducer';
import MyCarousel from '../../Components/MyCarousel/MyCarousel';

import './home.css';
import Nav from '../Nav/Nav';






class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',

        }
        
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleLogin = () => {
        const {email, password} = this.state;
        axios.post('/auth/login', {email, password})
       
        .then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/Dash');
            
        })
        .catch(err => console.log(err));
    }


    render(){
        return(
        <div>
            <Nav />
            <div className='home-view'>
            
                <div className='l-block'>
                    
                <input 
                    value={this.state.email}
                    name='email'
                    placeholder='EMAIL'
                    onChange={this.handleInput}/>
                <input 
                    type='password'
                    value={this.state.password}
                    name='password'
                    placeholder='PASSWORD'
                    onChange={this.handleInput}/>
                <button onClick={this.handleLogin} >LOGIN</button>
                
            <Link to='/Auth'>
                    <button onClick={this.handleRegister} >SIGN-UP!</button></Link>
                </div>
                    <div className='sneek-peek'>
                    <h1>SNEEK PEEK</h1>
                    <MyCarousel />
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser})(Home);