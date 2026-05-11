## Embeber o Referenciar y si se referencia hacia donde

- activity.cust_id > customer.cust_id

Para esta relación determiné que haría un embebido parcial con referenciado. Esto ya que no todos los datos de customer eran necesarios para el contexto de la tabla de actividad pero se deja la oportunidad de realizar un query por medio de un referenciado.

El referenciado se realizó en una sola dirección desde la actividad hacia el cliente

- activity.genre_id > genre.genre_id

Se realizó un embebido completo debido a que la tabla de genero solo tiene 2 campos y no impacta en los tamaños del documento.

- activity.movie_id > movie.movie_id

Se realizó un embebido parcial con referenciado con solo el nombre de la pelicula ya que este es el dato más común utilizado y no se suele usar otros datos para metricas de actividad. 

El referenciado se realiza en una sola dirección desde la actividad hacia la pelicula

- customer.segment_id - customer_segment.segment_id

Se realizó un embebido completo debido a que la tabla de customer segment es suficientemente chica para no afectar al embebir sus valores en su totalidad.

- customer_contact.cust_id - customer.cust_id

Nuevamente se determino que se realizaría un referenciado regular ya que realmente la información de customer contact es información que se puede encontrar en customer por lo que solo se requiere la referencia en caso de que la información que trae consigo no sea suficiente.

Es referenciado en una direccion, desde customer contact hacia customer

- customer_demographics.cust_id - customer.cust_id
- customer_demographics.segment_id - customer_segment.segment_id

- customer_extension.cust_id - customer.cust_id
- customer_extension.segment_id - customer_segment.segment_id

Tanto customer demographics como customer extension se eliminaron ya que no se vió un valor real que trajeran a la base de datos ya que eran datos duplicados que ya se encuentran en la coleccion de customer y son demasiado grandes como para ser un clon más chico y práctico.

- customer_feedback.cust_id > customer.cust_id

Nuevamente se decidió un embebido parcial con referenciado enfocado en las estadísticas del cliente para ayudar en cuestiones de métricas.

La referencia se hizo en una sola direccion de customer feedback hacia customer

- customer_survey.cust_id > customer.cust_id

Nuevamente se decidió un embebido parcial con referenciado enfocado en las estadísticas del cliente para ayudar en cuestiones de métricas.

La referencia se hizo en una sola direccion de customer survey hacia customer

- custsales.genre_id - genre.genre_id
- custsales.movie_id - movie.movie_id
- custsales.cust_id - customer.cust_id

Para las relaciones entre custsales y movie, genre y customer se utilizó el mismo método que con actividad. Se realizó embebido parcial para customer con una referencia en una sola dirección desde custsales hasta customer. Para genre se hizo un embebido total y para movie se hizo un embebido parcial con una referencia de una sola dirección desde custsales hacia movie

- user_sessions.cust_id > customer.cust_id

Para user_session hacia customer se usó el mismo enfoque de métricas para el embebido parcial con referencia unidireccional desde user sessions hacia customer debido a que esta colección está pensada también para cuestiones de métricas.

## ¿Cuantas colecciones quedan al final?

Al finalizar todo quedaron 11 colecciones.

## ¿Que consultas se vuelven más fáciles? ¿Cuales mas dificiles?

Con este modelo de base de datos las consultas de información para dashboards o displays se facilitan como por ejemplo el análisis de las ventas. Asimismo queries de análisis de métricas se facilitan siempre que vayan de acuerdo a las colecciones como customer feedback, customer survey o user sessions.

Aquellas queries más complejas que requieren de joins de más de una tabla se dificultan ya que requieren de multiples queries y de manejar joins a mano además de el manejo de información