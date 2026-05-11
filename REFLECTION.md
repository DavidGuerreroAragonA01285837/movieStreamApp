## Volviendo a empezar

Personalmente si tuvies que rediseñar el modelo desde cero lo simplificaría bastante. El modelo actual tiene muchos datos redundates, tablas con datos duplicados y demasiado grandes. Creo que distribuiria un poco más la información en tablas o colecciones para facilitar la lectura y administración de los datos. Creo que me faltó en su momento una visión más clara sobre lo que quería a la hora de implementar la base de datos. Cuando la comencé a crear me enfoqué principalmente en traducirla desde SQL hacia NoSQL y a pesar de que si hice unos cambios de estructura (Como quitar customer extension y customer demographics ya que eran tablas duplicadas) realmente sentí al final que la base de datos seguía estando bastante mezclada y requería de más afinación y limpieza.

## La conversación con tu modelo

Aunque personalmente no tuve muchos problemas al construir el CRUD si noté que pudieron haber operaciones incomodas si hubiera tomado un camino un poco más lineal a la hora de traducir la base de datos. Personalmente cuando lo hice me enfoque en realizar embebidos parciales que evitaran el tener que realizar multiples queries. Sin embargo si fué algo que noté que había evadido ya que inicialmente tuve la intención de simplemente referenciarlas con un ID y resolver después.

## La pregunta honesta

Personalmente creo que es algo dividido. Es cierto que la parte de la lectura de datos es una maravilla con NoSQL ya que aqui no me complico con queries y la información ya se encuentra en formato JSON fácil de trabajar. Sin embargo la cuestión de agregado, actualización y eliminación de datos se puede complicar más. Esto ya que en mi implementación hice uso de colecciones "clon" de otras colecciones o de embebidos más chicos los cuales facilitaban y aprovechaban al máximo la forma de manejar los datos como documentos. Sin embargo esto causa que se tenga que tomar en cuenta todas esas mini colecciones a la hora de modificar, agregar o eliminar datos.

Por otro lado una base de datos SQL hubiera tenido pocos problemas con esto ya que pudiera uno hacer queries para obtener solo los datos que se quiere, pero se pierde la facilidad y baja necesidad de procesamiento para grandes cantidades de información.

En mi experiencia personal y para las colecciones que utilicé creo que un NoSQL fue la mejor opción ya que estas colecciones no tienen el problema de mini clones además de que son cosas sencillas que no requieren de la seguridad o rigidez de una base de datos SQL

Si me hubiese metido a la cuestión de métricas posiblemente hubiese sido mejor SQL ya que los queries me hubiesen permitido hacer los análisis desde la base de datos y con un solo query en lugar de tener que hacerlos en el front-end y posiblemente muchos queries.

Sin embargo debo recalcar que bajo mi experiencia personal este tipo de base de datos se puede beneficiar de NoSQL ya que los datos que se manejan no son tan críticos ni rígidos como para requerir SQL y en cambio se benefician de una estructura más relajada.