import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout title="Страница не найдена | CentrLP" description="Запрашиваемая страница не найдена. Перейдите на главную страницу CentrLP или выберите нужный раздел.">
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
          <p className="mb-8 text-xl text-muted-foreground">Страница не найдена</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-white hover:bg-primary/90 transition-colors">
              На главную
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-primary hover:bg-primary/10 transition-colors">
              Услуги
            </Link>
            <Link to="/contacts" className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-primary hover:bg-primary/10 transition-colors">
              Контакты
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
