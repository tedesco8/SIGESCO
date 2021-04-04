## Contribuyendo

En primer lugar, gracias por considerar su contribución a SIGESCO. La gente
como tú, hacen de SIGESCO una gran herramienta.

### ¿A donde voy desde aqui?

Si ha notado un error o tiene una solicitud de función, [haga uno] [nuevo problema]. Es
generalmente es mejor si obtiene la confirmación de su error o la aprobación de su función
solicite de esta manera antes de comenzar a codificar.

Si tiene una pregunta general sobre SIGESCO, puede publicarla en [Stack
Overflow], el rastreador de problemas es solo para errores y solicitudes de funciones.

### Bifurcar y crear una rama

Si cree que puede solucionarlo, [bifurque el repositorio] y cree
una rama con un nombre descriptivo.

Un buen nombre de sucursal sería (donde el problema # 325 es el ticket en el que está trabajando):

`` sh
git checkout -b 325-add-japanese-translations
''

### Implementa tu corrección o función

En este punto, ¡estás listo para realizar tus cambios! No dude en pedir ayuda;
todo el mundo es principiante al principio: smile_cat:

### Hacer una solicitud de extracción

En este punto, debe volver a su rama maestra y asegurarse de que esté
sincronizado con la rama maestra de SIGESCO:

`` sh
git remote add upstream git@github.com:tedesco8/SIGESCO.git
git checkout master
git pull upstream master
''

Luego actualice su rama de características desde su copia local de master, ¡y empújela!

`` sh
git checkout 325-add-japanese-translations
git rebase master
git push --set-upstream origin 325-add-japanese-translations
''

Por último, vaya a GitHub y [haga una solicitud de extracción] []: D

Github Actions ejecutará nuestro conjunto de pruebas contra todas las versiones de Node compatibles. Nosotros
nos preocuparemos por la calidad, por lo que su RP no se fusionará hasta que pasen todas las pruebas.

### Mantener actualizada tu solicitud de extracción

Si un mantenedor le pide que "reajuste" su PR, está diciendo que mucho código
ha cambiado y que necesita actualizar su rama para que sea más fácil fusionar.

Para obtener más información sobre el rebase en Git, hay muchos [buenos] [git rebasing]
[recursos] [rebase interactivo] pero aquí está el flujo de trabajo sugerido:

`` sh
git checkout 325-add-japanese-translations
git pull --rebase upstream master
git push --force-with-lease 325-add-japanese-translations
''

### Fusionando un PR (solo mantenedores)

Un PR solo puede ser fusionado en maestro por un mantenedor si:

* Está pasando CI.
* Ha sido aprobado por al menos dos mantenedores. Si fuera un mantenedor quien
  abrió el RP, solo se necesita una aprobación adicional.
* No tiene cambios solicitados.
* Está actualizado con el maestro actual.

Cualquier mantenedor puede fusionar un PR si se cumplen todas estas condiciones.
reunió.