import React, {Component} from 'react';
import './App.css';
import Card from './components/Card/Card';
import StoryData from './services/StoryData';
import {combineLatest} from "rxjs";


class App extends Component {
    state = {
        stories: []
    };
    storyData = new StoryData();
    topTenStories;

    componentWillMount() {
        this.storyData.loadRequireData();
    }

    /**
     * Purpose: Fetch top ten Latest stories and associated top 20 comments of each story
     */
    componentDidMount() {
        const latestStories = combineLatest(this.storyData.storyListObservable);
        latestStories.subscribe(data => {
            let current_time = new Date();
            this.topTenStories = data[0];
            let all_stories = this.topTenStories.map(async each_story_id => {
                const response = await this.storyData.getEachStoryData(each_story_id)
                return response;
            })

            Promise.all(all_stories).then(top_stories => {
                let all_story_comments = top_stories.map(async each_entry => {
                    let story = each_entry;
                    if (story.time) {
                        const posted_time = new Date(story.time * 1000);
                        story.posted = this.getTimeDifference(current_time, posted_time);
                    }

                    let comments = each_entry.kids && each_entry.kids.length > 20 ? each_entry.kids.slice(0, 20) : each_entry.kids;
                    if (comments) {
                        let all_comments = comments.map(async each_comment => {
                            let response = await this.getComments(each_comment)
                            return response;
                        });
                        const comments_data = await Promise.all(all_comments);
                        story.comments = comments_data;
                        return story;
                    } else return story;
                })
                Promise.all(all_story_comments).then(result => {
                    if (result.length > 0) {
                        this.setState({
                            stories: result,
                        });
                    }
                })
            }, error => console.error('Failed to fetch top ten stories details', error))

        });
    }

    /**
     * Purpose: Recursively fetch replies for top comments
     * @param id
     * @returns {Promise<any>}
     */
    getComments(id) {
        let current_time = new Date();
        return new Promise((resolve, reject) => {
            this.storyData.getEachCommentData(id)
                .then(response => {
                    if (response !== null) {
                        if (response && response.time) {
                            const posted_time = new Date(response.time * 1000);
                            response.posted = this.getTimeDifference(current_time, posted_time);
                        }
                        let comments = response && response.kids && response.kids.length > 20 ? response.kids.slice(0, 20) : response.kids;
                        if (comments) {
                            let all_comments = comments.map(async each_comment => {
                                let response = await this.getComments(each_comment)
                                return response;
                            });
                            Promise.all(all_comments).then(e => {
                                response.comments = e;
                            })
                        }
                        resolve(response)
                    }

                }, error => console.log(error));

        })
    }

    /**
     * Purpose: To get time difference of posted stories and comments
     *
     * @param current_time
     * @param timestamp
     * @returns {string}
     */
    getTimeDifference(current_time, timestamp) {

        const perMinute = 60 * 1000;
        const perHour = perMinute * 60;
        const perDay = perHour * 24;
        const perMonth = perDay * 30;
        const perYear = perDay * 365;

        const time_difference = current_time - timestamp;

        if (time_difference < perMinute) {
            return Math.round(time_difference / 1000) + ' seconds ago';
        }

        else if (time_difference < perHour) {
            return Math.round(time_difference / perMinute) + ' minutes ago';
        }

        else if (time_difference < perDay) {
            return Math.round(time_difference / perHour) + ' hours ago';
        }

        else if (time_difference < perMonth) {
            return 'approximately ' + Math.round(time_difference / perDay) + ' days ago';
        }

        else if (time_difference < perYear) {
            return 'approximately ' + Math.round(time_difference / perMonth) + ' months ago';
        }

        else {
            return 'approximately ' + Math.round(time_difference / perYear) + ' years ago';
        }
    }

    render() {
        return (
            <div className="trending-stories">
                <div className='header'>
                    <h1> Hacker News Feed </h1>
                </div>
                <div className='trending-stories-title'> Trending Now :</div>
                {
                    this.state.stories.length > 0 ?
                        this.state.stories.map((story, index) => {
                            return <Card key={story.id} story={story} index={index}></Card>
                        })
                        : null
                }
            </div>
        );
    }
}

export default App;