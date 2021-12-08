window.addEventListener( "load", function () {
    function deleteUser(){
        const sendRequest = new XMLHttpRequest();

        sendRequest.addEventListener( "load", function(event){ 
            window.location.href = "index.html";
            alert("Account deleted.");
        });

        sendRequest.addEventListener( "error", function(event){
            alert( "Deletion unsuccesful! Please try again." );
        });
        sendRequest.open("DELETE","http://localhost:5000/app/delete/user/" + localStorage.getItem("id"));
        sendRequest.send();
        }
        function update(){ //currently updates only email, will change to game variables we want to pass to update

            const sendRequest1 = new XMLHttpRequest();
            const updateInfo = new URLSearchParams();
            const sendRequest = new XMLHttpRequest();
            sendRequest1.open("GET", "http://localhost:5000/app/user/" + localStorage.getItem("id"),false)
            sendRequest1.send();
            var accountArray = JSON.parse(sendRequest1.responseText);
            updateInfo.append("user",document.getElementById("newuser").value);        
            updateInfo.append("pass",document.getElementById("newpass").value);
            updateInfo.append("email",document.getElementById("newemail").value);
            updateInfo.append("points",accountArray["points"]);
            updateInfo.append("active",accountArray["active"]);
            updateInfo.append("passive",accountArray["passive"]);
            updateInfo.append("activeCost",accountArray["activeCost"]);
            updateInfo.append("passiveCost",accountArray["passiveCost"]);
            sendRequest.addEventListener( "load", function(event){
                localStorage.setItem("user",document.getElementById("newuser").value);
                localStorage.setItem("email",document.getElementById("newemail").value);
                localStorage.setItem("pass",document.getElementById("newpass").value);
                alert( "Your account was updated!" );
            });
        
            sendRequest.addEventListener( "error", function(event){
                alert( "Update unsuccesfull. Please try again." );
            });
        
            sendRequest.open( "PATCH", "http://localhost:5000/app/update/user/" + localStorage.getItem("id"));
            sendRequest.send(updateInfo);

        

            
        };
        const deleteButton = document.getElementById("delete");
        const updateForm = document.getElementById("update");

        deleteButton.addEventListener("click",function(event){
            event.preventDefault();

             deleteUser();
        });
        updateForm.addEventListener("submit",function(event){
            event.preventDefault();

            update();
        });
});


