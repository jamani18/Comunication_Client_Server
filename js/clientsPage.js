
function sendForm(){
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
}
