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
        <q-item v-ripple clickable tag="a" @click="openMyNotifications()">
          <q-item-section avatar>
            <q-icon name="event_note" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Mis Notificaciones <span class="unread-notifications-button">{{unreadNotifications}}</span></q-item-label>
            <!-- <q-item-label caption>quasar.dev</q-item-label> -->
          </q-item-section>
        </q-item>
        <div v-if="role == 'ADMIN'">
        <q-item v-ripple clickable tag="a" @click="openNotificationCreation()">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Creación de Notificación</q-item-label>
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
      <div style="margin-left:10px;margin-top:10px;"><b>Notificaciones no leídas:</b></div>
      <div class="single-notification" @click="openSingleNotification()">
          <div class="notification-type">Disciplina</div>
          <div class="notification-title">Reporte de conducta de Juan</div>
          <div class="notification-description-text">Estimada familia, te invitamos a que asistas lo más pronto posible a la oficina de disciplina.</div>
          <div class="show-more-button">Ver más</div>
        </div>
        <div class="single-notification" @click="openSingleNotification()">
          <div class="notification-type">Enfermería</div>
          <div class="notification-title">Estado de salud de Karla</div>
          <div class="notification-description-text">Estimada familia, favor de acudir lo más pronto posible por Karla dado su estado de salud.</div>
          <div class="show-more-button">Ver más</div>
        </div>
        <div class="single-notification" @click="openSingleNotification()">
          <div class="notification-type">Invitaciones</div>
          <div class="notification-title">¡Felices fiestas patrias!</div>
          <div class="notification-description-text">Queridas familias, las invitamos al Campus Escobedo a celular el 16 de Septiembre.</div>
          <div class="show-more-button">Ver más</div>
        </div>
    </div>
    <div v-if="myInformation" class="my-personal-information-container">
      <!-- <div class="information-container">Nombre: <span class="container-information">{{name}}</span></div> -->
      <!-- <div class="information-container">Email: <span class="container-information">{{email}}</span></div> -->
      <!-- <div class="information-container">Clave de familia: <span class="container-information">{{family_key}}</span></div> -->
      <div class="information-container-title">{{name}}</div>
      <div class="information-container">Correo <span class="information-container-value">{{email}}</span></div>
      <div class="information-container">Clave de familia <span class="information-container-value">{{family_key}}</span></div>
      <!-- <div class="information-container">ID: <span class="container-information">{{id}}</span></div> -->
      <!-- <div class="information-container">Rol: <span class="container-information">{{role}}</span></div> -->
    </div>
    <div v-if="myFamily" class="my-information-container">
      <div v-for="kid in kids" v-bind:key="kid.id">
        <div class="kid-container">
          <!-- <div class="kid-attribute-title">{{kid.name}}</div> -->
          <div class="kid-attribute-title">{{kid.full_name}}</div>
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
              <div class="ios-link" @click="testLink('extracurriculares')">Extracurriculares</div>
              <div class="ios-link" @click="testLink('cafeteria')">Menú de Cafetería</div>
              <div class="ios-link" @click="testLink('facturas')">Consulta de Facturas</div>
            </div>
            <div v-else>
              <li><a href="http://oxfordschool.edu.mx/index.aspx?seccion=aulavirtualacceso" target="_blank">Aula Virtual</a></li>
              <li><a href="http://www.oxfordschool.edu.mx/index.aspx?seccion=calendario" target="_blank">Calendario de Eventos</a></li>
              <li><a href="http://www.oxfordschool.edu.mx/index.aspx?seccion=noticias" target="_blank">Noticias</a></li>
              <li><a href="http://oxfordschool.edu.mx/index.aspx?seccion=noticias&id=2520" target="_blank">Extracurriculares</a></li>
              <li><a href="http://oxfordschool.edu.mx/index.aspx?seccion=cafeteria" target="_blank">Menú de Cafetería</a></li>
              <li><a href="https://cfd.sicofi.com.mx/Sicofi/Main" target="_blank">Consulta de Facturas</a></li>
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
    <div v-if="myNotifications" class="">
      <div v-if="notificationsLength == 0" class="no-notifications-sign">
        Actualmente no tienes notificaciones
      </div>
      <div v-else class="notificatios-sign">
        Tienes notificaciones, serán desplegadas aquí ↓
      </div>
      <div>
        <div>-------------------------------------------------------------------------------------------------</div>
        <div style="text-align:center;font-weight:bold;font-style:italic;">Notificaciones de prueba (Solo para demostración)</div>
        <q-tabs v-model="tab">
          <q-tab name="leidas" icon="markunread_mailbox" label="Leídas" />
          <q-tab name="noleidas" icon="notification_important" label="No leídas" />
        </q-tabs>
        <!-- En el futuro hacer el binding y pasar el id de la notificaction a la funcion -->
        <div class="single-notification" @click="openSingleNotification()">
          <div class="notification-type">Disciplina</div>
          <div class="notification-title">Reporte de conducta de Juan</div>
          <div class="notification-description-text">Estimada familia, te invitamos a que asistas lo más pronto posible a la oficina de disciplina.</div>
          <div class="show-more-button">Ver más</div>
        </div>
        <div class="single-notification" @click="openSingleNotification()">
          <div class="notification-type">Enfermería</div>
          <div class="notification-title">Estado de salud de Karla</div>
          <div class="notification-description-text">Estimada familia, favor de acudir lo más pronto posible por Karla dado su estado de salud.</div>
          <div class="show-more-button">Ver más</div>
        </div>
        <div class="single-notification" @click="openSingleNotification()">
          <div class="notification-type">Invitaciones</div>
          <div class="notification-title">¡Felices fiestas patrias!</div>
          <div class="notification-description-text">Queridas familias, las invitamos al Campus Escobedo a celular el 16 de Septiembre.</div>
          <div class="show-more-button">Ver más</div>
        </div>
      </div>
    </div>
    <div v-if="myNotificationComponent" class="">
      <div class="single-notification-dummy-board">Notificación solo para demostración</div>
      <div class="one-single-notification">
        <div class="o-s-n-title">Estado de salud de Juan</div>
        <div class="o-s-n-type">Enfermería</div>
        <div class="o-s-n-description">Estimada familia, te pedimos acudir lo más pronto posible a la sala de consultas del campus dado que su hijo Juan no se siente de lo mejor posible.</div>
        <div class="o-s-n-date">Fecha de notificación: <b>18/09/2019</b></div>
        <!-- role -->
        <!-- relationship -->
        <div class="o-s-n-first-row">
          <div class="o-s-n-first-row-value-1">Campus Escobedo</div>
          <div class="o-s-n-first-row-value-2">Grado 10</div>
          <div class="o-s-n-first-row-value-3">Grupo A</div>
        </div>
        <div>
          <div class="o-s-n-family-key">Familia C1Z3</div>
          <div class="o-s-n-kid-name">Juan Pedro López Ramírez</div>
        </div>
        <!-- Cuando se abra llamar a la función mounted para cambiar el estado a leído -->
        <!-- status -->
        <!-- Este será un botón para hacer el update -->
        <div class="assistance-and-status-div">
          <div class="o-s-n-assistance">Estado: <b>{{assistanceStatus}}</b></div>
          <div class="button-div"><q-btn color="primary" label="Asistiré" no-caps @click="changeStatus()"/></div>
          <div style="font-size:10px;color:red;text-align:center;padding-top:10px;">Este botón solo aparecerá para las notificaciones que sean <b>Citas</b> o <b>Invitaciones</b>.</div>
        </div>
        <!-- event_id -->
      </div>
    </div>
    <div v-if="myNotificationCreation" class="">
      <div class="notification-creation-form">
        <!-- Componente para la creación de notificaciones.<br> -->
        <div>Información requerida para la creación de la notificación:</div>
        <q-tabs v-model="tab">
          <q-tab name="padres" icon="people" label="Padres" />
          <q-tab name="plantel" icon="school" label="Plantel" />
          <q-tab name="administradores" icon="person" label="Admins" />
        </q-tabs>
        <div>{{tab}}</div>
        <!-- Título de la notificación<br> -->
        <q-select v-model="tipoDeNotificacion" :options="notificaciones" label="Elige un el tipo de notificación" v-if="tab === 'administradores'"/><br>
        <!-- Título de la notificación<br> -->
        <q-input outlined label="Título de la notificación" v-if="tab === 'padres' || tab === 'plantel' || tab === 'administradores'"/><br>
        <!-- Descripción de la notificación<br> -->
        <!-- <q-input outlined label="Descripción de la notificación" /><br> -->
        <textarea class="notification-description" rows="5" placeholder="Descripción de la notificación"  v-if="tab === 'padres' || tab === 'plantel' || tab === 'administradores'"></textarea>
        <!-- Campus<br> -->
        <q-select v-model="campus" :options="campuses" label="Elige un campus"  v-if="tab === 'plantel' || tab === 'administradores'"/>
        <!-- Fecha de publicación<br> -->
        <br><br>
        <div class="date-picker-button-and-date-value" v-if="tab === 'padres' || tab === 'plantel' || tab === 'administradores'">
          <div v-if="tipoDeNotificacion === 'Citas' || tipoDeNotificacion === 'Comunicados' || tipoDeNotificacion === 'Encuestas' || tipoDeNotificacion === 'Invitaciones' || tipoDeNotificacion === 'Nursery' || tipoDeNotificacion === 'Recordatorios'" class="just-date-picker"><q-btn round color="primary" icon="date_range" @click="showDatePickerFunction()"/></div>
          <div class="just-date-value">Fecha seleccionada: <b>{{date}}</b></div>
        </div>
        <br>
        <div v-if="showDatePicker">
          <q-date v-model="date" minimal/><br>
        </div>
        <!-- Alcance de entrega de la notificación<br> -->
        <!-- Más opciones de personalización -->
        <!-- <q-checkbox v-model="morePersonalization" /> Más opciones de personalización<br> -->
        <!-- <div class="notification-personalization" v-if="morePersonalization"> -->
        <!-- Padre(s) - Administrador(es)<br> -->
        <!-- <div>{{tab}}</div> -->
        <!--
          Relación [Padre - Madre - Ambos]<br>
          <q-tabs v-model="tab2">
            <q-tab name="madre" icon="person" label="Madre" />
            <q-tab name="padre" icon="person" label="Padre" />
            <q-tab name="ambos" icon="people" label="Ambos" />
          </q-tabs>
        -->
        <!-- Campus<br> -->
        <!-- <q-select v-model="campusInterno" :options="campuses" label="Elige un campus" /> -->
        <!-- Grado<br> -->
        <div v-if="tab === 'plantel' || tab === 'administradores'">
          <div v-if="campus === 'Anáhuac' || campus === 'Concordia'">
            <q-select v-model="grado" :options="grados2" label="Elige un grado" />
          </div>
          <div v-else-if="campus === 'Barragán' || campus === 'Sendero'">
            <q-select v-model="grado" :options="grados3" label="Elige un grado" />
          </div>
          <div v-else-if="campus === 'Prepa'">
            <q-select v-model="grado" :options="grados4" label="Elige un grado" />
          </div>
          <div v-else>
            <q-select v-model="grado" :options="grados" label="Elige un grado" />
          </div>
        </div>
        <!-- Grupo<br> -->
        <q-select v-model="grupo" :options="grupos" label="Elige un grupo"  v-if="tab === 'plantel'"/>
        <!-- Código de Familia<br> -->
        <br>
        <q-input v-model="familyKeyFormValue" outlined label="Ingresa la clave de familia"  v-if="tab === 'padres'"/><br>
        <!-- Matrícula<br> -->
        <!-- <q-input v-model="matriculaFormValue" outlined label="Ingresa la matrícula" /><br> -->
        <!-- Nombre del estudiante<br> -->
        <!-- <q-input v-model="studentNameFormValue" outlined label="Ingresa el nombre de el o la estudiante" /> -->
        <div class="container-for-creating-notification-button">
          <q-btn color="primary" label="Crear Notificación" no-caps @click="createNotification()"/>
          <div v-for="error in createNotificationErrors" v-bind:key="error.id" class="notifications-errors-container">
            <div class="individual-notification-error">{{error}}</div>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </q-page>
</template>

<script>
import { openURL } from 'quasar'
import axios from 'axios'
// import { ENGINE_METHOD_DSA } from 'constants'
// import { TIMEOUT } from 'dns'
export default {
  name: 'PageHome',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      email: '',
      family_key: 'Sin clave',
      id: '',
      name: '',
      role: '',
      title: 'Inicio',
      myInformation: false,
      myFamily: false,
      myLinks: false,
      myNotificationCreation: false,
      myNotifications: false,
      inicio: true,
      welcomeInformation: false,
      kids: [],
      date: '2019/02/01',
      campus: null,
      campuses: ['Todos los campus', 'Anáhuac', 'Barragán', 'Concordia', 'Sendero', 'Prepa'],
      tab: 'padres',
      tab2: 'madre',
      campusInterno: null,
      grado: null,
      grados: [
        'Todos los grados',
        // 'Todo kinder',
        // 'Todo primaria',
        // 'Todo secundaria',
        // 'Todo preparatoria',
        'Nursery',
        'PreKínder',
        '1º Kínder',
        '2º Kínder',
        '3º Kínder',
        '1º Primaria',
        '2º Primaria',
        '3º Primaria',
        '4º Primaria',
        '5º Primaria',
        '6º Primaria',
        '7º Secundaria',
        '8º Secundaria',
        '9º Secundaria',
        '10º Preparatoria',
        '11º Preparatoria',
        '12º Preparatoria'
      ],
      grados2: [
        'Nursery',
        'PreKínder',
        '1º Kínder',
        '2º Kínder',
        '3º Kínder'
      ],
      grados3: [
        'Nursery',
        'PreKínder',
        '1º Kínder',
        '2º Kínder',
        '3º Kínder',
        '1º Primaria',
        '2º Primaria',
        '3º Primaria',
        '4º Primaria',
        '5º Primaria',
        '6º Primaria',
        '7º Secundaria',
        '8º Secundaria',
        '9º Secundaria'
      ],
      grados4: [
        '10º Preparatoria',
        '11º Preparatoria',
        '12º Preparatoria'
      ],
      grupo: null,
      grupos: ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Otro'],
      morePersonalization: false,
      showDatePicker: false,
      tipoDeNotificacion: 'Comunicados',
      notificaciones: ['Citas', 'Comunicados', 'Disciplina', 'Enfermería', 'Encuestas', 'Invitaciones', 'Nursery', 'Recordatorios'],
      notificationsLength: 0,
      myNotificationComponent: false,
      assistanceStatus: 'No asistiré',
      unreadNotifications: 6,
      createNotificationErrors: [],
      familyKeyFormValue: '',
      matriculaFormValue: '',
      studentNameFormValue: ''
    }
  },
  mounted () {
    this.getUserInformation()
    // this.getUserKids()
    // this.getKidsByFamilyID()
    this.loginVerification()
    this.getMyNotifications()
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
    createNotification () {
      var self = this
      self.createNotificationErrors = []
      if (self.tipoDeNotificacion === 'Enfermería' || self.tipoDeNotificacion === 'Disciplina' || self.tipoDeNotificacion === 'Citas') {
        if (self.studentNameFormValue === '') {
          self.createNotificationErrors.push('Para este tipo de notificación se tiene que seleccionar el nombre de un estudiante.')
          // La notificación no se podría realizar
        }
      }
    },
    openSingleNotification () {
      var self = this
      self.title = 'Mi Notificación'
      self.inicio = false
      self.leftDrawerOpen = false
      self.myInformation = false
      self.myFamily = false
      self.myLinks = false
      self.myNotificationCreation = false
      self.myNotifications = false
      self.myNotificationComponent = true
    },
    changeStatus () {
      var self = this
      if (self.assistanceStatus === 'No asistiré') {
        self.assistanceStatus = 'Asistiré'
      } else if (self.assistanceStatus === 'Asistiré') {
        self.assistanceStatus = 'No asistiré'
      }
    },
    getMyNotifications () {
      var self = this
      var completeUrl = 'https://oxford-app-api.herokuapp.com/v1/notifications'
      axios.get(completeUrl, {
        headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token') }
      })
        .then(function (response) {
          // console.log('Se obtuvieron las notificaciones')
          self.notificationsLength = response.data.length
          // console.log(self.notificationsLength)
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    showDatePickerFunction () {
      var self = this
      if (self.showDatePicker === true) {
        self.showDatePicker = false
      } else if (self.showDatePicker === false) {
        self.showDatePicker = true
      }
    },
    cancelDatePickerModal () {
      this.showDatePicker = false
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
      } else if (linkValue === 'facturas') {
        window.open('https://cfd.sicofi.com.mx/Sicofi/Main')
      } else if (linkValue === 'extracurriculares') {
        window.open('http://oxfordschool.edu.mx/index.aspx?seccion=noticias&id=2520')
      } else if (linkValue === 'cafeteria') {
        window.open('http://oxfordschool.edu.mx/index.aspx?seccion=cafeteria')
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
    getUserInformation () {
      var self = this
      // console.log('En la página /home')
      // console.log(window.localStorage.getItem('token'))
      // console.log(window.localStorage.getItem('id'))
      // console.log(window.localStorage.getItem('email'))
      // var token = window.localStorage.getItem('token')
      var id = window.localStorage.getItem('id')
      // console.log('id -> ' + id)
      var completeUrl = 'https://oxford-app-api.herokuapp.com/v1/sessions/' + id
      // console.log('URL completa: ' + completeUrl.valueOf())
      // console.log(completeUrl)
      axios.get(completeUrl, {
        headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token') }
      })
        .then(function (response) {
          // console.log(response)
          // console.log(response.data)
          // console.log(response.data.data)
          // console.log(response.data.data.user)
          // console.log(response.data.data.user.email)
          // console.log(response.data.data.user.family_key)
          // console.log(response.data.data.user.id)
          // console.log(response.data.data.user.name)
          // console.log(response.data.data.user.role)
          self.email = response.data.data.user.email
          if (response.data.data.user.family_key !== null) {
            self.family_key = response.data.data.user.family_key
          }
          // console.log('-------------')
          // console.log(self.family_key)
          // console.log('-------------')
          self.id = response.data.data.user.id
          self.name = response.data.data.user.name
          self.role = response.data.data.user.role
          self.welcomeInformation = true
          self.getKidsByFamilyID()
        })
        /*
        .catch(function (error) {
          // alert(error)
          // console.log(error)
        })
        */
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
      // console.log(token)
      // console.log(self.family_key)
      var completeUrl = 'https://oxford-app-api.herokuapp.com/v1/kids/by_family_key/' + self.family_key
      // console.log(completeUrl)
      axios.get(completeUrl, {
        headers: { 'Authorization': 'Bearer ' + token }
      })
        .then(function (response) {
          // console.log('<----->')
          // console.log('Hay niños')
          // console.log(response)
          // console.log(response.data)
          self.kids = response.data
          // console.log(self.kids)
          // console.log('<----->')
        })
        /*
        .catch(function (error) {
          // console.log(error)
        })
        */
    },
    openMyInformation () {
      var self = this
      self.title = 'Mi Información'
      self.inicio = false
      self.leftDrawerOpen = false
      self.myInformation = true
      self.myFamily = false
      self.myLinks = false
      self.myNotificationCreation = false
      self.myNotifications = false
      self.myNotificationComponent = false
    },
    openMyFamily () {
      var self = this
      self.title = 'Mi Familia'
      self.inicio = false
      self.leftDrawerOpen = false
      self.myInformation = false
      self.myFamily = true
      self.myLinks = false
      self.myNotificationCreation = false
      self.myNotifications = false
      self.myNotificationComponent = false
    },
    openMyLinks () {
      var self = this
      self.title = 'Enlaces'
      self.inicio = false
      self.leftDrawerOpen = false
      self.myInformation = false
      self.myFamily = false
      self.myLinks = true
      self.myNotificationCreation = false
      self.myNotifications = false
      self.myNotificationComponent = false
    },
    openMyInicio () {
      var self = this
      self.title = 'Inicio'
      self.inicio = true
      self.leftDrawerOpen = false
      self.myInformation = false
      self.myFamily = false
      self.myLinks = false
      self.myNotificationCreation = false
      self.myNotifications = false
      self.myNotificationComponent = false
    },
    openNotificationCreation () {
      var self = this
      self.title = 'Creación de Notificación'
      self.inicio = false
      self.leftDrawerOpen = false
      self.myInformation = false
      self.myFamily = false
      self.myLinks = false
      self.myNotificationCreation = true
      self.myNotifications = false
      self.myNotificationComponent = false
    },
    openMyNotifications () {
      var self = this
      self.title = 'Mis Notificaciones'
      self.inicio = false
      self.leftDrawerOpen = false
      self.myInformation = false
      self.myFamily = false
      self.myLinks = false
      self.myNotificationCreation = false
      self.myNotifications = true
      self.myNotificationComponent = false
    }
  },
  beforeRouteLeave (to, from, next) {
    const answer = window.confirm('¿Quieres salir de tu sesión?')
    if (answer) {
      window.localStorage.removeItem('token')
      // console.log('Token removido desde la función beforeRouteLeave()')
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
    font-size: 14pt;
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
  .notification-creation-form{
    width: 100%;
    text-align: center;
    /* background-color: blue; */
    padding-left: 10%;
    padding-right: 10%;
    /* height: 100%; */
    padding-top: 5%;
  }
  .notification-personalization{
    /* background-color: #F5F5F5; */
    background-color: white;
    padding: 10px;
  }
  .notification-description{
    width: 100%;
    border: 1px solid #ABABAB;
    border-radius: 2.5px;
    resize: none;
  }
  .date-picker-modal{
    position: absolute;
    background-color: white;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .date-picker-button-and-date-value{
    /* text-align: center; */
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
  .just-date-picker{
    /* text-align: left; */
    display: inline-block;
    /* left: 0; */
    width: 10%;
    vertical-align: middle;
  }
  .just-date-value{
    /* text-align: right; */
    display: inline-block;
    /* right: 0; */
    width: 80%;
    vertical-align: middle;
  }
  .no-notifications-sign{
    padding-top: 20px;
    text-align: center;
    font-weight: bold;
    font-size: 12pt;
  }
  .notificatios-sign{
    padding-top: 20px;
    text-align: center;
    font-weight: bold;
    font-size: 12pt;
  }
  .single-notification{
    border: 1px solid #DCDCDC;
    margin: 10px;
    border-radius: 1.25px;
    padding: 10px;
  }
  .notification-type{
    text-align: left;
    color: gray;
    font-weight: bold;
  }
  .notification-title{
    text-align: center;
    font-weight: bold;
    font-size: 14pt;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .show-more-button{
    color: #1E90FF;
    text-align: right;
    font-weight: bold;
  }
  /* .notification-description-text{ */
  /* } */
  .one-single-notification{
    margin: 10px;
    padding: 10px;
    border: 1px solid #DCDCDC;
    border-radius: 1.25px;
  }
  .single-notification-dummy-board{
    text-align: center;
    font-weight: bold;
  }
  .o-s-n-title{
    font-size: 14pt;
    font-weight: bold;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .o-s-n-description{
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .o-s-n-date{
    padding-top: 5px;
    padding-bottom: 5px;
    color: gray;
  }
  .o-s-n-first-row{
    width: 100%;
    /* background-color: red; */
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .o-s-n-first-row-value-1{
    display: inline-block;
    text-align: left;
    /* text-align: center; */
    /* background-color: green; */
    width: 33%;
    font-weight: bold;
    vertical-align: middle;
  }
  .o-s-n-first-row-value-2{
    display: inline-block;
    text-align: center;
    /* background-color: blue; */
    width: 33%;
    color: #1E90FF;
    font-weight: bold;
    vertical-align: middle;
  }
  .o-s-n-first-row-value-3{
    display: inline-block;
    /* text-align: right; */
    text-align: center;
    /* background-color: yellow; */
    width: 33%;
    color: #1E90FF;
    font-weight: bold;
    vertical-align: middle;
  }
  .o-s-n-family-key{
    padding-top: 5px;
    padding-bottom: 5px;
    font-weight: bold;
    display: inline-block;
    /* background-color: blue; */
  }
  .o-s-n-kid-name{
    display: inline-block;
    font-weight: bold;
    text-align: right;
    /* background-color: red; */
    width: 65%;
  }
  .o-s-n-type{
    color: gray;
    font-weight: bold;
  }
  .assistance-and-status-div{
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .o-s-n-assistance{
    display: inline-block;
    width: 75%;
  }
  .button-div{
    display: inline-block;
    width: 25%;
  }
  .unread-notifications-button{
    color: white;
    background-color: red;
    border-radius: 50%;
    padding-top: 2.50px;
    padding-bottom: 2.75px;
    padding-left: 6px;
    padding-right: 6.5px;
  }
  .notification-description:focus{
    outline: none;
  }
  .container-for-creating-notification-button{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .notifications-errors-container{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .individual-notification-error{
    color: red;
  }
</style>
