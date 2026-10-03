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

Se verificó la pregunta directamente debajo de la galería, los cinco sabores permanentes y la pitaya por temporada, el postre para visitas desde web/redes, las 2 horas de estacionamiento con consumo frente al Hotel Tierra Del Sol a 3 minutos del restaurante y la carga de la fotografía proporcionada. Los nuevos bloques se revisaron a 320, 390, 768 y 1440 px, sin desbordamiento horizontal ni errores JavaScript.

## Fotos de estacionamiento — 3 de octubre de 2026

Se añadieron las tres fotos proporcionadas: guía con flechas, entrada del estacionamiento y referencias de la calle. Los archivos PNG originales se conservan intactos; las versiones WebP se muestran sin recorte. Se verificaron su carga, el visor con tres imágenes, navegación, zoom, apertura en móvil y diseño a 320, 390, 768 y 1440 px, sin desbordamiento ni errores JavaScript.
