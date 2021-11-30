window.addEventListener( "load", function () {
        function sendData() {
                const sendRequest = new XMLHttpRequest();

                const signupInfo = new URLSearchParams(new FormData( form ));

                sendRequest.addEventListener( "load", function(event){
                    alert( "Your account was created!" );
                });

                sendRequest.addEventListener( "error", function(event){
                    alert( "Submission unsuccesful! Please try again." );
                });

                sendRequest.open( "POST", "http://localhost:5000/app/new/user");

                sendRequest.send(signupInfo);
        }

        function deleteUser(){
                const sendRequest = new XMLHttpRequest();
                var user = document.getElementById("user3").value;
                var pass = CryptoJS.MD5(document.getElementById("pass3").value).toString();
                var email = document.getElementById("email3").value;
                sendRequest.open("GET", "http://localhost:5000/app/users",false)
                
                sendRequest.send();
                console.log(sendRequest.responseText);

                //finds ids of corresponding user to delete
                var id = 0;
                var accountArray = JSON.parse(sendRequest.responseText);
                for (var account of accountArray){
                        console.log(account);
                        if(account['user'] == user && account['pass'] == pass && account['email'] == email) {
                          id = account['id'];
                          break;
                        } else {
                          //if id = -1 we know we have invalid info
                          id = -1;
                        }
                }
                if (id == -1){
                    alert("Invalid user information. Please try again.")
                } else {
                    const sendRequestDeletion = new XMLHttpRequest();
                    
                    sendRequest.addEventListener( "load", function(event){
                        alert( "Your account was deleted!" );
                    });
    
                    sendRequest.addEventListener( "error", function(event){
                        alert( "Deletion unsuccesfull. Please try again." );
                    });

                    sendRequest.open( "DELETE", "http://localhost:5000/app/delete/user/" + id);
                    sendRequest.send();
                }

        }
        function authenticate(){
                const sendRequest = new XMLHttpRequest();

                var user = document.getElementById("user2").value;
                var pass = CryptoJS.MD5(document.getElementById("pass2").value).toString();
                sendRequest.open("GET", "http://localhost:5000/app/users",false)
                
                sendRequest.send();
                console.log(sendRequest.responseText);
                var x = 0;
                var accountArray = JSON.parse(sendRequest.responseText);
                console.log(accountArray);
                for (var account of accountArray){
                        console.log(account);
                        if(account['user'] == user && account['pass'] == pass) {
                          x = 1;
                          break;
                        } else {
                          x = 0;
                        }
                }
                if(x == 1) {
                 window.location.href = "introduction.html";
                } else {
                 alert("Account info is incorrect. Please check your spelling.")
                }
        }

        const form = document.getElementById( "signup" );
        const loginForm = document.getElementById("login");
        const deleteForm = document.getElementById("delete");

        form.addEventListener( "submit", function( event ){
                event.preventDefault();

                sendData();
        } );
        loginForm.addEventListener("submit",function(event){
                event.preventDefault();

                authenticate();
        });
        deleteForm.addEventListener("submit",function(event){
                event.preventDefault();

                deleteUser();
        })
});