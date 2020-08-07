import React, { Component } from "react";
import {connect} from 'react-redux';
import axios from 'axios';
import {getUser} from '../../Dux/authReducer'
import {getPosts} from '../../Dux/userReducer';
import './profile.css'



class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: this.props.aR.w_user.first_name,
            last_name: this.props.aR.w_user.last_name,
            username: this.props.aR.w_user.username,
            profile_pic: this.props.aR.w_user.profile_pic,
            editView: false,
            userPosts: [],
            url: ''
        }
    }
  
    componentDidUpdate(prevProps, prevState){
            if(prevProps !== this.props.aR.w_user){
               getUser()
            }
    }

    componentDidUpdate(prevProps,prevState){
        if(prevProps.userPosts !== this.state.userPosts){
          this.getUserPosts()
        }
}



   

    handleInput = (val) => {
        this.setState({[val.target.name]: val.target.value  })
    }

   
    handleEditView = () => {
        this.setState({editView: !this.state.editView})
    }
    editProfile = () => {
        const {first_name, last_name, username, profile_pic} = this.state;
        axios.put(`/api/profile/${this.props.aR.w_user.id}`, 
        {first_name, last_name, username, profile_pic})
        .then(res => {
           this.handleEditView();
        })
        .catch(err => console.log(err));
    }

    getUserPosts = () => {
        const {id} = this.props.aR.w_user.id
        
        axios.get(`/api/post/${id}`)
        .then(res => this.setState({userPosts: res.data}))
        .catch(err => console.log(err));
    }

    deletePost = (id) => {
        
        axios.delete(`/api/post/${id}`)
        .then(() => {this.props.getPosts()})
        .catch(err => console.log(err))
    }

        
    



    render(){
        console.log(this.props.aR.w_user)
      
        const mappedPost = this.props.uR.w_user.map((post, i) => {
            console.log(post)
            return <div className='my-mapped-post' key={post.id}>
                <div className='my-post-info'>
                    <div className='my-title'>
                        <p>{post.title}</p>
                    </div>
                    <div className='my-content'>
                        <p>{post.content}</p>
                    </div>
                </div>
                <div className='pic-button'>    
                    <img src={post.image} alt='post' />
                    <button onClick={() => this.deletePost(post.id)}>DELETE</button>
                </div>
            </div>
            })
        
        return (
            
            <section className='profile-container' >
                <div className='my-profile-box'>
                    <div className='my-pic'>
                    <img src={this.props.aR.w_user.profile_pic}
                    alt='default'/>
                    </div>
                    <div className='my-name'>
                        <p>
                            {this.props.aR.w_user.first_name}  {this.props.aR.w_user.last_name}
                        </p>
                     
                    </div>
                    <div className='my-username'>
                        <p>{this.props.aR.w_user.username}</p>
                    </div>
                    
                </div>
            
            
            <section >
                {!this.state.editView
                ? <h2> <button id='edit-button' onClick={this.handleEditView}>EDIT PROFILE</button></h2>
                : (<div className='edit-profile-inputs'>
                   
                    <input
                        name='first_name' 
                        value={this.state.first_name}
                        placeholder='NEW FIRST NAME'
                        onChange={(e) => this.handleInput(e)}/>
               
                    <input
                        name='last_name' 
                        value={this.state.last_name}
                        placeholder='NEW LAST NAME'
                        onChange={(e) => this.handleInput(e)}/>
               
                    <input 
                        name='username'
                        value={this.state.username}
                        placeholder='NEW USERNAME'
                        onChange={(e) => this.handleInput(e)}/>
                    
                    <input
                        name='profile_pic' 
                        value={this.state.profile_pic}
                        placeholder='NEW PROFILE PIC'
                        onChange={(e) => this.handleInput(e)}/>
                    <button id='edit-button' onClick={this.editProfile}>Submit</button>
                    
                </div>)
                }
            </section>
                <section className='my-posts'>
                    <div>
                      <h2>My Posts</h2>
                        {mappedPost}
                    
                    
                    
                    </div>

                </section>

        </section>      
        )
    }
     

}

    const mapStateToProps = (reduxState) => {
    return{
        aR: reduxState.authReducer,
        uR: reduxState.userReducer  
        }
    }


export default connect(mapStateToProps,{getUser, getPosts})(Profile);
                    
                   
                  