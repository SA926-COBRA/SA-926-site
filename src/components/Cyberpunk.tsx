'use client';
import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {useIsMobile} from "@/hooks/use-mobile";
import {ScrollArea} from "@/components/ui/scroll-area";
import CyberpunkSpotlight from "@/components/CyberpunkSpotlight";

const CyberpunkMenu = () => {
  const [activePage, setActivePage] = useState(null);
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

  // Track mouse position for dynamic effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({x: e.clientX, y: e.clientY});
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const pages = [
    {
      id: 'home', title: 'Home', color: 'to-blue-500/20', text: 'text-blue-500',
      glowColor: '#3b82f6', particleColor: 'rgba(59, 130, 246, 0.6)'
    },
    {
      id: 'about', title: 'About Us', color: 'to-green-500/20', text: 'text-green-500',
      glowColor: '#10b981', particleColor: 'rgba(16, 185, 129, 0.6)'
    },
    {
      id: 'services', title: 'Services', color: 'to-purple-500/20', text: 'text-purple-500',
      glowColor: '#8b5cf6', particleColor: 'rgba(139, 92, 246, 0.6)'
    },
    {
      id: 'portfolio', title: 'Portfolio', color: 'to-yellow-500/20', text: 'text-yellow-500',
      glowColor: '#f59e0b', particleColor: 'rgba(245, 158, 11, 0.6)'
    },
    {
      id: 'contact', title: 'Contact', color: 'to-red-500/20', text: 'text-red-500',
      glowColor: '#ef4444', particleColor: 'rgba(239, 68, 68, 0.6)'
    },
  ];

  const handlePageChange = (pageId) => {
    setActivePage(pageId === activePage ? isMobile ? null : null : pageId);
  };

  // Cyberpunk grid background
  const CyberpunkGrid = ({color}) => (
    <motion.div
      className="absolute inset-0 z-0 opacity-15"
      initial={{opacity: 0}}
      animate={{opacity: 0.15}}
      transition={{duration: 1}}
    >
      <div className="w-full h-full bg-grid-pattern"
           style={{
             backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
             backgroundPosition: `${mousePosition.x * 0.02}px ${mousePosition.y * 0.02}px`
           }}
      />
    </motion.div>
  );

  // Smoke effect component
  const SmokeEffect = ({color}) => {
    const smokeVariants = {
      initial: {opacity: 0, scale: 0.6},
      animate: {
        opacity: [0, 0.5, 0],
        scale: [0.2, 1, 1.5],
        y: [0, -100],
        x: [0, Math.random() * 50 - 25]
      }
    };

    return (
      <div className="absolute bottom-0 left-0 w-full overflow-hidden h-52 pt-10 z-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-xl"
            style={{
              backgroundColor: color,
              width: `${40 + Math.random() * 40}px`,
              height: `${40 + Math.random() * 40}px`,
              bottom: `-20px`,
              left: `${(i * 20) + Math.random() * 80}%`,
            }}
            variants={smokeVariants}
            initial="initial"
            animate="animate"
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    );
  };

  // Light beam effect component
  const LightBeam = ({color}) => {
    return (
      <motion.div
        className="absolute top-0 right-12 w-1 rotate-45 opacity-60 blur-sm z-0 pointer-events-none"
        style={{backgroundColor: color}}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          height: ['30vh', '50vh', '30vh'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    );
  };

  // Floating particles effect
  const FloatingParticles = ({color}) => {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              // backgroundColor: color,
              // boxShadow: `0 0 10px ${color}`,
              backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)],
              boxShadow: `0 0 10px ${['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)]}`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [Math.random() * 10, Math.random() * -10, Math.random() * 10],
              x: [Math.random() * 10, Math.random() * -10, Math.random() * 10],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  };

  // Glitch text effect
  const GlitchText = ({text, textColor}) => {
    return (
      <div className="relative">
        <motion.div
          className={`${textColor} relative z-10`}
          animate={{x: [0, -2, 3, 0], y: [0, -1, 2, 0], opacity: [1, 0.85, 1]}}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: Math.random() * 5 + 3
          }}
        >
          {text}
        </motion.div>
        <motion.div
          className={`absolute top-0 left-0 ${textColor} opacity-70 z-0`}
          animate={{x: [0, 3, -2, 0], y: [0, 2, -1, 0], opacity: [0.7, 0.5, 0.7]}}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            repeatDelay: Math.random() * 5 + 4
          }}
        >
          {text}
        </motion.div>
      </div>
    );
  };

  const getPageContent = (page: any) => {
    const currentPage = pages.find(p => p.id === page.id);

    switch (page.id) {
      case 'home':
        return (
          <CyberpunkSpotlight>

            <div className="p-6 ">

              <motion.h1
                className={`absolute right-4 bottom-4 ${page.text} opacity-40 font-cyber-outline leading-none text-[8rem]`}
                animate={{
                  textShadow: [`0 0 5px ${currentPage.glowColor}`, `0 0 15px ${currentPage.glowColor}`, `0 0 5px ${currentPage.glowColor}`],
                }}
                transition={{duration: 2, repeat: Infinity}}
              >
                <GlitchText text="01" textColor={page.text}/>
              </motion.h1>

              <h1 className={`absolute left-4 top-4 p-2 text-4xl font-semibold mb-4 font-cyber-outline ${page.text}`}>
                <GlitchText text="Dragon devs_" textColor={page.text}/>
                {/*<motion.span*/}
                {/*  className="inline-block w-3 h-8 ml-1 bg-current"*/}
                {/*  animate={{opacity: [1, 0, 1]}}*/}
                {/*  transition={{duration: 1, repeat: Infinity}}*/}
                {/*/>*/}
              </h1>

              <motion.p
                className="text-lg pt-12 z-10"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.3, duration: 0.8}}
              >
                <ScrollArea className="w-full h-[70svh]">
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                  This is the homehome page with book-like navigation.
                </ScrollArea>
              </motion.p>
            </div>
          </CyberpunkSpotlight>
        );
      case 'about':
        return (
          <ScrollArea className="w-full h-full">
            <div className="p-8 ">

              <motion.h1
                className={`absolute right-4 bottom-4 ${page.text} opacity-40 font-cyber-outline leading-none text-[8rem]`}
                animate={{
                  textShadow: [`0 0 5px ${currentPage.glowColor}`, `0 0 15px ${currentPage.glowColor}`, `0 0 5px ${currentPage.glowColor}`],
                }}
                transition={{duration: 2, repeat: Infinity}}
              >
                <GlitchText text="02" textColor={page.text}/>
              </motion.h1>

              <h1 className={`text-4xl font-semibold mb-4 font-cyber-outline  z-10 ${page.text}`}>
                <GlitchText text="About Us" textColor={page.text}/>
              </h1>

              <motion.p
                className="text-lg  z-10"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.3, duration: 0.8}}
              >
                Learn about our company and our mission to create innovative web experiences.
              </motion.p>
            </div>
          </ScrollArea>
        );
      case 'services':
        return (
          <div className="p-8 ">

            <motion.h1
              className={`absolute right-4 bottom-4 ${page.text} opacity-40 font-cyber-outline leading-none text-[8rem]`}
              animate={{
                textShadow: [`0 0 5px ${currentPage.glowColor}`, `0 0 15px ${currentPage.glowColor}`, `0 0 5px ${currentPage.glowColor}`],
              }}
              transition={{duration: 2, repeat: Infinity}}
            >
              <GlitchText text="03" textColor={page.text}/>
            </motion.h1>

            <h1 className={`text-4xl font-semibold mb-4 font-cyber-outline  z-10 ${page.text}`}>
              <GlitchText text="Our Services" textColor={page.text}/>
            </h1>

            <motion.p
              className="text-lg  z-10"
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.3, duration: 0.8}}
            >
              We offer a wide range of web development and design services.
            </motion.p>
          </div>
        );
      case 'portfolio':
        return (
          <ScrollArea className="w-full h-full">
            <div className="p-8 ">

              <motion.h1
                className={`absolute right-4 bottom-4 ${page.text} opacity-40 font-cyber-outline leading-none text-[8rem]`}
                animate={{
                  textShadow: [`0 0 5px ${currentPage.glowColor}`, `0 0 15px ${currentPage.glowColor}`, `0 0 5px ${currentPage.glowColor}`],
                }}
                transition={{duration: 2, repeat: Infinity}}
              >
                <GlitchText text="04" textColor={page.text}/>
              </motion.h1>

              <h1 className={`text-4xl font-semibold mb-4 font-cyber-outline  z-10 ${page.text}`}>
                <GlitchText text="Portfolio" textColor={page.text}/>
              </h1>

              <motion.p
                className="text-lg  z-10"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.3, duration: 0.8}}
              >
                Check out our latest projects and case studies.
              </motion.p>
            </div>
          </ScrollArea>
        );
      case 'contact':
        return (
          <ScrollArea className="w-full h-full">
            <div className="p-8 ">

              <motion.h1
                className={`absolute right-4 bottom-4 ${page.text} opacity-40 font-cyber-outline leading-none text-[8rem]`}
                animate={{
                  textShadow: [`0 0 5px ${currentPage.glowColor}`, `0 0 15px ${currentPage.glowColor}`, `0 0 5px ${currentPage.glowColor}`],
                }}
                transition={{duration: 2, repeat: Infinity}}
              >

                <GlitchText text="05" textColor={page.text}/>
              </motion.h1>

              <h1 className={`text-4xl font-semibold mb-4 font-cyber-outline  z-10 ${page.text}`}>
                <GlitchText text="Contact Us" textColor={page.text}/>
              </h1>

              <motion.p
                className="text-lg  z-10"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.3, duration: 0.8}}
              >
                Get in touch with our team for inquiries and collaborations.
              </motion.p>
            </div>
          </ScrollArea>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex bg-background ">
      {/* Main background when no page is active */}
      {activePage === null && (
        <motion.div
          className="absolute inset-0 bg-background flex items-center justify-center z-0 overflow-hidden"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.8}}
        >
          <div className="absolute inset-0">
            <div className="w-full h-full bg-grid-pattern opacity-10"
                 style={{
                   backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
                   backgroundSize: '40px 40px',
                   backgroundPosition: `${mousePosition.x * 0.01}px ${mousePosition.y * 0.01}px`
                 }}
            />
          </div>

          {/* Random floating particles on home screen */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)],
                width: `${2 + Math.random() * 6}px`,
                height: `${2 + Math.random() * 6}px`,
                boxShadow: `0 0 10px ${['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)]}`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [Math.random() * 20, Math.random() * -20, Math.random() * 20],
                x: [Math.random() * 20, Math.random() * -20, Math.random() * 20],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 5 + Math.random() * 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          <div className="text-center  z-10">
            <motion.h1
              className="text-5xl font-semibold mb-4 font-cyber-outline text-blue-500"
              animate={{
                textShadow: ['0 0 5px #3b82f6', '0 0 15px #3b82f6', '0 0 5px #3b82f6'],
              }}
              transition={{duration: 2, repeat: Infinity}}
            >
              <GlitchText text="Dragon Devs_" textColor="text-blue-500"/>
              {/*<motion.span*/}
              {/*  className="inline-block w-3 h-12 ml-1 bg-blue-500"*/}
              {/*  animate={{opacity: [1, 0, 1]}}*/}
              {/*  transition={{duration: 1, repeat: Infinity}}*/}
              {/*/>*/}
            </motion.h1>
            <motion.p
              className="text-xl"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 0.5, duration: 0.8}}
            >
              Click any tab to navigate
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Navigation tabs */}
      <div className="flex w-full   overflow-hidden">
        {pages.map((page, index) => {
          const isActive = activePage === page.id;
          const totalTabs = pages.length;
          const tabWidth = 100 / totalTabs;

          return (
            <motion.div
              key={page.id}
              className="h-full text-foreground bg-background cursor-pointer absolute overflow-hidden"
              animate={{
                left: isActive ? 0 : (
                  activePage === null ? `${index * tabWidth}%` : (
                    index < pages.findIndex(p => p.id === activePage) ? 0 : 'auto'
                  )
                ),
                right: isActive ? 0 : (
                  activePage === null ? 'auto' : (
                    index > pages.findIndex(p => p.id === activePage) ? 0 : 'auto'
                  )
                ),
                width: isActive ? '100%' : (
                  activePage === null ? `${tabWidth}%` : '40px'
                ),
                zIndex: isActive ? 10 : 5 + index
              }}
              transition={{
                type: 'tween',
                duration: 0.6,
                ease: [0.33, 1, 0.68, 1]  // Custom cubic bezier for cyberpunk feel
              }}
              onClick={() => handlePageChange(page.id)}
            >
              {/* Tab content */}
              {isActive ? (
                <motion.div
                  className={`w-full h-full bg-gradient-to-br from-background from-20% ${page.color} overflow-x-hidden`}
                  initial={{opacity: 0.5}}
                  animate={{opacity: 1}}
                  transition={{duration: 0.4}}
                >
                  {/*<CyberpunkGrid color={page.glowColor}/>*/}
                  {/*<SmokeEffect color={page.particleColor}/>*/}
                  {/*<LightBeam color={page.glowColor}/>*/}
                  {/*<FloatingParticles color={page.particleColor}/>*/}

                  {getPageContent(page)}
                </motion.div>
              ) : (
                <motion.div
                  className="h-full bg-background transition-all duration-500 ease-in font-cyber hover:font-cyber-outline w-full flex items-center justify-center overflow-hidden"
                  // whileHover={{
                  //   boxShadow: `0 0 15px ${pages[index].glowColor}`,
                  //   backgroundColor: 'rgba(20, 20, 30, 0.8)'
                  // }}
                >
                  <motion.div
                    className={`text-4xl hover:font-semibold ${page.text} transform -rotate-90 whitespace-nowrap`}
                    whileHover={{
                      textShadow: `0 0 5px ${pages[index].glowColor}`
                    }}
                  >
                    <motion.span
                      animate={{
                        textShadow: [`0 0 0px ${pages[index].glowColor}`, `0 0 10px ${pages[index].glowColor}`, `0 0 0px ${pages[index].glowColor}`],
                      }}
                      transition={{duration: 2, repeat: Infinity, repeatDelay: index}}
                    >
                      {page.title}
                    </motion.span>
                  </motion.div>

                  {/* Edge glow effect */}
                  {/*<motion.div*/}
                  {/*  className="absolute left-0 top-0 w-1 h-full"*/}
                  {/*  style={{backgroundColor: pages[index].glowColor}}*/}
                  {/*  animate={{*/}
                  {/*    opacity: [0.2, 0.6, 0.2],*/}
                  {/*    boxShadow: [`0 0 5px ${pages[index].glowColor}`, `0 0 15px ${pages[index].glowColor}`, `0 0 5px ${pages[index].glowColor}`],*/}
                  {/*  }}*/}
                  {/*  transition={{duration: 3, repeat: Infinity, delay: index * 0.5}}*/}
                  {/*/>*/}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CyberpunkMenu;


