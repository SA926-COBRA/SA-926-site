'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {useIsMobile} from "@/hooks/use-mobile";


const BookPageNavigation = () => {
  const [activePage, setActivePage] = useState(null);
  const isMobile = useIsMobile();

  const pages = [
    { id: 'home', title: 'Home', color: 'bg-blue-500', text: 'text-blue-500' },
    { id: 'about', title: 'About Us', color: 'bg-green-500', text: 'text-green-500' },
    { id: 'services', title: 'Services', color: 'bg-purple-500', text: 'text-purple-500' },
    { id: 'portfolio', title: 'Portfolio', color: 'bg-yellow-500', text: 'text-yellow-500'},
    { id: 'contact', title: 'Contact', color: 'bg-red-500', text: 'text-red-500' },
  ];

  const handlePageChange = (pageId) => {
    setActivePage(pageId === activePage ? isMobile ? null : pageId : pageId);
  };

  const getPageContent = (pageId) => {
    switch (pageId) {
      case 'home':
        return (
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
            <p className="text-lg">This is the home page with book-like navigation.</p>
          </div>
        );
      case 'about':
        return (
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg">Learn about our company and our mission to create innovative web experiences.</p>
          </div>
        );
      case 'services':
        return (
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-lg">We offer a wide range of web development and design services.</p>
          </div>
        );
      case 'portfolio':
        return (
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
            <p className="text-lg">Check out our latest projects and case studies.</p>
          </div>
        );
      case 'contact':
        return (
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg">Get in touch with our team for inquiries and collaborations.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen  bg-white">
      {/* Main background when no page is active */}
      {activePage === null && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-0">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Book-style Navigation</h1>
            <p className="text-xl">Click any tab to navigate</p>
          </div>
        </div>
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
              className={`h-full ${page.color} cursor-pointer ${isMobile && 'absolute'} `}
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
                  {getPageContent(page.id)}
                </div>
              ) : (
                <div className="h-full w-full flex items-center bg-background justify-center overflow-hidden">
                  <div className={`text-4xl font-bold ${page.text}  tracking-tighter transform -rotate-90 whitespace-nowrap`}>
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
