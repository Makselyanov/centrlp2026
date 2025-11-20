import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";



export const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    business: "",
    city: "",
    link: "",
    comment: "",
    privacyAccepted: false,
    cookiesAccepted: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacyAccepted || !formData.cookiesAccepted) {
      toast({
        title: "Ошибка",
        description: "Необходимо согласие на обработку данных и использование cookie",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/1@centrlp.ru", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: "Новая заявка с сайта CentrLP",
          _captcha: "false" // Optional: disable captcha if desired, or keep it
        })
      });

      if (response.ok) {
        toast({
          title: "Заявка отправлена!",
          description: (
            <div>
              <p className="mb-3">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
              <div className="flex gap-2">
                <a
                  href="https://t.me/centrlp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 rounded-md bg-[#0088cc] text-white text-sm hover:opacity-80"
                >
                  Telegram
                </a>
                <a
                  href="https://wa.me/79058248564"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 rounded-md bg-[#25D366] text-white text-sm hover:opacity-80"
                >
                  WhatsApp
                </a>
                <a
                  href="https://vk.com/centrlp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 rounded-md bg-[#0077FF] text-white text-sm hover:opacity-80"
                >
                  ВКонтакте
                </a>
              </div>
            </div>
          ),
        });

        // Reset form
        setFormData({
          name: "",
          phone: "",
          business: "",
          city: "",
          link: "",
          comment: "",
          privacyAccepted: false,
          cookiesAccepted: false,
        });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Пожалуйста, попробуйте позже или свяжитесь с нами через мессенджеры.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card shadow-card rounded-2xl p-8" data-metric="form-submit">
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Имя *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="phone">Телефон *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="business">Бизнес/ниша *</Label>
          <Input
            id="business"
            name="business"
            value={formData.business}
            onChange={(e) => setFormData({ ...formData, business: e.target.value })}
            required
            className="mt-2"
            placeholder="Например: мебельная мастерская"
          />
        </div>

        <div>
          <Label htmlFor="city">Город *</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="link">Ссылка на соцсеть/сайт</Label>
          <Input
            id="link"
            name="link"
            type="url"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="mt-2"
            placeholder="https://"
          />
        </div>

        <div>
          <Label htmlFor="comment">Комментарий</Label>
          <Textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            className="mt-2"
            rows={4}
            placeholder="Расскажите о вашем проекте и пожеланиях"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="privacy"
              checked={formData.privacyAccepted}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, privacyAccepted: checked as boolean })
              }
              required
            />
            <Label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
              Согласен на{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                обработку персональных данных
              </Link>
            </Label>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="cookies"
              checked={formData.cookiesAccepted}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, cookiesAccepted: checked as boolean })
              }
              required
            />
            <Label htmlFor="cookies" className="text-sm leading-relaxed cursor-pointer">
              Согласен на{" "}
              <Link to="/cookies" className="text-primary hover:underline">
                использование cookie
              </Link>
            </Label>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Отправить заявку
        </Button>
      </div>
    </form>
  );
};
