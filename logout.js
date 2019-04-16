document.querySelector("#sign-out").addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    firebase.auth().signOut();
});
