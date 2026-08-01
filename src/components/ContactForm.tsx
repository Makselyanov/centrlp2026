import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { getAttributionSnapshot, trackMetric } from "@/lib/metrics";
import { createLeadSubmissionId, readLeadReceipt } from "@/lib/leadReceipt";
import { MessengerLinks } from "./MessengerLinks";

export const ContactForm = () => {
  const { toast } = useToast();
  const location = useLocation();
  const leadSubmissionIdRef = useRef<string | null>(null);
  const [phone, setPhone] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!privacyAccepted) {
      toast({
        title: "Нужно согласие",
        description: "Подтвердите согласие на обработку персональных данных.",
        variant: "destructive",
      });
      return;
    }

    try {
      trackMetric("form_submit_attempt", { path: location.pathname });
      const leadSubmissionId = leadSubmissionIdRef.current || createLeadSubmissionId();
      leadSubmissionIdRef.current = leadSubmissionId;
      const pagePath = location.pathname === "/" ? "/" : location.pathname.replace(/\/$/, "");
      const leadHost =
        typeof window !== "undefined" &&
        (window.location.hostname === "barter.centrlp.ru" || import.meta.env.VITE_BARTER_HOST_PREVIEW === "1")
          ? "barter.centrlp.ru"
          : "centrlp.ru";

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          phone,
          privacyAccepted,
          page_path: location.pathname,
          page_url: typeof window !== "undefined" ? window.location.href : "",
          lead_source: `${leadHost}${pagePath}`,
          lead_submission_id: leadSubmissionId,
          attribution: getAttributionSnapshot(),
          consent_version: "consent-v1.0-2026-05-02",
          privacy_version: "privacy-v2.0-2026-04-17",
          cookies_version: "cookies-v2.0-2026-04-17",
        }),
      });

      const receipt = await readLeadReceipt(response);
      leadSubmissionIdRef.current = null;
      trackMetric("lead_form_submit", { path: location.pathname });
      trackMetric("lead_stored", { path: location.pathname, placement: receipt.receipt_id });
      if (receipt.crm_status === "sent") {
        trackMetric("lead_confirmed", { path: location.pathname, placement: receipt.receipt_id });
      }

      toast({
        title: "Заявка отправлена",
        description: (
          <div>
            <p className="mb-3">Спасибо. Мы перезвоним вам в ближайшее рабочее время.</p>
            <MessengerLinks variant="toast" />
          </div>
        ),
      });
      setPhone("");
      setPrivacyAccepted(false);
    } catch {
      trackMetric("lead_form_error", { path: location.pathname });
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позже или напишите нам в мессенджер.",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border-2 border-[#0096D6] bg-white"
      data-metric="form-submit"
    >
      <div className="bg-[#0077AA] px-6 py-7 text-white md:px-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15" aria-hidden="true">
            <PhoneCall className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white/80">Обсудим вашу задачу</p>
            <h3 className="mt-1 text-2xl font-bold leading-tight text-white">Оставьте номер — перезвоним</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/85">
              Никаких длинных анкет: нужен только телефон. Уточним задачу в разговоре.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6 md:p-8">
        <div>
          <Label htmlFor="phone" className="text-base font-semibold text-slate-900">Ваш номер телефона</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
            className="mt-3 h-14 border-2 border-slate-300 bg-white px-4 text-lg font-medium text-slate-900 placeholder:text-slate-500 focus-visible:border-[#0096D6] focus-visible:ring-2 focus-visible:ring-[#0096D6]/25"
          />
          <p className="mt-2 text-sm leading-5 text-slate-600">Перезвоним в течение 15 минут в рабочее время.</p>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="privacy"
            checked={privacyAccepted}
            onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
            required
          />
          <Label htmlFor="privacy" className="cursor-pointer text-sm leading-6 text-slate-700">
            Даю <Link to="/consent" className="text-primary hover:underline">согласие на обработку персональных данных</Link>{" "}
            и ознакомлен(а) с <Link to="/privacy" className="text-primary hover:underline">политикой обработки персональных данных</Link>.
          </Label>
        </div>

        <Button type="submit" size="lg" className="h-14 w-full bg-[#0096D6] text-base font-bold hover:bg-[#0077AA]">
          Перезвоните мне <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
        </Button>
        <p className="text-center text-xs leading-5 text-slate-500">Номер используется только для ответа на заявку.</p>
      </div>
    </form>
  );
};
