"use client"

import Link from "next/link"
import { Zap, ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface Particle {
  x: number
  y: number
  duration: number
  delay: number
}

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles = [...Array(20)].map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Animated gradient orbs that move */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-full filter blur-3xl opacity-30"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-secondary/30 to-primary/30 rounded-full filter blur-3xl opacity-20"
        animate={{
          x: [0, -80, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${i % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`}
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [null, -100, -200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 flex flex-col text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm px-4 py-1.5 text-sm text-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Innovation meets execution</span>
          </div>
        </motion.div>

        {/* Main heading with gradient text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="z-10 text-6xl font-extrabold tracking-tighter text-foreground md:text-7xl lg:text-8xl xl:text-9xl"
        >
          Creating <br />
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Whats Next.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="z-10 flex flex-col items-center justify-center space-y-6 px-6 pt-5 text-center"
        >
          <p className="w-full max-w-2xl text-md font-light text-foreground/70 md:text-lg lg:text-xl">
            Synvanta is a startup providing pre-built systems that seamlessly integrate into your business, 
            along with custom solutions tailored to your specific needs.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link target="_blank" href="">
              <Button className="h-12 cursor-pointer px-8 md:h-14 md:px-10 flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-primary/25">
                <Zap className="h-4 w-4" />
                Ask for Demo
              </Button>
            </Link>
            <Link href="/products">
              <Button 
                variant="outline" 
                className="h-12 cursor-pointer px-8 md:h-14 md:px-10 flex items-center gap-2 border-primary bg-white text-foreground hover:bg-background transition-all duration-300"
              >
                See Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}