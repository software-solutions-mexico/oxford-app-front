<template>
  <q-page>
    <div class="top-banner">Crea tu cuenta de administrador</div>
    <q-input id="nombre" outlined v-model="nombre" label="Nombre de administrador" type="text" class="field-input"/>
    <div v-if="noName" class="missing-information">Ingresa tu nombre</div>
    <q-input id="correo" outlined v-model="correo" label="Correo electrónico" type="text" class="field-input"/>
    <div v-if="noEmail" class="missing-information">Ingresa tu correo electrónico</div>
    <q-input id="contrasena1" outlined v-model="contrasena1" label="Contraseña" type="password" class="field-input"/>
    <div v-if="noPassword" class="missing-information">Ingresa tu contraseña</div>
    <q-input id="contrasena2" outlined v-model="contrasena2" label="Confirma tu contraseña" type="password" class="field-input"/>
    <div v-if="noPasswordConfirmation" class="missing-information">Ingresa otra vez tu contraseña</div>
    <div v-if="noPasswordMatching" class="missing-information">Las contraseñas no coinciden</div>
    <div v-if="noUserRegistered" class="missing-information">
      <!-- Tu cuenta no se ha podido crear -->
      <!-- <br> -->
      <div v-for="value in errors" v-bind:key="value.id">
        <div v-if="value == 'Family key not found'">Clave de familia no encontrada</div>
        <div v-if="value == 'Email has already been taken'">El email ya se encuentra en uso</div>
        <div v-if="value == 'Email is invalid'">El email es inválido</div>
        <div v-if="value == 'Password is too short (minimum is 6 characters)'">La contraseña es muy corta (Mínimo 6 caracteres)</div>
      </div>
      <!-- <br> -->
    </div>
    <!-- <div id="created-account-sign" class="created-account-sign">La cuenta ha sido creada</div> -->
    <div class="option-container">
      <q-btn :loading="loading1" color="white" text-color="black" no-caps label="Crear cuenta" @click="registerAccount()"/>
    </div>
    <div class="option-container">
      <span @click="home()">Volver al inicio</span>
    </div>
    <div v-if="usuarioRegistrado" class="registered-user-curtain">
      <div class="registered-user-modal">
        <div class="background-container">
          <div class="block-left">El usuario se ha registrado exitosamente</div>
          <!-- <div class="block-right" @click="home()">Ir a inicio de sesión</div> -->
          <!-- <q-btn id="loginButton" color="white" text-color="black" no-caps label="Iniciar Sesión" @click="login()"/> -->
          <q-btn color="primary" no-caps label="Ir a inicio de sesión" @click="home()"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PageIndex',
  data () {
    return {
      loading1: false,
      nombre: '',
      correo: '',
      contrasena1: '',
      contrasena2: '',
      usuarioRegistrado: false,
      noName: false,
      noEmail: false,
      noPassword: false,
      noPasswordConfirmation: false,
      noPasswordMatching: false,
      noUserRegistered: false,
      errors: []
    }
  },
  methods: {
    home () {
      var self = this
      self.$router.push('/')
    },
    registerAccount () {
      this[`loading1`] = true
      var self = this
      /* */
      self.noName = false
      self.noEmail = false
      self.noPassword = false
      self.noPasswordConfirmation = false
      self.noPasswordMatching = false
      self.noUserRegistered = false
      /* */
      if (self.nombre !== '' && self.correo !== '' && self.contrasena1 !== '' && self.contrasena2 !== '' && self.contrasena1 === self.contrasena2) {
        axios.post('https://oxford-app-api.herokuapp.com/v1/users', {
          user: {
            name: self.nombre,
            email: self.correo,
            password: self.contrasena1,
            password_confirmation: self.contrasena2,
            role: 'admin'
          }
        })
          .then(function (response) {
            // console.log(response)
            // console.log(response.data)
            // console.log(response.data.data)
            // console.log(response.data.data.user)
            self.usuarioRegistrado = true
            self[`loading1`] = false
          })
          .catch(function (error) {
            // alert(error)
            // console.log(error)
            self.noUserRegistered = true
            self[`loading1`] = false
            // console.log(error.response.data.errors)
            self.errors = error.response.data.errors
            // console.log(self.errors)
            // console.log(typeof (self.errors))
            // console.log(self.errors.length)
          })
      } else {
        self[`loading1`] = false
        if (self.nombre === '') {
          self.noName = true
        }
        if (self.correo === '') {
          self.noEmail = true
        }
        if (self.contrasena1 === '') {
          self.noPassword = true
        }
        if (self.contrasena2 === '') {
          self.noPasswordConfirmation = true
        }
        if (self.contrasena1 !== self.contrasena2) {
          self.noPasswordMatching = true
        }
      }
    }
  }
}
</script>

<style>
  .field-input{
    padding-top: 10px;
    padding-bottom: 0px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .top-banner{
    color: white;
    background-color: #eb2f3f;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 20px;
    text-align: center;
  }
  .option-container{
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    color: #1e90ff;
  }
  .created-account-sign{
    color: #32CD32;
    width: 100%;
    text-align: center;
    padding-top: 5px;
    /* padding-bottom: 5px; */
    display: block;
  }
  .registered-user-curtain{
    position: fixed;
    top: 0%;
    right: 0%;
    bottom: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: white;
    /* opacity: 0.75; */
  }
  .block-left{
    display: inline-block;
    width: 100%;
    font-size: 12pt;
    padding-bottom: 10px;
  }
  .block-right{
    display: inline-block;
    width: 100%;
    color: #1e90ff;
    font-size: 12pt;
  }
  .registered-user-modal{
    background-color: white;
    text-align: center;
    height: 100%;
    padding-top: 50%;
  }
  .background-container{
    background-color: white;
    height: 100px;
  }
  .missing-information{
    color: red;
    text-align: center;
  }
</style>
