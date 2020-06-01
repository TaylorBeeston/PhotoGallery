# 🤞 Codebase Structure

## 🎨 Front End

+ [src/components](./src/components):
This is where all the React components live.
+ [src/hooks](./src/hooks):
This is where all the React hooks live. If a component contains any complicated logic, it should
likely be extracted into a hook and stored here.
+ [src/assets](./src/assets):
This is where all the front end assets live. If you need to create new Tailwind classes or add
any static images, put them here.

## 🔌 Back End

+ [server/config/](./server/config): 
This is where config is stored on the back end. Server-side constants should be stored here.
+ [server/tools](./server/tools): 
This is where server scripts are stored. If you need to run a script on the server, please put it here.
+ [server/uploads](./server/uploads):
This is where the different backend upload methods are stored. If you want to add a new kind of file
uploading method, add it here.
+ [server/auth](./server/auth):
This is where the authentication logic lives. If you'd like to change the way authentication works,
do that here.
+ [server/photos](./server/photos):
This is where the photos model and controller lives. If you'd like to add any routes or change the
way photos are stored, do it here.
+ [server/users](./server/users):
This is where the useres model and controller lives. If you'd like to add any routes or change the
way users are stored, do it here.
