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
        console.log(this.props, id)
        axios.get(`/api/post/${id}`)
        .then(res => this.setState({userPosts: res.data}))
        .catch(err => console.log(err));
    }

    deletePost = (id) => {
        console.log(id)
        axios.delete(`/api/post/${id}`)
        .then(() => {this.props.getPosts()})
        .catch(err => console.log(err))
    }

        
    



    render(){
        console.log(this.props.aR.w_user)
      
        const mappedPost = this.props.uR.w_user.map((post, i) => {
            console.log(post)
            return <div className='list' key={post.id}>
                <p>{post.title}</p>
                <img src={post.image} alt='post' />
                <p>{post.content}</p>
                <button onClick={() => this.deletePost(post.id)}>DELETE</button>
            </div>
            })
        
        return (
            <section className='profile-container' >
                <div className='profile-box'>
                    <div className='pic'>
                    <img src={this.props.aR.w_user.profile_pic}
                    alt='default'/>
                    </div>
                    <div className='bio'>
                        Subway tile crucifix sustainable man braid fanny pack fashion axe whatever bitters kitsch yr kombucha af messenger bag.Lomo selvage single-origin coffee try-hard beard subway tile jianbing crucifix thundercats vape. Lomo plaid humblebrag mumblecore, offal quinoa fixie taxidermy. Gochujang 3 wolf moon heirloom glossier, squid iceland poke yr slow-carb gluten-free hashtag bicycle rights. Humblebrag sriracha af yuccie, kombucha squid hella selvage
                    </div>
                </div>
            
            
            <section className='edit-inputs'>
                {!this.state.editView
                ? <h2>{this.props.aR.w_user.username} <button id='edit-button' onClick={this.handleEditView}>EDIT PROFILE</button></h2>
                : (<div>
                   
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
                    <button onClick={this.deletePost}>DELETE</button>
                    
                    
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
                    
                   
                  