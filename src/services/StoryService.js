import axios from 'axios';
import {Observable} from "rxjs";

class StoryService{

    getTopTenStories = Observable.create( ( observer ) => {
        const top_stories_url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
        axios.get(top_stories_url)
            .then( ( response ) => {
                observer.next( response.data );
                observer.complete();
            } )
            .catch( ( error ) => {
                observer.error( error );
            } );
    });

    getEachStory(id) {
        const each_story_url = 'https://hacker-news.firebaseio.com/v0/item/'+ id +'.json';
        return Observable.create( ( observer ) => {
            axios.get(each_story_url)
                .then( ( response ) => {
                    observer.next( response.data );
                    observer.complete();
                } )
                .catch( ( error ) => {
                    observer.error( error );
                } );
        });
    }
}

export default StoryService;