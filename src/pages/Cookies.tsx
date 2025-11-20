import { Layout } from "@/components/Layout";

const Cookies = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="mb-6">Политика использования cookie</h1>
          <div className="prose max-w-none">
            <p className="text-muted-foreground">Сайт использует cookie для аналитики (Яндекс.Метрика) и улучшения работы сервиса.</p>
            <p className="text-muted-foreground">Продолжая использовать сайт, вы соглашаетесь с использованием cookie.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cookies;
