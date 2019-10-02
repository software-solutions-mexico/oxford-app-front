(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["5ba0e712"],{"56b4":function(a,n,e){"use strict";e.r(n);var o=function(){var a=this,n=a.$createElement,e=a._self._c||n;return e("q-page",[e("div",{staticClass:"top-banner"},[a._v("Crea tu cuenta familiar")]),e("q-input",{staticClass:"field-input",attrs:{outlined:"",label:"Nombre de padre",type:"text"},model:{value:a.nombre,callback:function(n){a.nombre=n},expression:"nombre"}}),a.noName?e("div",{staticClass:"missing-information"},[a._v("Ingresa tu nombre")]):a._e(),e("q-input",{staticClass:"field-input",attrs:{outlined:"",label:"Correo electrónico",type:"text"},model:{value:a.correo,callback:function(n){a.correo=n},expression:"correo"}}),a.noEmail?e("div",{staticClass:"missing-information"},[a._v("Ingresa tu correo electrónico")]):a._e(),e("q-input",{staticClass:"field-input",attrs:{outlined:"",label:"Contraseña",type:"password"},model:{value:a.contrasena1,callback:function(n){a.contrasena1=n},expression:"contrasena1"}}),a.noPassword?e("div",{staticClass:"missing-information"},[a._v("Ingresa tu contraseña")]):a._e(),e("q-input",{staticClass:"field-input",attrs:{outlined:"",label:"Confirma tu contraseña",type:"password"},model:{value:a.contrasena2,callback:function(n){a.contrasena2=n},expression:"contrasena2"}}),a.noPasswordConfirmation?e("div",{staticClass:"missing-information"},[a._v("Confirma tu contraseña")]):a._e(),a.noPasswordMatching?e("div",{staticClass:"missing-information"},[a._v("Las contraseñas no coinciden")]):a._e(),e("q-input",{staticClass:"field-input",attrs:{outlined:"",label:"Clave de familia",type:"text"},model:{value:a.claveFamilia,callback:function(n){a.claveFamilia=n},expression:"claveFamilia"}}),a.noFamilyKey?e("div",{staticClass:"missing-information"},[a._v("Ingresa tu clave de familia")]):a._e(),a.noRegisteredUser?e("div",{staticClass:"missing-information"},a._l(a.errors,function(n){return e("div",{key:n.id},["Family key not found"==n?e("div",[a._v("Clave de familia no encontrada")]):a._e(),"Email has already been taken"==n?e("div",[a._v("El email ya se encuentra en uso")]):a._e(),"Email is invalid"==n?e("div",[a._v("El email es inválido")]):a._e(),"Password is too short (minimum is 6 characters)"==n?e("div",[a._v("La contraseña es muy corta (Mínimo 6 caracteres)")]):a._e()])}),0):a._e(),e("div",{staticClass:"option-container"},[e("q-btn",{attrs:{loading:a.loading1,color:"white","text-color":"black","no-caps":"",label:"Crear cuenta"},on:{click:function(n){return a.registerAccount()}}})],1),e("div",{staticClass:"option-container"},[e("span",{on:{click:function(n){return a.home()}}},[a._v("Volver al inicio")])]),a.usuarioRegistrado?e("div",{staticClass:"registered-user-curtain"},[e("div",{staticClass:"registered-user-modal"},[e("div",{staticClass:"background-container"},[e("div",{staticClass:"block-left"},[a._v("El usuario se ha registrado exitosamente")]),e("q-btn",{attrs:{color:"primary","no-caps":"",label:"Ir a inicio de sesión"},on:{click:function(n){return a.home()}}})],1)])]):a._e()],1)},i=[],s=e("bc3a"),t=e.n(s),r={name:"PageIndex",data:function(){return{loading1:!1,nombre:"",correo:"",contrasena1:"",contrasena2:"",claveFamilia:"",usuarioRegistrado:!1,noName:!1,noEmail:!1,noPassword:!1,noPasswordConfirmation:!1,noPasswordMatching:!1,noFamilyKey:!1,noRegisteredUser:!1,errors:[]}},methods:{home:function(){var a=this;a.$router.push("/")},registerAccount:function(){this["loading1"]=!0;var a=this;a.noName=!1,a.noEmail=!1,a.noPassword=!1,a.noPasswordConfirmation=!1,a.noPasswordMatching=!1,a.noFamilyKey=!1,a.noRegisteredUser=!1,""!==a.nombre&&""!==a.correo&&""!==a.contrasena1&&""!==a.contrasena2&&""!==a.claveFamilia&&a.contrasena1===a.contrasena2?t.a.post("https://oxford-app-api.herokuapp.com/v1/users",{user:{name:a.nombre,email:a.correo,password:a.contrasena1,password_confirmation:a.contrasena2,role:"parent",family_key:a.claveFamilia}}).then(function(n){a.usuarioRegistrado=!0,a["loading1"]=!1}).catch(function(n){a.noRegisteredUser=!0,a["loading1"]=!1,a.errors=n.response.data.errors}):(a["loading1"]=!1,""===a.nombre&&(a.noName=!0),""===a.correo&&(a.noEmail=!0),""===a.contrasena1&&(a.noPassword=!0),""===a.contrasena2&&(a.noPasswordConfirmation=!0),a.contrasena1!==a.contrasena2&&(a.noPasswordMatching=!0),""===a.claveFamilia&&(a.noFamilyKey=!0))}}},c=r,l=(e("ac59"),e("2877")),d=Object(l["a"])(c,o,i,!1,null,null,null);n["default"]=d.exports},"78db":function(a,n,e){},ac59:function(a,n,e){"use strict";var o=e("78db"),i=e.n(o);i.a}}]);