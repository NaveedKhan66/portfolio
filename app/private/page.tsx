'use client'

import { useEffect, useState } from 'react'
import { Lock, Shield, Eye, Github, ExternalLink, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const PrivatePage = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-scale-in' : 'opacity-0 scale-90'}`}>
          {/* Icon */}
          <div className="mb-8">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-neon-purple p-1 animate-pulse">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <Shield size={40} className="text-primary-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Private Repository</span>
          </h1>
          
          <div className="space-y-6 mb-8">
            <p className="text-xl text-dark-300 leading-relaxed">
              This project is part of my professional work at a company and contains proprietary code and sensitive business logic.
            </p>
            
            <div className="card max-w-lg mx-auto">
              <div className="flex items-start space-x-4">
                <Lock className="text-primary-400 mt-1 flex-shrink-0" size={20} />
                <div className="text-left">
                  <h3 className="font-semibold text-primary-400 mb-2">Why is this private?</h3>
                  <ul className="text-dark-300 space-y-1 text-sm">
                    <li>• Contains proprietary business logic</li>
                    <li>• Includes sensitive API integrations</li>
                    <li>• Protected by company confidentiality agreements</li>
                    <li>• Part of commercial enterprise solutions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card max-w-lg mx-auto">
              <div className="flex items-start space-x-4">
                <Eye className="text-primary-400 mt-1 flex-shrink-0" size={20} />
                <div className="text-left">
                  <h3 className="font-semibold text-primary-400 mb-2">What I can share:</h3>
                  <ul className="text-dark-300 space-y-1 text-sm">
                    <li>• Technical challenges and solutions</li>
                    <li>• Technologies and frameworks used</li>
                    <li>• Architecture and design patterns</li>
                    <li>• Results and impact achieved</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/#projects" className="btn-primary w-full sm:w-auto">
              <ArrowLeft size={16} className="mr-2" />
              Back to Projects
            </Link>
            <Link href="/#contact" className="btn-secondary w-full sm:w-auto">
              Discuss This Project
            </Link>
          </div>

          {/* Note */}
          <div className="border-t border-dark-700 pt-6">
            <p className="text-sm text-dark-400">
              <strong className="text-primary-400">Note:</strong> I'm happy to discuss the technical aspects, 
              challenges, and solutions of this project in detail during an interview or consultation. 
              Please feel free to reach out if you'd like to learn more about my contributions and the impact achieved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivatePage