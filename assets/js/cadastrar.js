// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwBSp_pbTXvfX6tH_s-W4u9OjIGMH7DKk",
  authDomain: "login01-c2aca.firebaseapp.com",
  databaseURL: "https://login01-c2aca-default-rtdb.firebaseio.com",
  projectId: "login01-c2aca",
  storageBucket: "login01-c2aca.appspot.com",
  messagingSenderId: "826326218479",
  appId: "1:826326218479:web:98a9f57b6852488164cd1a",
  measurementId: "G-R5L4VTRHN9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
// Obtenha uma referência para o banco de dados
const database = firebase.database();

// Adicione um listener para o formulário de cadastro
$("#formulario-cadastro").submit(function(event) {
  event.preventDefault();

  // Obtenha os valores dos campos do formulário
  const email = $("#email-cadastro").val();
  const senha = $("#senha-cadastro").val();
  const nome = $("#nome-cadastro").val();

  // Crie um novo usuário com o email e senha informados
  firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      // Adicione o nome do usuário ao banco de dados
      const userId = userCredential.user.uid;
      database.ref('users/' + userId).set({
        nome: nome,
        email: email
      })
      .then(() => {
        // Redirecione o usuário para a página de login
        window.location.href = "home.html";
      })
      .catch((error) => {
        // Exiba uma mensagem de erro
        alert("Erro ao salvar dados do usuário: " + error.message);
      });
    })
    .catch((error) => {
      // Exiba uma mensagem de erro
      alert("Erro ao criar usuário: " + error.message);
    });
});

// Adicione um listener para o formulário de login
$("#formulario-login").submit(function(event) {
  event.preventDefault();

  // Obtenha os valores dos campos do formulário
  const email = $("#email-login").val();
  const senha = $("#senha-login").val();

  // Autentique o usuário com o email e senha informados
  firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(() => {
      // Redirecione o usuário para a página principal
      window.location.href = "pagina_principal.html";
    })
    .catch((error) => {
      // Exiba uma mensagem de erro
      alert("Erro ao fazer login: " + error.message);
    });
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Usuário autenticado
  } else {
    // Usuário não autenticado
  }
});
