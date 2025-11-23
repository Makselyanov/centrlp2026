import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Phone, MapPin, FileText, MessageCircle, Mail, ArrowRight, Copy, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const Contacts = () => {
  const [copied, setCopied] = useState(false);

  const copyInn = () => {
    navigator.clipboard.writeText("720321829472");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tags = [
    { text: "Telegram", top: "15%", left: "10%", delay: 0 },
    { text: "WhatsApp", top: "25%", right: "15%", delay: 1.5 },
    { text: "Звонок", bottom: "20%", left: "15%", delay: 1 },
    { text: "Встреча", bottom: "30%", right: "10%", delay: 2 },
    { text: "Офис", top: "10%", left: "50%", delay: 0.5 },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.08),transparent_70%)]" />

        {/* Floating Tags */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {tags.map((tag, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: tag.delay,
                ease: "easeInOut"
              }}
              className="absolute px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/5 border border-primary/10 text-primary/50 text-xs md:text-sm font-medium backdrop-blur-sm hidden sm:block"
              style={{ top: tag.top, left: tag.left, right: tag.right, bottom: tag.bottom }}
            >
              {tag.text}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              Всегда на связи
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-slate-900">
              Давайте обсудим <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">
                ваш проект
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-xl">
              Мы в Тюмени, но работаем со всем миром.
              Открыты к диалогу, встречам и новым вызовам.
            </p>
          </motion.div>
        </div>
      </section>

      {/* "No Jargon" Philosophy Section */}
      <section className="py-20 bg-background relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Говорим на человеческом языке</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Мы не прячемся за сложными терминами. Наша задача — объяснить вам суть,
              а не запутать умными словами.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* The "Bad" Way */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-red-500/5 border border-red-500/10 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-red-500/20">
                <XCircle className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-red-500 mb-6 flex items-center gap-2">
                <span className="bg-red-500/10 p-1 rounded">Как говорят другие</span>
              </h3>
              <div className="space-y-4 font-mono text-sm text-muted-foreground">
                <p className="bg-background/50 p-3 rounded-lg border border-red-500/10">
                  "Нам нужно оптимизировать CTR и повысить LTV через омниканальную воронку..."
                </p>
                <p className="bg-background/50 p-3 rounded-lg border border-red-500/10">
                  "Ваш ретеншн падает, нужно провести рефакторинг бэкенда..."
                </p>
              </div>
            </motion.div>

            {/* The "Good" Way */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-green-500/5 border border-green-500/10 rounded-2xl p-8 relative overflow-hidden shadow-lg"
            >
              <div className="absolute top-4 right-4 text-green-500/20">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-green-600 mb-6 flex items-center gap-2">
                <span className="bg-green-500/10 p-1 rounded">Как говорим мы</span>
              </h3>
              <div className="space-y-4 font-medium text-foreground">
                <p className="bg-white p-3 rounded-lg border border-green-500/20 shadow-sm flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  "Сделаем так, чтобы реклама приносила больше заявок по меньшей цене."
                </p>
                <p className="bg-white p-3 rounded-lg border border-green-500/20 shadow-sm flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  "Клиенты возвращаются редко, нужно упростить им процесс повторной покупки."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Info Cards */}
            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <Card className="p-6 border-l-4 border-l-primary hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Телефон / Мессенджеры</h3>
                      <p className="text-muted-foreground mb-3">Звоните или пишите в любое время</p>
                      <a href="tel:+79058248564" className="text-2xl font-bold hover:text-primary transition-colors block mb-2">
                        8-905-824-85-64
                      </a>
                      <div className="flex gap-3">
                        <Button size="sm" variant="outline" className="gap-2" onClick={() => window.open('https://t.me/makselyanov', '_blank')}>
                          Telegram
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2" onClick={() => window.open('https://wa.me/79058248564', '_blank')}>
                          WhatsApp
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="p-6 border-l-4 border-l-accent-1 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-1/10 p-3 rounded-full text-accent-1">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Офис</h3>
                      <p className="text-muted-foreground">
                        г. Тюмень, Солнечный проезд, 22
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="p-6 border-l-4 border-l-accent-2 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-2/10 p-3 rounded-full text-accent-2">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="w-full">
                      <h3 className="font-bold text-lg mb-1">Реквизиты</h3>
                      <p className="text-muted-foreground mb-3 text-sm">
                        НПД Кузнецов Максим Владимирович
                      </p>
                      <div className="flex items-center gap-2 bg-secondary p-2 rounded-lg w-full max-w-xs">
                        <span className="font-mono text-sm flex-grow">ИНН 720321829472</span>
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={copyInn}>
                          {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 shadow-lg border-primary/10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Оставить заявку</h3>
                  <p className="text-muted-foreground">
                    Заполните форму, и мы свяжемся с вами в течение 15 минут
                  </p>
                </div>
                <ContactForm />
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] w-full bg-secondary relative grayscale hover:grayscale-0 transition-all duration-700">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A644fd3fd8f74799009f60c932487dc7ef6b4d7208f53ac7e5e596cb6eec650ac&source=constructor"
          width="100%"
          height="100%"
          frameBorder="0"
          className="absolute inset-0"
        />
      </section>
    </Layout>
  );
};

export default Contacts;
