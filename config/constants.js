export const PAGE_SIZE = 5;

// We have -three- TWO!!!! "kinds" of cities: i) those that should be static--> NOT ANYMORE!,
// ii) those server rendered, iii) those
// that should not exist (for seo is better not too many pages)

export const generatedCities = [
  {
    city: "madrid",
    text: `<p>
    Madrid, una ciudad vibrante y llena de vida, es también el hogar de algunos de los tatuadores más talentosos y reconocidos. Desde la tradición y el estilo clásico hasta el innovador arte contemporáneo, Madrid ofrece una diversidad impresionante en el mundo del tatuaje.
</p><br/>

<p>
    Entre los artistas más destacados se encuentra <strong>El Bara</strong> de True Love Tattoo, famoso por su tatuaje tradicional americano y por ser una figura prominente en el llamado 'tattorismo'. Un viaje a su estudio en Calle Velarde es más que una sesión de tatuaje; es una experiencia única en la vida.
</p><br/>

<p>
    En Drama Tattoo, <strong>Jesús Cuesta</strong> lleva el concepto de estilo personal a nuevos niveles. Con una mezcla única de elementos psicodélicos y diseños personalizados, sus obras son verdaderamente una forma de arte distintiva.
</p><br/>

<p>
    <strong>Sayr135</strong> en Ultrataller y <strong>La Dolores</strong>, que divide su tiempo entre Valencia y Madrid, son conocidos por su enfoque único en el tatuaje tradicional, mezclando influencias clásicas con toques modernos que hacen que sus obras destaquen en el siglo XXI.
</p><br/>

<p>
    Si buscas realismo casi fotográfico, <strong>Black Sánchez</strong> de Chinatown Tattoo es el artista a quien acudir. Con una atención al detalle que asombra, sus tatuajes son verdaderas obras de arte que capturan la esencia de sus sujetos con una precisión sorprendente.
</p><br/>

<p>
    En Bowery Tattoo, los talentosos <strong>Diamond Tattoos</strong> y <strong>Andrea Losantos</strong> ofrecen diseños que van desde el old school con un toque personal hasta creaciones que juegan con texturas y movimientos, creando impresionantes obras de arte en la piel.
</p><br/>

<p>
    Madrid no solo es un centro de cultura y arte, sino también un punto de encuentro para los amantes del tatuaje, donde artistas como <strong>El Bueno</strong> en Cornelius Tattoo y Kimchi Tattoo y <strong>Raro82</strong> también en Kimchi Tattoo, brindan experiencias únicas y estilos inconfundibles. Madrid es, sin duda, un destino clave para todos aquellos que buscan expresarse a través del arte del tatuaje.
</p>
<br/>
<h3>Vive la Pasión Madrileña</h3>
En Madrid, después de tatuarte, explora las obras maestras en el Museo del Prado o el Centro de Arte Reina Sofía. Disfruta de la exquisita gastronomía en el Mercado de San Miguel y vive la noche madrileña en los animados barrios de Malasaña y Chueca. Madrid combina historia, arte y una vibrante vida nocturna para una experiencia inolvidable.
`,
  },
  {
    city: "barcelona",
    // generate a different text for Barcelona, not just changing the name of the city!!! I DO NOT WANT THIS:
    // text: "En Barcelona encontrarás tatuadores de todas las tendencias y estilos posibles. Desde los más clásicos hasta los más modernos. ¿Quieres hacerte un tatuaje en Barcelona? ¡Echa un vistazo a nuestra selección de tatuadores en Barcelona!",
    text: `<p>Barcelona, <strong>la ciudad condal</strong> y una de las capitales artísticas de Europa.</p><br/>
    
    <p>En Barcelona encontrarás a algunos de los mejores artistas a nivel nacional e internacional, como Dominik de Now or Never, la gente del estudio Avantgarde en Carrer de Guitard o Luís Tattoo, que tantos trabajos a hecho a futbolistas del FC Barcelona </p><br/>

    <p>Además del talento local decenas de tatuadores internacionales visitan la ciudad cada mes, ofreciéndote la oportunidad de encontrar a los mejores tatuadores del mundo en Barcelona, cerca de ti</p>
    <br/>
    <h3>Explora y Disfruta de Barcelona</h3>
Tras tu sesión de tatuaje en Barcelona, sumérgete en su icónica arquitectura visitando la Sagrada Familia o paseando por el Park Güell. Relájate en las playas de la Barceloneta y disfruta de la vibrante vida nocturna en los bares y clubes del centro de la ciudad. Barcelona es un paraíso para los jóvenes, lleno de arte, cultura y diversión.
    `,
  },
  {
    city: "valencia",
    text: `<p>
    Valencia, una ciudad donde el arte y la creatividad florecen en cada rincón, es un verdadero paraíso para los amantes de los tatuajes. Aquí, el cuerpo se convierte en un lienzo vivo, reflejando historias personales y artísticas únicas.
</p><br/>

<p>
    En Valencia, encontrarás una impresionante selección de estudios de tatuajes, cada uno con su propio estilo y especialidad. Desde <strong>Calipso Tattoo & Piercing</strong>, conocido por su combinación de tatuajes, piercings, y servicios de barbería, hasta <strong>Rober 13 Tattoo</strong>, donde los diseños personalizados cobran vida en las manos de un tatuador con más de una década de experiencia.
</p><br/>

<p>
    Si buscas una experiencia que trascienda lo convencional, <strong>Tania Tattoo Arte Salvaje</strong> te espera con su enfoque creativo y artístico. Este estudio no es solo un lugar para tatuajes, sino un santuario de la creatividad y el arte.
</p><br/>

<p>
    Para aquellos en busca de talento y profesionalismo en el corazón de Valencia, <strong>Morning Glory Tattoo & Gallery</strong> es el destino perfecto. Situado cerca del barrio del Carmen, este estudio ofrece un ambiente higiénico y acogedor, perfecto para dar vida a tus ideas más personales.
</p><br/>

<p>
    Y si te atraen los tatuajes con un toque distintivo, no te puedes perder <strong>La Piratería Tattoo</strong> en Benimaclet, donde encontrarás una amplia gama de estilos, desde el Ornamental hasta el Minimalista. Cada tatuaje realizado aquí es una obra de arte en sí misma, reflejando tanto la tradición como la innovación.
</p><br/>

<p>
    En resumen, Valencia no solo es una ciudad de rica historia y vibrante cultura, sino también un centro de excelencia en el arte del tatuaje. Con una variedad de estudios y artistas, cada aventura de tatuaje aquí promete ser una experiencia única e inolvidable.
</p>
`,
  },
  {
    city: "zaragoza",
    text: `<p>
    Zaragoza, una ciudad que celebra la cultura y el arte en todas sus formas, se ha convertido en un destacado centro para los amantes del tatuaje. Con una rica variedad de estudios y artistas, la ciudad ofrece una experiencia de tatuaje única y personalizada para cada individuo.
</p><br/>

<p>
    Comenzando con <strong>Al Toccino Tattoo-V</strong> en el barrio de las Fuentes, este estudio es conocido no solo por su excepcional servicio de tatuajes y piercings, sino también por su acogedor ambiente. Aquí, Alfredo Evangelista y su equipo de artistas, incluyendo a Héctor Campos y Dani Z, brindan una atención meticulosa a los detalles y personalizan cada tatuaje para reflejar la visión y el estilo de sus clientes.
</p><br/>

<p>
    En el corazón de Zaragoza, <strong>Tattoojulian Studio</strong> se destaca por la maestría de Julián en el estilo realista. El estudio, ubicado en Paseo de la Constitución, es un referente en la ciudad, ofreciendo una amplia gama de estilos y cursos de formación para aspirantes a tatuadores.
</p><br/>

<p>
    <strong>Coyote Tattoo</strong>, situado en el barrio Jesús, es un estudio donde la vieja escuela se encuentra con la innovación. Con un enfoque en adaptar los estilos a los deseos de los clientes, el estudio es famoso por su trabajo en estilos como maori, geométrico, tradicional y realismo en blanco y negro.
</p><br/>

<p>
    Sergio Blanco de <strong>Blanco Tattoo</strong>, un apasionado del arte y autodidacta del tatuaje, ha creado un espacio donde cada diseño es una pieza única de arte. Blanco Tattoo se ha establecido rápidamente como un estudio líder en Zaragoza, conocido por su calidad y atención al detalle.
</p><br/>

<p>
    Finalizamos nuestro recorrido en <strong>Bortwins Tattoo</strong>, un estudio fundado en 2012 y especializado en tatuajes únicos y personalizados. Bajo la dirección de George Mensa, el estudio se ha ganado una reputación por su compromiso con la higiene, la calidad y la satisfacción del cliente, ofreciendo una amplia gama de estilos y técnicas de tatuaje.
</p><br/>
<h3>Descubre los Tesoros de Zaragoza</h3>
Después de tatuarte en Zaragoza, maravíllate con la Basílica del Pilar y el Palacio de la Aljafería. Pasea a lo largo del río Ebro y disfruta de la deliciosa cocina aragonesa en el casco antiguo. Zaragoza es un lugar ideal para los amantes de la historia y la cultura, ofreciendo un ambiente relajado y acogedor.
`,
  },
  {
    city: "sevilla",
    text: "Sevilla recoge a los mejores tatuadores del sur de España, que atraen a clientes de todo el país. ¿Quieres hacerte un tatuaje en Sevilla? ¡Echa un vistazo a nuestra selección de tatuadores en Sevilla!",
  },
  {
    city: "bilbao",
    text: "Bilbao es una de las ciudades más importantes del norte de España. Encontrarás tatuadores de todos los estilos, desde los más clásicos hasta los más modernos. ¿Quieres hacerte un tatuaje en Bilbao? ¡Echa un vistazo a nuestra selección de tatuadores en Bilbao!",
  },
];

export const generatedContentSlugs = [
  {
    content: "mariposa",
    text: `<h3>La Belleza de los Tatuajes de Mariposa</h3>
      <p>Los <strong>tatuajes de mariposa</strong> son una elección popular por su belleza simbólica y versatilidad de diseño. Representando la transformación, la libertad y la naturaleza efímera de la vida, los tatuajes de mariposa pueden adaptarse a diversos estilos y tamaños, desde delicados tatuajes minimalistas hasta coloridas obras de arte de gran tamaño. Encuentra inspiración para tu próximo tatuaje de mariposa y descubre cómo este diseño puede reflejar tu viaje personal y crecimiento.</p>`,
  },
  {
    content: "parejas",
    text: `<h3>Tatuajes de Parejas: Símbolos de Amor y Conexión</h3>
    <p>Los <strong>tatuajes de parejas</strong> son una hermosa manera de expresar amor y compromiso. Ya sea a través de diseños que se complementan, frases que se entrelazan o símbolos que representan su unión, estos tatuajes son un testimonio permanente de la conexión entre dos personas. Explora ideas creativas de tatuajes de pareja que simbolizan tu relación única y fortalecen tu vínculo.</p>`,
  },
  {
    content: "mujer",
    text: `<h3>Tatuajes de Mujer: Empoderamiento y Estilo</h3>
    <p>Los <strong>tatuajes de mujer</strong> abarcan una amplia gama de diseños que reflejan fuerza, feminidad y libertad de expresión. Desde intrincados tatuajes florales hasta potentes símbolos de empoderamiento femenino, hay un diseño para cada mujer que desea expresar su individualidad y sus valores. Descubre cómo los tatuajes pueden ser una forma de arte personal y significativa para mujeres de todas las edades.</p>`,
  },
  {
    content: "alas",
    text: `<h3>Tatuajes de Alas: Libertad y Espiritualidad</h3>
    <p>Los <strong>tatuajes de alas</strong> son un símbolo poderoso de libertad, protección y espiritualidad. Estos tatuajes pueden variar desde pequeñas alas delicadas hasta majestuosos diseños de ángeles o pájaros que abarcan toda la espalda. Cada tatuaje de alas cuenta una historia única, ofreciendo un sentido de libertad y la posibilidad de elevarse por encima de las dificultades de la vida.</p>`,
  },
  {
    content: "perros",
    text: `<h3>Tatuajes de Perros: Honor a los Compañeros Fieles</h3>
    <p>Los <strong>tatuajes de perros</strong> son una forma conmovedora de rendir homenaje a los compañeros caninos que han dejado una huella en nuestras vidas. Estos tatuajes pueden representar la lealtad, la amistad y el amor incondicional que compartimos con nuestros amigos de cuatro patas. Desde retratos realistas hasta diseños más abstractos o simbólicos, los tatuajes de perros son una manera especial de recordar y celebrar la conexión especial que tenemos con nuestros fieles compañeros.</p>`,
  },
];
