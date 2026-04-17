import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PhoneCall } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { trackMetric } from "@/lib/metrics";
import { MessengerLinks } from "./MessengerLinks";

export const ContactForm = () => {
  const { toast } = useToast();
  const location = useLocation();
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
        description: "Нужно согласие на обработку данных и использование cookie",
        variant: "destructive",
      });
      return;
    }

    try {
      trackMetric("form_submit_attempt", { path: location.pathname });

      const response = await fetch("https://formsubmit.co/ajax/1@centrlp.ru", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          page_path: location.pathname,
          page_url: typeof window !== "undefined" ? window.location.href : "",
          lead_source: "centrlp.ru",
          _subject: `Новая заявка CentrLP: ${location.pathname}`,
          _captcha: "false",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      trackMetric("lead_form_submit", { path: location.pathname });

      toast({
        title: "Заявка отправлена",
        description: (
          <div>
            <p className="mb-3">
              Спасибо. Мы свяжемся с вами в ближайшее время. Если удобнее, можно сразу
              продолжить диалог в мессенджере.
            </p>
            <MessengerLinks variant="toast" />
            <div className="hidden">
              <a
                href="https://t.me/centrlp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-[#0088cc] px-3 py-1 text-sm text-white hover:opacity-80"
              >
                Telegram
              </a>
              <a
                href="https://wa.me/79058248564"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-[#25D366] px-3 py-1 text-sm text-white hover:opacity-80"
              >
                WhatsApp
              </a>
              <a
                href="https://vk.me/centrlp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-[#0077FF] px-3 py-1 text-sm text-white hover:opacity-80"
              >
                ВКонтакте
              </a>
            </div>
          </div>
        ),
      });

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
    } catch (error) {
      trackMetric("lead_form_error", { path: location.pathname });
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позже или напишите нам сразу в MAX, Telegram, WhatsApp или VK.",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-8"
      data-metric="form-submit"
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-[#0096D6]/15 bg-gradient-to-br from-[#0096D6]/[0.06] via-white to-[#44B78B]/[0.05] p-5">
          <div className="mb-2 inline-flex items-center rounded-full border border-[#0096D6]/15 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0096D6]">
            Быстрый старт
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Имя и телефон уже достаточно, чтобы мы начали.
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Достаточно оставить контакт, чтобы быстро обсудить задачу и удобный
            формат связи без лишней переписки.
          </p>
          <div className="mt-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Главный канал связи
            </div>
            <MessengerLinks
              variant="fastlane"
              onMessengerClick={(messenger) =>
                trackMetric("messenger_click_fastlane", {
                  path: location.pathname,
                  messenger,
                })
              }
            />
          </div>
          <div className="mt-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Дополнительно
            </div>
            <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+79058248564"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-[#44B78B]/40 hover:text-[#44B78B]"
              data-metric="phone-click"
              onClick={() =>
                trackMetric("phone_click_fastlane", {
                  path: location.pathname,
                })
              }
            >
              <PhoneCall className="h-4 w-4" />
              Быстрый звонок
            </a>
            <div className="text-xs leading-5 text-slate-500">
              Telegram, WhatsApp и VK тоже доступны, если так удобнее.
            </div>
            </div>
          </div>
        </div>

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
          <Label htmlFor="business">Бизнес / ниша</Label>
          <Input
            id="business"
            name="business"
            value={formData.business}
            onChange={(e) => setFormData({ ...formData, business: e.target.value })}
            className="mt-2"
            placeholder="Например: услуги, клиника, студия, e-commerce"
          />
        </div>

        <div>
          <Label htmlFor="city">Город</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="link">Ссылка на сайт / соцсеть</Label>
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
          <Label htmlFor="comment">Что хотите получить</Label>
          <Textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            className="mt-2"
            rows={4}
            placeholder="Например: больше заявок, Telegram-воронка, CRM, AI-агент, быстрый MVP"
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
            <Label htmlFor="privacy" className="cursor-pointer text-sm leading-relaxed">
              Даю согласие ООО «ААМХ» на обработку указанных мной персональных данных
              (ФИО, телефон, email, контент обращения) в целях рассмотрения заявки
              и связи со мной на условиях{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Политики конфиденциальности
              </Link>
              .
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
            <Label htmlFor="cookies" className="cursor-pointer text-sm leading-relaxed">
              Ознакомлен(а) с{" "}
              <Link to="/cookies" className="text-primary hover:underline">
                Политикой использования cookie
              </Link>{" "}
              и согласен(а) на использование cookie-файлов.
            </Label>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Получить 2-3 сценария под проект
        </Button>

        <p className="text-center text-xs leading-5 text-slate-500">
          Обычно отвечаем в течение 15 минут в рабочее время. Если удобнее, можно
          сразу написать в MAX, Telegram, WhatsApp или VK.
        </p>
      </div>
    </form>
  );
};
