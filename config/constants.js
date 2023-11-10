export const PAGE_SIZE = 5;

// We have -three- TWO!!!! "kinds" of cities: i) those that should be static--> NOT ANYMORE!,
// ii) those server rendered, iii) those
// that should not exist (for seo is better not too many pages)

export const generatedCities = [
  {
    city: "madrid",
    text: "En Madrid encontrarás tatuadores de todas las tendencias y estilos posibles. Desde los más clásicos hasta los más modernos. ¿Quieres hacerte un tatuaje en Madrid? ¡Echa un vistazo a nuestra selección de tatuadores en Madrid!",
  },
  {
    city: "barcelona",
    // generate a different text for Barcelona, not just changing the name of the city!!! I DO NOT WANT THIS:
    // text: "En Barcelona encontrarás tatuadores de todas las tendencias y estilos posibles. Desde los más clásicos hasta los más modernos. ¿Quieres hacerte un tatuaje en Barcelona? ¡Echa un vistazo a nuestra selección de tatuadores en Barcelona!",
    text: `Barcelona, la ciudad condal y una de las capitales artísticas de Europa.
    
    Decenas de tatuadores internacionales visitan la ciudad cada mes, ofreciéndote la oportunidad de encontrar a los mejores tatuadores del mundo en Barcelona, cerca de ti`,
  },
  {
    city: "valencia",
    text: "Valencia es una de las ciudades más importantes de España. Encontrarás tatuadores de todos los estilos, desde los más clásicos hasta los más modernos. ¿Quieres hacerte un tatuaje en Valencia? ¡Echa un vistazo a nuestra selección de tatuadores en Valencia!",
  },
  {
    city: "zaragoza",
    text: "Zaragoza cuenta con algunos de los tatuadores más reputados de España. Los tatuadores de Zaragoza son conocidos por su profesionalidad y su buen hacer. ¿Quieres hacerte un tatuaje en Zaragoza? ¡Echa un vistazo a nuestra selección de tatuadores en Zaragoza!",
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
