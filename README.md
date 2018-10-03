This App displays top 10 stories from Hacker News API

- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)

API used:
    Top stories: https://hacker-news.firebaseio.com/v0/topstories.json
    Each Item: https://hacker-news.firebaseio.com/v0/item/id.json

Files:
  - services:
    - StoryService: Centralized Backend Service that use axios to make http requests. This class is only used in Dataservice
    - StoryData: Centralized Data Service, the only place where backend service is accessed
  - components:
    - Card: Component to load each story
    - Comments: Component to load comments for each story



  - Implemented an observable data service to provide data to multiple parts of the application using rxjs BehaviorSubject
  - Clicking on each story will expand the container to display comments
  - I have used fontawesome CDN for icons
  - Because the comments are already in ranking order, I pulled the first 20 Comments and their replies
  - Responsive design




