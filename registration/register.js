document.querySelector("#register").addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    var name = document.querySelector("#name").value;
    var credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password
    );
    console.log("script working");
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            user = firebase.auth().currentUser;
            // here you can use either the returned user object or       firebase.auth().currentUser. I will use the returned user object
            if (user) {
                user.updateProfile({
                    displayName: name // some displayName,
                }).then(
                    alert("Succesful, go to login now.") // perform any other operation
                );
            }
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(error);
            alert(errorMessage);
        });
});
