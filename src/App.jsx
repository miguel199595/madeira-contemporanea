import React, { useState, useEffect, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Phone, Mail, ArrowUp, Menu, X, Hammer, Shield, Star, Clock, ChevronLeft, ChevronRight, FileText, Award, Download } from 'lucide-react';

// ICONES OBRIGATÓRIOS VETORIAIS (REDES SOCIAIS)
const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// =========================================================================
// IMPORTAÇÕES DE IMAGENS 
// =========================================================================

import logoSrc from './assets/Imagens/madeiracontemporanealogo.png';

const mainSliderModules = import.meta.glob('./assets/Imagens/MainSlider/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', { eager: true });
const heroImages = Object.values(mainSliderModules).map(mod => mod.default || mod);

const pavimentosModules = import.meta.glob('./assets/Imagens/Servicos/Pavimentos/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', { eager: true });
const portasModules = import.meta.glob('./assets/Imagens/Servicos/Portas/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', { eager: true });
const roupeirosModules = import.meta.glob('./assets/Imagens/Servicos/Roupeiros/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', { eager: true });
const cozinhasModules = import.meta.glob('./assets/Imagens/Servicos/Cozinhas/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', { eager: true });
const escritorioModules = import.meta.glob('./assets/Imagens/Servicos/Escritorio/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', { eager: true });
const reparacaoModules = import.meta.glob('./assets/Imagens/Servicos/Reparacao/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', { eager: true });

const pavimentosImgs = Object.values(pavimentosModules).map(mod => mod.default || mod);
const portasImgs = Object.values(portasModules).map(mod => mod.default || mod);
const roupeirosImgs = Object.values(roupeirosModules).map(mod => mod.default || mod);
const cozinhasImgs = Object.values(cozinhasModules).map(mod => mod.default || mod);
const escritorioImgs = Object.values(escritorioModules).map(mod => mod.default || mod);
const reparacaoImgs = Object.values(reparacaoModules).map(mod => mod.default || mod);

const fallbackImg = "";

const partnersModules = import.meta.glob('./assets/Imagens/Parceiros/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', { eager: true });
const rawPartners = Object.values(partnersModules).map(mod => mod.default || mod);

// Função para ordenar os parceiros na ordem estipulada: Finsa -> Tarkett -> Portrisa -> MCL
const dynamicPartners = [...rawPartners].sort((a, b) => {
  const getOrderScore = (url) => {
    const path = url.toLowerCase();
    if (path.includes('finsa')) return 1;
    if (path.includes('tarkett')) return 2;
    if (path.includes('portrisa')) return 3;
    if (path.includes('mcl')) return 4;
    return 5; // Caso existam outros logos futuros
  };
  return getOrderScore(a) - getOrderScore(b);
});

const catalogModules = import.meta.glob('./assets/Imagens/Catalogos/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', { eager: true });
const catalogImagesObj = Object.fromEntries(
  Object.entries(catalogModules).map(([path, mod]) => [path.split('/').pop(), mod.default || mod])
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);
  const [activeLightbox, setActiveLightbox] = useState(null);
  
  const sliderIntervalRef = useRef(null);

  const [services, setServices] = useState([
    {
      title: "Pavimentos",
      desc: "Instalação especializada de madeira maciça, flutuante, laminados e vinílicos de alta resistência.",
      currentIdx: 0,
      images: pavimentosImgs.length > 0 ? pavimentosImgs : [fallbackImg]
    },
    {
      title: "Portas Interiores/Exteriores",
      desc: "Portas de design moderno e clássico, sistemas ocultos de correr e soluções de corta fogo e de alta segurança.",
      currentIdx: 0,
      images: portasImgs.length > 0 ? portasImgs : [fallbackImg]
    },
    {
      title: "Mobiliário de Cozinha",
      desc: "Cozinhas planeadas sob medida com designs contemporâneos, aproveitamento inteligente de espaço e materiais duráveis.",
      currentIdx: 0,
      images: cozinhasImgs.length > 0 ? cozinhasImgs : [fallbackImg]
    },
    {
      title: "Roupeiros e Closets",
      desc: "Roupeiros embutidos e closets estruturados sob medida com otimização inteligente e divisórias organizadas.",
      currentIdx: 0,
      images: roupeirosImgs.length > 0 ? roupeirosImgs : [fallbackImg]
    },
    {
      title: "Mobiliário de Escritório, Painéis e Cabines fenólicas WC",
      desc: "Soluções corporativas e para home office personalizadas, unindo arrumação eficiente e estética funcional e profissional.",
      currentIdx: 0,
      images: escritorioImgs.length > 0 ? escritorioImgs : [fallbackImg]
    },
    {
      title: "Manutenção e Reparação",
      desc: "Polimento e envernizamento de pavimentos de madeira, reparação de estruturas, restauro de superfícies e manutenção preventiva.",
      currentIdx: 0,
      images: reparacaoImgs.length > 0 ? reparacaoImgs : [fallbackImg]
    }
  ]);

  const catalogues = [
    {
      title: "Pavimento Laminado - Finsa",
      pdfUrl: "https://www.finsa.com/documents/d/guest/catalogo_finfloor_original_2026_dig_pt-pdf",
      image: catalogImagesObj["Catalogo_Finfloor_Original.png"] || fallbackImg 
    },
    {
      title: "Vinílico - Tarkett",
      pdfUrl: "https://media.tarkett-image.com/docs/Tarkett_iD_Click_Ultimate_Brochura_Digital_PT.pdf", 
      image: catalogImagesObj["Vinilico.png"] || fallbackImg
    },
    {
      title: "Portas Segurança - Portrisa",
      pdfUrl: "https://portrisa.com/assets/docs/catalogs/PTS.CAT.PS.PT.005_Catalogo%20Portas%20Seguranca_Portrisa.pt.pdf",
      image: catalogImagesObj["Porta_Seguranca.png"] || fallbackImg
    },
    {
      title: "Portas Corta Fogo - Portrisa",
      pdfUrl: "https://portrisa.com/assets/docs/catalogs/PTS.CAT.PCF.PTES.005_%20Portas%20Corta%20Fogo_Portrisa.pt.es.pdf",
      image: catalogImagesObj["Porta_CortaFogo.png"] || fallbackImg
    },
    {
      title: "Portas Interiores - MCL",
      pdfUrl: "https://media.mcl.pt//multimedia/DOCUMENTOS/45/CATALOGO_PORBLOCK_PORTAX%20-%20Vs1.2.pdf",
      image: catalogImagesObj["Porta_Interior.png"] || fallbackImg
    },
    {
      title: "Cabines WC e Revestimentos Fenólicos - MCL",
      pdfUrl: "https://media.mcl.pt//multimedia/DOCUMENTOS/1710/MCL_CatalogoProjeto_digital_compressed.pdf",
      image: catalogImagesObj["Fenolico.png"] || fallbackImg
    },
    {
      title: "Cozinhas",
      pdfUrl: "https://media.mcl.pt//multimedia/DOCUMENTOS/47/CATALOGO_GERAL_COMPONENTES%20-%20Vs1.34.pdf",
      image: catalogImagesObj["Cozinha.png"] || fallbackImg
    },
    {
      title: "Tetos e Revestimentos PVC - Sagiper",
      pdfUrl: "https://sagiper.com/wp-content/uploads/2016/08/20250909-SAGIREV.pdf",
      image: catalogImagesObj["PVC.png"] || fallbackImg
    },
  ];

  const businessPhone = "+351963614802"; 
  const facebookUser = "https://www.facebook.com/share/1BfTt3dBXb"; 
  const businessEmail = "madeira.contemporaneas@gmail.com";

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveLightbox(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const startSliderTimer = () => {
    if (sliderIntervalRef.current) {
      clearInterval(sliderIntervalRef.current);
    }
    if (heroImages.length === 0) return;
    
    sliderIntervalRef.current = setInterval(() => {
      setCurrentHeroIdx((prevIdx) => (prevIdx + 1) % heroImages.length);
    }, 10000);
  };

  useEffect(() => {
    startSliderTimer();
    return () => {
      if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
    };
  }, [heroImages.length]);

  const handleNextHero = () => {
    setCurrentHeroIdx((prev) => (prev + 1) % heroImages.length);
    startSliderTimer();
  };

  const handlePrevHero = () => {
    setCurrentHeroIdx((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    startSliderTimer();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextServiceImg = (serviceIdx, e) => {
    e.stopPropagation();
    setServices(prev => prev.map((s, idx) => {
      if (idx === serviceIdx) {
        return { ...s, currentIdx: (s.currentIdx + 1) % s.images.length };
      }
      return s;
    }));
  };

  const prevServiceImg = (serviceIdx, e) => {
    e.stopPropagation();
    setServices(prev => prev.map((s, idx) => {
      if (idx === serviceIdx) {
        return { ...s, currentIdx: (s.currentIdx - 1 + s.images.length) % s.images.length };
      }
      return s;
    }));
  };

return (
    <HelmetProvider>
      <Helmet>
        <title>Madeira Contemporânea | Carpintaria e Mobiliário por Medida em Viseu</title>
        <meta name="description" content="Serviços de carpintaria em Viseu. Mobiliário por medida, cozinhas, roupeiros, pavimentos e portas. Qualidade, rigor e orçamentos gratuitos." />
        <link rel="canonical" href="https://madeira-contemporanea.vercel.app" />
      </Helmet>

      <div 
        className="min-h-screen font-sans text-stone-800 antialiased selection:bg-[#5D4A3A]/30 selection:text-stone-900"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(244, 241, 234, 0.94), rgba(244, 241, 234, 0.97)), url('https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=20')`,
          backgroundColor: '#f4f1ea'
        }}
      >
      
      {/* BANNER DE NAVEGAÇÃO */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#5D4A3A]/82 border-b border-stone-400/20 shadow-xs py-1 text-white backdrop-blur-md h-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 h-full">
          <div onClick={scrollToTop} className="flex items-center cursor-pointer h-full py-2">
            <img 
              src={logoSrc} 
              alt="Madeira Contemporânea" 
              className="h-full w-auto max-w-[300px] object-contain" 
              loading="eager"
            />
          </div>
          
          <div className="hidden space-x-6 lg:space-x-8 md:flex items-center">
            <a href="#services" className="text-sm lg:text-base font-semibold text-white hover:text-[#b5895a] transition-colors">Serviços</a>
            <a href="#partners" className="text-sm lg:text-base font-semibold text-white hover:text-[#b5895a] transition-colors">Parceiros</a>
            <a href="#catalogues" className="text-sm lg:text-base font-semibold text-white hover:text-[#b5895a] transition-colors">Catálogos</a>
            <a href="#contact" className="text-sm lg:text-base font-semibold text-white hover:text-[#b5895a] transition-colors">Contactos</a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-md">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* CARROSSEL PRINCIPAL (HERO) */}
      <header className="relative h-screen w-full bg-stone-900 text-white overflow-hidden flex items-center">
        {heroImages.map((imgUrl, idx) => (
          <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentHeroIdx ? 'opacity-100' : 'opacity-0'}`}>
            <img 
              src={imgUrl} 
              alt={`Carrossel Slide ${idx + 1}`} 
              className="h-full w-full object-cover" 
              loading={idx === 0 ? "eager" : "lazy"} 
            />
            <div className="absolute inset-0 bg-stone-950/40" />
          </div>
        ))}

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center md:text-left z-10 w-full mt-20 flex flex-col items-center md:items-start">
          <div className="mb-5 transform transition-transform duration-500 hover:scale-105">
            <img 
              src={logoSrc} 
              alt="Madeira Contemporânea Logo" 
              className="h-20 sm:h-24 md:h-28 w-auto object-contain filter drop-shadow-2xl"
              loading="eager"
            />
          </div>

          <h1 className="max-w-4xl text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.15] drop-shadow-lg">
            Mobiliário e Carpintaria <br /><span className="font-serif italic text-[#e3be98]">Sob Medida</span>
          </h1>
          
          <p className="mt-6 max-w-2xl text-base text-stone-200 sm:text-lg leading-relaxed font-normal drop-shadow-md">
            Fabrico e instalação de elementos de carpintaria por medida, incluindo pavimentos, portas, roupeiros e revestimentos, assegurando elevados padrões de qualidade, durabilidade e excelência nos acabamentos.
          </p>
          
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row md:justify-start w-full sm:w-auto">
            <a 
              href={`mailto:${businessEmail}?subject=Pedido de Orçamento`}
              className="inline-flex items-center justify-center rounded-xl bg-[#b5895a] px-8 py-3.5 text-sm font-semibold tracking-wider text-white shadow-xl hover:bg-[#5D4A3A] transition duration-300 transform hover:scale-[1.02]"
            >
              Pedir Orçamento Grátis
            </a>
          </div>
        </div>

        {heroImages.length > 1 && (
          <>
            <button onClick={handlePrevHero} className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-[#b5895a]/90 text-white hover:bg-[#5D4A3A] transition-all duration-300 z-20 shadow-xl backdrop-blur-xs hidden sm:block">
              <ChevronLeft className="h-7 w-7" />
            </button>
            <button onClick={handleNextHero} className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-[#b5895a]/90 text-white hover:bg-[#5D4A3A] transition-all duration-300 z-20 shadow-xl backdrop-blur-xs hidden sm:block">
              <ChevronRight className="h-7 w-7" />
            </button>
          </>
        )}
      </header>

      {/* SECÇÃO: SERVIÇOS */}
      <section id="services" className="mx-auto max-w-[85vw] px-6 py-28 scroll-mt-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-serif text-stone-600 sm:text-4xl tracking-tight">Serviços</h2>
          <div className="h-0.5 w-16 bg-[#b5895a] mx-auto mt-4" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 w-full">
          {services.map((service, serviceIdx) => (
            <div key={serviceIdx} className="flex flex-col bg-[#faf6f0]/90 rounded-3xl p-4 border border-stone-300/40 shadow-xs hover:shadow-md transition-all duration-300 group">
              <div 
                onClick={() => setActiveLightbox({ src: service.images[service.currentIdx], title: service.title })}
                className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-5 shadow-xs bg-stone-100 cursor-zoom-in"
              >
                <img 
                  src={service.images[service.currentIdx]} 
                  alt={service.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  loading="lazy"
                />
                
                {service.images.length > 1 && (
                  <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button onClick={(e) => prevServiceImg(serviceIdx, e)} className="bg-white/80 backdrop-blur-xs text-stone-800 p-1.5 rounded-xl hover:bg-white transition shadow-sm">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button onClick={(e) => nextServiceImg(serviceIdx, e)} className="bg-white/80 backdrop-blur-xs text-stone-800 p-1.5 rounded-xl hover:bg-white transition shadow-sm">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {service.images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1 bg-black/20 px-2 py-1 rounded-full backdrop-blur-xs z-10">
                    {service.images.map((_, i) => (
                      <div key={i} className={`h-1 w-1 rounded-full ${i === service.currentIdx ? 'bg-white w-2' : 'bg-white/50'} transition-all`} />
                    ))}
                  </div>
                )}
              </div>

              <h3 className="text-base font-bold text-stone-900 tracking-tight text-center px-1">{service.title}</h3>
              <p className="mt-2 text-sm text-stone-500 leading-relaxed text-center px-1 flex-1 pb-2">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL / LIGHTBOX PARA VER A IMAGEM EM GRANDE */}
      {activeLightbox && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveLightbox(null)}
        >
          <button 
            onClick={() => setActiveLightbox(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="relative max-w-5xl max-h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={activeLightbox.src} 
              alt={activeLightbox.title} 
              className="max-w-full max-h-[80vh] rounded-lg object-contain shadow-2xl border border-white/10"
            />
          </div>
          
          <p className="text-white text-lg font-semibold tracking-wide mt-4 bg-stone-900/60 px-4 py-2 rounded-full backdrop-blur-xs">
            {activeLightbox.title}
          </p>
        </div>
      )}

      {/* COMPROMISSOS */}
      <section className="bg-[#5D4A3A] text-[#f4f1ea] py-24 rounded-t-[3rem] shadow-2xl relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid gap-12 sm:grid-cols-2 md:grid-cols-5 relative z-10">
          
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="p-3 bg-[#4d3d30] rounded-xl mb-4 text-[#b5895a]">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">40+ Anos de Experiência</h3>
            <p className="mt-2 text-sm text-stone-200/80 leading-relaxed">Uma longa história de tradição, conhecimento técnico profundo e confiança no setor.</p>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="p-3 bg-[#4d3d30] rounded-xl mb-4 text-[#b5895a]">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">Orçamentos Rápidos e Gratuitos</h3>
            <p className="mt-2 text-sm text-stone-200/80 leading-relaxed">Valorizamos o seu tempo. Apresentamos cotações detalhadas com máxima agilidade e sem qualquer custo.</p>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="p-3 bg-[#4d3d30] rounded-xl mb-4 text-[#b5895a]">
              <Hammer className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">Acabamentos Rigorosos</h3>
            <p className="mt-2 text-sm text-stone-200/80 leading-relaxed">Cortes limpos, junções perfeitas e atenção milimétrica aos pormenores.</p>
          </div>
          
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="p-3 bg-[#4d3d30] rounded-xl mb-4 text-[#b5895a]">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">Durabilidade Absoluta</h3>
            <p className="mt-2 text-sm text-stone-200/80 leading-relaxed">Madeiras nobres tratadas e ferragens estruturais premium de alta resistência.</p>
          </div>
          
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="p-3 bg-[#4d3d30] rounded-xl mb-4 text-[#b5895a]">
              <Star className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">Compromisso e Rigor</h3>
            <p className="mt-2 text-sm text-stone-200/80 leading-relaxed">Prazos de execução cumpridos à risca com orçamentos fechados transparentes.</p>
          </div>

        </div>
      </section>

      {/* SECÇÃO: PARCEIROS */}
      <section id="partners" className="bg-[#ebd9c5]/20 border-y border-stone-300/40 py-20 scroll-mt-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-stone-600 sm:text-4xl">Parceiros</h2>
            <div className="h-0.5 w-16 bg-[#b5895a] mx-auto mt-4" />
          </div>
          
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 items-center justify-items-center">
            {dynamicPartners.map((imgUrl, idx) => {
              const lowerUrl = imgUrl.toLowerCase();
              // Verifica se é um dos logotipos que devem aparecer maiores
              const isLargeLogo = lowerUrl.includes('tarkett') || lowerUrl.includes('portrisa');

              return (
                <div 
                  key={idx} 
                  className={`h-20 flex items-center justify-center bg-[#faf6f0] border border-stone-300/60 rounded-xl shadow-xs w-44 overflow-hidden transition-all duration-300 ${
                    isLargeLogo ? 'p-1.5' : 'p-4'
                  }`}
                >
                  <img 
                    src={imgUrl} 
                    alt={`Logotipo Parceiro ${idx + 1}`} 
                    className={`max-h-full max-w-full object-contain transition-transform duration-300 ${
                      isLargeLogo ? 'scale-[1.18]' : ''
                    }`} 
                    loading="lazy"
                  />
                </div>
              );
            })}
            {dynamicPartners.length === 0 && (
              <div className="col-span-full text-center text-stone-400 text-sm">
                Coloque logotipos na pasta "src/assets/Imagens/Parceiros" para atualizar.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECÇÃO: CATÁLOGOS */}
      <section id="catalogues" className="mx-auto max-w-7xl px-6 pt-28 pb-12 lg:px-8 scroll-mt-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-serif text-stone-600 sm:text-4xl">Catálogos</h2>
          <div className="h-0.5 w-16 bg-[#b5895a] mx-auto mt-4" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {catalogues.map((catalog, idx) => (
            <a 
              key={idx} 
              href={catalog.pdfUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="group flex flex-col bg-[#faf6f0]/90 rounded-2xl overflow-hidden border border-stone-300/40 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                <img 
                  src={catalog.image} 
                  alt={catalog.title} 
                  className="h-full w-full object-cover" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-xs text-stone-800 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                    <FileText className="h-6 w-6 text-[#b5895a]" />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white border-t border-stone-200/50 flex items-center justify-between">
                <span className="text-sm font-bold text-stone-900 group-hover:text-[#b5895a] transition-colors">{catalog.title}</span>
                <span className="text-[11px] text-[#b5895a] font-medium uppercase tracking-wider group-hover:underline flex items-center gap-1.5 shrink-0">
                  PDF
                  <Download className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SECÇÃO: CONTACTOS */}
      <section id="contact" className="mx-auto max-w-4xl px-6 pt-12 pb-28 text-center lg:px-8 scroll-mt-12">
        <h2 className="text-3xl font-serif text-stone-600 sm:text-4xl">Contactos</h2>
        <div className="h-0.5 w-16 bg-[#b5895a] mx-auto mt-4" />
        
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <a href={`tel:${businessPhone}`} className="flex items-center p-5 rounded-2xl bg-[#faf6f0]/90 border border-stone-300/50 hover:border-[#b5895a] hover:shadow-md transition-all duration-300 text-left group">
            <div className="p-3 rounded-xl bg-stone-200/60 text-stone-800 mr-4 group-hover:bg-[#b5895a] group-hover:text-white transition-colors">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Chamada Telefónica</p>
              <p className="text-base font-bold text-stone-900 mt-0.5">{businessPhone}</p>
            </div>
          </a>
          
          <a href={`mailto:${businessEmail}`} className="flex items-center p-5 rounded-2xl bg-[#faf6f0]/90 border border-stone-300/50 hover:border-[#5D4A3A] hover:shadow-md transition-all duration-300 text-left group">
            <div className="p-3 rounded-xl bg-stone-200/60 text-stone-800 mr-4 group-hover:bg-[#5D4A3A] group-hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">E-mail Comercial</p>
              <p className="text-base font-bold text-stone-900 mt-0.5">{businessEmail}</p>
            </div>
          </a>

          <a href={`https://wa.me/${businessPhone}`} target="_blank" rel="noreferrer" className="flex items-center p-5 rounded-2xl bg-[#faf6f0]/90 border border-stone-300/50 hover:border-[#25D366] hover:shadow-md transition-all duration-300 text-left group">
            <div className="p-3 rounded-xl bg-stone-200/60 text-stone-800 mr-4 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <WhatsAppIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Mensagem Direta</p>
              <p className="text-base font-bold text-stone-900 mt-0.5 group-hover:text-[#25D366] transition-colors">WhatsApp</p>
            </div>
          </a>

          <a href={`${facebookUser}`} target="_blank" rel="noreferrer" className="flex items-center p-5 rounded-2xl bg-[#faf6f0]/90 border border-stone-300/50 hover:border-[#1877F2] hover:shadow-md transition-all duration-300 text-left group">
            <div className="p-3 rounded-xl bg-stone-200/60 text-stone-800 mr-4 group-hover:bg-[#1877F2] group-hover:text-white transition-colors">
              <FacebookIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Página Oficial</p>
              <p className="text-base font-bold text-stone-900 mt-0.5 group-hover:text-[#1877F2] transition-colors">Facebook</p>
            </div>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#5D4A3A] py-12 text-center text-xs text-stone-200 border-t border-stone-700/40 pb-28 md:pb-12">
        <p>© 2026 Madeira Contemporânea. Todos os direitos reservados.</p>
      </footer>

      {/* ÍCONES FLUTUANTES */}
      <div className="fixed right-4 bottom-24 z-40 hidden md:flex flex-col space-y-3">
        <a href={`https://wa.me/${businessPhone}`} target="_blank" rel="noreferrer" className="p-3.5 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba56] transition hover:-translate-x-1.5 duration-200 flex items-center justify-center">
          <WhatsAppIcon className="h-5 w-5" />
        </a>
        <a href={`${facebookUser}`} target="_blank" rel="noreferrer" className="p-3.5 bg-[#1877F2] text-white rounded-full shadow-lg hover:bg-[#1565d4] transition hover:-translate-x-1.5 duration-200 flex items-center justify-center">
          <FacebookIcon className="h-5 w-5" />
        </a>
        <a href={`mailto:${businessEmail}`} className="p-3.5 bg-[#5D4A3A] text-white rounded-full shadow-lg hover:bg-[#4d3d30] transition hover:-translate-x-1.5 duration-200 flex items-center justify-center">
          <Mail className="h-5 w-5" />
        </a>
      </div>

     {showScrollTop && (
          <button onClick={scrollToTop} className="fixed left-6 bottom-6 z-40 p-3 bg-[#b5895a] text-white rounded-xl shadow-xl hover:bg-[#5D4A3A] transition-all duration-200 transform hover:scale-105">
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
      </div> 
    </HelmetProvider>
  );
}