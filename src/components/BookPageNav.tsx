'use client';
import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {useIsMobile} from "@/hooks/use-mobile";
import {ScrollArea} from "@/components/ui/scroll-area";


const BookPageNavigation = () => {
  const [activePage, setActivePage] = useState(null);
  const isMobile = useIsMobile();

  const pages = [
    {id: 'home', title: 'Home', color: 'to-blue-500/20', text: 'text-blue-500'},
    {id: 'about', title: 'About Us', color: 'to-green-500/20', text: 'text-green-500'},
    {id: 'services', title: 'Services', color: 'to-purple-500/20', text: 'text-purple-500'},
    {id: 'portfolio', title: 'Portfolio', color: 'to-yellow-500/20', text: 'text-yellow-500'},
    {id: 'contact', title: 'Contact', color: 'to-red-500/20', text: 'text-red-500'},
  ];

  const handlePageChange = (pageId) => {
    setActivePage(pageId === activePage ? isMobile ? null : null : pageId);
  };

  const getPageContent = (page: any) => {
    switch (page.id) {
      case 'home':
        return (
          <ScrollArea className="w-full h-full">
            <div className="p-8">
              <h1 className={`absolute right-4 bottom-4 ${page.text} opacity-40 -z-20 font-cyber-outline leading-none text-[8rem]`}>01</h1>
              <h1 className={`text-4xl font-semibold mb-4 font-cyber-outline animate-pulse ${page.text}`}>Dragon devs_</h1>
              <p className="text-lg">This is the home page with book-like navigation.</p>

            </div>
          </ScrollArea>
        );
      case 'about':
        return (
          <ScrollArea className="w-full h-full">

            <div className="p-8">
              <h1 className={`absolute right-4 bottom-4 ${page.text} opacity-40 -z-20 font-cyber-outline leading-none text-[8rem]`}>02</h1>
              <h1 className={`text-4xl font-semibold mb-4 font-cyber-outline ${page.text}`}>About Us</h1>
              <p className="text-lg">Learn about our company and our mission to create innovative web experiences.</p>

            </div>
          </ScrollArea>
        );
      case 'services':
        return (
          <div className="p-8">
            <h1 className={`absolute right-4 bottom-4 ${page.text} opacity-40 -z-20 font-cyber-outline leading-none text-[8rem]`}>03</h1>
            <h1 className={`text-4xl font-semibold mb-4 font-cyber-outline ${page.text}`}>Our Services</h1>
            <p className="text-lg">We offer a wide range of web development and design services.</p>
          </div>
        );
      case 'portfolio':
        return (
          <ScrollArea className="w-full h-full">
            <div className="p-8">
              <h1 className={`absolute right-4 bottom-4 ${page.text} opacity-40 -z-20 font-cyber-outline leading-none text-[8rem]`}>04</h1>
              <h1 className={`text-4xl font-semibold mb-4 font-cyber-outline ${page.text}`}>Portfolio</h1>
              <p className="text-lg">Check out our latest projects and case studies.</p>
            </div>
          </ScrollArea>
        );
      case 'contact':
        return (
          <ScrollArea className="w-full h-full">
            <div className="p-8">
              <h1 className={`absolute right-4 bottom-4 ${page.text} opacity-40 -z-20 font-cyber-outline leading-none text-[8rem]`}>05</h1>
              <h1 className={`text-4xl font-semibold mb-4 font-cyber-outline ${page.text}`}>Contact Us</h1>
              <p className="text-lg">Get in touch with our team for inquiries and collaborations.</p>
            </div>
          </ScrollArea>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex bg-background">
      {/* Main background when no page is active */}
      {activePage === null && (
        <div></div>
        // <div className="absolute inset-0 bg-background flex items-center justify-center z-0">
        // <div className="text-center">
        // <h1 className={`text-4xl font-semibold mb-4 font-cyber-outline ${page.text">Book-style Navigation</h1>
        // <p className="text-xl">Click any tab to navigate</p>
        // </div>
        // </div>
      )}

      {/* Navigation tabs */}
      <div className="flex w-full h-full ">
        {pages.map((page, index) => {
          const isActive = activePage === page.id;
          const totalTabs = pages.length;
          const tabWidth = 100 / totalTabs;

          return (
            <motion.div
              key={page.id}
              className={`h-full text-foreground bg-gradient-to-br from-background from-20%% ${page.color} cursor-pointer absolute`}
              // style={{
              //   position: 'absolute',
              //   left: `${index * tabWidth}%`,
              //   width: `${tabWidth}%`
              // }}
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
                zIndex: isActive ? 10 : 5
              }}
              transition={{
                type: 'tween',
                stiffness: 300,
                damping: 30
              }}
              onClick={() => handlePageChange(page.id)}
            >
              {/* Tab content */}
              {isActive ? (
                <div className="w-full h-full overflow-x-hidden">
                  {getPageContent(page)}
                </div>
              ) : (
                <div className="h-full bg-background transition-all duration-500 ease-in font-cyber hover:font-cyber-outline w-full flex items-center justify-center overflow-hidden">
                  <div
                    className={`text-4xl hover:font-semibold ${page.text} transform -rotate-90 whitespace-nowrap`}>
                    {page.title}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BookPageNavigation;
