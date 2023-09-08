# Project Name

Open History

## [See the App!](https://open-history.netlify.app/en/homepage)

![App Logo](your-image-logo-path-or-name)

## Description

Open History is an independent publishing project that offers free access to History courses to its readers.

#### [Client Repo here](https://github.com/elliotfern/open-history-client)

#### [Server Repo here](https://github.com/elliotfern/open-history-server)

## Backlog Functionalities

In the future I would like to include a system so that the user can make lists of lessons, favorites and courses.

## Technologies used

This repository use Javascript, NodeJs and Express.

# Server Structure

## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  fullName: {type: String},
  imageProfile: {type: String}
  role: {type: String, enum ["admin", "user"]},
  lang: {type: String, enum ["en", "es", "ca", "it", "fr"]},
  savedCourses: [{type: String}],
  savedLessons: [{type: String}],
  timestamps: true,
}
```

Comment model

```javascript
 {
   userCreatorId: {type: Schema.Types.ObjectId,ref:'User'},
   articleId: {type: String, required: true},
   comment: {type: String, required: true},
   timestamps {true},
 }
```

Book model

```javascript
 {
   userCreatorId: {type: Schema.Types.ObjectId,ref:'User'},
   bookTitle: {type: String, required: true},
   bookAuthor: {type: String, required: true},
   topic: {type: String, enum ["history", "geography", "biography", "fiction"]},
   imageBook: {type: String, required: true},
   timestamps {true},
 }
```

## API Endpoints (backend routes)

| HTTP Method | URL                     | Request Body                  | Success status | Error Status | Description                                    |
| ----------- | ----------------------- | ----------------------------- | -------------- | ------------ | ---------------------------------------------- |
| POST        | `/auth/signup`          | {name, email, password, lang} | 201            | 400          | Registers the user in the Database             |
| POST        | `/auth/login`           | {username, password}          | 200            | 400          | Validates credentials, creates and sends Token |
| GET         | `/auth/verify`          |                               | 200            | 401          | Verifies the user Token                        |
| GET         | `/profile`              |                               | 200            | 401          | Sends user profile details                     |
| PUT         | `/profile`              |                               | 200            | 400, 401     | Edits the user profile                         |
| PATCH       | `/profile`              |                               | 200            | 400, 401     | Edits the user profile photo                   |
| GET         | `/profile/savedCourses` |                               | 200            | 400, 401     | Show all saved courses of user                 |
| PATCH       | `/profile/savedCourses` |                               | 200            | 400, 401     | Edits the saved courses of user                |
| GET         | `/profile/savedLessons` |                               | 200            | 400, 401     | Show all saved lessons                         |
| PATCH       | `/profile/savedLessons` |                               | 200            | 400, 401     | Edits all saved lessons                        |
| GET         | `/comments/:articleId`  |                               | 200            | 400, 401     | Show all comments by articleID                 |
| POST        | `/comments/:articleId`  |                               | 200            | 400, 401     | Create a new comment                           |
| PUT         | `/comments/:articleId`  |                               | 200            | 400, 401     | Edits a comment                                |
| DELETE      | `/comments/:articleId`  |                               | 200            | 400, 401     | Remove a comment lessons                       |
| GET         | `/book`                 |                               | 200            | 400, 401     | View a list of books                           |
| POST        | `/book`                 |                               | 200            | 400, 401     | Create a new book                              |
| PUT         | `/book`                 |                               | 200            | 400, 401     | Edits a book                                   |
| DELETE      | `/book`                 |                               | 200            | 400, 401     | Remove a book                                  |

## Links

### Collaborator

[Elliot Fernandez](www.elliotfern.com)

### Project

[Repository Link Client](https://github.com/elliotfern/open-history-client)

[Repository Link Server ](https://github.com/elliotfern/open-history-server)

[Deploy Link](www.elliotfern.com)
