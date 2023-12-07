import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

const Prices = ({ form }) => {
  return (
    <>
      <h2>Precios</h2>
      <p className="text-sm text-primary/50">
        Entramos en un tema complicado.
        <br /> Sabemos que es difícil estimar el precio de un tatuaje, pero los
        clientes que te vean querrán saber (más o menos) en qué rango de precio
        estará la pieza. No es un compromiso, simplemente les sirve para hacerse
        a la idea antes de contactar!
      </p>

      <FormField
        control={form.control}
        name="minWorkPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Precio mínimo</FormLabel>
            <FormControl>
              <Input type="number" placeholder="100€" {...field} />
            </FormControl>
            <FormDescription>
              Precio del trabajo que aceptas como mínimo (Es decir, el trabajo
              más pequeño que quieres aceptar)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="pricePerHour"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Precio por hora</FormLabel>
            <FormControl>
              <Input type="number" placeholder="50€" {...field} />
            </FormControl>
            <FormDescription>
              Precio del trabajo que aceptas como mínimo (Es decir, el trabajo
              más pequeño que quieres aceptar)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="pricePerSession"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Precio por sesión</FormLabel>
            <FormControl>
              <Input type="number" placeholder="300€" {...field} />
            </FormControl>
            <FormDescription>
              Precio del trabajo que aceptas como mínimo (Es decir, el trabajo
              más pequeño que quieres aceptar)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default Prices;
