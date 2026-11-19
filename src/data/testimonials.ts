export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

/** Depoimentos reais de clientes, colegas ou gestores. A seção só aparece no site quando houver pelo menos um item. */
export const testimonials: Testimonial[] = [];
