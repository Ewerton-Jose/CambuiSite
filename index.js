const firebaseConfig = {
    apiKey: "AIzaSyDmD7MJh7n8OGKEMOSR93XEwb6iTAWl8kA",
    authDomain: "arena-de-show-cambui.firebaseapp.com",
    projectId: "arena-de-show-cambui",
    storageBucket: "arena-de-show-cambui.appspot.com",
    messagingSenderId: "593361110749",
    appId: "1:593361110749:web:dc560c69fd096b8aa63d34",
    measurementId: "G-GLSMLPR0J5"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function recuperarSenha() {
    var email = document.getElementById("email").value;
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        alert("Email Enviado Com Sucesso");
    }).catch(error => {
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    switch (error.code) {
        case 'auth/invalid-email':
            return 'Email inválido.';
        case 'auth/user-not-found':
            return 'Usuário não encontrado.';
        default:
            return 'Ocorreu um erro. Tente novamente.';
    }
}