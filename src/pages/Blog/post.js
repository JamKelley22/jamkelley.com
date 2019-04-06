import React from 'react'
import * as Markdown from 'react-markdown'
import moment from 'moment'
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap'
import './blog.css'
import './post.css'

class Post extends React.Component {
  state = {
      isOpen: false
  }

  openPost = () => {
    this.setState({
      isOpen: true
    })
  }

  togglePost = () => {
    if(this.state.isOpen) {
      this.props.selectPost(null);//toggle close
    }
    else {
      this.props.selectPost(this.props.index);
    }
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  getEmbededContent = () => {
    let embedToken = '%%%';
    let lines = this.props.content.split("\n");
    let md = '';

    let embedMD = [];

    //=========================================
    lines.forEach((line,i) => {
      if(line.substring(0,3) === embedToken) {
        let embedSrc = line.substring(3);
        let tempMD = md;
        md = '';
        embedMD.push(
          <React.Fragment key={i}>
            <Markdown source={tempMD} id='postContent'/>
            <img src={embedSrc} alt= {"Inline Image: " + embedSrc}/>
          </React.Fragment>
        );
      }
      else {
        md += "\n" + line;
      }
    })
    //========================================
    return (
      <React.Fragment>
        {embedMD}
        <Markdown source={md} id='postContent'/>
      </React.Fragment>
    );
  }

  getHighlightedText = (text, higlight) => {
    let escaped = this.escapeRegExp(higlight);
    // Split on higlight term and include term into parts, ignore case
    let regx = new RegExp(`(${escaped})`, 'gi');
    let parts = text.split(regx);
    return <span> { parts.map((part, i) =>
        <span key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
            { part }
        </span>)
    } </span>;
  }

  escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  getAuthors = () => {
    let authorArr = [];
    if(!this.props.authors) {
      return;
    }
    this.props.authors.forEach((author,i) => {
      let split = author.split(" ");
      let initials = split.map(name => name.substring(0,1));
      authorArr.push(
        <div id='author' key={i}>
          {initials.join("")}
        </div>
      );
    })
    return authorArr;
  }

  handleClosePost = () => {
    this.props.selectPost(null);
    this.setState({
      isOpen: false
    })
  }

  render() {
    console.log("Index: " + this.props.index);
    console.log("visibility: " + this.props.visibility);
    /*
    console.log("selectPost: " + this.props.selectPost);
    */
    let embededContent = this.getEmbededContent();
    let searchedTitle = this.props.title;
    let searchedDescription = this.props.description;
    if(this.props.searchTerm.length > 0) {
      searchedTitle = this.getHighlightedText(this.props.title,this.props.searchTerm);
      searchedDescription = this.getHighlightedText(this.props.description,this.props.searchTerm);
    }

    let Tags;

    if(this.props.tags) {
      let tagList = this.props.tags.map((tag,i) =>
        <p id='tag' key={i} onClick={() => this.props.addTag(tag)}>{tag}</p>
      );

      Tags =
        <div id='tags'>{tagList}</div>
    }
    else {
      Tags =
        <div id='tags'></div>
    }

    let PostDate = moment(this.props.date).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'MMM Do YYYY'
    })

    let UpdateDate = moment(this.props.updatedDate).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'MMM Do YYYY'
    })

    let UpdateDateTooltip =
      <Tooltip id="tooltip">
        {"Updated: " + UpdateDate}
      </Tooltip>;

    return (
      <div>
        <div id='post' className={this.props.visibility}>
          <button id='postTitle' onClick={this.togglePost}><h1>{searchedTitle}</h1></button>
          {!this.state.isOpen && this.props.image && <img id='coverImage' alt="Post Cover" src={this.props.image.fields.file.url}/>}
          {!this.state.isOpen && <h4 id='description'>{searchedDescription}</h4>}
          {this.state.isOpen && embededContent}
          <hr id='break'/>
          {Tags}
          <div id='publishDate'>
            <div id='authors'>
              {this.getAuthors()}
            </div>
            {"Posted: " + PostDate}
            {PostDate !== UpdateDate &&
              <OverlayTrigger placement="bottom" overlay={UpdateDateTooltip}>
                <div id='postUpdate'><div id='postUpdateSymbol'/></div>
              </OverlayTrigger>
            }
          </div>
        </div>
        {
          this.props.selectedPostNum === this.props.index &&
          <Button id='closePostBtn' bsStyle='danger' bsSize='xsmall' onClick={this.handleClosePost}>Close Post</Button>
        }
      </div>
    );
  }
}

export default Post;

/*
{"Posted: "}
{PostDate}
{PostDate !== UpdateDate && " | Updated: " }
{PostDate !== UpdateDate && UpdateDate}
*/
