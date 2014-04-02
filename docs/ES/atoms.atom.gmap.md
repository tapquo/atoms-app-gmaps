## Atom.GMap
Es el elemento básico de esta extensión, en este átomo encontrarás todas las funcionalidades necesarias para crear y gestionar un mapa. Dispones de atributos para definir el tamaño del mapa asi como de métodos y eventos que te facilitarán el trabajo con la APIv3 de Google.

### Attributes
```
id    : [OPTIONAL]
style : small|big [OPTIONAL]
```

### Methods
#### .center()
Este método sirve para centrar un mapa en una determinada latitud y longitud, además podemos establecer un nivel de zoom (1 minimo, 16 máximo).

**Parameters**

```
position : Object {latitude, longitude}
zoom     : Number (1 to 16) [OPTIONAL]
```
**Example**

```
gmap_instance.center({latitude: 43.25, longitude:  -2.92}, 7);
```

#### .zoom()
Este método sirve para establecer el zoom del mapa (1 minimo, 16 máximo).

**Parameters**

```
level:  Number (1 to 16) [OPTIONAL]
```
**Example**

```
gmap_instance.zoom(5);
```

#### .query()
Este método sirve para buscar puntos localizados utilizando el servicio de geoposición de Google. Puedes utilizar una cadena de texto o bien una geoposición como elemento de búsqueda, el retorno se devuelve mediante el evento `query` y contiene un array de resultados.

**Parameters**

```
value:  Object|String {latitude, longitude}
```
**Example**

```
var bilbao = gmap_instance.query("Bilbao, ES");
var bilbao = gmap_instance.query({latitude: 43.25, longitude:  -2.92});
```

**Return**

```
address  : String
type     : String
location : Object {latitude, longitude}
```

#### .marker()
Este método sirve para representar un *"pushpin"* en el mapa, debes indicar su latitud y longitud además de que en el caso de que lo necesites modificar el icono por defecto que ofrece este servicio.

**Parameters**

```
position : Object {latitude, longitude}
icon     : Object {url, size_x, size_y, point_x, point_y} [OPTIONAL]
animate  : Boolean [OPTIONAL]
```
**Example**

```
gmap_instance.marker({latitude: 43.25, longitude:  -2.92}, null, true);
```

#### .route()
Este método sirve para crear rutas entre dos puntos, estos puntos pueden establecerse tanto por latitud y longitud como por una cadena de texto. Además podemos establecer el modo para llegar del origen al destino (coche, transporte, bicicleta y andando) asi como establecer sus *"pushpin"* personalizados.

```
origin      : Object|String {latitude, longitude}
destination : Object|String {latitude, longitude}
mode        : String "DRIVING", "WALKING", "BICYCLING", "TRANSIT" [OPTIONAL]
markers     : Object [OPTIONAL]
```
**Example**

```
origin = {latitude: 43.25, longitude:  -2.92};
destination = "Madrid, ES";
markers = {
  origin     : {url: "http:/"},
  destination: {url: "http:/"}
};

gmap_instance.route(origin, destination, "DRIVING", markers);
```

#### .routeInstructions()
Este método sirve para recibir las instrucciones de una determinada ruta, el método devuelve además de la distancia y duración de la ruta los pasos a seguir para llegar desde el origen al destino.

**Example**

```
gmap_instance.route(origin, destination, "DRIVING", markers);
var instructions = gmap_instance.routeInstructions();
```

**Return**

```
distance: String
duration: String
steps   : Array of Object {distance, duration, instructions}
```

#### .clean()
Este método sirve para resetear la instancia del mapa actual.
**Example**

```
gmap_instance.clean();
```

### Events

#### onGMapQuery
Este método se desplegará cuando el método `query` devuelva resultados.

#### onGMapRoute
Este método se desplegará cuando el método `route` genere una ruta.
