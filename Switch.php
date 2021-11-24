<?php
    

    require realpath('ajax/clientsAjax.php');

    $data = json_decode($_POST['data'],true);

    switch($_REQUEST['action']){
        
        //clientsAjax.
        case "newClient": newClient($data);break;
     
    }



            
