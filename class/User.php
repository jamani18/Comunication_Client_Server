<?php

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

    function getUsername() {
        return $this->username;
    }


    function setId($id) {
        $this->id = $id;
    }


    function setUsername($username) {
        $this->username = $username;
    }


    function getPassword() {
        return $this->password;
    }


    function setPassword($password) {
        $this->password = $password;
    }

}
