# UCVME - Your Digital Snaposhot

## Introduction
- UCVME is a personality-based CV sharing platform designed to help users create a personalised CV that highlights their unique character traits alongside their professional qualifications using a video.
- Through a guided CV-making process, UCVME allows users to create a digital snapshot of their personality, skills, and experiences.
- The platform also serves as a job marketplace, enabling users to apply for jobs or post job listings, with the added benefit of saving CVs or job posts for later reference and the ability to share one's CV via a QR code.

## The Team
The project was made for the Global Claroom 2024 module for TUD's Computer Science International Course
Our team includes:
- Elitsa Koleva as the Lead Designer and Frontend developer
- Jia Zhang as the Lead Backend Developer
- Lovely Fernandez as the Team Leader
- Mate Mikus as the Frontend developer
- Seah Kim as the Lead Tester

## Features
### CV Builder
- Create a personality-focused CV.
- Incorporate video elements to showcase who you are.
- Select from various personality types to best describe yourself.

### Job Marketplace
- Apply for jobs using your personalized CV. 
- Post job openings with detailed descriptions and images.
- Save job posts and CVs for later viewing.
- Search for jobs using keywords like job name or category.
- Search for CVs using keywords like a person's name

## Future
In the future we would like to implement features such as:
- QR code sharing for CVs
- A personalised algorithm that matches suitable jobs to users and recommends them in their feed.
- A history page where users can see what CVs/Jobs they have recently looked at
- An in-app messaging/application service
- Premium user features such as the ability to make multiple CVs
- and others
  
## Installing

0. **Recommended IDE Setup**
[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

1. **Clone the repository**
```bash
git clone https://github.com/your-repository/ucvme.git](https://github.com/SENZAGlobalClassroom/UCVME.git
```
2. **Database setup**

**Download and install docker**
```bash
https://hub.docker.com
```
**Search postgres and select image to run**
```bash
docker pull postgres
```
**Obtain list of existing Docker Images and should see container listed in repository called postgres**
```bash
docker images
```
**Name new container and specify the ports**
```bash
docker run --name pg2023 –p 54321:5432 –e
```
**Enter username and password**
```bash
POSTGRES_USER=postgres -e POSTGRES_PASSWORD=Sp00ky! -e
```
**Insert the database you want in your container**
```bash
POSTGRES_DB=postgres -d postgres
```
**Download DBeaver**
```bash
https://dbeaver.io/
```
**Connect DBeaver using the username and password previously set**

**Open SQL window, run to create new schema**
```bash
CREATE SCHEMA "BUILDER" AUTHORIZATION "postgres";
```
**Open SQL script and execute sql file**

3. **Project setup**
```bash
cd .\UCVME\app\view
npm install
```
**Compile and Hot-Reload for Development**
```bash
npm run dev
```
**Compile and Minify for Production**
```bash
npm run build
```
**Compile to run on node server**
```bash
cd .\UCVME\app\controller
node server.js
```

## Screenshots
Login Page:
![image](https://github.com/SENZAGlobalClassroom/UCVME/assets/53860330/cb8a4a89-3bb2-44f7-8590-782ad3843e62)

Sign up Page:
![image](https://github.com/SENZAGlobalClassroom/UCVME/assets/53860330/4a5b678a-382d-4a12-a89d-935dc9d22571)

Home Page:
![image](https://github.com/SENZAGlobalClassroom/UCVME/assets/53860330/dc8b68dd-f07b-4f0f-b9ee-a4e210a2de28)

Wallet Page:
![image](https://github.com/SENZAGlobalClassroom/UCVME/assets/53860330/2035fb77-5cd2-41bd-a7d7-7d98756bddf2)

Add Job Post Page:
![image](https://github.com/SENZAGlobalClassroom/UCVME/assets/53860330/ada9dfc5-2aa3-4822-943c-bd754836986c)

Liked Posts Page:
![image](https://github.com/SENZAGlobalClassroom/UCVME/assets/53860330/22679b14-f4bc-400f-b3c9-f67974a340b0)

CV Page:
![image](https://github.com/SENZAGlobalClassroom/UCVME/assets/53860330/175fc345-6cbc-48f7-a604-dfee06e0f25b)
![image](https://github.com/SENZAGlobalClassroom/UCVME/assets/53860330/65f1db1a-b621-49c7-92b5-e6df159c4f89)

Side Menu:

Help Page:
![image](https://github.com/SENZAGlobalClassroom/UCVME/assets/53860330/b22197b5-5f2a-47c0-a5a4-7a937cbfb34a)

Settings Page:
![image](https://github.com/SENZAGlobalClassroom/UCVME/assets/53860330/030c2828-8671-4340-834b-6b97505c8a0c)

