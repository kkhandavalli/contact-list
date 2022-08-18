Thank you for downloading this application.

Steps to run the app:
1. Open terminal/command prompt and navigate to the project folder.
2. Run 'npm i' on the root folder.
2. Once all dependencies are installed Run 'npm start', to start the server and load the application in browser. 
3. If browser doesn't open the application automatically due to the browser settings, please open any browser and paste 'localhost:3000' in the address bar.


Features:
1. By Default It loads Home page with all the contacts that were mocked in sample.json.
2. Clicking on any contact tile will expand the contact and open a modal to show more details of the contact person.
3. When we click Add Contact button, it will navigate to a create page with empyy fields that allow user to add details and create. It will then update the contact list and get saved to localStorage.
3. Clicking on any vertical ellipsis will open a drop down with Edit and Delete options.
4. If we click on Edit link, it will navigate to edit page with prefilled contact details and allow user to edit the details and save.
5. If we click on Delete link, it will open a modal asking to confirm if the operation is intended or not. If we click on OK then it will delete the contact from the contact list and update the localStorage with updated contacts.
6. We can search the contacts by entering text in the seach box, search will happen on all the contact details like name, phone, email, company etc. 


PS:
1. If need to reset data back to normal after create or delete operations, simply clicking on "Visa" icon will reset the data back to initial state. 
2. Since there is no api connectivity in this project, I made use of localStorage with name "contactList" to perform all CRUD operations.

Dependencies:
1. React
2. Bootstrap
3. font-awesome



