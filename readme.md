# Project Name

- **Author:** Sandeep Nukala
- **Link to Live Site:** https://proexpressapp.herokuapp.com/

## Getting Started
Use the above live link to visit the website. You'll need to log in as an Admin user to create a user, with your own credentials.
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

Note: User and Resource model are the same, in implementation both have been grouped as one Model which is the User Model

User/Resource Model:
 - username => String
 - password => String
 - role => String
 - resourceManager => String
 - capacity => Number
 - resourceType => String
 - cost => Number
 - projects => Array (ref to Projects Model)

 Project Model:
 - projectName => String
 - startDate => Date
 - endDate => Date
 - notes => String
 - projectManager => String
 - resources => Array (ref to User/Resource Model)

Each user is assigned a role in the application, along with user login credentials. User model has a reference to Project model. The projects array will save all projects that were created with the logged in user. Project model consists of a project name with relevant information regarding project. Also, consists of a resources array that is used to map resources under the Project.

## Wireframes & Project Screenshots

- Landing Screen 
Wireframe 
![Imgur](https://i.imgur.com/LmXnp1n.jpg)  |  

Project Screen
![Imgur](https://i.imgur.com/aChfu3Y.png)

- Projects Screen 
Wireframe            
![Imgur](https://i.imgur.com/LmXnp1n.jpg)  |  

![Imgur](https://i.imgur.com/bmP7xsg.png)

- Resources Screen 
Wireframe           
![Imgur](https://i.imgur.com/83VHAEF.jpg) |  

![Imgur](https://i.imgur.com/bmP7xsg.png)

- Create form Screen 
Wireframe            
![Imgur](https://i.imgur.com/Lt78pgP.jpg)  |  

![Imgur](https://i.imgur.com/H9TNq8T.png)

## Route Map

| Method | Endpoint | Resource/View |
|--------|----------|---------------|
|GET| "/projects" | List all Projects (projects/projects.ejs) |
|GET| "/projects/new | Render form for New Projects (projects/createProject.ejs)|
|DELETE| "/projects/:id" | Delete a particular Project |
|PUT| "/projects/:id" | Uses Form Submission to edit Project |
|POST| "/projects/new" | Uses Form Submission to Create new Project |
|GET| "/projects/:id" | Render form to show Project (projects/showProject.ejs)|
|GET| "/projects/:id/resourceAllocations" | Render resource allocation for Projects |(projects/showAllocations.ejs)
|POST| "/projects/:id/resourceAllocations" | Uses Form Submission to Create new resource for Project |

| Method | Endpoint | Resource/View |
|--------|----------|---------------|
|GET| "/resources" | List all Resources (resources/resources.ejs) |
|GET| "/resources/new | Render form for New Resource (resources/createResource.ejs)|
|DELETE| "/resources/:id" | Delete a particular Resource |
|PUT| "/resources/:id" | Uses Form Submission to edit Resource |
|POST| "/resources/new" | Uses Form Submission to Create new Resource |
|GET| "/resources/:id" | Render form to show Project (resources/showResource.ejs)|
|GET| "/resources/:id/projectAllocations" | Render project allocation for Resources |(resources/showProjects.ejs)
|POST| "/resources/:id/projectAllocations" | Uses Form Submission to Create new project for Resource |


## Challenges

- Understanding ERD and implementing it
- Designs for application
- Project estimation
- Refactoring code

## Existing Bugs

- On Editing a project the start date, end date have by default 1 day added to the actual date