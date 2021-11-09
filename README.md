# Comunication Client-Server
Structure with a readable and clean code for comunications between Client (js) and Server (php).

This repository comprises a structure to carry out communication between client and server in a structured, clean and readable way.

To do this, we will divide the communication into 3 zones.

1. The first area corresponds to the client part, where we will use javascript and the mAjax.js repository.
2. The second zone will be a Switch on the server side, which will be in charge of listening to the client's requests and redirecting it to the appropriate method.
3. The third zone corresponds to the method to be executed on the server. Within this, operations will be performed using classes, pdo, etc ...


## Install

**Manual**

For database connections: Download conf/SqlConnector.php file, and include or require conf/SqlConnector on your PHP file:

```php
require_once 'conf/SqlConnector.php';
```

For Client ajax request: Download js/frames/mAjax.js file, and add js/mAjax.min.js on your HTML file:

For more information, see repository: https://github.com/jamani18/mAjax.js

```html
<script src="js/mAjax.min.js"></script>
```


## Requirements

**Server**

Only need a PHP server with version 7 minimum.

## Start up

Open the SqlConnector.php file and modify the values of the connection data to the database so that it connects.

For more information, see SqlConnector repository: https://github.com/jamani18/SqlConnector

## Usage

In this small example, we will register a user. Checking previously with the database if it already exists.

### Client zone.

We will use mAjax.js to establish communication with the server.

````js

//Send user data to server

var user = document.getElementById("username").value;
var password = document.getElementById("password").value;
sendAjaxPost: function (true,newUser,{username:user,password:password}, function(response){
  if(response == 'exist'){
    alert("Error sing up user. The user alredy existed on database");
  }
   if(response == 'error'){
    alert("Wrong data");
  }
  if(response == 'true'){
    alert("User has been created correctly");
  }
}),function(){
  alert("Connection failed");
},5000); 

````

### Server zone.

**Switch and Methods**

We create the file Switch.php, which will contain a switch that will listen for the 'action' parameter that will come in the client's request. According to the value of 'action' we will execute one method or another.

The 'data' parameter will contain the data. They will always come in JSON so we decode them before passing it as a parameter to the searched method.


````php

$data = json_decode($_POST['data'],true);

switch($_REQUEST['action']){
    //exampleAjax.
    case "newClient": newClient($data);break;
  }
````

For greater organization, the methods that are called will be saved in other files. It is advisable to group the methods according to the scope of actions they perform.

In this example, since the method performs actions on users, we create a file called userAjax.php. Here we will save the methods called through ajax that are related to user management.

We must include in the file the PDOs that will be used by means of an include.

````php
//File userAjax.

  require_once('pdo/UserPDO.php');

  //Create the a new user if not exist.
  function newUser($data){
    //Operations
  }
  
````

We must include the userAjax.php file in the Switch.php file so that it can access its methods.

````php
require realpath('ajax/userAjax.php');
````

**User Class and PDO**

For the example, we will create a user if it does not exist. For this we must create the structure of the class and PDO.

_For more information, see the repository reference: https://github.com/jamani18/PHP_PDO

````php
//User.php

class User {
    
    protected $id;
    protected $username;
    protected $password;
    

    function __construct($id, $username,$password) {
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
    }
    

    function getId() {
        return $this->id;
    }
    ....
    
````

````php
//UserPDO.php

...

define('ATTR_USERPDO',"id,username,password");
function convertRowToUserClass($r){
    return new User($r['id'],$r['username'],$r['password']);
}

function readUserByUsername($username){

    $sql = "SELECT ".ATTR_USERPDO." FROM user WHERE username='$username'";
    $return = selectSimple($sql,'convertRowToUserClass');
    
    return $return;  
}


function createUser($user,$idPanel){
    
    $pass = false;
     
    execSql("INSERT INTO user VALUES('','".$user->getUsername()."','".$user->getPassword()."')");
    
    $pass = true;

    return $pass;
}
    ....
    
````

**Ajax Method**

We create the content of the method. In this example, it will search if the user exists, if it does not exist it will create it.

````php

//Create the a new user if not exist.
  function newUser($data){
  
    $return = 'error';
    
    //check if exist neededs parameters
    if(isset($data['username']) && isset($data['password']){
        $return = 'exist';
        $existUser = readUserByUsername($data['username']);
        if(!$existUser){
          createUser(new User('',$data['username'],$data['password']);
          $return = 'true';
        }
    }
    
    echo $return;
    
  }

````

In this way, we will have the basic scheme to carry out communications between the client and the server in a structured way.
