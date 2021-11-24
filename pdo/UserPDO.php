<?php

require_once realpath('conf/SqlConnector.php');
spl_autoload_register(function(){
  require_once realpath('class/User.php');
});



define('ATTR_USERPDO',"id,username,password");
function convertRowToUserClass($r){
    return new User($r['id'],$r['username'],$r['password']);
}

function readUserById($id){
    $sql = "SELECT ".ATTR_USERPDO." FROM user WHERE id='$id'";
    $return = selectSimple($sql,'convertRowToUserClass');
    
    return $return;
}



function readUserByUsername($username){

    $sql = "SELECT ".ATTR_USERPDO." FROM user WHERE username='$username'";
    $return = selectSimple($sql,'convertRowToUserClass');
    
    return $return;  
}



function createUser($user){
    
    $pass = false;
     
    execSql("INSERT INTO user VALUES('','".$user->getUsername()."','".$user->getPassword()."')");
    
    $pass = true;

    return $pass;
}


function updateUser($user){

    execSql("UPDATE user SET username='".$user->getUsername()."', password='".$user->getPassword()."' WHERE id='".$user->getId()."'");
    $pass = true;

    return $pass;
}



//Best practice: update a field with status: active/no active. Not remove the row directly.
function removeUser($idUser){
    
    $pass = false;
    execSql("DELETE FROM user WHERE id='$idUser'")
    //execSql("UPDATE user WHERE id='$idUser'")
    $pass = true; 
     
    
    return $pass;
}
