'use client'

import { useEffect, useState, useRef } from 'react'
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { projects } from '../data/projects'

interface Project {
  id: number
  title: string
  description: string
  shortDescription: string
  image: string
  gallery: string[]
  tech: string[]
  liveUrl: string
  githubUrl: string
  category: string
  year: string
  caseStudy: {
    overview: string
    challenge: string
    solution: string
    features: string[]
    results: string
  }
}

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const projectsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    if (projectsRef.current) {
      observer.observe(projectsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
      )
    }
  }

  return (
    <>
      <section id="projects" ref={projectsRef} className="section-padding">
        <div className="container-width">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-xl text-dark-300 max-w-3xl mx-auto">
                Explore some of my recent work and the technologies I've used to bring ideas to life
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group cursor-pointer transition-all duration-1000 delay-${index * 200} ${
                    isVisible ? 'animate-scale-in' : 'opacity-0 scale-90'
                  }`}
                  onClick={() => openModal(project)}
                >
                  <div className="card group-hover:transform group-hover:scale-105 group-hover:shadow-2xl overflow-hidden">
                    {/* Project Image */}
                    <div className="relative overflow-hidden rounded-lg mb-6 bg-dark-950 h-48 flex items-center justify-center">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          // Fallback to a placeholder if image fails to load
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMxZTI5M2IiLz48dGV4dCB4PSIyMDAiIHk9IjEwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY0NzQ4YiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij5Qcm9qZWN0IEltYWdlPC90ZXh0Pjwvc3ZnPg=='
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-primary-600/90 text-white text-sm rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-dark-300 mb-4 line-clamp-2">
                        {project.shortDescription}
                      </p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-dark-700 text-dark-200 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="px-2 py-1 bg-dark-700 text-dark-200 rounded text-xs">
                            +{project.tech.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between items-center">
                        <span className="text-primary-400 font-medium group-hover:underline">
                          View Case Study →
                        </span>
                        <div className="flex space-x-2">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 text-dark-400 hover:text-primary-400 transition-colors duration-300"
                          >
                            <ExternalLink size={16} />
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 text-dark-400 hover:text-primary-400 transition-colors duration-300"
                          >
                            <Github size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Projects */}
            <div className="text-center mt-12">
              <p className="text-dark-400">
                Want to see more? Check out my{' '}
                <a
                  href="https://github.com/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:underline"
                >
                  GitHub profile
                </a>{' '}
                for additional projects and contributions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-dark-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-dark-800 p-6 border-b border-dark-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold gradient-text">{selectedProject.title}</h2>
              <button
                onClick={closeModal}
                className="p-2 text-dark-400 hover:text-white transition-colors duration-300"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* Image Gallery */}
              <div className="relative mb-6 bg-dark-950 rounded-lg p-4">
                <div className="flex justify-center items-center min-h-64 md:min-h-96">
                  <img
                    src={selectedProject.gallery[currentImageIndex]}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="max-w-full max-h-96 md:max-h-[500px] object-contain rounded-lg shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMxZTI5M2IiLz48dGV4dCB4PSIyMDAiIHk9IjEwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY0NzQ4YiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij5Qcm9qZWN0IEltYWdlPC90ZXh0Pjwvc3ZnPg=='
                    }}
                  />
                </div>
                {selectedProject.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 p-3 bg-black/80 border border-primary-500/30 text-white rounded-full hover:bg-primary-600 hover:border-primary-500 transition-all duration-300 z-10"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-black/80 border border-primary-500/30 text-white rounded-full hover:bg-primary-600 hover:border-primary-500 transition-all duration-300 z-10"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                {selectedProject.gallery.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 px-3 py-1 rounded-full text-sm text-white border border-primary-500/30">
                    {currentImageIndex + 1} / {selectedProject.gallery.length}
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold mb-4 text-primary-400">Overview</h3>
                  <p className="text-dark-200 mb-6">{selectedProject.caseStudy.overview}</p>

                  <h3 className="text-xl font-semibold mb-4 text-primary-400">Challenge</h3>
                  <p className="text-dark-200 mb-6">{selectedProject.caseStudy.challenge}</p>

                  <h3 className="text-xl font-semibold mb-4 text-primary-400">Solution</h3>
                  <p className="text-dark-200 mb-6">{selectedProject.caseStudy.solution}</p>

                  <h3 className="text-xl font-semibold mb-4 text-primary-400">Key Features</h3>
                  <ul className="space-y-2 mb-6">
                    {selectedProject.caseStudy.features.map((feature, index) => (
                      <li key={index} className="text-dark-200 flex items-start">
                        <span className="text-primary-500 mr-3 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold mb-4 text-primary-400">Results</h3>
                  <p className="text-dark-200">{selectedProject.caseStudy.results}</p>
                </div>

                <div>
                  {/* Project Info */}
                  <div className="card">
                    <h3 className="text-lg font-semibold mb-4 text-primary-400">Project Info</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-dark-400">Category:</span>
                        <span className="text-dark-200 ml-2">{selectedProject.category}</span>
                      </div>
                      <div>
                        <span className="text-dark-400">Year:</span>
                        <span className="text-dark-200 ml-2">{selectedProject.year}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-md font-semibold mb-3 text-primary-400">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-dark-700 text-dark-200 rounded text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col space-y-3">
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-center"
                      >
                        <ExternalLink size={16} className="inline mr-2" />
                        Live Demo
                      </a>
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-center"
                      >
                        <Github size={16} className="inline mr-2" />
                        Source Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Projects 