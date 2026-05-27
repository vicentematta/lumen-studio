# Riverhaus — Copy Master Document

> Marcos aplicados: positioning-workshop · copywriting · copy-editing · schema-markup
> Pilares: Dunford · Lafley/Martin · Stanley · Keenan
> Idioma: Español únicamente
> Versión: 2.0 — 2026-05-22

---

## PARTE 1 — POSITIONING STATEMENT (Geoffrey Moore)

```
PARA:       Fundadores, CEOs y directores comerciales de empresas establecidas
            (3+ años, 10+ personas, ingresos estables) que construyeron
            algo real pero cuya posición en el mercado no lo refleja todavía.

QUE NECESITAN: Cerrar la brecha entre la calidad de su oferta y cómo
            los percibe su mercado — con un sistema integrado que alinee
            estrategia, identidad y producción bajo un solo programa.

RIVERHAUS ES: Una agencia de comunicación estratégica.

QUE:        Construye el sistema que tienen las empresas que dominan su
            categoría — primero las elecciones estratégicas, después la
            identidad, después la producción coherente.

A DIFERENCIA DE:
  · Agencias de publicidad    → parten del creativo, no del campo de juego.
  · Consultoras estratégicas  → entregan un PDF y se van.
  · Freelancers               → ejecutan tu pieza, no piensan qué pieza sirve.
  · Agencias de branding      → optimizan estética, no posición competitiva.

RIVERHAUS OFRECE: Un sistema donde la posición competitiva precede
            a cualquier producción — y donde estrategia, identidad y
            producción trabajan bajo el mismo programa, sin piezas sueltas.
```

**One-liner:**
> Riverhaus es una agencia de comunicación estratégica para empresas establecidas que construyeron algo real pero cuya posición en el mercado no lo refleja — integramos posición, identidad y producción bajo un solo sistema para cerrar esa brecha.

---

## PARTE 2 — BRAND VOICE

### Quién nos lee
Fundador o director comercial. 38–52 años. Construyó algo real. Ha contratado freelancers, comprado branding, renovado la web. Cada vez que contrató algo, le entregaron una pieza. Nunca un sistema. Sabe que hay una brecha entre lo que construyó y cómo lo percibe el mercado. No sabe exactamente cómo cerrarla.

### Tono
Directo. Confiado. Sin exclamaciones. Sin aspiracionalidad vacía.
Como un socio estratégico senior en una sala de directorio — reconoce el logro del cliente antes de hablar del trabajo, no llega con el problema en la mano.

### Reglas de voz

| Usar | Evitar |
|------|--------|
| brecha, posición, jugada, campo | diagnóstico, tratamiento, síntomas |
| dominar, liderar, construir, cerrar | potenciar, optimizar, innovador, disruptivo |
| posición competitiva, diferenciador | mejorar tu negocio, hacer crecer tu marca |
| coherencia, ejecutar, producir | sinergia, robusto, seamless, solución |
| "construiste", "lo que ganaste" | "tienes un problema", "te falta" |
| "tu empresa", "tus clientes" | "nosotros te ayudamos a..." |

### Secuencia narrativa (los cuatro pilares en orden)
1. **Reconocimiento** (Stanley) — "Construiste algo real."
2. **Brecha** (Keenan) — "El mercado todavía no lo sabe."
3. **Implicación** (Keenan) — "Eso tiene un costo."
4. **Estado futuro** (Keenan + Lafley/Martin) — "¿Qué se ve ganar para tu empresa?"
5. **Sistema** (Dunford) — "Aquí está cómo lo cerramos."

---

## PARTE 3 — SITE SETTINGS (Sanity: siteSettings singleton)

| Campo | Valor |
|-------|-------|
| `siteName` | Riverhaus |
| `siteTagline` | Conquista tu categoría. |
| `footerEyebrow` | Tu competencia vende lo mismo que tú |
| `footerHeading` | Fortalece tu posición. |
| `footerHeadingItalic` | Supera a tu competencia |
| `footerSubtitle` | Definamos tu posición competitiva, construyamos tu diferenciación y apliquémosla donde tu negocio compite — digital o físico. |
| `footerCtaBook` | Hablemos (30 min) |
| `footerCtaWork` | Ver trabajos |
| `footerCopyright` | © 2026 RIVERHAUS · Valdivia, Chile |
| `navCtaLabel` | Agenda un meet |
| `navCol1Heading` | Estudio |
| `navLinkAbout` | Nosotros |
| `navLinkWork` | Trabajos |
| `navLinkPricing` | Inversión |
| `navCol2Heading` | Servicios |
| `navLinkStrategy` | Estrategia Comercial |
| `navLinkDesign` | Identidad Digital |
| `navLinkEngineering` | Negocio + Diseño |
| `navCol3Heading` | Contacto |
| `navLinkContact` | Escríbenos |

---

## PARTE 4 — HOMEPAGE (Sanity: homePage)

> Arquitectura del relato: Stanley (apertura) → Keenan (brecha) → Dunford (contexto) → Lafley/Martin (jugada) → sistema.
> Sin "diagnóstico" en ninguna variante.

---

### HERO

**Campo: `heroEyebrow`**
```
RIVERHAUS
```

**Campo: `heroTitle`** — tres opciones, elegir una
```
OPCIÓN A (recomendada — Stanley + Keenan puro):
"Construiste algo real."

OPCIÓN B (Keenan directo — abre brecha en el headline):
"Lidera en tu categoría."

OPCIÓN C (Lafley/Martin — la jugada):
"¿Cuál es tu jugada para dominar tu categoría?"
```

**Campo: `heroSubtitle`** — si se elige Opción A
```
"El mercado todavía no lo sabe. Cerramos la brecha entre
lo que construiste y cómo te percibe tu categoría."
```

**Campo: `heroSubtitle`** — si se elige Opción B
```
"Tu oferta es sólida.
Pero la brecha entre lo que construiste y cómo te percibe
tu mercado te está costando deals."
```

**Campo: `heroPrimaryLabel`**
```
Ver trabajos
```

**Campo: `heroSecondaryLabel`**
```
Exploremos tu posición
```

**Campo: `heroEmailPlaceholder`**
```
tu@email.com — empecemos
```

**Por qué funciona la Opción A:**
Stanley: "Construiste algo real" abre desde el reconocimiento, no desde el problema. Keenan: "El mercado todavía no lo sabe" abre el gap inmediatamente. La segunda oración nombra la brecha y el verbo "cerramos" declara la solución sin pitch.

---

### ABOUT (sección post-hero)

**Campo: `aboutEyebrow`**
```
LA BRECHA LO EXPLICA TODO
```

**Campo: `aboutTitle`**
```
"Gana antes del pitch."
```

**Campo: `aboutBody`**
```
"En este juego gana quien hace que el cliente ya haya
decidido antes de que empiece la conversación. Eso no
se logra produciendo más. Se logra cerrando la brecha
entre lo que construiste y cómo te percibe tu mercado —
y haciendo que cada señal de tu negocio empuje en la
misma dirección."
```

**Campo: `aboutCtaLabel`**
```
Cómo lo hacemos →
```

**Nota:** El body conserva la mejor línea del sitio actual ("en este juego gana quien...") y la integra con el lenguaje del gap (Keenan). Se elimina "producir más" como solución — se nombra el gap como el verdadero problema.

---

### FEATURED (video grande + method card)

**Campo: `featuredMethodLabel`**
```
POR QUÉ LAS PIEZAS SUELTAS NO FUNCIONAN
```

**Campo: `featuredMethodBody`**
```
"Pagaste por marca, web y producción.
Sigues perdiendo deals.
El problema no es ejecución:
cada pieza dice algo distinto."
```

**Campo: `featuredExploreLabel`**
```
Cómo construimos el sistema →
```

**Nota:** Esta card es Keenan puro — problema + impacto sin calificativo médico. Se conserva textual del sitio actual porque ya funciona exactamente como gap selling. Solo se actualiza el CTA.

---

### PHILOSOPHY (split: video izquierda / dos bloques derecha)

**Campo: `philosophyEyebrow`**
```
POR QUÉ SOMOS DISTINTOS
```

**Campo: `philosophyTitle`**
```
"Partimos de la posición. No del creativo."
```

**Campo: `philosophyBlock1Title`**
```
"vs. agencias de publicidad"
```

**Campo: `philosophyBlock1Body`**
```
"Ellas parten del creativo. Nosotros del campo de juego —
el creativo es consecuencia de la posición, no su punto
de partida."
```

**Campo: `philosophyBlock2Title`**
```
"vs. consultoras estratégicas"
```

**Campo: `philosophyBlock2Body`**
```
"Ellas entregan un PDF y se van. Nosotros producimos
lo que la posición indica que sirve — digital o físico."
```

**Nota:** Las 4 comparaciones completas van en la página /nosotros. Aquí se muestran las dos más potentes. Se reemplaza "diagnóstico comercial" por "campo de juego" (Lafley/Martin).

---

### ANTES / DESPUÉS (síntomas → resultados)

**Campo: `beforeAfterEyebrow`**
```
QUÉ CAMBIA CUANDO CIERRAS LA BRECHA
```

**Campo: `beforeLabel`**
```
Sin posición clara
```

**Campo: `beforeBody`**
```
"Compites por precio porque tu mercado no puede articular
por qué elegirte. Tu web recibe visitas que no convierten.
Tu contenido se ve profesional pero no trabaja para tu
posición. Cada nuevo deal empieza desde cero."
```

**Campo: `afterLabel`**
```
Con posición definida
```

**Campo: `afterBody`**
```
"Tu equipo pitcha con una sola voz. Tu web filtra los
leads que importan. Tus campañas se refuerzan en lugar
de dispersarse. Subes precio sin perder volumen."
```

**Nota (Keenan):** Se reemplaza "Los síntomas" por "Sin posición clara" — elimina el lenguaje médico sin perder la estructura before/after que comunica el gap con precisión.

---

### SERVICES (tres cards)

**Campo: `servicesEyebrow`**
```
SERVICIOS
```

**Campo: `servicesTitle`**
```
"Tres puntos de entrada."
```

**Campo: `servicesSubtitle`**
```
"Cada empresa enfrenta una brecha distinta.
Empiezas por donde tu negocio lo necesita hoy."
```

---

**Card 01 — Estrategia Comercial**

| Sub-campo | Valor |
|---|---|
| `serviceLabel` | 01 · Claridad competitiva |
| `serviceName` | Estrategia Comercial |
| `serviceShort` | Tu jugada para dominar tu categoría — articulada, documentada, ejecutable. |

**Card 02 — Identidad Digital**

| Sub-campo | Valor |
|---|---|
| `serviceLabel` | 02 · Marca, web y contenido |
| `serviceName` | Identidad Digital |
| `serviceShort` | El sistema visual que materializa tu posición y convierte visitantes en clientes. |

**Card 03 — Negocio + Diseño**

| Sub-campo | Valor |
|---|---|
| `serviceLabel` | 03 · Producción continua |
| `serviceName` | Negocio + Diseño |
| `serviceShort` | Las piezas que refuerzan tu posición. No las que solo se ven bien. |

---

### CLIENTS STRIP

**Campo: `clientLogosEyebrow`**
```
Confiaron en nosotros
```

---

### CTA FINAL

**Campo: `ctaEyebrow`**
```
EL SIGUIENTE PASO
```

**Campo: `ctaTitle`**
```
"¿Tu posición en el mercado refleja
lo que realmente construiste?"
```

**Campo: `ctaTitleItalic`**
```
*(vacío — el H2 funciona sin itálica aquí)*
```

**Campo: `ctaSubtitle`**
```
"Esa brecha tiene un costo real.
30 minutos para explorar juntos qué tan grande es
y si tiene sentido trabajar para cerrarla."
```

**Campo: `ctaLabel`**
```
Hablemos (30 min) →
```

**Nota (Keenan + Stanley):** Se abre con la pregunta del gap (Keenan — ¿tu posición refleja lo que construiste?) en lugar de "¿Reconoces el obstáculo?". La pregunta apela al logro (Stanley) mientras abre el gap (Keenan). Se elimina "diagnóstico" del CTA. "Hablemos" reemplaza "Agenda diagnóstico" y "le damos una vuelta".

---

## PARTE 5 — ABOUT PAGE (Sanity: aboutPage)

| Campo | Valor |
|-------|-------|
| `eyebrow` | NOSOTROS |
| `titlePlain` | Equipo ligero. |
| `titleItalic` | Trabajo serio. |
| `subtitle` | Riverhaus es un estudio pequeño con foco estrecho. Operamos desde Valdivia con clientes en Chile, LATAM y mercados selectivos en EE.UU. |
| `ctaWork` | Ver trabajos |
| `ctaSee` | Cómo trabajamos |

**Nota:** Se conserva "Equipo ligero. Trabajo serio." del sitio actual — es el mejor H1 del sitio.

### Manifiesto (cuerpo de la página)

```
Empezamos a trabajar desde Valdivia. Lo que vimos en
todos nuestros proyectos fue lo mismo: el problema casi
nunca era la ejecución.

Era que nadie había establecido la posición primero.

Contrataron un freelancer y les entregaron una pieza.
Contrataron una agencia y les entregaron un manual.
Contrataron una consultora y les entregaron un PDF.

Nada de eso cierra la brecha entre lo que construyeron
y cómo los percibe su mercado.

Así que cambiamos el orden.
Primero la posición.
Después la identidad.
Después la producción.

Ese orden es lo que cambia el resultado.
```

### Values grid

**Campo: `valuesHeading`**
```
Por qué somos distintos.
```

**Cards de valores:**

```
01 · POSICIÓN
Antes de producir una sola pieza, establecemos el
contexto correcto para tu oferta y definimos las
elecciones que te permiten ganar en tu categoría.

02 · SISTEMA
No entregamos piezas sueltas. Construimos un sistema
donde estrategia, identidad y producción trabajan bajo
el mismo programa.

03 · COHERENCIA
Las empresas que dominan su categoría no tienen mejor
producto. Tienen comunicación coherente de adentro
hacia afuera.

04 · EJECUCIÓN
Las consultoras entregan un PDF. Nosotros producimos
lo que la posición indica que sirve — digital o físico.
```

### Sección diferenciadores (vs. X)

```
vs. agencias de publicidad
Ellas parten del creativo. Nosotros del campo de juego —
el creativo es derivada de la posición, no el punto de
partida.

vs. freelancers
Ellos ejecutan tu pieza. Nosotros pensamos primero qué
pieza sirve — y por qué.

vs. agencias creativas
Ellas optimizan estética. Nosotros optimizamos posición
competitiva — la marca destaca en su categoría comercial,
no en concursos de diseño.

vs. consultoras estratégicas
Ellas entregan un PDF y se van. Nosotros producimos lo
que la posición indica que sirve — digital o físico.
```

---

## PARTE 6 — SERVICIOS (3 páginas)

### 6.1 — Estrategia Comercial

| Campo | Valor |
|-------|-------|
| `eyebrow` | SERVICIO 01 |
| `name` | Estrategia Comercial |
| `short` | Framework de posición + Playbook comercial + Equipo alineado. |
| `summary` | Tu equipo no puede articular un diferenciador claro. Cada persona describe el negocio de forma diferente. Los prospectos te comparan con alternativas más baratas. Construimos la posición que cierra esa brecha. |

**Estado actual — señales de que estás aquí:**
```
→ Cada persona en tu empresa describe el negocio diferente.
→ Los prospectos te comparan con alternativas más baratas.
→ Explicas "por qué elegirnos" en más de 30 segundos y no queda claro.
→ Produces contenido sin una narrativa competitiva que lo guíe.
→ Sientes que deberías dominar tu categoría pero no logras destacar.
```

**Estado futuro — lo que obtienes:**
```
Tu equipo pitcha con una sola voz.
Tu diferenciador es articulable en 10 segundos.
Cada pieza de comunicación refuerza la misma posición.
```

**Estadísticas (en contexto narrativo):**
```
"El 90% de las organizaciones falla en ejecutar su
estrategia — no por falta de talento, sino por falta
de claridad sobre el diferenciador."

"Las empresas con buena ejecución estratégica reportan
ganancias 2× superiores al promedio."
```

**Meta:**
```
Entregables:  Framework estratégico · Playbook comercial · Equipo alineado
Timeline:     6–8 semanas
Tu tiempo:    15–20 hrs totales (2–3 hrs/semana)
Inversión:    USD $2.5K–$6K
```

**CTA:** `Hablemos (30 min) →`

---

### 6.2 — Identidad Digital

| Campo | Valor |
|-------|-------|
| `eyebrow` | SERVICIO 02 |
| `name` | Identidad Digital |
| `short` | Sistema de identidad + Web que convierte + Contenido inicial. |
| `summary` | Tu realidad interna no coincide con tu percepción externa. Tienes claridad sobre tu oferta pero tu presencia digital no la comunica. Construimos el sistema visual que materializa tu posición. |

**Estado actual — señales:**
```
→ Tu web y materiales fueron diseñados hace 3+ años.
→ Tienes claridad sobre tu oferta pero tu presencia digital no la transmite.
→ Clientes calificados visitan tu sitio y no agendan conversaciones.
→ Tus materiales de venta son inconsistentes entre sí.
→ Cada punto de contacto comunica mensajes contradictorios.
```

**Frase ancla:**
```
"No se trata de cambiar el logo.
Se trata de que tu sistema visual materialice
la posición que ya te ganaste."
```

**Estadísticas (en contexto narrativo):**
```
"Los usuarios toman 50 milisegundos para decidir si
confían en un sitio. Ese juicio ocurre antes de leer
una sola palabra."

"El 88% abandona cuando la experiencia visual no valida
lo que prometía el boca a boca."
```

**Meta:**
```
Entregables:  Sistema de identidad · Web que convierte · Contenido inicial
Timeline:     8–12 semanas
Tu tiempo:    10–15 hrs totales
Inversión:    USD $3K–$10K
```

**CTA:** `Hablemos (30 min) →`

---

### 6.3 — Negocio + Diseño

| Campo | Valor |
|-------|-------|
| `eyebrow` | SERVICIO 03 |
| `name` | Negocio + Diseño |
| `short` | Producción audiovisual, gráfica y digital coherente con tu posición competitiva. |
| `summary` | Tu identidad está definida pero tu producción es reactiva. Produces piezas porque toca, no porque hay una arquitectura detrás. Producimos lo que refuerza tu posición — no lo que solo se ve bien. |

**Estado actual — señales:**
```
→ Tu identidad está definida pero tu producción es inconsistente.
→ Rotas entre freelancers que no conocen tu negocio en profundidad.
→ Lanzas campañas "porque corresponde", sin arquitectura de contenido.
→ No puedes evaluar si tu contenido refuerza o diluye tu posición.
→ Generas piezas que se ven bien pero no trabajan para tu jugada.
```

**Frase ancla:**
```
"No bonito. Estratégico."
```

**Meta:**
```
Entregables:  Producción audiovisual · Diseño gráfico y digital · Sistema continuo
Retainer:     desde USD $1K/mes
Proyectos:    USD $4K–$25K según alcance
```

**CTA:** `Hablemos (30 min) →`

---

## PARTE 7 — CON QUIÉN TRABAJAMOS

```
TIENE SENTIDO SI:
✓ Llevas 3+ años operando con ingresos estables.
✓ Tienes un equipo de 10+ personas que necesita alineación.
✓ Reconoces la brecha entre lo que construiste y cómo
  te percibe tu mercado.
✓ Valoras coherencia estratégica sobre volumen o precio.
✓ Tienes presupuesto para trabajo de alto nivel.
✓ Estás dispuesto a participar activamente (6–16 semanas).

NO TIENE SENTIDO SI:
✗ Estás validando la idea de negocio.
✗ Buscas el proveedor más barato.
✗ Quieres resultados en 2 semanas.
✗ Necesitas "solo un logo" o "solo una web".
✗ No tienes equipo que ejecute la posición después.
✗ Necesitas mucho contenido, rápido.
```

**Cierre:**
```
Esto no es arrogancia. Tenemos claridad sobre quién puede
aprovechar este sistema. Y ese rigor te protege a ti también.
```

---

## PARTE 8 — SCHEMA MARKUP (JSON-LD)

### Layout global (`app/layout.tsx`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://riverhaus.xyz/#organization",
      "name": "Riverhaus",
      "url": "https://riverhaus.xyz",
      "description": "Agencia de comunicación estratégica que integra posición competitiva, identidad digital y producción creativa para que empresas establecidas dominen su categoría.",
      "foundingDate": "2019",
      "areaServed": ["Chile", "Latinoamérica", "Estados Unidos"],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Valdivia",
        "addressRegion": "Los Ríos",
        "addressCountry": "CL"
      },
      "priceRange": "USD $2500–$25000",
      "serviceType": [
        "Estrategia Comercial",
        "Identidad Digital",
        "Negocio + Diseño"
      ],
      "sameAs": [
        "https://riverhaus.cargo.site",
        "https://www.instagram.com/riverhaus.xyz"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://riverhaus.xyz/#website",
      "url": "https://riverhaus.xyz",
      "name": "Riverhaus — Conquista tu categoría",
      "description": "Agencia de comunicación estratégica. Cerramos la brecha entre lo que construiste y cómo te percibe tu mercado.",
      "publisher": { "@id": "https://riverhaus.xyz/#organization" },
      "inLanguage": "es-CL"
    }
  ]
}
```

### FAQPage para páginas de servicio

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué incluye el servicio de Estrategia Comercial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Framework de posición + Playbook comercial + Equipo alineado. Timeline 6–8 semanas. Inversión USD $2.5K–$6K."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué incluye el servicio de Identidad Digital?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sistema de identidad visual + Web que convierte + Contenido inicial. Timeline 8–12 semanas. Inversión USD $3K–$10K."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué incluye Negocio + Diseño?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Producción audiovisual, gráfica y digital coherente con posición. Retainer desde USD $1K/mes o proyectos USD $4K–$25K."
      }
    },
    {
      "@type": "Question",
      "name": "¿Con qué tipo de empresas trabaja Riverhaus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Con empresas establecidas (3+ años, 10+ personas) que construyeron algo real pero cuya posición en el mercado no lo refleja todavía. No trabajamos con negocios en etapa de validación ni con quienes buscan solo un logo o una web."
      }
    }
  ]
}
```

### Meta tags por página

| Página | Title (≤60 chr) | Meta description (≤160 chr) |
|--------|-----------------|------------------------------|
| `/` | `Riverhaus — Conquista tu categoría` | `Cerramos la brecha entre lo que construiste y cómo te percibe tu mercado. Estrategia, identidad y producción bajo un solo sistema.` |
| `/nosotros` | `Nosotros — Riverhaus` | `Equipo ligero. Trabajo serio. Riverhaus, desde Valdivia. Clientes en Chile, LATAM y EE.UU.` |
| `/work` | `Trabajos — Riverhaus` | `Portfolio: Sernatur, Viña Undurraga, Cruzat Excom, ACRES S.A. Estrategia, identidad y producción audiovisual.` |
| `/services/estrategia-comercial` | `Estrategia Comercial — Riverhaus` | `Tu jugada para dominar tu categoría. Framework + Playbook + Equipo alineado. 6–8 semanas. USD $2.5K–$6K.` |
| `/services/identidad-digital` | `Identidad Digital — Riverhaus` | `Sistema visual que materializa tu posición. Web que convierte. 8–12 semanas. USD $3K–$10K.` |
| `/services/negocio-diseno` | `Negocio + Diseño — Riverhaus` | `Producción que refuerza tu posición. No bonito. Estratégico. Retainer desde USD $1K/mes.` |
| `/contact` | `Hablemos — Riverhaus` | `30 minutos. Sin pitch. Sin compromiso. Exploramos si tiene sentido trabajar juntos. Google Meet.` |

---

## NOTAS EDITORIALES

### Cambios de versión 1.0 → 2.0

| Elemento | v1.0 | v2.0 | Razón |
|---|---|---|---|
| "diagnóstico" | Aparecía 11 veces | Eliminado | Metáfora médica incorrecta |
| Hero opening | "Tu oferta es sólida. Tu mercado no lo sabe." | "Construiste algo real." | Stanley: reconocimiento antes que brecha |
| About section H2 | "Evidente." | "Gana antes del pitch." | Keenan: gap visible antes del cierre |
| Featured label | "Por qué tu última inversión no movió la aguja" | "Por qué las piezas sueltas no funcionan" | Más preciso, no culpa al cliente |
| Before/After labels | "Los síntomas / Después" | "Sin posición clara / Con posición definida" | Elimina lenguaje médico |
| Services subtitle | "¿Cómo comprometes a tus clientes?" | "Cada empresa enfrenta una brecha distinta." | La pregunta anterior no tenía relación con las cards |
| CTA final | "¿Reconoces el obstáculo?" | "¿Tu posición refleja lo que construiste?" | Keenan + Stanley: gap + reconocimiento |
| CTA botón | "Agenda diagnóstico" / "le damos una vuelta" | "Hablemos (30 min)" | Sin vocabulario médico, sin informalidad excesiva |
| Footer subtitle | "Diagnostiquemos tu posición" | "Definamos tu posición competitiva" | Una sola palabra cambiada, elimina la metáfora |
| About page H1 | "Construimos sistemas, no documentos sueltos." | "Equipo ligero. Trabajo serio." | Del sitio actual — es mejor |
| About page body | "Diagnóstico antes que producción" | "Primero la posición. Después la identidad." | Sin diagnóstico, más preciso |
| Values card 01 | "DIAGNÓSTICO" | "POSICIÓN" | Consecuente con el viraje conceptual |

### Aciertos del sitio actual que se conservan

| Línea | Conservada en |
|---|---|
| "Equipo ligero. Trabajo serio." | About page H1 |
| "En este juego gana quien hace que el cliente ya haya decidido antes del pitch." | About section body |
| "Pagaste por marca, web y producción. Sigues perdiendo deals. El problema no es ejecución: cada pieza dice algo distinto." | Featured card (textual) |
| Las 4 comparaciones "vs. X" | About page completa |
| "Tu competencia vende lo mismo que tú" | Footer eyebrow |
| "Fortalece tu posición. Supera a tu competencia." | Footer H3 |
| "Operamos desde Valdivia con clientes en Chile, LATAM y nichos seleccionados en EE.UU." | About page subtitle |
| "Inversión" como label de pricing | Nav |

---

*Versión 2.0 — 2026-05-22*
*Próximo paso: poblar Sanity con siteSettings → homePage → aboutPage → services*
