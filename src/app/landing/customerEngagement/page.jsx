'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import image1 from '../../../assets/images/comp2-1.png'
import image2 from '../../../assets/images/comp22.png'
import image3 from '../../../assets/images/comp-2.png'
import image4 from '../../../assets/images/comp-3.png'
import image5 from '../../../assets/images/comp-4.png'
import image6 from '../../../assets/images/comp-5.png'

const features = [
  { text: 'Add Web Check in Assist', image: image1 },
  { text: 'What people say about us !!', image: image2 },
  { text: 'Share Your happyfare Story', image: image3 },
  { text: 'Key Features of AeroMessenger', image: image4 },
  { text: 'Get Flexibility with Easy Refund', image: image5 },
  { text: 'Join happyfares Travel Tribe', image: image6 },
]

export default function CustomerEngagement() {
  const containerRef = useRef(null)
  const featureRefs = useRef([])

  useEffect(() => {
    if (containerRef.current) {
      // Initial hidden state
      gsap.set(featureRefs.current, {
        opacity: 0,
        y: 20
      })

      // Staggered animation on scroll
      gsap.to(featureRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }
  }, [])

  return (
    <section className="w-full px-4 bg-white ">
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-16"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            ref={el => featureRefs.current[index] = el}
            className="relative w-[380px] h-[86px] bg-gradient-to-br from-[#00BBF2B0] to-[#15488080] rounded-lg px-6 py-6 text-white flex items-center transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] hover:brightness-105"
          >
            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-28 h-28 bg-white rounded-full shadow-xl z-10 flex items-center justify-center">
              <div className="relative w-24 h-24">
                <Image
                  src={feature.image}
                  alt={feature.text}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="ml-36 text-lg font-semibold">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}