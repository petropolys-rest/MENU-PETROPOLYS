# Café Petropolys — Rediseño premium

Landing estática en español, lista para subir a GitHub Pages o a un hosting estático. No requiere instalar dependencias ni ejecutar un proceso de compilación.

## Publicación

1. Descomprime el ZIP.
2. Sube `index.html`, `styles.css`, `script.js`, `robots.txt` y la carpeta `assets/` a la raíz del sitio.
3. Conserva el archivo `CNAME` existente en tu repositorio. El ZIP recibido no contenía ese archivo, por lo que esta entrega no inventa ni cambia el dominio.
4. Una vez confirmado tu dominio, convierte `og:image`, `image` del schema y `hasMenu` a URLs absolutas de ese dominio. Añade también `og:url` y un enlace canonical con la dirección oficial; el archivo recibido no la especificaba.
5. Abre la página publicada y comprueba las imágenes, los teléfonos y las redes.

Puedes revisar el proyecto localmente abriendo `index.html` en un navegador moderno. Para reproducir un hosting estático, también puedes usar `python -m http.server 8000` en esta carpeta y abrir `http://localhost:8000`.

## Qué cambió

- Identidad consistente con crema, naranja `#FF800D`, amarillo `#FFB300`, vino, café oscuro y verde oscuro en los botones secundarios.
- Portada con la fotografía compartida el 5 de octubre, titular protagonista, llamadas al menú y WhatsApp e información 24/7.
- Navegación sticky con menú móvil, enlaces nativos y estado activo. Los anchors respetan la altura del encabezado y el historial del navegador.
- Galería uniforme sin nombres de platillos: cuatro columnas en escritorio, dos en móvil.
- El menú se muestra antes de la galería de Platillos; conserva seis categorías con las páginas existentes, completas y sin recorte.
- Textos pequeños ampliados en escritorio y móvil.
- Dirección: Calle 70 núm. 530, entre 69 y 71, Centro, detrás de la terminal de ADO Mérida.
- Pagos con tarjeta y transferencia, y facturación del consumo, con la indicación “Envíanos tus datos fiscales”, visibles en Pedidos.
- Nosotros con composición editorial y las cuatro fotografías reales del interior, ampliables en el visor de imágenes.
- Dos tarjetas de pedidos con turno disponible destacado.
- Las cinco reseñas originales, con sus textos, autores, estrellas y antigüedad recopilada, sobre fondo café cálido.
- Dirección, mapa interactivo integrado de Google Maps, WhatsApp y SVG de TikTok, Instagram y Facebook en mayor tamaño.
- Tipografías Fraunces y Montserrat incluidas localmente con sus licencias.
- Versiones WebP para mostrar la página; los JPG, JPEG y PNG originales permanecen intactos y se abren en el visor ampliado.

## Pedidos por horario

Se utiliza `America/Merida`, independientemente de la zona horaria del dispositivo:

| Horario de Mérida | WhatsApp |
| --- | --- |
| 6:00 AM a antes de 6:00 PM | 999 224 9678 |
| 6:00 PM a antes de 6:00 AM | 999 546 3816 |

Los botones automáticos actualizan su destino cada 30 segundos, al recuperar el foco, al volver a la pestaña y al pulsar el botón. Las dos tarjetas mantienen su número explícito.

## Visor de imágenes

- Anterior/siguiente con botones y flechas del teclado.
- Animación de hoja, respetando la preferencia de movimiento reducido.
- Zoom con botones, rueda del mouse, doble clic y gesto de dos dedos.
- Arrastre con mouse o dedo al ampliar; límites para que la imagen no se pierda fuera del visor.
- Deslizar para cambiar de imagen cuando no hay zoom.
- `+` / `-` para zoom, `0` para restablecer y `Escape` para cerrar.
- Modal nativo con foco contenido y regreso al botón que abrió la imagen.

## Validación

Consulta `VALIDACION.md`. Los enlaces externos se conservaron y se verificaron sus destinos en el código; no se enviaron mensajes ni se comprobó disponibilidad del servicio de terceros.

## Aguas frescas y cortesías

- Aguas frescas de sabor 100% naturales: jamaica, horchata, tamarindo, limón con chía y pepino. Pitahaya por temporada. También se menciona el jugo de naranja.
- El encabezado “Contamos con estacionamiento” presenta el servicio. Con el consumo, 2 horas de estacionamiento de cortesía frente al Hotel Tierra Del Sol, a 3 minutos del restaurante. Se incluyen las fotografías y la guía proporcionadas del estacionamiento.
- Postre de cortesía para quienes visitan desde la página web o redes sociales, indicando cómo encontraron el restaurante.
- Pregunta “¿Ya sabes qué se te antoja?” situada inmediatamente debajo de la galería de Platillos.

Estos beneficios y detalles fueron proporcionados por el restaurante.

## Fotos del estacionamiento

La sección de estacionamiento incluye la guía con flechas, la entrada del estacionamiento y las referencias de la calle. Las tres imágenes pueden abrirse en el visor existente con navegación, zoom y arrastre. Los PNG proporcionados se conservan completos y se usan versiones WebP más ligeras en la página.


## Fotografías del interior y facturación

Nosotros incluye las cuatro fotos del interior compartidas el 5 de octubre, con un collage adaptable y acceso al visor para verlas completas. Los originales se encuentran en `assets/interior-*.jpg`; la página carga sus copias WebP optimizadas. En Pedidos, el aviso de facturación pide enviar los datos fiscales. El estacionamiento se presenta como servicio disponible y aclara las 2 horas de cortesía con el consumo.
