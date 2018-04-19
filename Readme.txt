We will start by following the below steps 

1. Install Nodejs and MOngoDb 

2. After you have installed then enter the following command in the command line
$npm install

3. This command installs all the dependencies and libraries used in the Project.

4. Now open your mongodb shell before doing that run mongodb server 
$mongod
and then run the below command to open the mongo shell
$mongo 
 
 Now create database and collections in your database. 

 >use MyDatabase
 >db.userInfo.insert({"username":"admin","password":"123"});

 this will create the database and a collection named userInfo. 

 >db.staffInfo.insert({"username":"admin","firstname":"Prasanth","lastname":"KOmaragiri","email":"esxxxx@xxx.com","phone":"xxxxxx","department":"xxxxxx"});

 this will setup the required database collections used in our application

 Now run the application using the follwoing command;

 $node index.js


