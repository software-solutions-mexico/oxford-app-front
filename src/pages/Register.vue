<template>
  <q-page>
    <div class="top-banner">Crea tu cuenta familiar</div>
    <q-input outlined v-model="nombre" label="Nombre de padre" type="text" class="field-input"/>
    <div v-if="noName" class="missing-information">Ingresa tu nombre</div>
    <q-input outlined v-model="correo" label="Correo electrónico" type="text" class="field-input"/>
    <div v-if="noEmail" class="missing-information">Ingresa tu correo electrónico</div>
    <q-input outlined v-model="contrasena1" label="Contraseña" type="password" class="field-input"/>
    <div v-if="noPassword" class="missing-information">Ingresa tu contraseña</div>
    <q-input outlined v-model="contrasena2" label="Confirma tu contraseña" type="password" class="field-input"/>
    <div v-if="noPasswordConfirmation" class="missing-information">Confirma tu contraseña</div>
    <div v-if="noPasswordMatching" class="missing-information">Las contraseñas no coinciden</div>
    <q-input outlined v-model="claveFamilia" label="Clave de familia" type="text" class="field-input"/>
    <div v-if="noFamilyKey" class="missing-information">Ingresa tu clave de familia</div>
    <div v-if="noRegisteredUser" class="missing-information">
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
      claveFamilia: '',
      /* */
      usuarioRegistrado: false,
      /* */
      noName: false,
      noEmail: false,
      noPassword: false,
      noPasswordConfirmation: false,
      noPasswordMatching: false,
      noFamilyKey: false,
      noRegisteredUser: false,
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
      /**/
      self.noName = false
      self.noEmail = false
      self.noPassword = false
      self.noPasswordConfirmation = false
      self.noPasswordMatching = false
      self.noFamilyKey = false
      self.noRegisteredUser = false
      /**/
      if (self.nombre !== '' && self.correo !== '' && self.contrasena1 !== '' && self.contrasena2 !== '' && self.claveFamilia !== '' && self.contrasena1 === self.contrasena2) {
        console.log('Entré a la creación de la cuenta')
        axios.post('https://oxford-app-api.herokuapp.com/v1/users', {
          user: {
            name: self.nombre,
            email: self.correo,
            password: self.contrasena1,
            password_confirmation: self.contrasena2,
            role: 'parent',
            family_key: self.claveFamilia
          }
        })
          .then(function (response) {
            /*
              Response tiene:
              - data
              - status
              - statusText
              - headers
              - config
              - request
            */
            // console.log(response)
            // console.log(response.data.status)
            // console.log(response.data.message)
            // console.log(response.data.token)
            console.log(response.data)
            console.log(response.data.data)
            // Tiene el email y el id //
            console.log(response.data.data.user)
            // self.$router.push('/')
            self.usuarioRegistrado = true
            self[`loading1`] = false
          })
          .catch(function (error) {
            // alert(error)
            console.log(error)
            self.noRegisteredUser = true
            self[`loading1`] = false
            console.log(error.response.data.errors)
            self.errors = error.response.data.errors
          })
      } else {
        self[`loading1`] = false
        console.log('No entré a la creación de la cuenta')
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
        if (self.claveFamilia === '') {
          self.noFamilyKey = true
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
    /* opacity: 0%; */
    text-align: center;
    height: 100%;
    padding-top: 50%;
  }
  .background-container{
    background-color: white;
    height: 100px;
    /* opacity: 1; */
  }
</style>
