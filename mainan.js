Parse.initialize("x9b8FDh9Li5emZNRlk7UrUKWXq25KptuYLFBl3TZ", "gXStPapkfP3N0Ucx62DFrOZwcVMyLaPIsfrLvRSz");
var user = new Parse.User();
//

// Cek User yang sedang Log-in
function checkLogin(){
  if (Parse.User.current()){
    //console.log("Log in : " + Parse.User.current().get("username"));
    

    $("#current-user").html("User : " + Parse.User.current().get("username"));
  } else {
    $("#current-user").html("Not Log in.");

  }
}
// Fungsi Log-in
$("#masuk").submit(function(event){
event.preventDefault();
  var username = $("#username").val();
  var password = $("#password").val();

  Parse.User.logIn(username, password, {
    success: function(user){
      console.log("Sukses!");
      checkLogin();
      window.location = "internal/index.html";
    }, error: function(user, error){
      alert("Error: " + error.code + " " + error.message);
    }} );
});
// Fungsi Log-Out
$("#logout").click(function(event){
  Parse.User.logOut();
  checkLogin();
});
checkLogin();
    // Fungsi Register User
$("#daftar").submit(function(event)
{event.preventDefault();
var nama = $("#nama").val();
var nim = $("#nim").val();
var username = $("#username").val();
var password = $("#password").val();
var email = $("#email").val();
var phone = $("#phone").val();

user.set("nama", nama);
user.set("nim", nim);
user.set("username", username);
user.set("password", password);
user.set("email", email);
user.set("phone", phone);

var lastID = getLastIDuser();
lastID = lastID + 1;
user.set("id_user", lastID);
user.signUp(null, {
  success: function(user) {
    // Hooray! Let them use the app now.
    window.location = "http://www.google.com/";
    checkLogin();
  },
  error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
}
);
});

function getLastIDuser() {
  var query = new Parse.Query(User);
  query.descending("createdAt");
  query.limit(2);
  query.find({
    success : function(results){
        return results[0].get("id_user");
    }, error: function(error){
        console.log("Error : " + error.message);
    }
  });
}
