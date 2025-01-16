'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const AboutPage = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const listContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  }

  return (
    <motion.div 
      className="container mx-auto my-8 pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-200 rounded-lg shadow-2xl overflow-hidden"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="p-8 md:p-12 lg:p-16" variants={item}>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            The miMall Story
          </motion.h1>
          <motion.div className="space-y-6 text-lg" variants={container}>
            <motion.p 
              className="leading-relaxed"
              variants={item}
            >
              Picture, if you will, a world where the bustling energy of a local market meets the sleek efficiency of modern technology. That world, my friends, is miMall. Born from a dream in 2016 and brought to life in 2021, miMall isn't just another online marketplace. Oh no, it's much more than that.
            </motion.p>
            
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-between gap-8 my-12"
              variants={item}
            >
              <motion.div 
                className="w-full md:w-1/2"
                variants={item}
              >
                <motion.h2 
                  className="text-3xl font-bold mb-4 text-gray-200"
                  variants={item}
                >
                  A Vision of Possibilities
                </motion.h2>
                <motion.p 
                  className="leading-relaxed"
                  variants={item}
                >
                  You see, miMall is like that wise old shopkeeper who knows every item in the store, mixed with a cutting-edge AI that can predict what you need before you even know you need it. It's a place where the small, family-owned shop down the street sits comfortably next to luxury brands that would make even the most discerning shopper weak at the knees.
                </motion.p>
              </motion.div>
              <motion.div 
                className="w-full md:w-1/2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image src="/heart.jpg" alt="miMall Vision" width={500} height={300} className="rounded-lg shadow-lg" />
              </motion.div>
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-bold mt-8 mb-4 text-gray-200"
              variants={item}
            >
              A Commitment to Excellence
            </motion.h2>
            <motion.p 
              className="leading-relaxed"
              variants={item}
            >
              Now, you might be wondering, "What makes miMall tick?" Well, let me tell you. It's not just about selling products. It's about creating connections. It's about ensuring that when you buy that handcrafted mug, you're not just getting a vessel for your morning coffee. You're getting a piece of the artisan's soul, delivered with the care and precision of a world-class concierge.
            </motion.p>
            <motion.ul 
              className="list-disc list-inside space-y-2 pl-4 text-gray-200"
              variants={listContainer}
              initial="hidden"
              animate="show"
            >
              <motion.li variants={listItem}>They curate goods like a master chef selects ingredients for a Michelin-star meal.</motion.li>
              <motion.li variants={listItem}>Their customer service? It's like having a friendly neighbor who just happens to know everything about retail.</motion.li>
              <motion.li variants={listItem}>And security? Well, let's just say Fort Knox could learn a thing or two.</motion.li>
            </motion.ul>
            
            <motion.h2 
              className="text-3xl font-bold mt-8 mb-4 text-gray-200"
              variants={item}
            >
              The Journey Continues
            </motion.h2>
            <motion.p 
              className="leading-relaxed"
              variants={item}
            >
              From its humble beginnings in the minds of a few visionaries at Alahad Enterprises, miMall has grown into a testament of what happens when passion meets innovation. It's a living, breathing entity that evolves with every click, every purchase, every satisfied customer.
            </motion.p>
            <motion.p 
              className="leading-relaxed"
              variants={item}
            >
              As we stand here today, looking at what miMall has become, we can't help but feel a sense of wonder. It's not just a platform; it's a community, a marketplace, and a glimpse into the future of retail. And the best part? This is just the beginning of the story.
            </motion.p>
            <motion.p 
              className="leading-relaxed font-bold text-gray-200"
              variants={item}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              So, whether you're here to window shop or to find that one perfect item, remember: at miMall, every product has a story, and now, you're a part of it too. Welcome to the future of shopping. Welcome to miMall.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default AboutPage
