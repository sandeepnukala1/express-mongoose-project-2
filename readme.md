# Project Name

- **Author:** Sandeep Nukala
- **Link to Live Site:** https://proexpressapp.herokuapp.com/

## Getting Started
Use the above live link to visit the website. You will need to log in as an Admin user to create a user, with your own credentials.
- Username: admin
- Password: admin

## Project Summary

"PRO" stands for project and resource optimization. "PRO"formance
is an integrated tool for project and resource management. Our goal
is to provide project managers an efficient and dynamic solution for
planning project timelines and resource capacity.

## Technologies Used
- Node JS
- MongoDB
- Express JS
- Bulma CSS
- HTML
- CSS

## ERD

![Imgur](https://i.imgur.com/AMF6FxL.png)

## Models

Sample Model:
 - name => String
 - age => number


## Route Map

| Method | Endpoint | Resource/View |
|--------|----------|---------------|
|GET| "/sample" | List all Samples (sample/index.ejs) |
|GET| "/sample/:id | Display single Sample (sample/show.ejs)|
|GET| "/sample/new | Render form for New Sample (sample/new.ejs)|
|POST| "/sample" | Uses Form Submission to Create new Sample |
|GET| "/sample/:id/edit" | Render form to edit Sample (sample/edit.ejs)|
|PUT| "/sample/:id" | Uses Form Submission to edit Sample |
|DELETE| "/sample/:id" | Delete a particular Sample |


## Challenges


## Existing Bugs