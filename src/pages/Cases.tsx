import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

const Cases = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6">Наши кейсы</h1>
          <p className="text-xl text-muted-foreground mb-8">Реальные результаты работы с клиентами</p>
          <a href="/#form"><Button size="lg">Запросить кейсы в PDF</Button></a>
        </div>
      </section>
    </Layout>
  );
};

export default Cases;
