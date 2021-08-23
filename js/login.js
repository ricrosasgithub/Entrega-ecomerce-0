//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function (e) {});

var email = document.getElementById('email');

var contraseña = document.getElementById('contraseña');

var textoPassword = document.getElementById('requiredPass');

var textoEmail = document.getElementById('requiredEmail');

var boton = document.getElementById('boton');

//Condicional para "validar" el login
boton.addEventListener('click', function () {
  if (email.value == '') {
    textoEmail.style.display = 'block';
  }
  if (contraseña.value == '') {
    textoPassword.style.display = 'block';
  }
  if (email.value !== '' && contraseña.value !== '') {
    localStorage.setItem('Email', email.value);
    localStorage.setItem('Pasword', contraseña.value);
    window.location.href = 'index.html';
  }
});
