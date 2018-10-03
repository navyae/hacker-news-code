import React, {Component} from 'react';
import './Card.css';
import {faComments} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from "@fortawesome/fontawesome-svg-core/index";
import Comments from "../Comments/Comments";

library.add(faComments);


class Card extends Component {
    state = {
        mainComments: []
    };
    story = this.props.story;
    story_rank = this.props.index + 1;
    show_comments = false;
    story_id = this.story.id;

    /*Element Reference*/
    commentsRef;
    cardRef;

    constructor(props) {
        super(props);
        this.commentsRef = React.createRef();
        this.cardRef = React.createRef();
    }

    /**
     * Purpose: Event handler to handle click event on each story
     * @param event
     */
    postClickHandler = (event) => {
        event.stopPropagation();
        if (!this.show_comments) {
            this.commentsRef.current.style.display = 'flex';
            this.cardRef.current.style.backgroundColor = 'white';
            this.show_comments = true;
        } else {
            this.commentsRef.current.style.display = 'none';
            this.cardRef.current.style.backgroundColor = 'transparent';
            this.show_comments = false;
        }

    }

    componentDidMount() {
        if (this.story.comments) {
            this.setState({
                mainComments: this.nestedComments(this.story)
            });
        }
    }

    /**
     * Purpose: Get Comments for the story
     * @param item
     * @returns {*}
     */
    nestedComments = (item) => {
        let comments_dom = item.comments.map(each_comment => {
            if (each_comment) {
                return <Comments key={each_comment.id} comments={each_comment}></Comments>
            }
        });
        return comments_dom;
    };


    render() {
        return (
            <div className='card' onClick={this.postClickHandler} id={this.story_id} ref={this.cardRef}>
                <div className='post-wrap'>
                    <div className='card-rank'>
                        {this.story_rank}
                    </div>
                    <div className='card-content'>
                        <a href={this.story.url} target='_blank' className='card-title'>{this.story.title}</a>
                        <div className='card-postedby'>
                            Posted by: {this.story.by} {this.story.posted}
                        </div>
                        <div className='card-details'>
                            <div className='card-details-each'>score: {this.story.score}</div>
                            <div className='card-details-each'>
                                <FontAwesomeIcon icon="comments"/> &nbsp;
                                {this.story.descendants} comments
                            </div>
                        </div>
                    </div>
                </div>
                <div className='comment-wrap' id='comment-wrapper' ref={this.commentsRef}>
                    {
                        this.state.mainComments.length > 0 ?
                            this.state.mainComments.map(each_comment => {
                                return each_comment
                            }) : null
                    }
                </div>


            </div>
        )
    }
}

export default Card;