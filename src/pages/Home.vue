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
        <div v-if="role == 'PARENT'">
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
            <!-- <q-item-label>Mis Notificaciones <span class="unread-notifications-button">{{contadorNotificacionesNoVistas}}</span></q-item-label> -->
            <!-- <div v-if="allMyNotSeenNotifications > 0"> -->
            <div v-if="contadorNotificacionesNoVistas > 0">
              <!-- <q-item-label>Mis Notificaciones <span class="unread-notifications-button">{{allMyNotSeenNotifications}}</span></q-item-label> -->
              <q-item-label>Mis Notificaciones <span class="unread-notifications-button">{{contadorNotificacionesNoVistas}}</span></q-item-label>
            </div>
            <div v-else>
              <q-item-label>Mis Notificaciones</q-item-label>
            </div>
            <!-- <q-item-label caption>quasar.dev</q-item-label> -->
          </q-item-section>
        </q-item>
        <div v-if="role == 'ADMIN'">
        <q-item v-ripple clickable tag="a" @click="openNotificationCreation()">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Envío de Notificación</q-item-label>
            <!-- <q-item-label caption>quasar.dev</q-item-label> -->
          </q-item-section>
        </q-item>
        </div>
        <div v-if="role == 'ADMIN'">
        <q-item v-ripple clickable tag="a" @click="openNotificationStatus()">
          <q-item-section avatar>
            <q-icon name="list_alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Estado de Notificaciones</q-item-label>
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
      <!-- <div>{{allMyNotSeenNotifications}}</div> -->
      <div style="margin-left:10px;margin-top:10px;" v-if="allMyNotSeenNotifications.length > 0"><b>Notificaciones no leídas:</b></div>
      <!--  -->
      <!-- <div class="single-notification" @click="openSingleNotification()">
        <div class="notification-type">Disciplina</div>
        <div class="notification-title">Reporte de conducta de Juan</div>
        <div v-if="descripcionDeNotificacionDePrueba.length >= 160" class="notification-description-text">{{descripcionDeNotificacionDePrueba.substring(0,160) + "..."}}</div>
        <div v-else class="notification-description-text">{{descripcionDeNotificacionDePrueba}}</div>
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
      </div> -->
      <!--  -->
      <div v-for="singleNotification in allMyNotifications" v-bind:key="singleNotification.id">
        <!-- Falta esto: \/ -->
        <!-- @click="openSingleNotification()" -->
        <div v-if="singleNotification.seen == false">
          <div class="single-notification" @click="openSingleNotification(singleNotification.id, singleNotification.assist)">
            <div class="notification-type">{{singleNotification.category}}</div>
            <div class="notification-title">{{singleNotification.title}}</div>
            <div v-if="singleNotification.description.length >= 160" class="notification-description-text">{{singleNotification.description.substring(0,160) + "..."}}</div>
            <div v-else class="notification-description-text">{{singleNotification.description}}</div>
            <div class="show-more-button">Ver más</div>
          </div>
        </div>
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
              <div class="ios-link" @click="testLink('horarioDeCaja')">Horario de Caja</div>
            </div>
            <div v-else>
              <li><a href="http://oxfordschool.edu.mx/index.aspx?seccion=aulavirtualacceso" target="_blank">Aula Virtual</a></li>
              <li><a href="http://www.oxfordschool.edu.mx/index.aspx?seccion=calendario" target="_blank">Calendario de Eventos</a></li>
              <li><a href="http://www.oxfordschool.edu.mx/index.aspx?seccion=noticias" target="_blank">Noticias</a></li>
              <li><a href="http://oxfordschool.edu.mx/index.aspx?seccion=noticias&id=2520" target="_blank">Extracurriculares</a></li>
              <li><a href="http://oxfordschool.edu.mx/index.aspx?seccion=cafeteria" target="_blank">Menú de Cafetería</a></li>
              <li><a href="https://cfd.sicofi.com.mx/Sicofi/Main" target="_blank">Consulta de Facturas</a></li>
              <li><a href="https://oxfordschool.edu.mx/index.aspx?seccion=noticias&id=2900" target="_blank">Horario de Caja</a></li>
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
      <!--
      <div v-if="notificationsLength == 0" class="no-notifications-sign">
        Actualmente no tienes notificaciones
      </div>
      <div v-else class="notificatios-sign">
        Tienes notificaciones, serán desplegadas aquí ↓
      </div>
      -->
      <div>
        <!-- <div>-------------------------------------------------------------------------------------------------</div> -->
        <!-- <div style="text-align:center;font-weight:bold;font-style:italic;">Notificaciones de prueba (Solo para demostración)</div> -->
        <q-tabs v-model="notificationsTab">
          <q-tab name="noleidas" icon="notification_important" label="No leídas" no-caps/>
          <q-tab name="leidas" icon="markunread_mailbox" label="Leídas" no-caps/>
        </q-tabs>
        <!-- {{notificationsTab}} -->
        <!-- En el futuro hacer el binding y pasar el id de la notificaction a la funcion -->
        <!--
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
        -->
        <!-- contadorNotificacionesNoVistas
        contadorNotificacionesVistas -->
        <div v-if="notificationsTab == 'noleidas'" class="notifications-board">
          <!-- No Leídas -->
          <!-- {{contadorNotificacionesNoVistas}} -->
          <div v-if="contadorNotificacionesNoVistas == 0" style="text-align:center;">
            <b>No tienes notificaciones por leer</b>
          </div>
          <div v-else-if="contadorNotificacionesNoVistas > 0">
            <div v-for="singleNotification in allMyNotifications" v-bind:key="singleNotification.id">
              <!-- Falta esto: \/ -->
              <!-- @click="openSingleNotification()" -->
              <div v-if="singleNotification.seen == false">
                <!-- Falta esto: @click="openSingleNotification()" -->
                <div class="single-notification" @click="openSingleNotification(singleNotification.id, singleNotification.assist)">
                  <div class="notification-type">{{singleNotification.category}}</div>
                  <div class="notification-title">{{singleNotification.title}}</div>
                  <div v-if="singleNotification.description.length >= 160" class="notification-description-text">{{singleNotification.description.substring(0,160) + "..."}}</div>
                  <div v-else class="notification-description-text">{{singleNotification.description}}</div>
                  <div class="show-more-button">Ver más</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="notificationsTab == 'leidas'" class="notifications-board">
          <!-- Leídas -->
          <!-- {{contadorNotificacionesVistas}} -->
          <div v-if="contadorNotificacionesVistas == 0" style="text-align:center;">
            <b>Sin historial de notificaciones leídas</b>
          </div>
          <div v-else-if="contadorNotificacionesVistas > 0">
            <div v-for="singleNotification in allMyNotifications" v-bind:key="singleNotification.id">
              <!-- Falta esto: \/ -->
              <!-- @click="openSingleNotification()" -->
              <div v-if="singleNotification.seen == true">
                <!-- Falta esto: @click="openSingleNotification()" -->
                <div class="single-notification" @click="openSingleNotification(singleNotification.id, singleNotification.assist)">
                  <div class="notification-type">{{singleNotification.category}}</div>
                  <div class="notification-title">{{singleNotification.title}}</div>
                  <div v-if="singleNotification.description.length >= 160" class="notification-description-text">{{singleNotification.description.substring(0,160) + "..."}}</div>
                  <div v-else class="notification-description-text">{{singleNotification.description}}</div>
                  <div class="show-more-button">Ver más</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="myNotificationComponent" class="">
      <!-- <div class="single-notification-dummy-board">Notificación solo para demostración</div> -->
      <!-- {{singleNotificationID}} -->
      <!-- <div class="one-single-notification">
        <div class="o-s-n-title">Estado de salud de Juan</div>
        <div class="o-s-n-type">Enfermería</div>
        <div class="o-s-n-description">Estimada familia, te pedimos acudir lo más pronto posible a la sala de consultas del campus dado que su hijo Juan no se siente de lo mejor posible.</div>
        <div class="o-s-n-date">Fecha de notificación: <b>18/09/2019</b></div>
        <div class="o-s-n-first-row">
          <div class="o-s-n-first-row-value-1">Campus Escobedo</div>
          <div class="o-s-n-first-row-value-2">Grado 10</div>
          <div class="o-s-n-first-row-value-3">Grupo A</div>
        </div>
        <div>
          <div class="o-s-n-family-key">Familia C1Z3</div>
          <div class="o-s-n-kid-name">Juan Pedro López Ramírez</div>
        </div>
        <div class="assistance-and-status-div">
          <div class="o-s-n-assistance">Estado: <b>{{assistanceStatus}}</b></div>
          <div class="button-div"><q-btn color="primary" label="Asistiré" no-caps @click="changeStatus()"/></div>
          <div style="font-size:10px;color:red;text-align:center;padding-top:10px;">Este botón solo aparecerá para las notificaciones que sean <b>Citas</b> o <b>Invitaciones</b>.</div>
        </div>
      </div> -->
      <div class="one-single-notification">
        <div class="o-s-n-type">{{allMyNotifications[singleNotificationID-1].category}}</div>
        <div class="o-s-n-title">{{allMyNotifications[singleNotificationID-1].title}}</div>
        <div class="o-s-n-description">{{allMyNotifications[singleNotificationID-1].description}}</div>
        <div class="o-s-n-date">Fecha de notificación: <b>{{allMyNotifications[singleNotificationID-1].publication_date.substring(0,10)}}</b></div>
        <!-- role -->
        <!-- relationship -->
        <div class="o-s-n-first-row">
          <div v-if="allMyNotifications[singleNotificationID-1].campus != null" class="o-s-n-first-row-value-1">Campus {{allMyNotifications[singleNotificationID-1].campus}}</div>
          <div v-else class="o-s-n-first-row-value-1">Campus: No</div>
          <div v-if="allMyNotifications[singleNotificationID-1].grade != ''" class="o-s-n-first-row-value-2">Grado {{allMyNotifications[singleNotificationID-1].grade}}</div>
          <div v-else class="o-s-n-first-row-value-2">Grado: No</div>
          <div v-if="allMyNotifications[singleNotificationID-1].group != ''" class="o-s-n-first-row-value-3">Grupo {{allMyNotifications[singleNotificationID-1].group}}</div>
          <div v-else class="o-s-n-first-row-value-3">Grupo: No</div>
        </div>
        <div>
          <div v-if="allMyNotifications[singleNotificationID-1].family_key != null" class="o-s-n-family-key">Familia {{allMyNotifications[singleNotificationID-1].family_key}}</div>
          <div v-else class="o-s-n-family-key">Familia: Sin clave</div>
          <div v-if="allMyNotifications[singleNotificationID-1].student_name != null" class="o-s-n-kid-name">{{allMyNotifications[singleNotificationID-1].student_name}}</div>
          <div v-else class="o-s-n-kid-name">Sin estudiante</div>
        </div>
        <!-- Cuando se abra llamar a la función mounted para cambiar el estado a leído -->
        <!-- status -->
        <!-- Este será un botón para hacer el update -->
        <div class="assistance-and-status-div" v-if="allMyNotifications[singleNotificationID-1].assist == false && (allMyNotifications[singleNotificationID-1].category == 'Citas' || allMyNotifications[singleNotificationID-1].category == 'Invitaciones')">
          <div class="o-s-n-assistance">Estado: <b>No asistiré</b></div>
          <div class="button-div"><q-btn color="primary" label="Asistiré" no-caps @click="changeStatus(allMyNotifications[singleNotificationID-1].id, allMyNotifications[singleNotificationID-1].assist, allMyNotifications[singleNotificationID-1].seen)"/></div>
          <!-- <div style="font-size:10px;color:red;text-align:center;padding-top:10px;">Este botón solo aparecerá para las notificaciones que sean <b>Citas</b> o <b>Invitaciones</b>.</div> -->
        </div>
        <div class="assistance-and-status-div" v-if="allMyNotifications[singleNotificationID-1].assist == true && (allMyNotifications[singleNotificationID-1].category == 'Citas' || allMyNotifications[singleNotificationID-1].category == 'Invitaciones')">
          <div class="o-s-n-assistance">Estado: <b>Asistiré</b></div>
          <div class="button-div"><q-btn color="primary" label="No asistiré" no-caps @click="changeStatus(allMyNotifications[singleNotificationID-1].id, allMyNotifications[singleNotificationID-1].assist, allMyNotifications[singleNotificationID-1].seen)"/></div>
          <!-- <div style="font-size:10px;color:red;text-align:center;padding-top:10px;">Este botón solo aparecerá para las notificaciones que sean <b>Citas</b> o <b>Invitaciones</b>.</div> -->
        </div>
        <!-- event_id -->
      </div>
    </div>
    <div v-if="myNotificationCreation" class="">
      <div class="notification-creation-form">
        <div v-if="confirmationModal == true">
          <div v-if="confirmationPrimaryButtons">
            <div><b>¿Seguro que deseas enviar esta notificación?</b></div>
            <div style="width:50%;display:inline-block;"><q-btn color="red" label="Cancelar" no-caps @click="cancelConfirmationModal()"/></div>
            <div style="width:50%;display:inline-block;"><q-btn color="green" label="Enviar" no-caps @click="createNotification()"/></div>
          </div>
          <div v-else-if="confirmationSecondaryButtons">
            <div style="text-align:center;"><b>La notificación se ha envíado.</b></div>
            <div style="width:50%;display:inline-block;"><q-btn color="primary" label="Cerrar" no-caps @click="cancelConfirmationModal()"/></div>
          </div>
        </div>
        <div v-else-if="confirmationModal == false">
          <!-- Componente para el envío de notificaciones.<br> -->
          <div>Información requerida para el envío de la notificación:</div>
          <q-tabs v-model="tab">
            <q-tab name="padres" icon="people" label="Familia" no-caps/>
            <!-- <q-tab name="plantel" icon="school" label="Plantel" no-caps disable/> -->
            <q-tab name="administradores" icon="school" label="Plantel" no-caps/>
          </q-tabs>
          <!-- <div>{{tab}}</div> -->
          <!-- Tipo de notificación<br> -->
          <q-select v-model="tipoDeNotificacion" :options="notificaciones" label="Tipo de notificación" v-if="tab === 'padres' || tab === 'administradores'"/><br>
          <!-- Asunto de la notificación<br> -->
          <q-input v-model="tituloDeLaNotificacion" outlined label="Asunto de la notificación" v-if="tab === 'padres' || tab === 'plantel' || tab === 'administradores'"/><br>
          <!-- Descripción de la notificación<br> -->
          <!-- <q-input outlined label="Descripción de la notificación" /><br> -->
          <textarea v-model="descripcionDeLaNotificacion" class="notification-description" rows="5" placeholder="Descripción de la notificación"  v-if="tab === 'padres' || tab === 'plantel' || tab === 'administradores'"></textarea>
          <!-- Fecha de publicación<br> -->
          <div class="date-picker-button-and-date-value" v-if="tab === 'padres' || tab === 'plantel' || tab === 'administradores'">
            <div v-if="tipoDeNotificacion === 'Citas' || tipoDeNotificacion === 'Comunicados' || tipoDeNotificacion === 'Encuestas' || tipoDeNotificacion === 'Invitaciones' || tipoDeNotificacion === 'Nursery' || tipoDeNotificacion === 'Recordatorios'" class="just-date-picker">
              <q-btn round color="primary" icon="date_range" @click="showDatePickerFunction()"/>
            </div>
            <div class="just-date-value">Fecha seleccionada: <b>{{date}}</b></div>
          </div>
          <div v-if="showDatePicker && (tipoDeNotificacion === 'Citas' || tipoDeNotificacion === 'Comunicados' || tipoDeNotificacion === 'Encuestas' || tipoDeNotificacion === 'Invitaciones' || tipoDeNotificacion === 'Nursery' || tipoDeNotificacion === 'Recordatorios')">
            <q-date v-model="date" minimal/><br>
          </div>
          <br>
          <!-- Campus<br> -->
          <q-select filled multiple v-model="campus" :options="campuses" label="Campus(es)"  v-if="tab === 'plantel' || tab === 'administradores'"/>
          <br>
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
              <q-select filled multiple v-model="grado" :options="grados2" label="Grado(s)" />
            </div>
            <div v-else-if="campus === 'Barragán' || campus === 'Sendero'">
              <q-select filled multiple v-model="grado" :options="grados3" label="Grado(s)" />
            </div>
            <div v-else-if="campus === 'Prepa'">
              <q-select filled multiple v-model="grado" :options="grados4" label="Grado(s)" />
            </div>
            <div v-else>
              <q-select filled multiple v-model="grado" :options="grados" label="Grado(s)" />
            </div>
          </div>
          <!-- Grupo<br> -->
          <!-- <q-select v-model="grupo" :options="grupos" label="Elige un grupo"  v-if="tab === 'plantel'"/> -->
          <br>
          <q-select filled multiple v-model="grupo" :options="grupos" label="Grupo(s)"  v-if="tab === 'administradores'"/>
          <!-- Código de Familia<br> -->
          <br>
          <!-- <q-input v-model="familyKeyFormValue" outlined label="Ingresa la clave de familia"  v-if="tab === 'padres'"/><br> -->
          <!-- <q-select
            filled
            v-model="model"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="options"
            @filter="filterFn"
            hint="Basic autocomplete"
            style="width: 250px; padding-bottom: 32px"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select> -->
          <!--  -->
          <div v-if="tab === 'padres'">
            <div>Clave de Familia:</div>
            <div class="select-and-autocomplete-familykey">
              <q-select
                filled
                v-model="familyKeyFormValue"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="allFamilyKeysNotFiltered"
                @filter="filterFn"
                style="width: 250px;"
                class="a-fk-element-e1"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-btn @click="searchKidsOfFamilyKeySelected()" round color="primary" icon="search" class="a-fk-element-e2"/>
            </div>
            <div v-if="notSelectedFamilyKey" style="color:red;">Por favor selecciona una clave de familia</div>
            <div v-if="searchedKidsByFamilyKey.length > 0" class="allowed-kids-to-select-sign">Hijos disponibles para seleccionar</div>
            <div v-for="kid in searchedKidsByFamilyKey" v-bind:key="kid.id">
                <div class="kid-from-family-key-searched" @click="addRemoveFamilyKid(kid.full_name)">{{kid.full_name}} - {{kid.grade}} - {{kid.group}}</div>
            </div>
            <div class="selected-kids-section">
              <div class="counter-kids">Hijos seleccionados: <b>{{studentNamesToSend.length}}</b></div>
              <div v-for=" kidName in studentNamesToSend" v-bind:key="kidName.id">
                <div>{{kidName}}</div>
              </div>
            </div>
          </div>
          <!-- {{familyKeyFormValue}} -->
          <!--  -->
          <!-- Matrícula<br> -->
          <!-- <q-input v-model="matriculaFormValue" outlined label="Ingresa la matrícula" /><br> -->
          <!-- Nombre del estudiante<br> -->
          <!-- <q-input v-model="studentNameFormValue" outlined label="Ingresa el nombre de el o la estudiante" /> -->
          <div class="container-for-creating-notification-button">
            <div v-for="error in createNotificationErrors" v-bind:key="error.id" class="notifications-errors-container">
              <div class="individual-notification-error">{{error}}</div>
            </div>
            <!-- <q-btn color="primary" label="Enviar Notificación" no-caps @click="createNotification()"/> -->
            <q-btn color="primary" label="Enviar Notificación" no-caps @click="openConfirmationModal()"/>
          </div>
          <!-- </div> -->
      </div>
      </div>
    </div>
    <div v-if="notificationStatus" class="notification-search-modal">
      <!-- Este es el componente para el estado de las notificaciones -->
      <!-- Botón de busqueda de notificación -->
      <div v-if="formaDeBusquedaDeLaNotificacion">
        <q-btn color="primary" class="full-width q-mt-md" label="Buscar notificación/notificaciones" @click="searchNotifications()" no-caps/><br>
        <!-- Tipo de notificación -->
        <div style="font-weight:bold;margin-top:10px;margin-bottom:5px;text-align:center;">Criterios para la búsqueda de la notificación:</div>
        <q-select v-model="tipoDeNotificacionBusqueda" :options="notificacionesBusqueda" label="Tipo de notificación"/><br>
        <!-- Asunto de la notificación -->
        <q-input v-model="tituloDeLaNotificacionBusqueda" outlined label="Asunto de la notificación"/><br>
        <!-- Descripción de la notificación -->
        <textarea v-model="descripcionDeLaNotificacionBusqueda" class="notification-description" rows="5" placeholder="Descripción de la notificación"></textarea><br><br>
        <!-- Fecha de la notificación -->
        <div style="text-align:center;">
          <q-date v-model="dateForNotificationSearch" minimal/><br><br>
        </div>
        <!-- Clave de Familia -->
        <q-input v-model="familyKeyForNotificationSearch" outlined label="Clave de Familia"/><br>
        <!-- Selección de hijos -->
        <!-- Queda pendiente -->
        <!-- Campus -->
        <q-select filled multiple v-model="campusBusqueda" :options="campusesBusqueda" label="Campus(es)" /><br>
        <!-- Grado -->
        <q-select filled multiple v-model="gradoBusqueda" :options="gradosBusqueda" label="Grado(s)" /><br>
        <!-- Grupo -->
        <q-select filled multiple v-model="grupoBusqueda" :options="gruposBusqueda" label="Grupo(s)" />
      </div>
      <div v-if="resultadosDeLaBusqueda">
        <q-btn color="primary" class="full-width q-mt-md" label="Regresar a la búsqueda de notificaciones" @click="getBackToNotificationsSearch()" no-caps/><br>
        <div class="single-notification" @click="openSingleNotificationFromSearchBar()">
          <div class="notification-type">Disciplina</div>
          <div class="notification-title">Reporte de conducta de Juan</div>
          <div v-if="descripcionDeNotificacionDePrueba.length >= 160" class="notification-description-text">{{descripcionDeNotificacionDePrueba.substring(0,160) + "..."}}</div>
          <div v-else class="notification-description-text">{{descripcionDeNotificacionDePrueba}}</div>
          <div class="show-more-button">Ver más</div>
        </div>
        <div class="single-notification" @click="openSingleNotificationFromSearchBar()">
          <div class="notification-type">Enfermería</div>
          <div class="notification-title">Estado de salud de Karla</div>
          <div class="notification-description-text">Estimada familia, favor de acudir lo más pronto posible por Karla dado su estado de salud.</div>
          <div class="show-more-button">Ver más</div>
        </div>
        <div class="single-notification" @click="openSingleNotificationFromSearchBar()">
          <div class="notification-type">Invitaciones</div>
          <div class="notification-title">¡Felices fiestas patrias!</div>
          <div class="notification-description-text">Queridas familias, las invitamos al Campus Escobedo a celular el 16 de Septiembre.</div>
          <div class="show-more-button">Ver más</div>
        </div>
      </div>
      <div v-if="notificacionDeLaBusqueda">
        <q-btn color="primary" class="full-width q-mt-md" label="Regresar a las notificaciones encontradas" @click="getBackToNotificationsResults()" no-caps/><br>
        <div class="o-s-n-title">Estado de salud de Juan</div>
        <div class="o-s-n-type">Enfermería</div>
        <div class="o-s-n-description">Estimada familia, te pedimos acudir lo más pronto posible a la sala de consultas del campus dado que su hijo Juan no se siente de lo mejor posible.</div>
        <div class="o-s-n-date">Fecha de notificación: <b>18/09/2019</b></div>
        <div class="o-s-n-first-row">
          <div class="o-s-n-first-row-value-1">Campus Escobedo</div>
          <div class="o-s-n-first-row-value-2">Grado 10</div>
          <div class="o-s-n-first-row-value-3">Grupo A</div>
        </div>
        <div>
          <div class="o-s-n-family-key">Familia C1Z3</div>
          <div class="o-s-n-kid-name">Juan Pedro López Ramírez</div>
        </div>
        <div class="assistance-and-status-div">
          <div class="o-s-n-assistance">Estado: <b>{{assistanceStatus}}</b></div>
          <div class="button-div"><q-btn color="primary" label="Asistiré" no-caps /></div>
          <div style="font-size:10px;color:red;text-align:center;padding-top:10px;">Este botón solo aparecerá para las notificaciones que sean <b>Citas</b> o <b>Invitaciones</b>.</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { openURL, date } from 'quasar'
import axios from 'axios'
// import { ENGINE_METHOD_DSA } from 'constants'
// import { TIMEOUT } from 'dns'
// import { ui, filter } from 'quasar'
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
      // date: '2019/02/01',
      // date: date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
      // date: date.formatDate(Date.now(), 'YYYY/MM/DD'),
      date: date.formatDate(Date.now(), 'YYYY/MM/DD'),
      campus: null,
      campuses: ['Todos los campus', 'Anáhuac', 'Barragán', 'Concordia', 'Sendero', 'Prepa'],
      tab: 'padres',
      tab2: 'madre',
      notificationsTab: 'noleidas',
      campusInterno: null,
      grado: [],
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
      grupo: [],
      grupos: ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Otro'],
      morePersonalization: false,
      showDatePicker: false,
      tipoDeNotificacion: '',
      notificaciones: ['Citas', 'Comunicados', 'Disciplina', 'Enfermería', 'Encuestas', 'Invitaciones', 'Nursery', 'Recordatorios'],
      notificationsLength: 0,
      myNotificationComponent: false,
      assistanceStatus: 'No asistiré',
      unreadNotifications: 6,
      createNotificationErrors: [],
      familyKeyFormValue: '',
      matriculaFormValue: '',
      studentNameFormValue: '',
      tituloDeLaNotificacion: '',
      contadorNotificacionesNoVistas: 0,
      contadorNotificacionesVistas: 0,
      descripcionDeNotificacionDePrueba: 'Estimada familia, te invitamos a que asistas lo más pronto posible a la oficina de disciplina.',
      allFamilyKeys: [],
      allFamilyKeysNotFiltered: [],
      notSelectedFamilyKey: false,
      searchedKidsByFamilyKey: [],
      descripcionDeLaNotificacion: '',
      familyKeysInArray: [],
      roleToSend: '',
      notification: {},
      allMyNotifications: [],
      allMySeenNotifications: 0,
      allMyNotSeenNotifications: 0,
      singleNotificationID: null,
      confirmationModal: false,
      confirmationPrimaryButtons: true,
      confirmationSecondaryButtons: false,
      studentNamesToSend: [],
      notificationStatus: false,
      // Variables para la búsqueda de una notificación
      tipoDeNotificacionBusqueda: '',
      notificacionesBusqueda: ['Citas', 'Comunicados', 'Disciplina', 'Enfermería', 'Encuestas', 'Invitaciones', 'Nursery', 'Recordatorios'],
      tituloDeLaNotificacionBusqueda: '',
      descripcionDeLaNotificacionBusqueda: '',
      dateForNotificationSearch: date.formatDate(Date.now(), 'YYYY/MM/DD'),
      familyKeyForNotificationSearch: '',
      campusBusqueda: null,
      campusesBusqueda: ['Todos los campus', 'Anáhuac', 'Barragán', 'Concordia', 'Sendero', 'Prepa'],
      gradoBusqueda: [],
      gradosBusqueda: [
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
      grupoBusqueda: [],
      gruposBusqueda: ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Otro'],
      formaDeBusquedaDeLaNotificacion: true,
      resultadosDeLaBusqueda: false,
      notificacionDeLaBusqueda: false
    }
  },
  mounted () {
    this.getUserInformation()
    // this.getUserKids()
    // this.getKidsByFamilyID()
    this.loginVerification()
    this.getMyNotifications()
    this.getNotificationCountersByUserID()
    this.getAllFamilyKeys()
    // this.functionForTesting()
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
    searchNotifications () {
      var self = this
      self.formaDeBusquedaDeLaNotificacion = false
      self.resultadosDeLaBusqueda = true
      self.notificacionDeLaBusqueda = false
    },
    openSingleNotificationFromSearchBar () {
      var self = this
      self.formaDeBusquedaDeLaNotificacion = false
      self.resultadosDeLaBusqueda = false
      self.notificacionDeLaBusqueda = true
    },
    getBackToNotificationsResults () {
      var self = this
      self.formaDeBusquedaDeLaNotificacion = false
      self.resultadosDeLaBusqueda = true
      self.notificacionDeLaBusqueda = false
    },
    getBackToNotificationsSearch () {
      var self = this
      self.formaDeBusquedaDeLaNotificacion = true
      self.resultadosDeLaBusqueda = false
      self.notificacionDeLaBusqueda = false
    },
    cancelConfirmationModal () {
      var self = this
      self.confirmationModal = false
      self.confirmationPrimaryButtons = true
      self.confirmationSecondaryButtons = false
    },
    openConfirmationModal () {
      var self = this
      self.confirmationModal = true
    },
    functionForTesting () {
      // var self = this
      console.log(window.localStorage.getItem('token'))
      console.log('------------------------------------')
      console.log('Función para pruebas')
      // var completeUrl = 'https://oxford-app-api.herokuapp.com/v1/notifications/update_notification/1'
      axios.post('https://oxford-app-api.herokuapp.com/v1/notifications/update_notification/1', {
        // Parámetros
        notification: {
          assist: true,
          seen: true
        }
      },
      { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      console.log('------------------------------------')
    },
    createNotification () {
      var self = this
      console.log(self.familyKeyFormValue === '')
      /**/
      // self.date = date.formatDate(new Date(self.date(), self.date(), self.date()), 'YYYY/MM/DD')
      console.log('Antes: ' + self.date)
      /*
      var temporaryDate = self.date
      if (self.tipoDeNotificacion === 'Disciplina' || self.tipoDeNotificacion === 'Enfermería') {
        console.log('Entré')
        // temporaryDate = date.formatDate(Date.now(), 'DD/MM/YYYY')
        temporaryDate = date.formatDate(Date.now(), 'DD/MM/YYYY')
      } else {
        // temporaryDate = date.formatDate(temporaryDate, 'DD/MM/YYYY')
        temporaryDate = date.formatDate(self.date, 'DD/MM/YYYY')
      }
      self.date = temporaryDate
      */
      if (self.tipoDeNotificacion === 'Disciplina' || self.tipoDeNotificacion === 'Enfermería') {
        self.date = date.formatDate(Date.now(), 'YYYY/MM/DD')
      }
      // self.date = date.formatDate(self.date, 'DD/MM/YYYY')
      console.log('Después: ' + self.date)
      /**/
      self.createNotificationErrors = []
      // var token = window.localStorage.getItem('token')
      // console.log(token)
      // var completeUrl = 'https://oxford-app-api.herokuapp.com/v1/notifications'
      /*
      if (self.tipoDeNotificacion === 'Enfermería' || self.tipoDeNotificacion === 'Disciplina' || self.tipoDeNotificacion === 'Citas') {
        if (self.studentNameFormValue === '') {
          self.createNotificationErrors.push('Para este tipo de notificación se tiene que seleccionar el nombre de un estudiante.')
          // La notificación no se podría realizar
        }
      }
      */
      // console.log('Entré')
      if (self.tab === 'padres') {
        // console.log('Entré 2')
        /*
          Asunto
          Descripción
          Fecha
          Clave de Familia
          <----->
          -> La fecha tiene que ser el día de hoy
          tituloDeLaNotificacion
          descripcionDeLaNotificacion
          date
          familyKeyFormValue
        */
        self.familyKeysInArray = []
        self.familyKeysInArray.push(self.familyKeyFormValue)
        if ((self.tituloDeLaNotificacion !== '') && (self.descripcionDeLaNotificacion !== '') && (self.familyKeyFormValue !== '') && (self.tipoDeNotificacion !== '')) {
          // console.log('Se enviará la información de la notificación')
          // console.log('Entré 3')
          var roleToSend = ''
          // console.log(self.tab)
          if (self.tab === 'padres') {
            // console.log('-1')
            roleToSend = 'PARENT'
            // self.roleToSend = 'ADMIN'
          } else if (self.tab === 'administradores') {
            // console.log('-2')
            roleToSend = 'ADMIN'
            // self.roleToSend = 'PARENT'
          } else {
            // console.log('No entré')
          }
          self.notification = {
            category: self.tipoDeNotificacion,
            title: self.tituloDeLaNotificacion,
            description: self.descripcionDeLaNotificacion,
            publication_date: date.formatDate(self.date, 'DD/MM/YYYY'),
            role: roleToSend,
            family_keys: self.familyKeysInArray,
            student_names: self.studentNamesToSend
          }
          console.log(self.notification)
          // var completeUrl = 'https://oxford-app-api.herokuapp.com/v1/notifications/'
          /*
          axios.get(completeUrl, {
            headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Content-Type': 'application/json' },
            notification: self.notificacion
          })
            .then(function (response) {
              self.confirmationPrimaryButtons = false
              self.confirmationSecondaryButtons = true
              console.log(response)
              // -----
              // self.tipoDeNotificacion = ''
              // self.tituloDeLaNotificacion = ''
              // self.descripcionDeLaNotificacion,
              // publication_date: date.formatDate(self.date, 'DD/MM/YYYY'),
              // self.date = date.formatDate(Date.now(), 'YYYY/MM/DD')
              // role: roleToSend,
              // family_keys: self.familyKeysInArray
            })
            .catch(function (error) {
              console.log(error)
            })
            */
          axios.post('https://oxford-app-api.herokuapp.com/v1/notifications/', {
            notification: self.notification
          },
          { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
            .then(function (response) {
              self.confirmationPrimaryButtons = false
              self.confirmationSecondaryButtons = true
              console.log(response)
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        if (self.tituloDeLaNotificacion === '') {
          self.createNotificationErrors.push('Se debe escribir el asunto de la notificación')
          // console.log('Entré 4')
          self.confirmationModal = false
        }
        if (self.descripcionDeLaNotificacion === '') {
          self.createNotificationErrors.push('Se debe de escribir la descripción de la notificación')
          // console.log('Entré 5')
          self.confirmationModal = false
        }
        if (self.familyKeyFormValue === '') {
          self.createNotificationErrors.push('Se debe seleccionar un tipo de notificación')
          // console.log('Entré 6')
          self.confirmationModal = false
        }
        if (self.familyKeyFormValue === '') {
          self.createNotificationErrors.push('Se debe seleccionar una clave de familia')
          // console.log('Entré 7')
          self.confirmationModal = false
        }
      } else if (self.tab === 'plantel') {
        /*
          No se hará nada hasta el momento
        */
      } else if (self.tab === 'administradores') {
        // self.familyKeysInArray = []
        // console.log('Hola')
        /* Esta funcionalidad esta pendiente aún */
        /*
          Tipo de Notificación
          Asunto de la Notificación
          Descripción de la notificación
          Rol
          Campus
          Fecha seleccionada
          Grado
        */
        // self.familyKeysInArray = []
        var roleToSendInAdministrationTab = 'ADMIN'
        console.log('Entré')
        // && self.grado !== null
        if (self.campus !== null && self.tipoDeNotificacion !== '' && self.descripcionDeLaNotificacion !== '' && self.tituloDeLaNotificacion !== '') {
          var notificationX = {
            category: self.tipoDeNotificacion,
            title: self.tituloDeLaNotificacion,
            description: self.descripcionDeLaNotificacion,
            publication_date: date.formatDate(self.date, 'DD/MM/YYYY'),
            role: roleToSendInAdministrationTab,
            campuses: self.campus,
            grades: self.grado,
            groups: self.grupo
          }
          console.log(notificationX)
          // Aquí se hará el envío de la notificación
          // var completeUrlForAdministratorsNotification = 'https://oxford-app-api.herokuapp.com/v1/notifications/'
          /*
          axios.get(completeUrlForAdministratorsNotification, {
            headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Content-Type': 'application/json' },
            notification: notification
          })
            .then(function (response) {
              self.confirmationPrimaryButtons = false
              self.confirmationSecondaryButtons = true
              console.log(response)
            })
            .catch(function (error) {
              console.log(error)
            })
            */
          axios.post('https://oxford-app-api.herokuapp.com/v1/notifications/', {
            notification: notificationX
          },
          { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
            .then(function (response) {
              self.confirmationPrimaryButtons = false
              self.confirmationSecondaryButtons = true
              console.log(response)
            })
            .catch(function (error) {
              console.log('----')
              console.log(error)
              console.log('----')
            })
        }
        if (self.campus === null) {
          self.createNotificationErrors.push('Se debe seleccionar por lo menos un campus')
          self.confirmationModal = false
        }
        if (self.tipoDeNotificacion === '') {
          self.createNotificationErrors.push('Se debe seleccionar un tipo de notificación')
          self.confirmationModal = false
        }
        if (self.descripcionDeLaNotificacion === '') {
          self.createNotificationErrors.push('Se debe ingregar la descripción de la notificación')
          self.confirmationModal = false
        }
        /*
        if (self.grado === null) {
          self.createNotificationErrors.push('Se debe seleccionar por lo menos un grado')
          self.confirmationModal = false
        }
        */
        if (self.tituloDeLaNotificacion === '') {
          self.createNotificationErrors.push('Se debe de ingresar el título de la notificación')
          self.confirmationModal = false
        }
      }
    },
    addRemoveFamilyKid (kidFullName) {
      // console.log(kidFullName)
      var self = this
      var eliminador = false
      var posicion = null
      // console.log(kidFullName in self.studentNamesToSend)
      /*
      if (kidFullName in self.studentNamesToSend) {
        for (var i = 0; i < self.studentNamesToSend.length; i++) {
          if (self.studentNamesToSend[i] === kidFullName) {
            self.studentNamesToSend = self.studentNamesToSend.splice(i, 1)
          }
        }
      } else {
        self.studentNamesToSend.push(kidFullName)
      }
      */
      for (var i = 0; i < self.studentNamesToSend.length; i++) {
        if (self.studentNamesToSend[i] === kidFullName) {
          // self.studentNamesToSend = self.studentNamesToSend.splice(i, 1)
          eliminador = true
          posicion = i
          console.log('Se encontró a ' + kidFullName + ' en el arreglo')
        }
      }
      if (eliminador) {
        // self.studentNamesToSend = self.studentNamesToSend.splice(posicion, 1)
        self.studentNamesToSend.splice(posicion, 1)
        console.log('Se eliminó a ' + kidFullName + ' del arreglo')
      } else {
        console.log('Se agregó a ' + kidFullName + ' en el arreglo')
        self.studentNamesToSend.push(kidFullName)
      }
      // eliminador = false
    },
    openSingleNotification (notificationID, notificationAssist) {
      // console.log()
      console.log('Acabo de entrar a hacer que la notificación se haga vista por primera vez')
      var self = this
      console.log('ID de la notificación: ' + notificationID)
      console.log('Asistencia de la notificación: ' + notificationAssist)
      /**/
      var completeUrl = 'https://oxford-app-api.herokuapp.com/v1/notifications/update_notification/' + notificationID
      console.log(completeUrl)
      var token = window.localStorage.getItem('token')
      console.log(token)
      /*
      axios.post(completeUrl, {
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        notification: {
          assist: notificationAssist,
          seen: true
        }
      })
        .then(function (response) {
          console.log(response)
          self.getMyNotifications()
        })
        .catch(function (error) {
          console.log(error)
        })
        */
      axios.post('https://oxford-app-api.herokuapp.com/v1/notifications/update_notification/' + notificationID, {
        // Parámetros
        notification: {
          assist: notificationAssist,
          seen: true
        }
      },
      { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
        .then(function (response) {
          console.log(response)
          self.getMyNotifications()
          self.getNotificationCountersByUserID()
        })
        .catch(function (error) {
          console.log(error)
        })
      /**/
      self.singleNotificationID = notificationID
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
    changeStatus (singleNotificationID, singleNotificationAssist, singleNotificationSeen) {
      var self = this
      // ESTA ES PARA CUANDO SE SELECCIONA EL BOTÓN DE ASISTIR O NO ASISTIR
      // console.log('Prueba')
      // var self = this
      // if (self.assistanceStatus === 'No asistiré') {
      //   self.assistanceStatus = 'Asistiré'
      // } else if (self.assistanceStatus === 'Asistiré') {
      //   self.assistanceStatus = 'No asistiré'
      // }
      // console.log(singleNotificationID)
      // console.log(singleNotificationStatus)
      var assist = singleNotificationAssist
      if (assist === true) {
        assist = false
      } else if (assist === false) {
        assist = true
      }
      // var completeUrl = 'https://oxford-app-api.herokuapp.com/v1/notifications/update_notification/1'
      // var token = window.localStorage.getItem('token')
      /*
      axios.post(completeUrl, {
        headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Content-Type': 'application/json' },
        notification: {
          seen: singleNotificationSeen,
          assist: assist
        }
      })
        .then(function (response) {
          console.log(response)
          self.getMyNotifications()
        })
        .catch(function (error) {
          console.log(error)
        })
      */
      /*
      axios.post(completeUrl, {
        notification: {
          seen: true,
          assist: true
        }
      },
      { headers: { 'Authorization:': token, 'Content-Type:': 'application/json' } })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          alert(error)
        })
        */
      axios.post('https://oxford-app-api.herokuapp.com/v1/notifications/update_notification/' + singleNotificationID, {
        // Parámetros
        notification: {
          assist: assist,
          seen: singleNotificationSeen
        }
      },
      { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Content-Type': 'application/json' } })
        .then(function (response) {
          self.getMyNotifications()
          self.getNotificationCountersByUserID()
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getNotificationCountersByUserID () {
      var self = this
      var completeUrl = 'https://oxford-app-api.herokuapp.com/v1/notifications/notification_counters/' + window.localStorage.getItem('id')
      axios.get(completeUrl, {
        headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token') }
      })
        .then(function (response) {
          console.log('Se obtuvieron los counters de las notificaciones leídas y no leídas')
          console.log(response)
          console.log(response.data.not_seen_notifications)
          console.log(response.data.seen_notifications)
          self.contadorNotificacionesNoVistas = response.data.not_seen_notifications
          self.contadorNotificacionesVistas = response.data.seen_notifications
          console.log(self.contadorNotificacionesNoVistas)
          console.log(self.contadorNotificacionesVistas)
        })
        .catch(function (error) {
          // console.log('No se obtuvieron los counters de las notificaciones leídas y no leídas')
          console.log(error)
        })
    },
    getAllFamilyKeys () {
      var self = this
      var completeUrl = 'https://oxford-app-api.herokuapp.com/v1/all_family_keys'
      axios.get(completeUrl, {
        headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token') }
      })
        .then(function (response) {
          // console.log('Se obtuvieron todas las family keys')
          // console.log(response)
          self.allFamilyKeys = response.data.family_keys
          // console.log(self.allFamilyKeys)
        })
        .catch(function (error) {
          // console.log('No se obtuvieron todas las family keys')
          console.log(error)
        })
    },
    getMyNotifications () {
      var self = this
      var completeUrl = 'https://oxford-app-api.herokuapp.com/v1/notifications'
      axios.get(completeUrl, {
        headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token') }
      })
        .then(function (response) {
          // console.log('Se obtuvieron las notificaciones')
          // self.notificationsLength = response.data.length
          // console.log(self.notificationsLength)
          console.log(response)
          self.allMyNotifications = response.data
          console.log(self.allMyNotifications)
          self.notificationsLength = self.allMyNotifications.length
          console.log(self.allMyNotifications.length)
          for (var i = 0; i < self.allMyNotifications.length; i++) {
            if (self.allMyNotifications[i].seen === false) {
              self.allMyNotSeenNotifications++
            }
          }
          console.log('Notificaciones no leídas: ' + self.allMyNotSeenNotifications)
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
      } else if (linkValue === 'horarioDeCaja') {
        window.open('https://oxfordschool.edu.mx/index.aspx?seccion=noticias&id=2900')
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
      self.notificationStatus = false
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
      self.notificationStatus = false
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
      self.notificationStatus = false
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
      self.notificationStatus = false
    },
    openNotificationCreation () {
      var self = this
      self.title = 'Envío de Notificación'
      self.inicio = false
      self.leftDrawerOpen = false
      self.myInformation = false
      self.myFamily = false
      self.myLinks = false
      self.myNotificationCreation = true
      self.myNotifications = false
      self.myNotificationComponent = false
      self.notificationStatus = false
    },
    openNotificationStatus () {
      var self = this
      self.title = 'Estado de Notificación'
      self.notificationStatus = true
      self.inicio = false
      self.leftDrawerOpen = false
      self.myInformation = false
      self.myFamily = false
      self.myLinks = false
      self.myNotificationCreation = false
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
      self.notificationStatus = false
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
    },
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.allFamilyKeysNotFiltered = this.allFamilyKeys.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    searchKidsOfFamilyKeySelected () {
      var self = this
      if (self.familyKeyFormValue !== '') {
        self.notSelectedFamilyKey = false
        var token = window.localStorage.getItem('token')
        var completeUrl = 'https://oxford-app-api.herokuapp.com/v1/kids/by_family_key/' + self.familyKeyFormValue
        axios.get(completeUrl, {
          headers: { 'Authorization': 'Bearer ' + token }
        })
          .then(function (response) {
            // console.log('Hay niños de la clave de familia seleccionada')
            // console.log(response)
            self.searchedKidsByFamilyKey = response.data
            // console.log(self.searchedKidsByFamilyKey)
          })
          .catch(function (error) {
            // console.log('No hay niños de la clave de familia seleccionada')
            console.log(error)
          })
      } else {
        self.notSelectedFamilyKey = true
      }
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
  .select-and-autocomplete-familykey{
    /* background-color: green; */
    /* width: 100%; */
    /* text-align: center; */
    /* display: inline-block; */
    /* height: auto; */
  }
  .a-fk-element-e1{
    display: inline-block;
    /* width: 90%; */
  }
  .a-fk-element-e2{
    display: inline-block;
    /* width: 25%; */
    margin-left: 5px;
  }
  .kid-from-family-key-searched{
    border: 1px solid #DCDCDC;
    font-size: 8pt;
    border-radius: 2.5px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .notifications-board{
    border: 1px solid #DCDCDC;
    height: 100;
    /* bottom: 0; */
    margin: 5px 5px 5px 5px;
  }
  .counter-kids{
    margin-top: 5px;
    margin-bottom: 5px;
    /* text-align: left; */
    font-size: 10pt;
  }
  .selected-kids-section{
    border: 1px solid #1E90FF;
    margin-top: 10px;
  }
  .allowed-kids-to-select-sign{
    font-weight: bold;
    margin-bottom: 5px;
  }
  .notification-search-modal{
    margin-bottom: 10px;
    margin-right: 10px;
    margin-left: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
