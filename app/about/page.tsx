import React from 'react'
import Image from 'next/image'

const AboutPage = () => {
  return (
    <div className="container mx-auto my-8 pt-16">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 rounded-lg shadow-2xl overflow-hidden">
        <div className="p-8 md:p-12 lg:p-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">The miMall Story</h1>
          <div className="space-y-6 text-lg">
            <p className="leading-relaxed">
              Picture, if you will, a world where the bustling energy of a local market meets the sleek efficiency of modern technology. That world, my friends, is miMall. Born from a dream in 2016 and brought to life in 2021, miMall isn't just another online marketplace. Oh no, it's much more than that.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-12">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 text-accent-color">A Vision of Possibilities</h2>
                <p className="leading-relaxed">
                  You see, miMall is like that wise old shopkeeper who knows every item in the store, mixed with a cutting-edge AI that can predict what you need before you even know you need it. It's a place where the small, family-owned shop down the street sits comfortably next to luxury brands that would make even the most discerning shopper weak at the knees.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <Image src="/placeholder.svg" alt="miMall Vision" width={500} height={300} className="rounded-lg shadow-lg" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mt-8 mb-4 text-accent-color">A Commitment to Excellence</h2>
            <p className="leading-relaxed">
              Now, you might be wondering, "What makes miMall tick?" Well, let me tell you. It's not just about selling products. It's about creating connections. It's about ensuring that when you buy that handcrafted mug, you're not just getting a vessel for your morning coffee. You're getting a piece of the artisan's soul, delivered with the care and precision of a world-class concierge.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-accent-color">
              <li>They curate goods like a master chef selects ingredients for a Michelin-star meal.</li>
              <li>Their customer service? It's like having a friendly neighbor who just happens to know everything about retail.</li>
              <li>And security? Well, let's just say Fort Knox could learn a thing or two.</li>
            </ul>
            
            <h2 className="text-3xl font-bold mt-8 mb-4 text-accent-color">The Journey Continues</h2>
            <p className="leading-relaxed">
              From its humble beginnings in the minds of a few visionaries at Alahad Enterprises, miMall has grown into a testament of what happens when passion meets innovation. It's a living, breathing entity that evolves with every click, every purchase, every satisfied customer.
            </p>
            <p className="leading-relaxed">
              As we stand here today, looking at what miMall has become, we can't help but feel a sense of wonder. It's not just a platform; it's a community, a marketplace, and a glimpse into the future of retail. And the best part? This is just the beginning of the story.
            </p>
            <p className="leading-relaxed font-bold text-accent-color">
              So, whether you're here to window shop or to find that one perfect item, remember: at miMall, every product has a story, and now, you're a part of it too. Welcome to the future of shopping. Welcome to miMall.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

