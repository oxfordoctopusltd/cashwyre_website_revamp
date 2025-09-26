"use client"
import Hero from "@/components/sections/Hero"
import IntroSection from "@/components/sections/IntroSection"
import DownloadSection from "@/components/sections/Download"
import Features from "@/components/sections/Features"
import Countries from "@/components/sections/Countries"
import Calculator from "@/components/sections/Calculator"
import Steps from "@/components/sections/Steps"

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <IntroSection />
      <Features />
      <Countries />
      <Calculator />
      <Steps />
      <DownloadSection />
    </div>
  )
}