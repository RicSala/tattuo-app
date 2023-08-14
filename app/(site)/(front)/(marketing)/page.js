

//TODO:
// SITEMAP
// ROBOTS.TXT

import { getArtists } from "@/actions/getArtists"
import { getCurrentUser } from "@/actions/getCurrentUser"
import { getTattoos } from "@/actions/getTattoos"
import BenefitsSection from "@/components/landing/BenefitsSection"
import FaqSection from "@/components/landing/Faqs"
import HeroSection from "@/components/landing/HeroSection"
import ReviewsSection from "@/components/landing/ReviewsSection"
import StepsSection from "@/components/landing/StepsSection"
import NavBar from "@/components/navbar/nav-bar"
import Container from "@/components/ui/container"

const steps = {
  "Cuéntanos": "Explícanos tu idea para que podamos ayudarte a encontrar a tu artista",
  "Nuestras recomendaciones": "Prepararemos para ti una lista de hasta 5 tatuadores que cumplan con tus criterios",
  "Elige tu artista": "Y habla directamente con él por el medio que tú decidas"
}

const benefits = {
  "Tatuadores de confianza": "Hemos revisado el trabajo de todos los tatuadores antes de dejarles entrar en TATTUO.",
  "Inspírate": "Descubre nuevos estilos y tendencias de tatuaje.",
  "Reviews reales": "Lee las opiniones de otros usuarios y deja la tuya.",
  "100% gratis": "Tattuo es totalmente gratuito, tanto para artistas como para clientes",
}

const faqs = [
  { question: "¿Cuánto cuesta?", answer: "Nada. TATTUO es gratis para los usuarios." },
  { question: "¿Qué precio tiene un tatujae?", answer: "El precio de un tatuaje depende de muchos factores, como el tamaño, el estilo, el color, etc. Por eso, no podemos darte un precio exacto" },
  { question: "¿Cómo funciona?", answer: "Cuéntanos qué tatuaje quieres hacerte y te recomendaremos hasta 5 tatuadores que cumplan con tus criterios." },
  { question: "¿Cómo puedo contactar con los tatuadores?", answer: "Puedes contactar con ellos por el medio que tú decidas: teléfono, email, Instagram, etc." },
  { question: "¿Sois un estudio de tatuajes?", answer: "No, somos una plataforma que conecta a usuarios con tatuadores." },
  { question: "¿Cómo puedo dejar una reseña?", answer: "Una vez hayas contactado con el tatuador, te enviaremos un email para que puedas dejar tu reseña." },
]
// Write an array with 3 fake reviews in Spanish. Each array has: name (of the person), date, role (tattoo artist or client) and reviewText.
const reviews = [
  {
    author: "Ricardo Sala",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, eos eaque alias quas dolore, quis, doloremque consequuntur distinctio architecto molestiae necessitatibus! Doloremque eaque architecto aliquam provident eius nobis recusandae in?",
    rating: 5,
  },
  {
    author: "Ricardo Sala",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, eos eaque alias quas dolore, quis, doloremque consequuntur distinctio architecto molestiae necessitatibus! Doloremque eaque architecto aliquam provident eius nobis recusandae in?",
    rating: 4,
  },
  {
    author: "Ricardo Sala",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, eos eaque alias quas dolore, quis, doloremque consequuntur distinctio architecto molestiae necessitatibus! Doloremque eaque architecto aliquam provident eius nobis recusandae in?",
    rating: 3,
  },
]


export default async function Home({ searchParams }) {

  return (

    <>

      <NavBar />
      <Container>
        <div className='flex flex-col gap-10'>

          <HeroSection
            title={'Descubre tatuajes y tatuadores cerca de ti'}
            subtitle={'TATTUO selecciona los mejores tatuadores en tu ciudad y te pone en contacto con ellos'}
            cta={'Empezar'} />
          <ReviewsSection reviews={reviews} />
          <FaqSection faqs={faqs} />

          <StepsSection steps={steps} />

          <BenefitsSection
            title={"Por qué elegir TATTUO?"}
            benefits={benefits}

          />
          <FaqSection
            hasTitle={true}
            faqs={faqs} />
        </div>

      </Container>
    </>
  )
}
