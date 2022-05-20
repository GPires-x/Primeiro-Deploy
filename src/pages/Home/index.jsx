
import { Component } from 'react';
import { Posts } from '../../components/posts/index';
import './Styles.css'
import{loadingPost}from "../../utils/load-post"
import { Button } from '../../components/Button/button';
import { TextInput } from '../../components/Input';



class Home extends Component {
  state = {
    posts: [],
    allPosts:[],
    page:0,
    postPerPage:3,
    searchValue:""
  }
  
  async componentDidMount(){
    await this.loadingPost()
 
  }

  loadingPost = async () => {
    const {page,postPerPage} = this.state
    const photsAndPost = await loadingPost()
    this.setState({
      posts:photsAndPost.slice(page,postPerPage),
      allPosts:photsAndPost})
}
loadMorePost = ( )=>{
const {
  page,
  posts,
  allPosts,
  postPerPage
} = this.state

const nextPage = page + postPerPage
const nextPost = allPosts.slice(nextPage, nextPage + postPerPage)
posts.push(...nextPost)

this.setState({page:nextPage,posts})
}
handleChange = (e) =>{
  const {value} = e.target
  this.setState({searchValue:value})

}

  render() {
    const { posts,page,allPosts,postPerPage,searchValue } = this.state
    const noMorePost = page + postPerPage >= allPosts.length
    const filterenPost = !!searchValue ?
    allPosts.filter(posts =>{
        return posts.title.toLowerCase().includes(
          searchValue.toLowerCase()
        )
    })
    :posts


      return (
       <section className="container">
          <div className=' search-container'>
            {!!searchValue && (
              
                <h1> Search value: {searchValue} </h1> 
                
            )}
                <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
          </div>

            {filterenPost.length >= 0 &&(
                <Posts posts ={filterenPost} />
            )}

           {filterenPost.length === 0 &&(
                <h1>
                  Não existe posts
                </h1>
            )}
      
          <div className='button-container'>
              {!searchValue &&(
                <Button 
                onClick={this.loadMorePost}
                text = {'Click'}
                disable ={noMorePost}
                />
              )}
          </div>
       </section>
     )
  }
}


export default Home;
