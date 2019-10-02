<template>
  <q-page>
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->
    <!-- <div class="top-nav-bar">Oxford School of English</div> -->
    <div v-if="$q.platform.is.ios">
      <div class="top-nav-bar-ios">O S E</div>
    </div>
    <div v-else>
      <div class="top-nav-bar">O S E</div>
    </div>
    <!-- <div class="space-for-top-nav-bar"></div> -->
    <div class="input-field-username">
      <!-- <q-input outlined v-model="username" label="Correo electrónico" class="field-input"/> -->
      <q-input outlined v-model="username" placeholder="Correo electrónico" class="field-input"/>
      <div class="missing-information" v-if="noEmail">Ingresa tu correo</div>
    </div>
    <div class="input-field-password">
      <!-- <q-input outlined v-model="password" label="Contraseña" type="password" class="field-input"/> -->
      <q-input outlined v-model="password" placeholder="Contraseña" type="password" class="field-input"/>
      <div class="missing-information" v-if="noPassword">Ingresa tu contraseña</div>
    </div>
    <div class="input-field-family-key">
      <!-- <q-input outlined v-model="familyKey" label="Clave de familia" class="field-input"/> -->
      <!-- <q-input outlined v-model="familyKey" placeholder="Clave de familia" class="field-input"/> -->
      <!-- <q-input outlined v-model="familyKey" placeholder="Clave de familia" class="field-input" :rules="[ val => val.length <= 4 || 'Favor de usar máximo 4 caracteres']"/> -->
      <q-input outlined v-model="familyKey" placeholder="Clave de familia" class="field-input" :rules="[ val => val.length <= 4 || 'Favor de usar máximo 4 caracteres']"/>
      <div class="missing-information" v-if="noFamilyKey"><br>Ingresa tu clave de familia</div>
      <br>
    </div>
    <!-- <div class="incorrect-login" v-if="incorrectLogin">Correo y/o contraseña incorrectos</div> -->
    <div class="incorrect-login" v-if="incorrectLogin">
      <div v-if="error == 'Email not valid'">El correo no es válido</div>
      <div v-if="error == 'Password not valid'">La contraseña no es válida</div>
      <div v-if="error == 'Family key not found'">La clave de familia no fue encontrada</div>
    </div>
    <div class="found-errors">
    </div>
    <div class="login-button-container">
      <div v-if="realButtton">
        <q-btn :loading="loading1" id="loginButton" color="white" text-color="black" no-caps label="Iniciar Sesión" @click="login()" class="size-for-button"/>
      </div>
      <div v-if="fakeButtton">
        <q-btn disabled color="white" text-color="black" no-caps label="Iniciando sesión ..." class="size-for-button"/>
      </div>
      <div class="forgotten-password-link"><span @click="forgotPassword()">¿Olvidaste tu Contraseña?</span></div>
    </div>
    <!-- <br> -->
    <!--
    <div class="message-sign">Crea tu cuenta para:</div>
    <div class="bottom-nav-bar">
      <div @click="register()" class="left-button unselectable">Padres</div>
      <div @click="registerAdmin()" class="right-button unselectable">Administrador</div>
    </div>
    -->
    <div v-if="showForgotPasswordModal" class="forgot-password-modal">
      <div class="forget-password-title-sign">Recupera tu Contraseña</div>
      <div class="password-information">Ingresa tu correo electrónico para enviar los pasos para generar una nueva contraseña</div>
      <q-input outlined v-model="emailToRecoverPassword" label="Correo electrónico" class="field-input"/>
      <div class="forget-password-button-container">
        <q-btn color="white" text-color="red" no-caps label="Función no disponible por el momento" />
      </div>
      <div class="close-button-container">
        <span @click="closeForgotPasswordModal()">Cerrar</span>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import axios from 'axios'
// import { LocalStorage } from 'quasar'
export default {
  name: 'PageIndex',
  data () {
    return {
      loading1: false,
      username: '',
      password: '',
      familyKey: '',
      showForgotPasswordModal: false,
      emailToRecoverPassword: '',
      incorrectLogin: false,
      noEmail: false,
      noPassword: false,
      noFamilyKey: false,
      realButtton: true,
      fakeButtton: false,
      error: ''
    }
  },
  methods: {
    forgotPassword () {
      var self = this
      self.showForgotPasswordModal = true
      // console.log(self.showForgotPasswordModal)
    },
    closeForgotPasswordModal () {
      var self = this
      self.showForgotPasswordModal = false
    },
    login () {
      this[`loading1`] = true
      var self = this
      /* */
      self.incorrectLogin = false
      self.noEmail = false
      self.noPassword = false
      self.noFamilyKey = false
      // self.realButtton = false
      // self.fakeButtton = true
      /* */
      /* */
      // if (self.username !== '' && self.password !== '' && self.familyKey !== '') {
      if (self.username !== '' && self.password !== '') {
        axios.post('https://oxford-app-api.herokuapp.com/v1/sessions', {
          headers: { 'Content-Type': 'application/json' },
          email: self.username,
          password: self.password,
          family_key: self.familyKey
        })
          .then(function (response) {
            self[`loading1`] = false
            // console.log(response)
            if (response.data.data.token !== undefined && response.data.data.user.id !== undefined) {
              // console.log('Pasa a /home')
              window.localStorage.setItem('token', response.data.data.token)
              window.localStorage.setItem('id', response.data.data.user.id)
              window.localStorage.setItem('email', response.data.data.user.email)
              self.$router.push('/home')
            } else {
              // console.log('No pasa a /home')
            }
          })
          .catch(function (error) {
            self[`loading1`] = false
            // console.log(error)
            self.incorrectLogin = true
            // console.log(error.response.data.errors)
            // self.error = error.response.data.errors
            self.error = error.response.data.errors
            /*
              Email not valid
              Password not valid
              Family key not found
             */
          })
      } else {
        self[`loading1`] = false
        if (self.username === '') {
          self.noEmail = true
        }
        if (self.password === '') {
          self.noPassword = true
        }
        if (self.familyKey === '') {
          self.noFamilyKey = true
        }
      }
      // self.realButtton = true
      // self.fakeButtton = false
    },
    register () {
      var self = this
      self.$router.push('/register')
    },
    registerAdmin () {
      var self = this
      self.$router.push('/registerAdmin')
    }
  }
}
</script>
<style>
  .top-nav-bar{
    background-color: #eb2f3f;
    padding-bottom: 20px;
    /* background-color: blue;
    padding-bottom: 0px; */
    color: white;
    width: 100%;
    text-align: center;
    padding-top: 20px;
    font-size: 20px;
    /* position: fixed;
    top: 0%; */
  }
  .top-nav-bar-ios{
    background-color: #eb2f3f;
    color: white;
    width: 100%;
    text-align: center;
    padding-top: 35px;
    padding-bottom: 10px;
    font-size: 20px;
    /* position: fixed;
    top: 0%; */
  }
  .input-field-username{
  }
  .input-field-password{
  }
  .field-input{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 25px;
    padding-right: 25px;
  }
  .login-button-container{
    margin: auto;
    padding-top: 10px;
    text-align: center;
  }
  .space-for-top-nav-bar{
    margin-top: 70px;
  }
  .bottom-nav-bar{
    position: fixed;
    bottom: 0;
    height: 50px;
    border-top: 1px solid #D3D3D3;
    width: 100%;
    text-align: center;
    padding-top: 10px;
    color: #1e90ff;
    background-color: #f2f2f2;
    font-size: 12pt;
  }
  .unselectable{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .left-button{
    text-align: left;
    display: inline-block;
    /* background-color: blue; */
    width: 50%;
    padding-left: 20%;
  }
  .right-button{
    text-align: right;
    display: inline-block;
    /* background-color: red; */
    width: 50%;
    padding-right: 15%;
  }
  .message-sign{
    position: fixed;
    bottom: 50px;
    color: #1e90ff;
    text-align: center;
    width: 100%;
    padding-bottom: 10px;
    font-size: 12pt;
  }
  .forgotten-password-link{
    color: #1e90ff;
    padding-top: 10px;
    font-size: 15pt;
  }
  .forgot-password-modal{
    background-color: white;
    position: fixed;
    top: 0%;
    right: 0%;
    bottom: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  .forget-password-title-sign{
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: center;
    font-size: 14pt;
    font-weight: bold;
  }
  .password-information{
    text-align: center;
  }
  .close-button-container{
    text-align: center;
    color: #1e90ff;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .forget-password-button-container{
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
  }
  .incorrect-login{
    text-align: center;
    color: red;
  }
  .missing-information{
    color: red;
    text-align: center;
  }
  .size-for-button{
    height: 48px;
  }
</style>
