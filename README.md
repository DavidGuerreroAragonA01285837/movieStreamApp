## ¿Que hace el proyecto?

Este proyecto es una prueba de uso de una base de datos NoSQL (MongoDB). En este proyecto se interactua con una version NoSQL traducida por mi de la base de datos de Oracle MovieStream. Este proyecto permite el agregado, eliminado, editado y visualización de generos y peliculas. Estos cambios y observaciones son a tiempo real por lo que inmediatamente se reflejan en todos los espacios.

## ¿Como ejecutarlo?

Para ejecutar este proyecto se tiene que inicializar una base de datos con MongoDB Atlas. Una vez inicializada se debe obtener el string de conexión para ejecución desde la terminal (Asegurese de tener instalado MongoDB Shell, en caso de no tenerlo en la pagina de MongoDB vienen instrucciones sobre como instalarlo.)

La pagina de MongoDB le proporcionará un comando similar al siguiente:

mongosh "mongodb+srv://moviestream.e8aontf.mongodb.net/" --apiVersion 1 --username admin

A dicho comando agreguele el siguiente pedazo de codigo al final:

seed.js

De tal forma que su comando final sea: 

mongosh "mongodb+srv://moviestream.e8aontf.mongodb.net/" --apiVersion 1 --username admin seed.js

Ejecute ese comando para inicializar la base de datos NoSQL con el modelo y los datos adecuados.

Una vez ya inicializó la base de datos nuevamente debe obtener un string de conexión. Sin embargo este string se debe obtener para el driver de Node.js

Una vez obtenido el String asegurese de agregarlo a un archivo .env.local de la siguiente manera.

MONGODB_URI=AQUI_VA_SU_STRING

Una vez haya agregado el String a sus variables de entorno muevase a la carpeta interna moviestreamapp en su terminal.

Ejecute el comando siguiente:

npm run dev

Una vez ejecutado el comando la terminal le indica en cual puerto esta ejecutando la aplicación en su computadora (normalmente el 3000)

Abra su navegador e ingrese la siguiente url:

http://localhost:3000/

(Esto puede variar dependiendo el puerto que le indicó la terminal)

## Stack

Este proyecto hace uso de Next.js con MongoDB con un Deploy en Vercel. Hice uso de este stack ya que es el stack con el que estoy trabajando actualmente en mis proyectos y deseo practicar un poco más con el mismo. Asimismo me gustaría familiarizarme en la forma en la que puedo realizar conexiones a distintas bases de datos con Next.js ya que he tenido previas experiencias conectandolo a bases de datos SQL como ORACLE.

El deployment está hecho con Vercel debido a la facilidad que ofrece y a la posibilidad de tener hosting sin costo alguno para aplicaciones serverless como las que tiene next.js

## App Funcional