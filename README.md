# SIGESCO

<img src="https://res.cloudinary.com/ddzlqebet/image/upload/v1613667716/TedescoDev/proyectos/sigesco-inicio_imlazm.png">

_SIGESCO es un sistema cliente de gestión y control desarrollado en Vue.js, basado en la arquitectura cliente/servidor. Está orientado el sector retail con el fin de proporcionar herramientas tecnológicas analíticas y de gestión a las pequeñas y medianas empresas._

_El sistema actualmente gestiona el almacén a través de categorías y los diferentes artículos en stock. Se gestionan los ingresos al almcacen a traves de provedores y las salidad (ventas) en un sistema de inventario eficaz. A su vez, existen modulos independientes para poder dar de alta y gestionar todo lo referente a los clientes y provedores._

_Se manejan tres tipos de usuarios definidos tales como Administrador, Vendedor, Almacenero, y dependiendo su rol serán los permisos para operar en el sistema. Cabe destacar que esto es totalmente personalizable._

_La idea es poder seguir desarrollando nuevos modulos como la gestion de reportes o deudas. Tambien lograr mejorar la performance de los mismos mediante refactorizaciones y colaboraciones de los desarrolladores._
## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mira **Despliegue** para conocer como desplegar el proyecto.


### Pre-requisitos 📋

_Que cosas necesitas para instalar el software y como instalarlas_

```
Lo primero que necesitas para comenzar a usar el software es tener Node.js instalado en tu sistema.
```

### Instalación 🔧

_Una serie de ejemplos paso a paso que te dice lo que debes ejecutar para tener un entorno de desarrollo ejecutandose_

_Instala las dependencias del proyecto_

```
npm install
```

_Ejecuta el proyecto_

```
npm run serve
```

_Para lograr hacer funcionar correctamente el sistema, necesitarás una api que te provea datos en formato JSON. Recuerda que este es solo un cliente en la arquitectura. Si necesitas utilizar una api de pruebas, muevete a la rama mongoBack y define en el mains.js la url https://sigesco.tedesco.es/api/_

## Despliegue 📦

_Para poder desplegar la app, debes generar un bundle que se ubicara en la carpeta disti y subir el contenido a la raiz publica cualquier dominio que use Apache o Ngnix_
```
npm run build
```
## Construido con 🛠️

* [Vue](https://vuejs.org/) - El framework JS usado
* [Vuetify](https://vuetifyjs.com/en/) - Framework CSS
* [Chartjs](https://www.chartjs.org/) - Librería para generar gráficas interactivas
* [Axios](https://github.com/axios/axios) - Librería para realizar peticiones HTTP
* [Html2canvas](https://html2canvas.hertzen.com/) - Librería para generar Screenshots
* [jsPDF](http://raw.githack.com/MrRio/jsPDF/master/docs/index.html) - Librería para convertir canvas a PDF
## Contribuyendo 🖇️

Por favor lee el [CONTRIBUTING.md](https://github.com/tedesco8/api-rest-express/master/CONTRIBUTING.md) para detalles de nuestro código de conducta, y el proceso para enviarnos pull requests.

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](CODIGO_DE_CONDUCTA.md)

## Wiki 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [Wiki](https://github.com/tedesco8/SIGESCO/wiki)

## Versionado 📌

Usamos [GitHub](https://github.com/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/tu/proyecto/tags).

## Autores ✒️

* **Pablo Tedesco** - *Trabajo Inicial* - [tedesco8](https://github.com/tedesco8)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/tedesco8/SIGESCO/graphs/contributors) quíenes han participado en este proyecto. 

## Licencia 📄

Este proyecto está bajo la Licencia (MIT) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* Da las gracias públicamente 🤓.
* etc.



---
⌨️ con ❤️ por [tedesco8](https://github.com/tedesco8) 😊
