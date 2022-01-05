# paint-app-realtime
:boom: An effortless real-time paint application :boom:

## Vercel + Heroku deployment
https://paint-app-realtime.vercel.app/

> If you face issues with **WebSockets** on the above URL, then please try to refresh the Heroku server here https://fierce-fortress-85118.herokuapp.com/

## Few cool features
 - Real-time drawing interaction with all the connected users :rainbow:
 - NodeJS **cluster mode** with **Redis** and **PM2** integration :customs:
 - Server deployment on Heroku :fire:
 - Frontend deployment on Vercel :fire:
 - Text, Brush, Pen, and Rectangle draw :pencil2: :paintbrush: :abcd: :red_square:
 - Color selection :rainbow:
 - Increase or decrease the brush size :paintbrush:
 - Increase or decrease the text size :abcd:
 - Custom hook to maintain **history** :computer:
 - Both **Undo** and **Redo** feature :arrows_counterclockwise:
 - **Clear canvas** and **Download canvas** image feature :framed_picture:
 
 ## Technologies 
- React <img alt="react" src="https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white" />
- Canvas API <img alt="canvas-api" src="https://img.shields.io/badge/-Canvas%20API-000000?style=flat-square&logo=mdn&logoColor=white" />
- Node <img alt="Nodejs" src="https://img.shields.io/badge/-Nodejs-43853d?style=flat-square&logo=Node.js&logoColor=white" />
- Express <img alt="Express" src="https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white" />
- Socket.io <img alt="Socket.io" src="https://img.shields.io/badge/-Socket.io-010101?style=flat-square&logo=socket.io&logoColor=white" />
- Redis <img alt="Redis" src="https://img.shields.io/badge/-Redis-DC382D?style=flat-square&logo=redis&logoColor=white" />
- PM2 with Cluster mode <img alt="pm2" src="https://img.shields.io/badge/-PM2-222362?style=flat-square&logo=pm2&logoColor=white" />
- Heroku <img alt="Heroku" src="https://img.shields.io/badge/-Heroku-430098?style=flat-square&logo=heroku&logoColor=white" />
- Vercel <img alt="vercel" src="https://img.shields.io/badge/-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" />

## How to run
#### :loudspeaker: Server
- git clone
- npm install
- npm start
#### :loudspeaker: Client
- git clone
- cd client
- npm install
- add .env
```
REACT_APP_NODE_ENV=development
REACT_APP_DEV_SERVER_URL=http://localhost:5000
REACT_APP_PROD_SERVER_URL=https://fierce-fortress-85118.herokuapp.com/
```
- npm start


#### :loudspeaker: For cluster mode 
If you wish to run the server in cluster mode, then please switch to [feature/cluster](https://github.com/iAmmar7/paint-app-realtime/tree/feature/cluster) branch and use ```npm run start:cluster``` command to run the server.
> You should have **Redis** and **PM2** installed on your machine.
