import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stackTechnologies } from "@/data/technologies";
import { StackMarquee } from "./StackMarquee";

export function TechnologyStack() {
  return <section id="tecnologias" className="section bg-[#09101c]">
    <Container>
      <SectionHeading eyebrow="Stack" title="Tecnologias com que trabalho." description="Passe o mouse ou toque em um ícone para ver o nome da tecnologia." sticker="docker" />
    </Container>
    <StackMarquee technologies={stackTechnologies} />
  </section>;
}
