import React from 'react'
import * as contentful from 'contentful'
import Post from './post.js';
import { FormControl, Modal } from 'react-bootstrap'

import './blog.css'

class Blog extends React.Component {
  state = {
    posts: [],
    filteredPosts: [],
    searchTerm: '',
    isLoading: true,
    tags: new Set(),
    searchTags: new Set(),
    searchTagModalIsShowing: false,
    selectedPostNum: null
  }

  client = contentful.createClient({
    space: 'zjf63t3lh4zt',
    accessToken: '6ad21883bedbaf26311bb3b3e3cdacfb0297f94df9f7406ff347dee555254477'
  })

  componentDidMount() {
    this.fetchPosts().then((response) => this.filterPostTypes(response.items));
  }

  fetchPosts = () => this.client.getEntries()

  filterPostTypes = (items) => {
    let blogPosts = items.filter(this.checkIsBlogType);
    this.setPosts(blogPosts);
  }

  checkIsBlogType = (post) => {
    let blogType = "blog";
    if(post.sys.contentType.sys.id === blogType) {
      return true;
    }
    return false;
  }

  setPosts = blogPosts => {
    this.setState({
      posts: blogPosts,
      filteredPosts: blogPosts,
      isLoading: false
    }, () => {
      var newtagSet = new Set(this.state.tags);
      let tagArr = [];
      this.state.posts.forEach((post,i) => {
        tagArr = tagArr.concat(post.fields.tags);
      })
      tagArr.forEach(tag => {
        newtagSet.add(tag);
      })
      this.setState({
        tags: newtagSet
      })
    })
  }

  handleSearchChange = (e) => {
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value
    }, () => {
      let newFilteredPosts = [];
      //check all posts
      newFilteredPosts = this.state.posts.filter(this.postFilterSearchTermAndTag);
      //set filteredPosts
      this.setState({
        filteredPosts: newFilteredPosts
      })

    })
  }

  postContainsSearchTerm = (post) => {
    if(post.fields.title.includes(this.state.searchTerm)) {
      return true;
    }
    else if (post.fields.description.includes(this.state.searchTerm)) {
      return true;
    }
    return false;
  }

  postContainsSearchTags = (post) => {
    return [...this.state.searchTags].every(elem => post.fields.tags.indexOf(elem) > -1);
  }

  postFilterSearchTermAndTag = (post) => {
    return this.postContainsSearchTags(post) && this.postContainsSearchTerm(post);
  }

  addTag = (tag) => {
    var newSearchTagSet = new Set(this.state.searchTags);
    newSearchTagSet = newSearchTagSet.add(tag);
    this.setState({
      searchTags: newSearchTagSet
    },() => {
      let newFilteredPosts = [];
      //check all posts
      newFilteredPosts = this.state.posts.filter(this.postFilterSearchTermAndTag);
      //set filteredPosts
      this.setState({
        filteredPosts: newFilteredPosts
      })
    });
  }

  removeTag = (tag) => {
    var newSearchTagSet = new Set(this.state.searchTags);
    newSearchTagSet.delete(tag);
    this.setState({
      searchTags: newSearchTagSet
    }, () => {
      let newFilteredPosts = [];
      //check all posts
      newFilteredPosts = this.state.posts.filter(this.postFilterSearchTermAndTag);
      //set filteredPosts
      this.setState({
        filteredPosts: newFilteredPosts
      })
    });
  }

  openSearchTagModal = () => {
    this.setState({
      searchTagModalIsShowing: true
    })
  }

  closeSearchTagModal = () => {
    this.setState({
      searchTagModalIsShowing: false
    })
  }

  handleModelTagAdd = (e,tag) => {
    //css
    e.target.style = "border: 1px solid rgb(8, 253, 216);"
    this.addTag(tag);
  }

  getTagList = () => {
    return (
      [...this.state.tags].map((tag,i) =>
      {
        if([...this.state.searchTags].includes(tag)) {
          return (
            <button id='modalTag' style={{border: "1px solid rgb(8, 253, 216)"}} onClick={(e) => this.handleModelTagAdd(e,tag)} key={i}>{tag}</button>
          );
        }
        else {
          return (
            <button id='modalTag' onClick={(e) => this.handleModelTagAdd(e,tag)} key={i}>{tag}</button>
          );
        }
      }
      )
    );
  }

  selectPost = (i) => {
    console.log("Index Selected: " + i);
    this.setState({
      selectedPostNum: i
    })
  }

  render() {
    const SearchBar =
      <form onSubmit={e => { e.preventDefault(); }}>
        <FormControl
          id='searchBar'
          type='text'
          placeholder='Search...'
          onChange={this.handleSearchChange}
          value={this.state.searchTerm}
        />
      </form>;


    let SearchTagList;
    let TagList;

    let searchTagList = [...this.state.searchTags].map((tag,i) =>
      <button id='searchTag' key={i} onClick={() => this.removeTag(tag)}>{tag}<span id='searchTagX'>x</span></button>
    );

    let tagList = this.getTagList();

    SearchTagList =
      <div id='searchTagList'>{searchTagList}<button id='addTagBtn' onClick={this.openSearchTagModal}>Add Search Tag</button></div>

    TagList =
      <div id='modalTagList'>{tagList}</div>

    let visiblePostClassName = ' visiblePost';
    let invisiblePostClassName = ' invisiblePost';

    if(!this.state.isLoading) {
      return (
        <React.Fragment>

          <Modal id='modal' show={this.state.searchTagModalIsShowing} onHide={this.closeSearchTagModal}>
            <Modal.Header id='modalHeader' closeButton>
              <Modal.Title>Search Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body id='modalBody'>
              {TagList}
            </Modal.Body>
            <Modal.Footer id='modalFooter'>
              <button id='modalCloseBtn' onClick={this.closeSearchTagModal}>Close</button>
            </Modal.Footer>
          </Modal>

          {
            this.state.selectedPostNum === null
            &&
            <div id='topBlog'>
              {SearchBar}
              {SearchTagList}
            </div>
          }
          <div id={this.state.selectedPostNum === null ? 'postList' : 'postListSelected'}>
            {this.state.filteredPosts.length > 0 && this.state.filteredPosts.map((obj, i) =>
              {
                return(
                  <React.Fragment key={i}>
                    <div id='singlePost'>
                      <Post
                        index={i}
                        visibility={
                          this.state.selectedPostNum !== null ?
                            this.state.selectedPostNum === i ? ' visiblePost' : ' invisiblePost'
                          :
                          ' visiblePost'
                        }
                        selectedPostNum={this.state.selectedPostNum}
                        date={obj.sys.createdAt}
                        updatedDate={obj.sys.updatedAt}
                        title={obj.fields.title}
                        content={obj.fields.content}
                        image={obj.fields.image}
                        description={obj.fields.description}
                        tags={obj.fields.tags}
                        authors={obj.fields.authors}
                        searchTerm={this.state.searchTerm}
                        addTag={this.addTag}
                        selectPost={this.selectPost}
                      />
                    </div>
                    {i < this.state.filteredPosts.length - 1 && this.state.selectedPostNum === null && <hr id='postBreakLine'/>}

                  </React.Fragment>
                );
              }
            )}
            {this.state.filteredPosts.length === 0 &&
              <h3>Sorry, try refining your search</h3>
            }
          </div>
        </React.Fragment>
      );
    }
    else {
      return (
        <h1>Loading...</h1>
      );
    }
  }
}
export default Blog
