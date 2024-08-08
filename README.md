# Momentia 

Momentia is a primitive version of the social media websites we see everywhere.The design is heavily inspired by **Instagram's** clean,intuitive user interface and functionality. 
My goal is to develop an qualitatively application that, like **Instagram**, encourages users to connect with one another, share their unique perspectives. I want this to turn into a meaningful project where individuals can both inspire and be inspired, using images as the universal language to express emotions, tell stories, and build good relationships

## ⚙️ Installation   
To successfully run the project, complete the steps below.
1.  **Clone the repository**
```bash
git clone https://github.com/Water-Shadow23/Momentia.git
```
2. **Install Dependancies**
 
   *  **Backend**   
   ```bash 
   cd Server
   npm i
   ```      
   * **Frontend**
   ```bash
   cd Client
   npm i
   ```
3. **Run locally**

   * **Server**   
   ```bash 
   cd Server
   npm start
   ```  
   * **Client**
   ```bash
   cd Client
   npm run dev
   ```
## 📋 Requirements   
Make sure you have the following:

- 🟢 **Node.js**
- 🍃 **MongoDB**
- 🚀 **npm**

## 🔧 Env Configs
In order to run the project successfully you need to check the .env variables in both **Client and Server** and see whether something is different for you and if it is , go on change it 🙃. 

#### * Files to check and modify if its needed
```
Server  
└── src  
    └── config.env
```  
```
Client  
└── src  
    └── configs
        └── config.js
```

## 🤖 Technologies Used
- ⚛️ **React**
- ⚛️🛣️ **React Router for client-side Routing**
- ⚛️🔗📋 **React-hook-form and Zod for form handling and validation**
- 🆔 **Nanoid for generating client-like record ids**
- 🚀 **Express**
- 🍃 **MongoDB as database**
- 🐒🍃 **Mongoose as ODM**
- 🔐🧩 **JWT for authentication**

## 🛠️ Features
- **🔐 User Authentication:** Create and manage user accounts.
- **👤 Profile Managment:** Edit profile by your preference
- **✨ Follow/UnFollow Users**
- **➕ Create post:** Create post with photo and caption to share
- **❤️ Like/Unlike posts:** Hit the like button 🔥
- **🔖⭐️ Save Post:** Add posts to saved posts section in your profile.
- **➕ Create comments:** Add comments to a post you desire
- **❤️ Like/Unlike comments** 

## ⚠️ Warning
The application uses fontawesome for icons so it may not load with my **kit** when you run it.   
If this problem occurs go to:
```
Client
└── index.html
```
And change the following
```html
<script src="https://kit.fontawesome.com/yourKitHere" crossorigin="anonymous"></script>
```
