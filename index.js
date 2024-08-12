(function () {

const firebaseConfig = {
    apiKey: "AIzaSyDmD7MJh7n8OGKEMOSR93XEwb6iTAWl8kA",
    authDomain: "arena-de-show-cambui.firebaseapp.com",
    projectId: "arena-de-show-cambui",
    storageBucket: "arena-de-show-cambui.appspot.com",
    messagingSenderId: "593361110749",
    appId: "1:593361110749:web:dc560c69fd096b8aa63d34",
    measurementId: "G-GLSMLPR0J5"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

})(); //Função anonina reforçando a segurança

function recuperarSenha() {
    var email = document.getElementById("email_user").value;
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

function registro() { //Cria o Registro do user (ex: email/Senha)
    var email = document.getElementById("email_user").value;
    var senha = document.getElementById("key_user").value;
    var nome = document.getElementById("nome").value;

    firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(() => {
        CriarUser();
    })
    .catch(error => {
        alert(error.message);
    });
}

function CriarUser() { //Cria dados do user no FB (ex: Nome, User, Pele, Vip)
    const conteudo = {
        nome: document.getElementById("nome").value,
        uid: firebase.auth().currentUser.uid,
        email: firebase.auth().currentUser.email,
        vip: true
    };

    firebase.firestore().collection("users").add(conteudo)
    .then(() => {
        console.log("adicionado com sucesso.");
        window.alert("User Criado")
    })
    .catch((error) => {
        console.error("Erro ao adicionar: ", error);
        alert("Erro ao adicionar documento: " + error.message);
    });
}

function logar() { //Loga na web e manda pra Unity
    var email = window.document.getElementById("email_user").value;
    var senha = window.document.getElementById("key_user").value;

    firebase.auth().signInWithEmailAndPassword(email, senha).then(response => {
        localStorage.setItem("logado", "true");
        enviarDadosParaUnity(email, senha, true);
        window.alert("Logado");
    }).catch(error => {
        window.alert(error.code);
        localStorage.setItem("logado", "false");
        enviarDadosParaUnity(email, senha, false);
    });
}