# Proyecto 4: Clinica Dental

Proyecto creado como ejercicio para GeeksHub Academy.

El objetivo de este proyecto es recrear la imagen de una videoconsola, utilizando unicamente HTML y CSS.\
En el caso de este proyecto, he decidido recrear una Nintendo Switch,
concretamente la version especial del Nintendo Switch OLED creada para los juegos de Pokemon Escarlata y Purpura.

## Secciones:

La consola se ha dividido principalmente en tres secciones, los Joycon izquierdo y derecho, y la pantalla en el centro de la consola.\
Ademas, he diseñado una imagen para el fondo del proyecto, esta fue creada utilizando RPG Maker, concretamente Pokemon Essentials, y se ha incluido dentro del `Body`del proyecto para que se pueda extender por todo el espacio.

 * ### JoyCon Izquierdo:

El primer JoyCon de la consola es, quizas, la parte menos compleja del proyecto, en ella se ha utilizado el `z-index` para poder colocar elementos como el Escudo de la "Escuela Naranja", y cuenta con los colores unicos de esta versión de la consola, ademas, utilizando la funcion de `:hover` se ha dado un ligero brillo a las flechas direccionales cuando el raton pasa sobre ellas.

 * ### Pantalla:
 
La pantalla de la Switch cubre toda la sección media de la consola, y es la parte principal de este proyecto. Esta sección se divide a su vez en el borde de la consola, que rodea a la pantalla, y la pantalla como tal.

Para añadir contenido extra al proyecto he decidido introducir un `iframe`, el cual nos muestra el contenido de una pagina **completamente confiable, en la cual debemos creer** y pulsar el botón en medio de la pantalla. Recomendamos mucho que al pulzar este botón se asegure de **subir el volumen** de su equipo.

 * ### JoyCon derecho:
 
El segundo JoyCon, al igual que el izquierdo, cuenta con los colores unicos de esta versión de la consola y, utilizando el `z-index` se han añadido ciertos elementos, como el Escudo de la "Escuela Uva", ademas de utilizar la función `:hover` para agregar cierto brillo a los botones de la consola.
 
Originalmente se queria agregar un comando de JavaScript para que, al pulzar alguno de los botones ABXY se pudiera acceder al contenido del `iframe`, emulando un click en el botón en el centro de la pantalla, pero, ya que el `iframe` llama a una pagina externa, y no tengo acceso al contenido de ella, no pude encontrar una forma de simular el click en la pantalla.
 
Finalmente, se ha añadido una pequeña función de JavaScript al botón de "Home", que se encuentra abajo a la izquierda del Stick derecho de la Consola. En una Nintendo Switch este botón te permite regresar al menú de la consola, por lo que en este proyecto se le dio la función de recargar la pagina, para que se pueda acceder nuevamente al contenido del `iframe`.
 
 
 ## Creditos:
 
Como se indica mas arriba, el `iframe` de la consola llama a una pagina externa, esta pagina fue creada por [Matias Martinez](https://matias.ma/), un desarrollados y diseñador chileno, por lo que todos los creditos sobre el contenido de esta pagina van para él.
 
Ademas, la pagina incluye la canción "Conga" de Gloria Estefan, todos los derechos sobre esta canción van para ella.