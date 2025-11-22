import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Phone } from "lucide-react";

const Contacts = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 gradient-hero">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0096D6] to-[#44B78B]">Контакты</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-4">CentrLP</h3>
              <p className="text-muted-foreground mb-6">НПД Кузнецов Максим Владимирович<br />ИНН 720321829472<br />г. Тюмень, Солнечный проезд, 22</p>
              <a href="tel:+79058248564" className="flex items-center text-lg mb-4"><Phone className="w-5 h-5 mr-2" />8-905-824-85-64</a>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A644fd3fd8f74799009f60c932487dc7ef6b4d7208f53ac7e5e596cb6eec650ac&source=constructor" width="100%" height="400" frameBorder="0"></iframe>
    </Layout>
  );
};

export default Contacts;
