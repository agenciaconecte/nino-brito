import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  Mail, 
  MessageCircle, 
  MapPin, 
  ChevronRight, 
  Home, 
  Building2, 
  CheckCircle2, 
  Users, 
  Award,
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

const LOGO_URL = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi5SoB7kylDvr-gCWCcaQcAC5fbt4Z89vgJV1oM6yZVmnZ-djvY3t6w2vy-4LUTafVsIljCrG7IaUwfUfBNNqvBfKsrYF82AbMaR6yiouyilM99Vr7-kvSTNPjPglpjg5VHMl805TAPd2EpAcpFT_bd1VIoXHIXIVdNAkh7-N7cU8WezB1Y-xiM7X7oo_M/s320/logo.png";
const HERO_IMAGES = [
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5OmcjU7V4S1NimPoaPIN64IQ29T7OuI69WCmjVl0Jm2mbzMFNQ-b8y8LPw7TBbLO5SXEyE2MOOXWymREfLk9Wb1Ew-J7Bt0UCIoxyFYdnxdLVl6o7JtS3jVyZ7BBLvuH0SL-wOk7oj11UjCIBfF61NJ2cqmb641g5OQkq27RqxgWWBQoQVdOoySuAeuU/s16000/hero.png",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikNdNiaoS5omrcrN-4yLmQSxBJYsihi7lLZqPHEVTTqtf_qljLIYmzk0XE8l9f9L6z82PUZAkzBohg0sMseWp2Sx60DA_DjHDhb9Y7KXAjaUTnYfwvTtGxTk2FtN7y7spsHmFKHNoc4wX2OJl5DD1Bfo13FBeXEKBpR7WqsRVRe8WZd5jtauZ2saqDtJ4/s16000/hero2.png"
];
const ABOUT_IMAGE = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7Lryfe_prDXgdlkS-o0Q93VCynf7wX0Nd62N1gl6rN2BwldPVFNKNrb0lX1q5mMEIsu5rRit83YnQp24joWiDZOzj3oE-HeZpdRzk7fn_2Rpw6Gjr7KJxDoW5p8mlqOtT-D7xH3TPgzcDARG4Q1c5yyAzJQO5jVgXJL1K6q6_b_j4m7Ugv-utVT4uyDo/s16000/nino2.png";

const GALLERY_IMAGES = [
  "https://instagram.fcpq7-1.fna.fbcdn.net/v/t51.82787-15/612374933_18094911187938190_486678615134778700_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzgxMTU5MjE5MTE2NDkxMzcxMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=kfKK6ekqcKYQ7kNvwH7asuY&_nc_oc=Adq8PcIAoXJpIPNLBGna1aXgrqiOgGuR0kpR1KtU7HHCEjB4OTtaYlx5kPeOXphGkwQ&_nc_ad=z-m&_nc_cid=1138&_nc_zt=23&_nc_ht=instagram.fcpq7-1.fna&_nc_gid=_6svtcCrOHPXrcdYsiexmA&_nc_ss=7a32e&oh=00_Af10eLWH-XbuNFv4HWRgBwrlBZZc1kRX2LsLDCY2CN9SFQ&oe=69D9E1FF",
  "https://instagram.fcpq7-1.fna.fbcdn.net/v/t51.82787-15/607257840_18093058300938190_5208995064449596509_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=Mzc5NzA5MjAwNzUzMzk5MDAyMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=ShZprNHSWGcQ7kNvwGScQvj&_nc_oc=AdqpV7rAc37Uq1sCZAW6dSp8cnL-LEqt5ueIesIhM3gImkb2BEELtrgOvE4lIy-g6P4&_nc_ad=z-m&_nc_cid=1138&_nc_zt=23&_nc_ht=instagram.fcpq7-1.fna&_nc_gid=_6svtcCrOHPXrcdYsiexmA&_nc_ss=7a32e&oh=00_Af03zZ3aH69xi25RUt454bVSLSj0X7v69le5RiNYJptArQ&oe=69D9E13B",
  "https://instagram.fcpq7-1.fna.fbcdn.net/v/t51.82787-15/599230947_18092297287938190_1676921201677844910_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=Mzc5MTI5NDQzMTQyNTU3MjQ2MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=4ExDoobPmOQQ7kNvwG5zMwc&_nc_oc=Adp9z0u1IagGe9NgbGBkgmKtGWZD35OJyE2ToZYjL3vbO7WfBpjIOgFzNy0QnlMH2BI&_nc_ad=z-m&_nc_cid=1138&_nc_zt=23&_nc_ht=instagram.fcpq7-1.fna&_nc_gid=_6svtcCrOHPXrcdYsiexmA&_nc_ss=7a32e&oh=00_Af29T6n7Y1VzBjudf48SC-kAWI_hrVzCZQfIB8XdKMB__w&oe=69D9BEA6",
  "https://instagram.fcpq7-1.fna.fbcdn.net/v/t51.82787-15/584406285_18091676299938190_4583127262670353145_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=Mzc4NjIyNDEwNDQ3OTc1OTAxNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=aL18FKyi5cYQ7kNvwGjewix&_nc_oc=AdrNVGYy9XtTu1GJ6Tn_pKxTuJj9yk11xIbf4OkuRZGGsh2Kfha8SSzyAUyLDeGfEPM&_nc_ad=z-m&_nc_cid=1138&_nc_zt=23&_nc_ht=instagram.fcpq7-1.fna&_nc_gid=rXXTQa8rBPuRxFoe3jdqag&_nc_ss=7a32e&oh=00_Af1QVyNL9Jf5V7JGUQ_GLuIcHZGKXnMx7UnMb2U2Gq_uMA&oe=69D9B35C",
  "https://instagram.fcpq7-1.fna.fbcdn.net/v/t51.82787-15/564248882_18084701422938190_4635986727319770380_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=Mzc0MDU2Mzg0NjE1MTYzMjc3NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=8cB7ScHgJOEQ7kNvwHWQZdo&_nc_oc=AdpApMxDsJBDhMJ9NinJTYp-MNRNHH-9aZHbAC3MySydbVCI7oLtHaGLVsIesVAJnBk&_nc_ad=z-m&_nc_cid=1138&_nc_zt=23&_nc_ht=instagram.fcpq7-1.fna&_nc_gid=rXXTQa8rBPuRxFoe3jdqag&_nc_ss=7a32e&oh=00_Af2FZzQi05f7rixO8Ug72ITvKzGPw4zsPmKLfPgo7bH4Mg&oe=69D9B70B",
  "https://instagram.fcpq7-1.fna.fbcdn.net/v/t51.82787-15/529020519_18078399940938190_708866285005884575_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzY5NDg0ODc4Njk1MzY1OTAxNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=1P18N1KNQCAQ7kNvwGUFtI3&_nc_oc=Adr-fETyilx7MLecZ4A199jFtW-B3Zj1FzyFto6ZPtM0QZ5LrHY0Qrg6Yu1cNAYlbTA&_nc_ad=z-m&_nc_cid=1138&_nc_zt=23&_nc_ht=instagram.fcpq7-1.fna&_nc_gid=ibbOUY5isZJZfYegRWcHCQ&_nc_ss=7a32e&oh=00_Af25GV5_CZJYKA6FvmuK4fXZl9Na-KWguCC6h62y-JjDMQ&oe=69D9E3F0"
];

export default function App() {
  const heroRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const whatsappLink = "https://wa.me/557187871200";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-dark selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Background integrado 100% largura */}
        <div 
          className={`absolute inset-0 transition-all duration-700 -z-10 ${
            isScrolled ? "opacity-0 invisible" : "opacity-100 visible bg-white/5 backdrop-blur-lg border-b border-white/10"
          }`} 
        />
        
        <div className={`transition-all duration-500 ${isScrolled ? "px-4 py-4 sm:px-8" : "px-0 py-0"}`}>
          <nav className={`mx-auto max-w-7xl transition-all duration-500 flex items-center justify-between ${
            isScrolled 
              ? "glass rounded-full px-6 py-3 shadow-xl" 
              : "nav-integrated px-8 py-6"
          }`}>
            <a href="#" className="flex items-center gap-2">
              <img 
                src={LOGO_URL} 
                alt="Nino Brito Logo" 
                className="h-10 w-auto transition-all duration-500" 
                style={isScrolled ? { filter: 'brightness(0) saturate(100%) invert(38%) sepia(10%) saturate(651%) hue-rotate(169deg) brightness(93%) contrast(88%)' } : {}}
                referrerPolicy="no-referrer" 
              />
            </a>
            
            <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-500 ${isScrolled ? "text-brand-dark" : "text-white"}`}>
              <a href="#servicos" className="hover:text-brand-light transition-colors">Serviços</a>
              <a href="#diferenciais" className="hover:text-brand-light transition-colors">Diferenciais</a>
              <a href="#projetos" className="hover:text-brand-light transition-colors">Projetos</a>
              <a href="#sobre" className="hover:text-brand-light transition-colors">Sobre</a>
              <a href="#contato" className="hover:text-brand-light transition-colors">Contato</a>
            </div>

            <div className="flex items-center gap-4">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex bg-brand-dark text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-brand-light transition-all duration-300 items-center gap-2 animate-whatsapp"
              >
                <MessageCircle size={18} className="animate-soft-icon" />
                <span>Falar com o Arquiteto</span>
              </a>

              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 rounded-full transition-colors ${isScrolled ? "text-brand-dark hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-4 right-4 mt-2 bg-white rounded-3xl shadow-2xl p-6 md:hidden z-50 border border-gray-100"
            >
              <div className="flex flex-col gap-4">
                {[
                  { name: "Serviços", href: "#servicos" },
                  { name: "Diferenciais", href: "#diferenciais" },
                  { name: "Projetos", href: "#projetos" },
                  { name: "Sobre", href: "#sobre" },
                  { name: "Contato", href: "#contato" }
                ].map((item) => (
                  <a 
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-brand-dark font-medium text-lg py-2 border-b border-gray-50 last:border-0"
                  >
                    {item.name}
                  </a>
                ))}
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 bg-brand-dark text-white px-6 py-4 rounded-full font-bold text-center flex items-center justify-center gap-2 animate-whatsapp"
                >
                  <MessageCircle size={20} />
                  Falar com o Arquiteto
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={heroIndex}
              src={HERO_IMAGES[heroIndex]} 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              alt="Arquitetura Premium" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="relative z-10 max-w-5xl px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Criamos espaços com a sua <br className="hidden md:block" />
              <span className="text-brand-light">narrativa e autenticidade!</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto mb-10 font-light">
              Projetos que traduzem necessidades reais em soluções funcionais, 
              coerentes e esteticamente marcantes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#servicos"
                className="w-full sm:w-auto bg-white text-brand-dark px-8 py-4 rounded-full font-bold hover:bg-brand-light transition-all duration-300 flex items-center justify-center gap-2"
              >
                Ver Projetos
                <ChevronRight size={20} className="animate-soft-icon" />
              </a>
              <a 
                href={whatsappLink}
                className="w-full sm:w-auto border border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 animate-whatsapp"
              >
                Solicitar Orçamento
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 invisible">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Authority Section */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Ambientes Projetados", value: "300+", icon: <Award size={20} /> },
              { label: "Anos de Experiência", value: "10+", icon: <CheckCircle2 size={20} /> },
              { label: "Estados Atendidos", value: "Brasil", icon: <MapPin size={20} /> },
              { label: "Projetos Entregues", value: "100%", icon: <Users size={20} /> }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center justify-center gap-2 text-brand-dark mb-2">
                  <span className="animate-soft-icon">{stat.icon}</span>
                  <span className="text-3xl sm:text-4xl font-bold">{stat.value}</span>
                </div>
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-16 sm:py-24 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Nossas Soluções</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Transformamos sonhos em realidade através de um método estruturado e sensibilidade artística.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Projetos Residenciais",
                desc: "Criação de lares que refletem a personalidade dos moradores, unindo conforto, funcionalidade e estética.",
                icon: <Home className="text-brand-dark animate-soft-icon" size={32} />,
                image: "https://instagram.fcpq7-1.fna.fbcdn.net/v/t51.82787-15/561445849_18084460684938190_734951576577575738_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=MzczOTgzNjM2NjUxMjAyODM0OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=B9LUVWYtq4QQ7kNvwHcYbpp&_nc_oc=Adp2L309zl0m914CdEtm7G-u5hAdUkYx85jxL0RCYgugU3CUVvP9gcoof_q1DknU9X8&_nc_ad=z-m&_nc_cid=1138&_nc_zt=23&_nc_ht=instagram.fcpq7-1.fna&_nc_gid=Yg2mqQ_KPr-ezxC4cHdoUw&_nc_ss=7a32e&oh=00_Af0nHiosjtfozEMd1KBHWrd9cuzutETlJhrAPvG9iRHh5Q&oe=69D9BB7A"
              },
              {
                title: "Projetos Comerciais",
                desc: "Espaços estratégicos que potencializam marcas e melhoram a experiência do cliente e produtividade da equipe.",
                icon: <Building2 className="text-brand-dark animate-soft-icon" size={32} />,
                image: "https://instagram.fcpq7-1.fna.fbcdn.net/v/t39.30808-6/469338827_122151789770292176_6651408427461749877_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=MzM4Mzk2NzAxMzM5NjM2MzE0NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjExNDh4MTQzNi5zZHIuQzMifQ%3D%3D&_nc_ohc=d7_71GoYFZQQ7kNvwGtFUpp&_nc_oc=AdpMSvH-lD2nChMpvCN0rRZHq3jIxJN3qFsfXBh_7KR5v_41fH5RqcqqbaYbX0yR3ZM&_nc_ad=z-m&_nc_cid=1138&_nc_zt=23&_nc_ht=instagram.fcpq7-1.fna&_nc_gid=wJnxlXOT6Qwzc3S40XPQTg&_nc_ss=7a32e&oh=00_Af0FeeIS2gBIcUUXCi5DNQKorqyfIS_VDmaK6qMYwDMOlA&oe=69D9D3FB"
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                  <a href={whatsappLink} className="inline-flex items-center gap-2 text-brand-dark font-bold hover:text-brand-light transition-colors animate-whatsapp">
                    Saiba mais <ArrowRight size={18} className="animate-soft-icon" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials Bento Grid */}
      <section id="diferenciais" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Por que nos escolher?</h2>
            <p className="text-gray-500">Diferenciais que garantem a excelência de cada entrega.</p>
          </div>

          <div className="bento-grid">
            {/* Large Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 bg-brand-dark text-white p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden"
            >
              <div className="relative z-10">
                <Award className="text-brand-light mb-6 animate-soft-icon" size={48} />
                <h3 className="text-3xl font-bold mb-4">Metodologia Própria</h3>
                <p className="text-gray-300 leading-relaxed">
                  Nosso trabalho é estruturado em etapas claras: estudo, refinamento técnico e desenvolvimento cuidadoso. 
                  Garantimos segurança e coerência do início ao fim.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-10">
                <Award size={200} />
              </div>
            </motion.div>

            {/* Small Cards */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 p-8 rounded-3xl border border-gray-100"
            >
              <CheckCircle2 className="text-brand-dark mb-4 animate-soft-icon" size={32} />
              <h4 className="text-xl font-bold mb-2">Atendimento Nacional</h4>
              <p className="text-gray-500 text-sm">Base na Bahia com atendimento remoto e presencial em todo o Brasil.</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 p-8 rounded-3xl border border-gray-100"
            >
              <Users className="text-brand-dark mb-4 animate-soft-icon" size={32} />
              <h4 className="text-xl font-bold mb-2">Acompanhamento</h4>
              <p className="text-gray-500 text-sm">O arquiteto acompanha pessoalmente todas as etapas, do estudo à entrega.</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="col-span-1 md:col-span-2 bg-brand-light/10 p-8 rounded-3xl border border-brand-light/20 flex items-center gap-6"
            >
              <div className="bg-white p-4 rounded-2xl shadow-sm">
                <MessageCircle className="text-brand-dark animate-soft-icon" size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Escuta Ativa</h4>
                <p className="text-gray-500 text-sm">Acreditamos que um bom projeto nasce do diálogo e escolhas conscientes.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 sm:py-24 bg-[#f8f9fa] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <div className="relative max-w-full">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-dark/10 rounded-full -z-10" />
                <img 
                  src={ABOUT_IMAGE} 
                  alt="Nino Brito" 
                  className="rounded-3xl shadow-2xl w-auto h-auto max-w-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hidden sm:block">
                  <div className="text-brand-dark font-bold text-lg">Nino Brito</div>
                  <div className="text-gray-500 text-sm">Arquiteto e Urbanista</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <span className="text-brand-dark font-bold tracking-widest uppercase text-sm mb-4 block">O Arquiteto</span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight">
                Método, sensibilidade e <br /> decisões bem direcionadas.
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Nino Brito é arquiteto e urbanista, fundador do escritório Nino Brito Arquitetura, com atuação na Bahia e atendimento em todo o Brasil.
                </p>
                <p>
                  Especialista em Design de Interiores e com MBA em Gestão de Projetos, suas formações orientam sua forma de atuar, baseada em método, sensibilidade e decisões bem direcionadas.
                </p>
                <p>
                  Acredita que um bom projeto nasce da escuta, do diálogo e de escolhas conscientes. Mais do que desenhar espaços, conduz processos que transformam necessidades reais em soluções funcionais, coerentes e esteticamente marcantes.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <img src={LOGO_URL} alt="Logo" className="h-8 opacity-50" referrerPolicy="no-referrer" />
                <div className="h-8 w-[1px] bg-gray-300" />
                <div className="text-sm font-medium text-gray-400 italic">"Criamos espaços com a sua narrativa."</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section id="projetos" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Alguns Projetos</h2>
            <p className="text-gray-500">Uma curadoria de espaços que materializam nossa essência.</p>
          </div>

          <div className="gallery-grid">
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ marginTop: idx % 2 === 0 ? "0" : "2rem" }}
                className="gallery-item shadow-lg"
              >
                <img src={img} alt={`Projeto ${idx + 1}`} referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 sm:py-24 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">O que dizem nossos clientes</h2>
            <p className="text-gray-500">A satisfação de quem confiou seu sonho em nossas mãos.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mariana Silva",
                role: "Proprietária Residencial",
                text: "O Nino conseguiu captar exatamente o que queríamos. Nossa casa hoje tem alma e conta a nossa história em cada detalhe."
              },
              {
                name: "Ricardo Oliveira",
                role: "CEO Tech Hub",
                text: "O projeto comercial superou as expectativas. O ambiente ficou moderno, funcional e elevou o moral de toda a equipe."
              },
              {
                name: "Ana Paula Costa",
                role: "Design de Interiores",
                text: "Trabalhar com o Nino é ter a certeza de um processo organizado e um resultado final impecável. Recomendo muito!"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-brand-dark text-xl">★</span>)}
                </div>
                <p className="text-gray-600 mb-6 italic">"{item.text}"</p>
                <div>
                  <div className="font-bold text-brand-dark">{item.name}</div>
                  <div className="text-sm text-gray-400">{item.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="contato" className="py-16 sm:py-24 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920" 
            alt="Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">Vamos transformar seu espaço?</h2>
          <p className="text-xl text-gray-300 mb-12 font-light">
            Seja para sua casa ou seu negócio, estamos prontos para criar um projeto 
            autêntico e funcional para você.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white text-brand-dark px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-light transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl animate-whatsapp"
            >
              <MessageCircle size={24} className="animate-soft-icon" />
              Falar no WhatsApp
            </a>
            <a 
              href="mailto:ninobrito.arq@gmail.com"
              className="w-full sm:w-auto border border-white/20 backdrop-blur-sm px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Mail size={24} className="animate-soft-icon" />
              Enviar E-mail
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <img 
                src={LOGO_URL} 
                alt="Logo" 
                className="h-10 opacity-80" 
                style={{ filter: 'brightness(0) saturate(100%) invert(38%) sepia(10%) saturate(651%) hue-rotate(169deg) brightness(93%) contrast(88%)' }}
                referrerPolicy="no-referrer" 
              />
              <p className="text-gray-400 text-sm max-w-xs text-center md:text-left">
                Criamos espaços com a sua narrativa e autenticidade. Atendimento em todo o Brasil.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex items-center gap-6">
                <a href="https://www.instagram.com/ninobrito.arq" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-dark transition-colors">
                  <Instagram size={24} className="animate-soft-icon" />
                </a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-dark transition-colors">
                  <MessageCircle size={24} className="animate-soft-icon" />
                </a>
                <a href="mailto:ninobrito.arq@gmail.com" className="text-gray-400 hover:text-brand-dark transition-colors">
                  <Mail size={24} className="animate-soft-icon" />
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={16} className="animate-soft-icon" />
                <span>Bahia | Brasil</span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs">
            <p>© 2026 Nino Brito Arquitetura. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-brand-dark transition-colors">Privacidade</a>
              <a href="#" className="hover:text-brand-dark transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
