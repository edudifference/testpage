Parse.initialize("Hx13dvXcISIEDbus38pp4Dbat8lyHdCJrrqTIvsy", "Ongx6JbW7fqVqPiAHML2NkBNX9Wx3DXqdEYdYoli");
function signup(url) {
	pw = $("#login-password").val().trim();
	email = $("#login-email").val().trim();
	phone = $("#login-phone").val().trim();
	fname = $("#login-fname").val().trim();
	lname = $("#login-lname").val().trim();
  classes = $("#login-classes").val();
	name = fname + " " + lname;
	alert(name);
	var user = new Parse.User();
	user.set("username", email);
	user.set("password", pw);
	user.set("email", email);
	user.set("phone", phone);
	user.set("name", name);
  user.set("url", url);
  user.set("classes", classes);
  user.set("street", $("login-street").val());
  user.set("city", $("login-city").val());
  user.set("state", $("login-state").val());
  user.set("zip", $("login-zip").val());
	user.signUp(null, {
    success: function (user) {
      window.location = "home.html";
    },
    error: function (user, error) {
      // Show the error message somewhere and let the user try again.
  	  alert("Error: " + error.code + " " + error.message);
    }
  });
}

function signin() {
  Parse.User.logIn($("#login-username").val().trim(), $("#login-password").val().trim(), {
		  success: function (user) {
		    alert("Welcome, " + user.get('name'));
      window.location = "home.html";
    },
		  error: function (user, error) {
      alert("Error: " + error.code + " - " + error.message);
  		}
		});
}
var file;

// Set an event listener on the Choose File field.
$('#fileselect').bind("change", function (e) {
  var files = e.target.files || e.dataTransfer.files;
  // Our file var now holds the selected file
  file = files[0];
});

// This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
$('#uploadbutton').click(function () {
  var pw = $("#login-password").val();
  var pwc = $("#login-passwordc").val();
  if (pw == pwc) {
    var serverUrl = 'https://api.parse.com/1/files/' + file.name;
    $.ajax({
      type: "POST",
      beforeSend: function (request) {
        request.setRequestHeader("X-Parse-Application-Id", 'Hx13dvXcISIEDbus38pp4Dbat8lyHdCJrrqTIvsy');
        request.setRequestHeader("X-Parse-REST-API-Key", 'obRFvpZMz6ThjQcW7aLZjp175DtD9wxIbrP8IG1k');
        request.setRequestHeader("Content-Type", file.type);
      },
      url: serverUrl,
      data: file,
      processData: false,
      contentType: false,
      success: function (data) {
        console.log(data.url);
        signup(data.url);
      },
      error: function (data) {
        var obj = jQuery.parseJSON(data);
        alert(obj.error);
      }
    });
  }
  else {
    alert("Sorry, your passwords didn't match");
  }
});

function validate()
{
  var user = Parse.User.current();
	if(!user)
	{
		window.location="index.html";
	}
	else
	{
		userdata();
	}
}

function userdata()
{
  var user = Parse.User.current();
  $(".infodiv").append("<img src=\""+user.get('url')+"\" height=\"200\" width=\"200\" class=\"img img-circle\">");
  $(".infodiv").append("<h1>"+user.get('name')+"</h1>");
  $(".infodiv").append("<h3>"+user.get('rating')+"/5 ("+user.get('numrating')+" ratings)");  
  $(".infodiv").append("<h3>I teach: "+user.get('classes')+"</h4>");
  $(".infodiv").append("");
  console.log(user.get('classes'));
}

function logout()
{
  Parse.User.logOut();
  window.location="home.html";
}