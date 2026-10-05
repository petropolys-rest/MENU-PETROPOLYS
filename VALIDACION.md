# Validación — 2 de octubre de 2026

Revisión visual y pruebas funcionales con Chromium. Las pruebas móviles utilizan viewport y eventos táctiles emulados.

| Comprobación | Resultado |
| --- | --- |
| Sintaxis de `script.js` y errores en ejecución | Sin errores |
| Imágenes de la página y 14 originales del visor | Cargan correctamente |
| Archivos JPG/PNG originales | Conservados, sin cambios en sus bytes |
| Menú | Seis páginas originales completas |
| Reseñas | Cinco textos, autores, estrellas y antigüedades conservados |
| Enlaces de redes, Google Maps y WhatsApp | Destinos originales conservados |
| Navegación interna | Sin secciones ocultas por el header |
| Historial del navegador y enlace directo a `#menu` | Funcionan |
| Diseño a 320, 360, 390, 768, 1024 y 1440 px | Sin desbordamiento horizontal |
| Galería | Dos columnas en móvil; cuatro en escritorio |
| Menú hamburguesa | Abre y cierra, también al elegir un enlace o pulsar Escape |
| Visor de platillos | Ocho imágenes, contador y navegación |
| Visor del menú | Seis páginas únicas; navegación circular |
| Zoom con rueda, botones y doble clic | Funciona |
| Arrastre con mouse | Funciona y respeta los límites de la imagen |
| Zoom con dos dedos y arrastre posterior | Funcionan |
| Deslizar entre imágenes en móvil | Funciona sin zoom |
| Controles táctiles después de deslizar | Responden al primer toque, sin activación duplicada |
| Cierre y foco al volver a la galería | Funcionan |
| Turnos de Mérida a 05:59, 06:00, 17:59, 18:00 y medianoche | Número correcto |
| Página abierta durante cambio de turno | Actualiza WhatsApp y turno destacado |

Las imágenes WebP se usan para cargar la página con menos peso; el visor conserva la resolución de los archivos originales. Las fuentes y sus licencias están incluidas en `assets/`.

No se enviaron mensajes ni se comprobó la disponibilidad de las cuentas externas. No se realizaron pruebas en dispositivos físicos o en Safari. El archivo `CNAME` y el dominio oficial no venían en el ZIP original; las instrucciones de publicación explican cómo conservarlos y completar las URLs absolutas del SEO.

## Ajustes solicitados posteriores

- Nombres eliminados de las tarjetas de Platillos y del título del visor de esa galería; las categorías del menú se conservaron.
- Reseñas sobre fondo café `#5A3020`, tarjetas café oscuro y títulos/estrellas amarillos.
- Iconos SVG de redes de 38 px, con enlaces y etiquetas accesibles.
- Mapa de Google Maps integrado en Visítanos, con ubicación del restaurante, título accesible, carga diferida y enlace directo conservado.
- Revisión de estas modificaciones a 320, 390, 768 y 1440 px: sin desbordamiento horizontal ni errores JavaScript.

La carga externa del mapa no pudo comprobarse visualmente en este entorno de prueba; el iframe y su destino se verificaron en el código.

## Aguas frescas y cortesías

Se verificó la pregunta directamente debajo de la galería, los cinco sabores permanentes y la pitahaya por temporada, el postre para visitas desde web/redes, las 2 horas de estacionamiento con consumo frente al Hotel Tierra Del Sol a 3 minutos del restaurante y la carga de la fotografía proporcionada. Los nuevos bloques se revisaron a 320, 390, 768 y 1440 px, sin desbordamiento horizontal ni errores JavaScript.

## Fotos de estacionamiento — 3 de octubre de 2026

Se añadieron las tres fotos proporcionadas: guía con flechas, entrada del estacionamiento y referencias de la calle. Los archivos PNG originales se conservan intactos; las versiones WebP se muestran sin recorte. Se verificaron su carga, el visor con tres imágenes, navegación, zoom, apertura en móvil y diseño a 320, 390, 768 y 1440 px, sin desbordamiento ni errores JavaScript.


## Dirección, portada y contenido — 5 de octubre de 2026

- Dirección actualizada en Visítanos, en la portada, en la consulta del mapa y en los datos estructurados: Calle 70 núm. 530, entre 69 y 71, Centro, Mérida, Yucatán. Se indica que está detrás de la terminal de ADO Mérida.
- Menú antes de Platillos en el HTML y en la navegación; el botón inferior de la portada apunta al menú.
- Portada sustituida por la fotografía proporcionada el 5 de octubre. El JPEG se conserva intacto y se muestra una copia WebP optimizada. Se actualizaron Open Graph y la imagen del schema.
- Textos pequeños ampliados sin cambiar los títulos principales. Navegación hamburguesa hasta 1100 px para acomodar la tipografía.
- Jugo de naranja añadido y “pitahaya” corregido. Se mantienen los cinco sabores de aguas frescas, las cortesías, las tres fotos del estacionamiento y las cinco reseñas.
- Aviso de pagos con tarjeta y transferencia, y facturación del consumo, visible en Pedidos. Los métodos de pago también se incluyen en el schema.

Pruebas actuales en Chromium: diseño sin desbordamiento de página ni de los bloques modificados a 320, 360, 390, 600, 768, 900, 1024, 1100, 1101 y 1440 px. Se comprobaron todos los enlaces de la navegación, su posición debajo del encabezado, el enlace activo y el cierre del menú móvil en esos tamaños. Revisión visual de portada, menú, bebidas, pedidos y dirección en escritorio y móvil. Visor de menú y platillos verificado con navegación, botones de zoom, rueda y arrastre; también pinch, arrastre, deslizamiento y controles táctiles a 320 px. Sin errores JavaScript. Los 16 JPG/PNG del proyecto original se conservaron exactamente; las fotos añadidas en rondas anteriores permanecen en assets.


## Interior, facturación y estacionamiento — 5 de octubre de 2026

- Se añadió “Envíanos tus datos fiscales” debajo de “Facturamos tu consumo”.
- El estacionamiento tiene el encabezado “Contamos con estacionamiento”. El texto aclara que las 2 horas de cortesía se incluyen con el consumo y conserva la referencia al Hotel Tierra Del Sol, a 3 minutos del restaurante.
- Nosotros muestra las cuatro fotografías reales del interior proporcionadas. Se conservaron los JPG sin modificaciones y se generaron copias WebP más ligeras para la página. El collage adapta su composición a cada pantalla y permite abrir las cuatro fotos completas en el visor existente.

Verificado en Chromium a 320, 390, 600, 768, 1024 y 1440 px, sin desbordamientos. Se revisaron las secciones modificadas y los enlaces internos; las nuevas fotos y sus originales cargan correctamente. Se comprobó la secuencia de cuatro imágenes, navegación circular, zoom, cierre y devolución del foco, además de apertura, navegación y zoom táctiles en móvil. Sin errores JavaScript. Los assets de la entrega anterior permanecen intactos.
