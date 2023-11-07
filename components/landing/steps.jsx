import Container from "@/components/container";
import { config } from "@/config/shipper.config";
import Link from "next/link";

export function Steps({}) {
  return (
    <Container className="isolate flex max-w-5xl flex-col gap-12">
      {/* mb-32 mt-32  sm:mt-56 */}
      <div className="px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-2 sm:text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Localiza tu tatuador HOY
          </h2>
          <p className="text-lg text-gray-600">
            Encuentra el artista perfecto para lo que buscas en{" "}
            {config.general.appName}
          </p>
        </div>
      </div>

      {/* steps */}
      <ol className="flex flex-col gap-2 md:flex-row md:gap-12">
        {/* space-y-4 md:space-x-12 */}
        <li className="md:flex-1">
          <SingleStep stepNumber={1} title="Crea tu cuenta">
            <span className="mt-2 text-zinc-700">
              Así podrás guardar los tatuajes que más te gusten y contactar con
              los artistas
            </span>
          </SingleStep>
        </li>
        <li className="md:flex-1">
          <SingleStep stepNumber={2} title="Descubre tu tatuador">
            <span className="mt-2 text-zinc-700">
              Conoce sus estilos, las piezas que ha realizado, lo opinión de
              otros clientes, ...
            </span>
          </SingleStep>
        </li>
        <li className="md:flex-1">
          <SingleStep stepNumber={3} title="Contáctale cómo quieras">
            <span className="mt-2 text-zinc-700">
              No nos &ldquo;ponemos en medio&ldquo;, contacta a tu tatuador
              directamente y cuéntale qué buscas
            </span>
          </SingleStep>
        </li>
      </ol>
    </Container>
  );
}

function SingleStep({ stepNumber = 1, title = "Título del step", children }) {
  return (
    <div
      className="isolate flex flex-col space-y-2 border-l-4 border-zinc-300
        py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4"
    >
      <span className="text-sm font-medium text-blue-600">
        Paso {stepNumber}
      </span>
      <span className="text-xl font-semibold">{title}</span>
      {children}
    </div>
  );
}
