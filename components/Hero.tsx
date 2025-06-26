'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { personalInfo } from '../data/personal'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-black to-black" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-purple/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-width relative z-10">
        <div className="text-center">
          {/* Profile Image */}
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="relative w-48 h-48 mx-auto">
                             <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-neon-purple p-1 animate-pulse">
                <div className="w-full h-full rounded-full bg-black p-2">
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9IiMxZTI5M2IiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMzAiIGZpbGw9IiM2NDc0OGIiLz48cGF0aCBkPSJNMTAwIDE0MGMtMjIuMDkxIDAtNDAgMTcuOTA5LTQwIDQwdjIwaDgwdi0yMGMwLTIyLjA5MS0xNy45MDktNDAtNDAtNDAiIGZpbGw9IiM2NDc0OGIiLz48L3N2Zz4='
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-shadow">
              Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-primary-400 font-semibold mb-6">
              {personalInfo.title}
            </h2>
            <p className="text-xl text-dark-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              {personalInfo.subtitle}
            </p>
            <p className="text-lg text-dark-400 mb-12 max-w-3xl mx-auto">
              {personalInfo.bio.short}
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={scrollToProjects}
              className="btn-primary w-full sm:w-auto"
            >
              View My Work
            </button>
            <button
              onClick={scrollToContact}
              className="btn-secondary w-full sm:w-auto"
            >
              Get In Touch
            </button>
          </div>

          {/* Social Links */}
          <div className={`flex justify-center space-x-6 mb-12 transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-primary-400 transition-colors duration-300 transform hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-400 hover:text-primary-400 transition-colors duration-300 transform hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-dark-400 hover:text-primary-400 transition-colors duration-300 transform hover:scale-110"
            >
              <Mail size={24} />
            </a>
            {personalInfo.social.portfolio && (
              <a
                href={personalInfo.social.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-400 transition-colors duration-300 transform hover:scale-110"
              >
                <ExternalLink size={24} />
              </a>
            )}
          </div>

          {/* Scroll indicator */}
          <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <button
              onClick={scrollToProjects}
              className="text-dark-400 hover:text-primary-400 transition-colors duration-300 animate-bounce"
            >
              <ChevronDown size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 