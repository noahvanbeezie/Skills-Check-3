import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux';

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state ={
            posts: [1,2],
            search: '',
            userposts: false,
            isEditing: false,
            editTitle: '',
            editImage:'',
            editContent:''
            
        }
    }
    componentDidMount(){
        this.getPosts()
        // console.log(this.posts)
    }
    getPosts = () =>{
        axios.get(`/api/posts/`).then(res =>{
            // console.log(res)
            this.setState({posts:res.data})
        })
    }

    deletePost = (postId) => {
        axios.delete(`/api/posts/${postId}`).then(res =>{
            this.getPosts()
        })
    }

    getMyPosts = () => {
        // console.log(this.props)
        axios.get(`/api/myposts/`).then(res =>{
            this.setState({posts:res.data})
        })
    }

    handleSearchChange = event => {
        this.setState({search: event.target.value})
    }
    handleEditTitle = event => {
        this.setState({editTitle: event.target.value})
    }
    handleEditImage = event => {
        this.setState({editImage: event.target.value})
    }
    handleEditContent = event => {
        this.setState({editContent: event.target.value})
    }

    handleIsEditing = () => {
        this.setState({isEditing: true})
    }

    handleCancelEditing = () => {
        this.setState({isEditing: false, editTitle:'', editImage:'',editContent:''})
    }

    handleConfirmChanges = () => {
        axios.put('/api/posts', {title:this.state.editTitle,image:this.state.editImage,content:this.state.editContent,id:46}).then(this.handleCancelEditing()).catch(err => console.log(err))
    }

    

    render(){
        console.log(this.state.posts)
        // console.log(this.state.editTitle)
        return(
            <div>
                <div className='dashboard'>
                Dashboard
                <input placeholder='Search Posts'></input>
                <button onClick={this.searchPosts}>Search</button>
                <button>Clear</button>
                <div className='posts'>My Posts:
                <input type='checkbox' onClick={(e) => {
                    if(e.target.checked === true){
                    this.getMyPosts()
                }else{
                    this.getPosts()
                }
                    }}></input></div>
                    <div className='post-holder'>
                {this.state.posts.map(post =>{
                    // console.log(post)
                    return <div className='post'>
                        <h1 className='postid'>{post.id}</h1>
                        <h1 className='posttitle'>{post.title}</h1>
                        <h1 className='postimage'>{post.img}</h1>
                        <h1 className='postcontent'>{post.content}</h1>
                        {post.id === this.props.id ? 
                        <div className='postbuttons'>
                            <button onClick={() => this.handleIsEditing()}>Edit</button>
                            {this.state.isEditing === true ?
                            <div>
                                <div>
                                    <input onChange={this.handleEditTitle}></input>
                                    <input onChange={this.handleEditImage}></input>
                                    <input onChange={this.handleEditContent}></input>
                                </div>
                            <button onClick={this.handleConfirmChanges}>Confirm Changes</button>
                            <button onClick={() => this.handleCancelEditing()}>Cancel Changes</button>
                            </div>
                            :
                            null
                            }
                            <button onClick={() => this.deletePost(post.post_id)}>Delete</button>
                        </div>
                        
                        :
                        null
                        }
                    </div>
                })}
                </div>
        
                </div>
            </div>
        )
    }
}
const mapStateToProps = reduxState =>{
    const {id} = reduxState
    return{
        id
    }
}


export default connect(mapStateToProps)(Dashboard);