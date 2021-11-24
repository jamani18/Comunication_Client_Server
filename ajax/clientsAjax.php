<?php

//File clientsAjax.

  require_once realpath('pdo/UserPDO.php');

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
