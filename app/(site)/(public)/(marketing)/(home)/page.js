//TODO:
// SITEMAP
// ROBOTS.TXT

import { getCurrentUser } from "@/services/db/getCurrentUser";
import BenefitsSection from "@/components/landing/BenefitsSection";
import FaqSection from "@/components/landing/Faqs";
import HeroSection from "@/components/landing/HeroSection";
import ReviewsSection from "@/components/landing/ReviewsSection";
import StepsSection from "@/components/landing/StepsSection";
import Banner from "@/components/landing/banner";
import { Steps } from "@/components/landing/steps";
import Testimonials1 from "@/components/landing/testimonials";
import ModalClient from "@/components/modals/modal-client";
import Container from "@/components/ui/container";
import { TestComp } from "@/components/utils/test-comp";
import Hero2 from "@/components/landing/hero2";

/**
 * @type {{title: string, description: string, imageUrl: string}[]}
 */
const steps = [
  {
    title: "Cuéntanos",
    description:
      "Explícanos tu idea para que podamos ayudarte a encontrar a tu artista",
    imageUrl: "/images/tatuaje-brazo.jpeg",
  },
  {
    title: "Nuestras recomendaciones",
    description:
      "Prepararemos para ti una lista de hasta 5 tatuadores que cumplan con tus criterios",
    imageUrl: "/images/tatuaje2.jpeg",
  },
  {
    title: "Elige tu artista",
    description: "Y habla directamente con él por el medio que tú decidas",
    imageUrl: "/images/tatuaje1.jpg",
  },
];

const benefits = {
  "Tatuadores de confianza":
    "Hemos revisado el trabajo de todos los tatuadores antes de dejarles entrar en TATTUO.",
  Inspírate: "Descubre nuevos estilos y tendencias de tatuaje.",
  "Reviews reales": "Lee las opiniones de otros usuarios y deja la tuya.",
  "100% gratis":
    "Tattuo es totalmente gratuito, tanto para artistas como para clientes",
};

const faqs = [
  {
    question: "¿Cuánto cuesta?",
    answer:
      "TATTUO es gratis para todos los usuarios. Busca tus tatuadorxs por estilo, ciudad o descúbrelos por sus tatuajes y escríbeles directamente a sus redes sociales",
  },
  {
    question: "¿Qué precio tiene un tatuaje?",
    answer:
      "El precio de un tatuaje depende de muchos factores, como el tamaño, el estilo, el color, etc. Escríbele al tatuador que te interesa y cuéntale tu idea, él te dirá el precio",
  },
  // { question: "¿Cómo funciona?", answer: "Tan fácil como navegar por TATTUO y cuando encuentres unx artista que te guste, escribirle por la vía que prefieras. No hace falta que sea por TATTUO, escríbele por dónde te sea más cómodo" },
  // { question: "¿Cómo puedo contactar con los tatuadores?", answer: "Puedes contactar con ellos por el medio que tú decidas: teléfono, email, Instagram, etc." },
  {
    question: "¿Sois un estudio de tatuajes?",
    answer: "No, somos una plataforma que conecta a usuarios con tatuadores.",
  },
  {
    question: "¿Cómo puedo dejar una reseña?",
    answer:
      "Una vez hayas contactado con el tatuador y realizado tu tatuaje, te enviaremos un email para que puedas dejar tu reseña.",
  },
];
// Write an array with 3 fake reviews in Spanish. Each array has: name (of the person), date, role (tattoo artist or client) and reviewText.
const reviews = [
  {
    author: "Ricardo Sala",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, eos eaque alias quas dolore, quis, doloremque consequuntur distinctio architecto molestiae necessitatibus! Doloremque eaque architecto aliquam provident eius nobis recusandae in?",
    rating: 5,
  },
  {
    author: "Ricardo Sala",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, eos eaque alias quas dolore, quis, doloremque consequuntur distinctio architecto molestiae necessitatibus! Doloremque eaque architecto aliquam provident eius nobis recusandae in?",
    rating: 4,
  },
  {
    author: "Ricardo Sala",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, eos eaque alias quas dolore, quis, doloremque consequuntur distinctio architecto molestiae necessitatibus! Doloremque eaque architecto aliquam provident eius nobis recusandae in?",
    rating: 3,
  },
];

export default async function Home({ searchParams }) {
  const currentUser = await getCurrentUser();

  return (
    <div className="gap flex min-h-screen flex-col items-center justify-between">
      {/* There are probably better ways to do this, but I don't know how. Basically I need access to the context to be able to open the modal, and the only way I see to do it is "embedding" a client component somewhere in the page */}

      <ModalClient />
      <Hero2 currentUser={currentUser} />

      {/* <HeroSection
        title={"Descubre tatuajes y tatuadores cerca de ti"}
        subtitle={
          "TATTUO selecciona los mejores tatuadores en tu ciudad y te pone en contacto con ellos"
        }
        cta={"Empezar"}
        currentUser={currentUser}
      /> */}
      {/* <ReviewsSection reviews={reviews} /> */}
      <FaqSection faqs={faqs} title="Preguntas frecuentes" />
      <Steps />
      {/* <Testimonials1 /> */}

      {/* <StepsSection steps={steps} title="¿Cómo funciona?" /> */}

      <Banner currentUser={currentUser} />

      <BenefitsSection title={"Por qué elegir TATTUO?"} benefits={benefits} />

      {/* <TestComp currentUser={currentUser} /> */}
      {/* <ReviewsSection reviews={reviews} /> */}
    </div>
  );
}
