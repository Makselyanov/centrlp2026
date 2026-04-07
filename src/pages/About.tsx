import { Layout } from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, History, CheckCircle, Zap, Users, TrendingUp, MapPin, Star, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import founderImage from "@/assets/founder.png";
import { useAutoBreadcrumb } from "@/components/SeoSchemas";

const About = () => {
  useAutoBreadcrumb("О нас");
  const timelineEvents = [
    {
      year: "2010",
      title: "Начало пути",
      description: "Я начал работать как индивидуальный предприниматель: делал сайты, помогал компаниям настраивать продажи, вел небольшие проекты в Тюмени. Это была обычная ремесленная работа без пафоса — просто навык, который приносил результат клиентам.",
      icon: History
    },
    {
      year: "2017",
      title: "Трансформация",
      description: "Я закрыл ИП и перешёл на самозанятость (НПД). Оптимизация процессов и фокус на эффективности.",
      icon: Briefcase
    },
    {
      year: "Сейчас",
      title: "CentrLP",
      description: "Работаю официально: договор, счёт, акты, квитанции — всё как положено. Студия, где каждый проект проходит через мои руки.",
      icon: CheckCircle
    }
  ];

  return (
    <Layout
      title="О компании CentrLP — агентство интернет-маркетинга в Тюмени"
      description="CentrLP — агентство развития бизнеса в Тюмени. Создаём сайты, настраиваем рекламу, внедряем ИИ. НПД Кузнецов М.В., ИНН 720321829472."
    >
      {/* About Me Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#0096D6]/10 blur-[120px]" />
          <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#44B78B]/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/50 backdrop-blur-md border border-[#0096D6]/20 text-[#0096D6] font-semibold text-sm tracking-wide shadow-sm">
                Обо мне | CentrLP
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-slate-900 leading-tight">
                Создаю системы, которые <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">
                  приносят деньги
                </span>
              </h1>
              <div className="prose prose-lg text-slate-600 leading-relaxed bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-sm">
                <p className="mb-0">
                  Я работаю в digital-сфере больше 12 лет и собираю под одну крышу всё, что действительно приносит результат бизнесу: разработку сайтов, маркетинг, аналитику и автоматизацию. Основатель студии CentrLP в Тюмени. Начинал как разработчик, позже углубился в маркетинг и построил собственную систему, где сайт, реклама и аналитика работают как единое целое. Я люблю понятные решения, которые приносят заявки и деньги. Сейчас я помогаю бизнесам внедрять воронки, квизы, чат-ботов, подключаю аналитику, настраиваю рекламу, делаю сайты под ключ и оптимизирую процессы. Моя цель — чтобы у предпринимателя перестало болеть всё, что связано с интернет-продвижением. Люблю технологии, видеографию, путешествия и проекты, в которых можно что-то улучшить.
                </p>
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0096D6] to-[#44B78B] rounded-[3rem] blur-2xl opacity-20 transform translate-y-4 translate-x-4" />

              {/* Image Container with 3D lift */}
              <motion.div
                whileHover={{ y: -10, rotateX: 5, rotateY: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/80"
                style={{ perspective: 1000 }}
              >
                <img
                  src={founderImage}
                  alt="Основатель CentrLP"
                  className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
                />
                {/* Glass overlay/shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0096D6] via-[#44B78B] to-transparent opacity-30" />

          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 w-full">
                  <div className={`bg-card p-6 rounded-2xl shadow-lg border border-border/50 hover:border-[#0096D6]/30 transition-colors relative group ${index % 2 === 0 ? 'text-left md:text-right' : 'text-left'}`}>
                    <div className={`text-4xl font-bold text-[#0096D6]/20 absolute top-4 group-hover:text-[#0096D6]/10 transition-colors select-none ${index % 2 === 0 ? 'right-4 md:right-auto md:left-4' : 'right-4'}`}>
                      {event.year}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-[#0096D6]">{event.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-background border-4 border-[#44B78B] flex items-center justify-center shadow-lg shadow-[#44B78B]/20">
                    <event.icon className="w-5 h-5 text-[#44B78B]" />
                  </div>
                </div>

                <div className="flex-1 w-full hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Win-Win Approach */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-[#0096D6]/20 shadow-2xl text-center"
          >
            <Users className="w-16 h-16 text-[#0096D6] mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Подход Win-Win</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Мы работаем по принципу <span className="text-foreground font-semibold">win-win</span>: клиент получает понятный результат и прозрачные условия, а я использую ИИ, чат-боты, аналитику и современные маркетинговые инструменты, чтобы бизнес рос быстрее.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-4 bg-background rounded-xl border border-border/50">
                <Zap className="w-8 h-8 text-[#44B78B] mb-3" />
                <h4 className="font-bold mb-1">Скорость</h4>
                <p className="text-sm text-muted-foreground">ИИ ускоряет процессы в 3-5 раз</p>
              </div>
              <div className="p-4 bg-background rounded-xl border border-border/50">
                <TrendingUp className="w-8 h-8 text-[#0096D6] mb-3" />
                <h4 className="font-bold mb-1">Результат</h4>
                <p className="text-sm text-muted-foreground">Фокус на заявках и продажах</p>
              </div>
              <div className="p-4 bg-background rounded-xl border border-border/50">
                <CheckCircle className="w-8 h-8 text-[#44B78B] mb-3" />
                <h4 className="font-bold mb-1">Прозрачность</h4>
                <p className="text-sm text-muted-foreground">Официально, по договору НПД</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-card relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Отзывы клиентов</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Честное мнение о нашей работе на независимых площадках
            </p>

            {/* External Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <a
                href="https://go.2gis.com/hUyea"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-background rounded-full shadow-sm border border-border/50 hover:border-[#44B78B] hover:text-[#44B78B] transition-all"
              >
                <MapPin className="w-5 h-5" />
                <span className="font-medium">2GIS</span>
              </a>
              <a
                href="https://yandex.ru/maps/-/CLSbvKjF"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-background rounded-full shadow-sm border border-border/50 hover:border-[#E53E3E] hover:text-[#E53E3E] transition-all"
              >
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Яндекс Карты</span>
              </a>
              <a
                href="https://tyumen.flamp.ru/firm/centrlp_agentstvo_razvitiya_biznesa-70000001033718655"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-background rounded-full shadow-sm border border-border/50 hover:border-[#8BC34A] hover:text-[#8BC34A] transition-all"
              >
                <Star className="w-5 h-5" />
                <span className="font-medium">Flamp</span>
              </a>
              <a
                href="https://vk.com/reviews-9137191"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-background rounded-full shadow-sm border border-border/50 hover:border-[#0077FF] hover:text-[#0077FF] transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">ВКонтакте</span>
              </a>
            </div>
          </motion.div>

          {/* Rating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 p-6 bg-background rounded-2xl border border-border/50 shadow-sm"
          >
            <div className="text-center">
              <div className="text-5xl font-bold text-[#44B78B]">5.0</div>
              <div className="flex gap-1 justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold">52 отзыва</div>
              <div className="text-muted-foreground">на 2GIS, Flamp и Яндекс Картах</div>
            </div>
          </motion.div>

          {/* Reviews Carousel */}
          <ReviewsCarousel />
        </div>
      </section>
    </Layout>
  );
};

const ReviewsCarousel = () => {
  const reviews = [
    {
      name: "Трофимова Татьяна",
      date: "28 октября 2025",
      text: "Команда внимательно погрузилась в наш бренд и предложила аккуратный, лаконичный дизайн. Прототип — согласовали быстро, правки — оперативно. В итоге сайт d-interior7 удобный, быстрый и понятный для клиента. После запуска вырос поток заявок.",
      rating: 5,
      source: "2GIS"
    },
    {
      name: "Владислав Погодин",
      date: "22 июля 2025",
      text: "Хочу выразить благодарность за помощь в создании бизнес-плана. Профессионализм, внимание к деталям и конструктивные советы позволили мне чётко понять ключевые аспекты моего проекта. Особенно впечатлили анализ рынка и финансовые прогнозы.",
      rating: 5,
      source: "2GIS"
    },
    {
      name: "Максим Калугин",
      date: "21 сентября 2024",
      text: "Отличные ребята все было оч круто!! Понимают с полуслова, всегда все вовремя. Есть вкус, понимание, креативность идей. Общаться было с ними легко, поэтому если нам нужна помощь мы работаем с ними.",
      rating: 5,
      source: "2GIS"
    },
    {
      name: "marinaviktotovna",
      date: "15 сентября 2024",
      text: "Давно с компанией работаем. Начинали еще с маленького интернет-магазина детской одежды, сейчас уже разрослось все до собственного офлайн магазина. И до сих пор сайтом и всеми техработами занимается centrlp. Мы им полностью доверяем.",
      rating: 5,
      source: "2GIS"
    },
    {
      name: "Ксения Гаврилова",
      date: "1 марта 2019",
      text: "Сайт занял позиции в ТОП-10 поисковой выдачи по почти 30 запросам за год. Результат превзошёл ожидания — рекомендую!",
      rating: 5,
      source: "Flamp"
    },
    {
      name: "Евгений Хомец",
      date: "10 сентября 2018",
      text: "Требовалось полностью переделать сайт. Через неделю сайт был готов, отличный сайт! Всем рекомендуем компанию.",
      rating: 5,
      source: "2GIS"
    },
    {
      name: "Раиса Кузнецова",
      date: "5 декабря 2018",
      text: "Сайт получился красочный, удобный, информативный. Цена приемлемая. Рекомендую!",
      rating: 5,
      source: "2GIS"
    },
    {
      name: "Татьяна Артюгина",
      date: "20 января 2019",
      text: "Сайт получился точно такой, какой мы хотели. Учли наши дополнительные пожелания. Работать с командой было комфортно.",
      rating: 5,
      source: "2GIS"
    },
    {
      name: "Юлия Глушакова",
      date: "1 марта 2019",
      text: "Программист и дизайнер справились отлично. Пошли навстречу при ускорении процесса. Результатом довольна!",
      rating: 5,
      source: "Flamp"
    },
    {
      name: "Дарья Любимцева",
      date: "5 декабря 2024",
      text: "Благодарю за составление контент-плана для группы ВК. Качественная работа, всё чётко и по делу.",
      rating: 5,
      source: "2GIS"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div className="relative min-h-[300px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-background p-8 md:p-12 rounded-3xl shadow-lg border border-border/50"
        >
          <div className="flex flex-col items-center text-center">
            <div className="flex gap-1 mb-4">
              {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-lg md:text-xl italic mb-6 text-foreground/80 leading-relaxed">
              "{reviews[currentIndex].text}"
            </p>
            <div>
              <div className="font-bold text-lg">{reviews[currentIndex].name}</div>
              <div className="text-sm text-muted-foreground">{reviews[currentIndex].date} · {reviews[currentIndex].source}</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-primary w-6" : "bg-border hover:bg-primary/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default About;
