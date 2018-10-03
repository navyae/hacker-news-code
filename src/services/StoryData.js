import {BehaviorSubject} from "rxjs";
import StoryService from "./StoryService";

class StoryData extends StoryService{
    storyList = new BehaviorSubject([]);
    storyListObservable = this.storyList.asObservable();

    loadRequireData() {
        this.getTopTenStoriesData();
    }

    getTopTenStoriesData() {
        this.getTopTenStories.subscribe( data => {
            this.storyList.next(data.slice(0, 10));
        }, error => {
            this.storyList.error(error);
        })
    }

    getEachStoryData(id) {
        return new Promise((resolve, reject) => {
            this.getEachStory(id).subscribe( response => {
                resolve(response);
            }, error => {
                reject(error);
            });
        });
    }

    getEachCommentData(id) {
        return new Promise((resolve, reject) => {
            this.getEachStory(id).subscribe( response => {
                resolve(response);
            }, error => {
                reject(error);
            });
        });
    }
}

export default StoryData;