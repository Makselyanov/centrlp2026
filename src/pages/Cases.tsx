import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAutoBreadcrumb } from "@/components/SeoSchemas";

const Cases = () => {
  useAutoBreadcrumb("Кейсы");
  return (
    <Layout
      title="Кейсы и результаты работы — CentrLP | Реальные примеры"
      description="Реальные кейсы студии CentrLP: как мы привлекаем клиентов для СТО, мебельных мастерских и клининга. Стабильные заявки через рекламу ВК и Яндекс.Директ."
    >
      <section className="pt-32 pb-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6">Наши кейсы</h1>
          <p className="text-xl text-muted-foreground mb-8">Реальные результаты работы с клиентами</p>
          <Button asChild size="lg">
            <a href="/#form">Запросить кейсы в PDF</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Cases;
