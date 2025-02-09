1.- Clonar el repositorio
Para descargar el proyecto, ejecuta el siguiente comando en tu terminal:
Bash:
git clone https://github.com/tu-usuario/tu-repositorio.git

2.- Instalar dependencias
Una vez clonado el repositorio, ejecuta el siguiente comando para instalar las dependencias:
Bash:
npm install

3.- logearse y crear un proyecto en firebase y vincularlo con el proyecto clonado
con el CLI de firebase:
bash:
 *npm install -g firebase-tools
 *firebase login
 *firebase init
 
Elegir opción "Cloud firestore".

4.-Obtener Credencial SDK(configuraciones para el cloud firestore)
   -logearse
   -ir a console en la parte de arriba ,lado derecho.
   -click sobre tu proyecto creado
   -En el nombre de tu proyecto en el dibujo del engranaje click en configuracion de proyecto
   -En ese panel darle a cuenta de servicio
   -y por ultimo abajo en el boton de generar nueva clave privada(credential- SDK)

5.-Configurar variables de entorno(Credenciales SDK de firebase)
Si es necesario, configura las variables de entorno para tu proyecto. Por ejemplo:
Bash:
cp .env.example .env

6.-Iniciar el proyecto
Para iniciar el proyecto, ejecuta el siguiente comando:
Bash:
npm start
Acceder al proyecto
Una vez iniciado el proyecto, puedes acceder a él mediante la siguiente URL:
http://localhost:3000
