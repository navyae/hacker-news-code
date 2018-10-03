import React, {Component} from 'react';
import './Comments.css';
import Parser from 'html-react-parser';


class Comments extends Component {
    comments = this.props.comments;
    state = {
        subComments: []
    };


    componentDidMount() {
        this.getSubcomments(this.comments)
    }

    /**
     * Purpose: Recursively call "Comments" react component for reples of each comment
     *
     * @param data
     */
    getSubcomments(data) {
        if (data.kids) {
            if (data.comments) {
                let comments_dom = data.comments.map(each => {
                    return (
                        <div className='comments-each' key={each.id}>
                            <Comments comments={each}></Comments>
                        </div>
                    )
                });
                this.setState({
                    subComments: comments_dom,
                })
            } else {
                setTimeout(() => {
                    this.getSubcomments(data);
                }, 500)
            }
        }
    }

    render() {
        return (
            <div className='card-wrap'>
                {
                    this.comments && !this.comments.deleted ?
                        <div className='comments'>
                            <div className='comments-details'>
                                <div className='comments-details-each'>
                                    By {this.comments.by}
                                </div>
                                <div className='comments-details-each'>
                                    {this.comments.posted}
                                </div>

                            </div>
                            <div className='comments-text'>
                                {Parser(`${this.comments.text }`)}
                            </div>

                        </div> : null
                }


                {
                    this.state.subComments.length > 0 ?
                        this.state.subComments.map(e => e) : null
                }

            </div>
        )
    }

}

export default Comments;