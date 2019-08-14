<template>
  <q-page>
    <q-header>
      <q-toolbar class="home-toolbar">
        <q-btn
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          class="toolbar-button"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title class="toolbar-title">
          <span class="title-value noselect">{{title}}</span>
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <!--
          Mi información
          Mi familia
          Enlaces
          Cerrar sesión
          -->
        <!-- <q-item-label header>Oxford School of English</q-item-label> -->
        <q-item-label header>OSE</q-item-label>
        <q-item v-ripple clickable tag="a" @click="openMyInicio()">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Inicio</q-item-label>
            <!-- <q-item-label caption>quasar.dev</q-item-label> -->
          </q-item-section>
        </q-item>
        <q-item v-ripple clickable tag="a" @click="openMyInformation()">
          <q-item-section avatar>
            <q-icon name="face" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Mi Información</q-item-label>
            <!-- <q-item-label caption>quasar.dev</q-item-label> -->
          </q-item-section>
        </q-item>
        <div v-if="role == 'parent'">
        <q-item v-ripple clickable tag="a" @click="openMyFamily()">
          <q-item-section avatar>
            <q-icon name="accessibility" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Mi Familia</q-item-label>
            <!-- <q-item-label caption>quasar.dev</q-item-label> -->
          </q-item-section>
        </q-item>
        </div>
        <q-item v-ripple clickable tag="a" @click="openMyLinks()">
          <q-item-section avatar>
            <q-icon name="link" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Enlaces</q-item-label>
            <!-- <q-item-label caption>quasar.dev</q-item-label> -->
          </q-item-section>
        </q-item>
      </q-list>
      <div class="logout" @click="logout()">Cerrar sesión</div>
    </q-drawer>
    <!--
    <div class="information-container">Email: <span class="container-information">{{email}}</span></div>
    <div class="information-container">Clave de familia: <span class="container-information">{{family_key}}</span></div>
    <div class="information-container">ID: <span class="container-information">{{id}}</span></div>
    <div class="information-container">Nombre: <span class="container-information">{{name}}</span></div>
    <div class="information-container">Rol: <span class="container-information">{{role}}</span></div>
    -->
    <div v-if="inicio" class="my-information-container">
      <div class="welcome-logo">
        <img :src="'statics/OSE1.png'"/>
      </div>
      <div v-if="welcomeInformation">
        <div class="welcome-text">Hola, {{name}}!</div>
        <div class="welcome-text">{{family_key}}</div>
      </div>
    </div>
    <div v-if="myInformation" class="my-personal-information-container">
      <!-- <div class="information-container">Nombre: <span class="container-information">{{name}}</span></div> -->
      <!-- <div class="information-container">Email: <span class="container-information">{{email}}</span></div> -->
      <!-- <div class="information-container">Clave de familia: <span class="container-information">{{family_key}}</span></div> -->
      <div class="information-container-title">{{name}}</div>
      <div class="information-container">Correo: <span class="information-container-value">{{email}}</span></div>
      <div class="information-container">Clave de familia: <span class="information-container-value">{{family_key}}</span></div>
      <!-- <div class="information-container">ID: <span class="container-information">{{id}}</span></div> -->
      <!-- <div class="information-container">Rol: <span class="container-information">{{role}}</span></div> -->
    </div>
    <div v-if="myFamily" class="my-information-container">
      <div v-for="kid in kids" v-bind:key="kid.id">
        <div class="kid-container">
          <div class="kid-attribute-title">{{kid.name}}</div>
          <div class="kid-attribute">Grado <span class="kid-value">{{kid.grade}}</span></div>
          <div class="kid-attribute">Grupo <span class="kid-value">{{kid.group}}</span></div>
          <div class="kid-attribute">Clave de familia <span class="kid-value">{{kid.family_key}}</span></div>
          <div class="kid-attribute">Campus <span class="kid-value">{{kid.campus}}</span></div>
        </div>
      </div>
    </div>
    <div v-if="myLinks" class="">
      <!-- <div class="test" @click="dummyLink('aulaVirtual')">Aula Virtual</div> -->
      <ul>
        <!-- <li><a href="http://www.google.com" target="_blank">Google</a></li> -->
        <li><div class="general-links noselect">Enlaces Generales</div>
          <ul>
            <!-- <li><a href="https://www.w3schools.com/html/">Visit our HTML tutorial</a></li> -->
            <!-- <li><q-btn @click="dummyLink('aulaVirtual')" push color="white" text-color="primary" no-caps label="Aula Virtual" /></li> -->
            <!-- <li><q-btn @click="dummyLink('calendarioEventos')" push color="white" text-color="primary" no-caps label="Calendario de Eventos" /></li> -->
            <!-- <li><q-btn @click="dummyLink('noticias')" push color="white" text-color="primary" no-caps label="Noticias" /></li> -->
            <!-- <div @click="openURL('http://oxfordschool.edu.mx/index.aspx?seccion=aulavirtualacceso')">Aula Virtual</div> -->
            <div v-if="$q.platform.is.ios">
              <div class="ios-link" @click="testLink('aulaVirtual')">Aula Virtual</div>
              <div class="ios-link" @click="testLink('calendarioEventos')">Calendario de Eventos</div>
              <div class="ios-link" @click="testLink('noticias')">Noticias</div>
            </div>
            <div v-else>
              <li><a href="http://oxfordschool.edu.mx/index.aspx?seccion=aulavirtualacceso" target="_blank">Aula Virtual</a></li>
              <li><a href="http://www.oxfordschool.edu.mx/index.aspx?seccion=calendario" target="_blank">Calendario de Eventos</a></li>
              <li><a href="http://www.oxfordschool.edu.mx/index.aspx?seccion=noticias" target="_blank">Noticias</a></li>
            </div>
          </ul>
        </li>
        <li><div class="social-networks noselect">Redes Sociales</div>
          <ul>
            <!-- <li><q-btn @click="dummyLink('facebook')" push color="white" text-color="primary" no-caps label="Facebook"/></li> -->
            <!-- <li><q-btn @click="dummyLink('oxford')" push color="white" text-color="primary" no-caps label="Oxford School"/></li> -->
            <!-- <li><q-btn @click="dummyLink('prepaOxford')" push color="white" text-color="primary" no-caps label="Prepa Oxford"/></li> -->
            <!-- <li><q-btn @click="dummyLink('powerLearning')" push color="white" text-color="primary" no-caps label="Power Learning"/></li> -->
            <!-- <li><q-btn @click="dummyLink('youtube')" push color="white" text-color="primary" no-caps label="Youtube"/></li> -->
            <div v-if="$q.platform.is.ios">
              <div class="ios-link" @click="testLink('facebook')">Facebook</div>
              <div class="ios-link" @click="testLink('oxford')">Oxford School</div>
              <div class="ios-link" @click="testLink('prepaOxford')">Prepa Oxford</div>
              <div class="ios-link" @click="testLink('powerLearning')">Power Learning</div>
              <div class="ios-link" @click="testLink('youtube')">YouTube</div>
            </div>
            <div v-else>
              <li><a href="https://www.facebook.com/oxfordschoolofenglishMX/" target="_blank">Facebook</a></li>
              <li><a href="http://oxfordschool.edu.mx/" target="_blank">Oxford School</a></li>
              <li><a href="http://prepaoxford.edu.mx/" target="_blank">Prepa Oxford</a></li>
              <li><a href="https://oxfordschool.learning.powerschool.com/do/account/login" target="_blank">Power Learning</a></li>
              <li><a href="https://www.youtube.com/user/OxfordSchoolTV" target="_blank">YouTube</a></li>
            </div>
          </ul>
        </li>
        <!-- <li><q-btn @click="dummyLink('google')" push color="white" text-color="primary" no-caps label="Notificaciones" /></li> -->
      </ul>
    </div>
  </q-page>
</template>

<script>
import { openURL } from 'quasar'
import axios from 'axios'
export default {
  name: 'PageHome',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      email: '',
      family_key: '',
      id: '',
      name: '',
      role: '',
      title: 'Inicio',
      myInformation: false,
      myFamily: false,
      myLinks: false,
      inicio: true,
      welcomeInformation: false,
      kids: []
    }
  },
  mounted () {
    this.getUserInformation()
    // this.getUserKids()
    // this.getKidsByFamilyID()
    this.loginVerification()
  },
  methods: {
    openURL,
    logout () {
      var self = this
      // window.localStorage.removeItem('token')
      // console.log('Token removido desde la función logout()')
      self.$router.push('/')
    },
    loginVerification () {
      // var self = this
      // console.log('Token: ' + window.localStorage.getItem('token'))
      if (window.localStorage.getItem('token') === null) {
        // alert('Inicia sesión!')
        // self.$router.push('/')
      } else {
        // alert('Todo bien!')
        // Do nothing
      }
    },
    testLink (linkValue) {
      if (linkValue === 'aulaVirtual') {
        window.open('http://oxfordschool.edu.mx/index.aspx?seccion=aulavirtualacceso')
      } else if (linkValue === 'facebook') {
        window.open('https://www.facebook.com/oxfordschoolofenglishMX/')
      } else if (linkValue === 'oxford') {
        window.open('http://oxfordschool.edu.mx/')
      } else if (linkValue === 'prepaOxford') {
        window.open('http://prepaoxford.edu.mx/')
      } else if (linkValue === 'powerLearning') {
        window.open('https://oxfordschool.learning.powerschool.com/do/account/login')
      } else if (linkValue === 'youtube') {
        window.open('https://www.youtube.com/user/OxfordSchoolTV')
      } else if (linkValue === 'calendarioEventos') {
        window.open('http://www.oxfordschool.edu.mx/index.aspx?seccion=calendario')
      } else if (linkValue === 'noticias') {
        window.open('http://www.oxfordschool.edu.mx/index.aspx?seccion=noticias')
      } else if (linkValue === 'google') {
        window.open('http://google.com')
      }
    },
    dummyLink (linkValue) {
      // window.open('http://google.com')
      if (linkValue === 'aulaVirtual') {
        window.open('http://oxfordschool.edu.mx/index.aspx?seccion=aulavirtualacceso')
      } else if (linkValue === 'facebook') {
        window.open('https://www.facebook.com/oxfordschoolofenglishMX/')
      } else if (linkValue === 'oxford') {
        window.open('http://oxfordschool.edu.mx/')
      } else if (linkValue === 'prepaOxford') {
        window.open('http://prepaoxford.edu.mx/')
      } else if (linkValue === 'powerLearning') {
        window.open('https://oxfordschool.learning.powerschool.com/do/account/login')
      } else if (linkValue === 'youtube') {
        window.open('https://www.youtube.com/user/OxfordSchoolTV')
      } else if (linkValue === 'calendarioEventos') {
        window.open('http://www.oxfordschool.edu.mx/index.aspx?seccion=calendario')
      } else if (linkValue === 'noticias') {
        window.open('http://www.oxfordschool.edu.mx/index.aspx?seccion=noticias')
      } else if (linkValue === 'google') {
        window.open('http://google.com')
      }
    },
    getUserKids () {
      // var self = this
      console.log('Inicio')
      axios.get('https://oxford-app-api.herokuapp.com/v1/kids', {
        headers: { 'Authorization': window.localStorage.getItem('token') }
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      console.log('Fin')
    },
    getUserInformation () {
      var self = this
      console.log('En la página /home')
      console.log(window.localStorage.getItem('token'))
      console.log(window.localStorage.getItem('id'))
      console.log(window.localStorage.getItem('email'))
      // var token = window.localStorage.getItem('token')
      var id = window.localStorage.getItem('id')
      // console.log('id -> ' + id)
      var completeUrl = 'https://oxford-app-api.herokuapp.com/v1/sessions/' + id
      // console.log('URL completa: ' + completeUrl.valueOf())
      console.log(completeUrl)
      axios.get(completeUrl, {
        headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token') }
      })
        .then(function (response) {
          console.log(response)
          console.log(response.data)
          console.log(response.data.data)
          // console.log(response.data.data.user)
          // console.log(response.data.data.user.email)
          // console.log(response.data.data.user.family_key)
          // console.log(response.data.data.user.id)
          // console.log(response.data.data.user.name)
          // console.log(response.data.data.user.role)
          self.email = response.data.data.user.email
          self.family_key = response.data.data.user.family_key
          console.log('-------------')
          console.log(self.family_key)
          console.log('-------------')
          self.id = response.data.data.user.id
          self.name = response.data.data.user.name
          self.role = response.data.data.user.role
          self.welcomeInformation = true
          self.getKidsByFamilyID()
        })
        .catch(function (error) {
          // alert(error)
          console.log(error)
        })
    },
    getKidsByFamilyID () {
      /*
      console.log('------------------------------------------------')
      var self = this
      // console.log('Dentro')
      console.log(window.localStorage.getItem('token'))
      var completeUrl = 'https://oxford-app-api.herokuapp.com/v1/kids/by_family_key/' + self.family_key
      console.log(completeUrl)
      console.log(self.family_key)
      // console.log(window.localStorage.getItem('token'))
      axios.get(completeUrl, {
        headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token') }
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          // alert(error)
          console.log(error)
        })
      console.log('------------------------------------------------')
      */
      var self = this
      var token = window.localStorage.getItem('token')
      console.log(token)
      console.log(self.family_key)
      var completeUrl = 'https://oxford-app-api.herokuapp.com/v1/kids/by_family_key/' + self.family_key
      console.log(completeUrl)
      axios.get(completeUrl, {
        headers: { 'Authorization': 'Bearer ' + token }
      })
        .then(function (response) {
          console.log('<----->')
          console.log('Hay niños')
          // console.log(response)
          console.log(response.data)
          self.kids = response.data
          console.log(self.kids)
          console.log('<----->')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    openMyInformation () {
      var self = this
      self.title = 'Mi Información'
      self.inicio = false
      self.leftDrawerOpen = false
      self.myInformation = true
      self.myFamily = false
      self.myLinks = false
    },
    openMyFamily () {
      var self = this
      self.title = 'Mi Familia'
      self.inicio = false
      self.leftDrawerOpen = false
      self.myInformation = false
      self.myFamily = true
      self.myLinks = false
    },
    openMyLinks () {
      var self = this
      self.title = 'Enlaces'
      self.inicio = false
      self.leftDrawerOpen = false
      self.myInformation = false
      self.myFamily = false
      self.myLinks = true
    },
    openMyInicio () {
      var self = this
      self.title = 'Inicio'
      self.inicio = true
      self.leftDrawerOpen = false
      self.myInformation = false
      self.myFamily = false
      self.myLinks = false
    }
  },
  beforeRouteLeave (to, from, next) {
    const answer = window.confirm('¿Quieres salir de tu sesión?')
    if (answer) {
      window.localStorage.removeItem('token')
      console.log('Token removido desde la función beforeRouteLeave()')
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style>
  .logout{
    color: #1e90ff;
    padding-top: 20px;
    padding-left: 20px;
    font-weight: bold;
  }
  .information-container{
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 12pt;
    /* font-weight: bold; */
  }
  .information-container-title{
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 16pt;
    font-weight: bold;
  }
  .container-information{
    /* color: #1E90FF; */
    color: black;
    /* color: white; */
    /* font-size: 12pt; */
    /* font-weight: bold; */
  }
  .ul, li{
    list-style: none;
    padding-top: 10px;
  }
  .my-information-container{
    padding: 20px;
  }
  .my-personal-information-container{
    margin: 20px;
    /* padding-top: 5px; */
    /* padding-bottom: 5px; */
    /* background-color: #DCDCDC; */
    /* border-radius: 5px; */
    border-radius: 1.25px;
    box-shadow: 2.5px 2.5px 1px 1px #DCDCDC;
    border-top: 1px solid #DCDCDC;
    border-left: 1px solid #DCDCDC;
    border-right: 1px solid #DCDCDC;
    border-bottom: 1px solid #DCDCDC;
  }
  .welcome-text{
    text-align: center;
    /* color: #3F3F3F; */
    color: black;
    font-size: 18pt;
  }
  .kid-container{
    background-color: white;
    padding-top: 10px;
    padding-left: 20px;
    padding-bottom: 20px;
    border-radius: 1.25px;
    box-shadow: 2.5px 2.5px 1px 1px #DCDCDC;
    border-top: 1px solid #DCDCDC;
    border-left: 1px solid #DCDCDC;
    border-right: 1px solid #DCDCDC;
    border-bottom: 1px solid #DCDCDC;
    margin-bottom: 10px;
  }
  .kid-attribute-title{
    font-size: 18pt;
    font-weight: bold;
  }
  .kid-attribute{
    width: 50%;
    display: inline-block;
  }
  .kid-value{
    /* color: #1E90FF; */
    color: black;
    font-weight: bold;
  }
  .welcome-logo{
    /* background-color: black; */
    text-align: center;
    padding-bottom: 2px;
  }
  .welcome-logo img{
    height: 150px;
    width: 150px;
    /* object-fit: fill; */
  }
  .home-toolbar{
    background-color: white;
  }
  .toolbar-button{
    background-color: #EB2F3F;
  }
  .toolbar-title{
    /* text-align: center; */
    color: black;
    /* font-weight: bold; */
    /* margin-left: -14.28571429%; */
    /* margin-left: -12.857142861%; */
    /* padding-left: -15.35733333%; */
  }
  .title-value{
    /* margin-left: -14.28571429%; */
    font-weight: bold;
  }
  .social-networks{
    font-weight: bold;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 14pt;
    color: red;
  }
  .general-links{
    font-weight: bold;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 14pt;
    color: red;
  }
  .information-container-value{
    font-weight: bold;
  }
  a:link{
    text-decoration: none;
    color: black;
    font-size: 14pt;
    font-weight: bold;
  }
  a:visited {
    text-decoration: none;
    color: black;
    font-size: 14pt;
    font-weight: bold;
  }
  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
  }
  .link-button{
    /* background-color: red; */
    width: 75%;
    text-align: left;
    /* border: 1px solid #DCDCDC; */
    padding-bottom: 0px;
    border-radius: 1.25px;
    margin-bottom: 0px;
  }
  .test{
    background-color: blue;
  }
  .ios-link{
    font-size: 14pt;
    font-weight: bold;
    /* color: green; */
  }
</style>
