# Perspectivas · Riverhaus
> Registro de principios de diseño y experiencia que emergen del trabajo real.
> Cada entrada nace de una decisión concreta — no de teoría.
> Este archivo crece con el proyecto. Cuando tenga suficiente masa, se convierte en un esquema de best practices propio.

---

## 01 · La web que cuida la atención comunica antes de ser leída

**Contexto:** Implementamos un sistema de sugerencias de proyectos que nunca repite un trabajo ya visto — incluyendo los que solo fueron mostrados como opción, aunque el visitante no haya hecho click.

**Input (Matías):** "Este tipo de soluciones de navegación hacen la diferencia entre una web que entiende a su cliente y una web bruta y retrógrada."

**Perspectiva:**
Cada vez que una web le muestra a alguien algo que ya vio, le está diciendo implícitamente que no le importa que ya lo vio. No hay intención maliciosa — hay descuido. Y el descuido tiene un costo: erosiona la confianza antes de que el visitante haya leído una sola palabra.

La web que cuida ese detalle comunica algo distinto: *te estoy prestando atención*. Eso es posicionamiento antes de que empiece el copy.

**Principio:**
> La atención del visitante es el recurso más escaso del proyecto. Cada decisión de interfaz debería honrarla o no existir.

**Aplicación práctica:**
- Sugerencias de contenido: nunca repetir lo ya visto ni lo ya ofrecido como opción.
- Cuando el portfolio se agota, volver desde cero — no congelar la experiencia.
- La navegación secundaria (sugerencias, relacionados) no es decoración: es declaración de intención.

---

## 02 · No asumir gasto sin preguntar — y cuando preguntes, lleva alternativas

**Contexto:** Al integrar videos en los proyectos de /work, subí un archivo directamente a Sanity sin consultar si el cliente tenía plan de almacenamiento o estaba dispuesto a pagar ese costo. El archivo fue borrado, pero el error ya había ocurrido.

**Input (Matías):** "No asumas que voy a comprar espacio en Sanity. Pregunta antes de facilitar implementación de cobro. Y si lo haces, hazlo al menos entregando alternativas para optimizar recursos."

**Perspectiva:**
El costo de una decisión técnica no es solo técnico. Cuando un agente (humano o IA) ejecuta algo que genera un costo sin consultar, está tomando una decisión financiera por cuenta ajena. Eso no es eficiencia — es descuido disfrazado de proactividad.

El estándar correcto tiene dos partes: primero, preguntar antes de cualquier acción que implique gasto nuevo. Segundo, si vas a proponer algo que tiene costo, llegar con las alternativas ya mapeadas — no solo el camino caro, sino también el camino gratis y el camino intermedio — para que la decisión sea informada y el cliente elija con contexto, no con presión.

En este caso la alternativa existía desde el principio: los videos ya estaban hosteados en Cargo, que el cliente ya paga. No era necesario subirlos a ningún lado.

**Principio:**
> Antes de ejecutar cualquier acción con costo, preguntar. Y cuando preguntes, llegar con alternativas — la opción cara, la opción gratis, y por qué cada una.

**Aplicación práctica:**
- Almacenamiento de media: usar primero lo que ya está pagado (Cargo CDN, Cloudfront existente, repositorio propio).
- Antes de proponer una plataforma de pago, auditar qué infraestructura tiene activa el cliente.
- El camino de menor fricción económica es casi siempre el correcto hasta que haya una razón técnica concreta para escalarlo.
- Nunca ejecutar un upload, una suscripción o un deployment de pago sin confirmación explícita.

---

## 03 · La disposición es seducción — el layout no puede ser plano ni repetitivo

**Contexto:** Al construir las páginas de work con bloques de video e imagen, la primera implementación apilaba todos los elementos verticalmente, en el mismo formato, uno sobre otro.

**Input (Matías):** "Importante es disponer de los elementos de forma atractiva no lineal. Necesitamos seducir a los visitantes. Nada debe ser plano ni repetitivo."

**Perspectiva:**
Una galería de elementos todos del mismo tamaño y ritmo no es un layout — es una lista. Y una lista no seduce: informa. La diferencia entre un portafolio que convierte y uno que cataloga está en si el ojo del visitante tiene razón para seguir bajando. El ritmo visual — alternancia de formatos, variación de escala, respiración entre bloques — es lo que crea ese impulso.

Disponer contenido de forma atractiva no es decoración: es argumento. Cada cambio de formato dice *esto es diferente a lo anterior, seguí mirando*. La repetición dice *ya sé lo que viene*, y el ojo se desconecta.

**Principio:**
> El layout es la primera capa de copy. Si es plano, el contenido no importa. Si seduce, el contenido ya ganó la mitad de la batalla antes de ser leído.

**Aplicación práctica:**
- Mezclar formatos: full-width, contenido en grid, elementos solos + en fila, proporciones distintas.
- Nunca apilar más de 2 elementos del mismo formato y tamaño consecutivamente.
- La variación de ritmo no es caos — es arquitectura: cada cambio debe tener una razón compositiva.
- En portafolios: combinar videos landscape con grillas de portrait, imágenes solas con parejas, texto con silencio visual.
- El primer elemento y el último de una página tienen peso especial — el primero engancha, el último convierte.

---

---

## 04 · El espacio vacío solo construye ritmo cuando está distribuido

**Contexto:** Al construir la columna derecha del layout DDR, se colocó un único spacer entre dos ítems. Ese spacer absorbió todo el espacio disponible (~600px), creando un agujero visual en el centro mientras los demás ítems quedaban comprimidos en los extremos.

**Perspectiva:**
Un espaciador único en una columna larga no distribuye — concentra. Todo el aire del diseño colapsa en un punto, produciendo el efecto opuesto a la intención: en vez de ritmo, una fractura. El ojo siente que algo falta, no que algo respira.

La distribución del silencio visual funciona igual que la del sonido: si ponés toda la pausa en un compás y el resto del tema es continuo, no es ritmo — es un corte y un ruido.

**Principio:**
> El espacio en blanco construye ritmo solo cuando está repartido. Un espacio único y masivo no es respiración — es un error de composición.

**Aplicación práctica:**
- En columnas con múltiples ítems de distinto peso visual: colocar un spacer entre cada par de ítems consecutivos.
- Patrón correcto: ítem → espacio → ítem → espacio → ítem → espacio → ítem.
- Nunca: ítem → ítem → ESPACIO ENORME → ítem → ítem.
- El aire entre elementos debe ser proporcional y consistente — no un residuo de lo que sobró.

---

---

## 05 · El CMO no contrata una agencia — se juega el puesto

**Contexto:** Análisis competitivo de BrandLab Chile como referente del mercado de branding estratégico en Santiago. Al estudiar cómo consiguen sus clientes — sin SEO, sin contenido, con 632 visitas al mes — el patrón que emergió no fue un modelo de captación digital. Fue un modelo de confianza personal concentrada en la figura del CMO.

**Input (Matías):** "El CMO se juega la vida al contratar a un Riverhaus. Está fuera en 3 años. Y lo que funciona, lo replica. Un CMO no está leyendo Google ni le importa el SEO — le importa su propio KPI."

**Perspectiva:**
El CMO no compra branding. Compra certeza. Cuando firma con una agencia, está poniendo su nombre detrás de esa decisión frente a su CEO, su directorio, y su propio historial profesional. Si sale mal, es su presupuesto del año siguiente. Si sale bien, es su caso de éxito para el próximo trabajo.

Eso cambia todo sobre cómo hay que venderle.

No le importa cuántos años de experiencia tiene la agencia en abstracto. Le importa si esa agencia va a hacer que *él* quede bien. Le importa si el equipo que va a trabajar su marca entiende su industria, su presión interna, su jefe. Le importa si el proceso va a ser fácil de defender hacia arriba — con un lenguaje, con métricas, con una lógica que él pueda repetir en una reunión de directorio.

La ventana es corta: el CMO promedio en Chile dura 2-3 años en el mismo rol. En esa ventana tiene que hacer algo visible y permanente. Un buen proyecto de marca es una de las pocas cosas que sobrevive su paso por una empresa. Por eso cuando encuentra una agencia que lo hace quedar bien, no la suelta — y cuando cambia de empresa, la lleva consigo.

Eso explica el modelo de BrandLab: pocas cuentas, muchos proyectos por cuenta, alta fidelidad. No es un modelo de captación — es un modelo de instalación. El problema es que depende de que el CMO no se vaya o no cambie de criterio. Cuando eso pasa, la cuenta se cae entera.

La oportunidad para Riverhaus no es reemplazar ese modelo. Es estar presente en el momento exacto en que ese modelo falla o aún no existe: el CMO nuevo, en su primer trimestre, mirando una marca con problemas, sin agencia instalada, necesitando una perspectiva externa que valide lo que ya está viendo y que lo ayude a construir el argumento para su CEO.

Ese CMO no está buscando en Google. Pero sí está leyendo LinkedIn a las 11pm. Sí presta atención cuando alguien de su red habla con criterio sobre lo que él está viviendo. Sí recuerda quién lo contactó con una idea relevante antes de que él tuviera el problema claro.

**Principio:**
> No vendas branding. Aparece antes de que el CMO sepa que te necesita, con el lenguaje de su problema — no el tuyo.

**Aplicación práctica:**
- El pipeline real de Riverhaus no es "empresas que necesitan branding." Es "CMOs en su primer trimestre en un nuevo rol, con una marca que tiene problemas visibles."
- Contenido en LinkedIn debe hablar el idioma del CMO: presupuesto justificable, resultado defendible ante el CEO, proceso sin sorpresas.
- Los casos de estudio no son para mostrar qué hizo Riverhaus — son para mostrar cómo quedó el CMO que apostó por Riverhaus.
- Una cuenta bien servida no termina cuando termina el proyecto. Termina cuando el CMO se va — y ahí empieza la siguiente cuenta, en su nueva empresa.
- La métrica de éxito de un proyecto no es la aprobación del cliente. Es si ese CMO nos presenta a alguien más.

---

*Próximas entradas: tipografía como posicionamiento · el rol del silencio en el diseño dark · por qué los formularios de contacto mienten sobre la marca*
