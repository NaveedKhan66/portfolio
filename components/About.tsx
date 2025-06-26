'use client'

import { useEffect, useState, useRef } from 'react'
import { personalInfo } from '../data/personal'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const aboutRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Fallback: show content after a short delay if intersection observer doesn't work
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(fallbackTimer)
          setIsVisible(true)
        }
      },
      { 
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => {
      observer.disconnect()
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <section id="about" ref={aboutRef} className="section-padding bg-dark-950/50">
      <div className="container-width">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              Get to know more about my background, skills, and experience
            </p>
          </div>

          {/* Bio Section */}
          <div className="mb-16">
            <div className="card max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">My Story</h3>
              <div className="prose prose-invert max-w-none">
                {personalInfo.bio.long.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-dark-200 leading-relaxed mb-4">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="gradient-text">Skills & Technologies</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(personalInfo.skills).map(([category, skills], index) => (
                <div
                  key={category}
                  className={`card transition-all duration-1000 delay-${index * 200} ${
                    isVisible ? 'animate-scale-in' : 'opacity-0 scale-90'
                  }`}
                >
                  <h4 className="text-xl font-semibold mb-4 text-primary-400">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-dark-700 text-dark-200 rounded-full text-sm hover:bg-primary-600 hover:text-white transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="gradient-text">Experience</span>
            </h3>
            <div className="space-y-8">
              {personalInfo.experience.map((exp, index) => (
                <div
                  key={index}
                  className={`card transition-all duration-1000 delay-${index * 300} ${
                    isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-primary-400">{exp.title}</h4>
                      <p className="text-lg text-dark-200">{exp.company}</p>
                      <p className="text-dark-400">{exp.location}</p>
                    </div>
                    <div className="md:text-right mt-2 md:mt-0">
                      <span className="inline-block px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm font-medium">
                        {exp.duration}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.description.map((desc, descIndex) => (
                      <li key={descIndex} className="text-dark-300 flex items-start">
                        <span className="text-primary-500 mr-3 mt-1">•</span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Education */}
            <div className={`card transition-all duration-1000 delay-1000 ${
              isVisible ? 'animate-scale-in' : 'opacity-0 scale-90'
            }`}>
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Education</h3>
              {personalInfo.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-lg font-semibold text-primary-400">{edu.degree}</h4>
                  <p className="text-dark-200">{edu.school}</p>
                  <p className="text-dark-400">{edu.location} • {edu.year}</p>
                  {edu.gpa && <p className="text-dark-400">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className={`card transition-all duration-1000 delay-1200 ${
              isVisible ? 'animate-scale-in' : 'opacity-0 scale-90'
            }`}>
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Certifications</h3>
              <div className="space-y-3">
                {personalInfo.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-primary-500 mr-3">✓</span>
                    <span className="text-dark-200">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 