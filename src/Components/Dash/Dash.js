import React,  {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../../Dux/userReducer';
import axios from 'axios';
import './dash.css';





class Dash extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            title: '',
            image: '',
            content: '',
            wallpaper: ''
           
        }
    }

    componentDidMount(){
        this.props.getPosts()
        this.setState({
           posts: this.props.w_user

        })
    }
    
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
   
    createPost = () => {
        const {title, image, content} = this.state
        axios.post(`/api/post/${this.props.aR.w_user.id}`, {title, image, content})
        .then(() => {
            
            this.props.getPosts();
            this.setState({image: ''});
        })
        .catch(err => console.log(err));
    }

    
    getUserPosts = () => {
        axios.get(`/api/post/${this.props.w_user.id}`)
        .then(res => this.setState({posts: res.data}))
        .catch(err => console.log(err));
    }

  

    
  
    render(){
        const mappedPost = this.props.uR.w_user.map((post, i) => {
        return <div className='mapped-posts' key={i}>
            <div className='post-info'>
                <div className='title'>
                    <p>{post.title}</p>
                </div>
                <div className='content'>
                    <p>{post.content}</p>
                </div>
            </div>
            <img src={post.image} alt='' />
            
            
        </div>
        })
     
        return(
            <section className='flex-container'>
             
                <div className='profile-box'>
                    <div className='pic'>
                        <img src={this.props.aR.w_user.profile_pic}
                        alt={this.props.aR.w_user.username}/>
                    </div>
                    <div className='name'>
                        <p>
                            {this.props.aR.w_user.first_name}  {this.props.aR.w_user.last_name}
                        </p>
                    </div>
                    <div className='username'>
                        <p>{this.props.aR.w_user.username}</p>
                    </div>
                   
                            
                        
                   
                </div>
               
            <div className='feed-container'>
                <h2>Show What You Got</h2>
                <div className='post-input'>
                <input 
                    value={this.state.title}
                    name='title'
                    placeholder='Add Title'
                    onChange={this.handleInput}/>
                
                <input 
                    value={this.state.image}
                    name='image'
                    placeholder='Add Image URL'
                    onChange={this.handleInput}/>
                
                <input 
                    value={this.state.content}
                    name='content'
                    placeholder='Add Content'
                    onChange={this.handleInput}/>

                <button className='post-btn' onClick={this.createPost}>Post</button>
                </div>
                <div className='post-feed'>
                    {mappedPost}
                </div>
              
            </div>
                
                
                
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

export default connect(mapStateToProps, {getPosts})(Dash);