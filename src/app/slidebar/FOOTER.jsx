'use client'
import React from 'react';
import Image from 'next/image'
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import loge2 from '../IMAGES/properaidpic.png'


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 text-sm">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-white mb-4">ProperAid</h3>
          <p className="mb-4">Your trusted partner in legal solutions. Connecting you with top-tier lawyers for all your legal needs.</p>
          <p>&copy; {new Date().getFullYear()} ProperAid. All Rights Reserved.</p>
        </div>
        
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold text-white mb-4">Practice Areas</h4>
          <nav className="space-y-2">
            <a href="#" className="block hover:text-white transition-colors">Corporate Law</a>
            <a href="#" className="block hover:text-white transition-colors">Intellectual Property</a>
            <a href="#" className="block hover:text-white transition-colors">Civil Litigation</a>
            <a href="#" className="block hover:text-white transition-colors">Criminal Defense</a>
            <a href="#" className="block hover:text-white transition-colors">Family Law</a>
          </nav>
        </div>
        
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <nav className="space-y-2">
            <a href="#" className="block hover:text-white transition-colors">Find a Lawyer</a>
            <a href="#" className="block hover:text-white transition-colors">Join Our Network</a>
            <a href="#" className="block hover:text-white transition-colors">About Us</a>
            <a href="#" className="block hover:text-white transition-colors">FAQ</a>
            <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
          </nav>
        </div>
        
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
          <div className="space-y-2">
            <p className="flex items-center justify-center md:justify-start">
              <Mail size={18} className="mr-2" /> info@ProperAid.com
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <Phone size={18} className="mr-2" /> (555) 123-4567
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <MapPin size={18} className="mr-2" /> 123 Legal Street, Suite 100, Lawville, LW 12345
            </p>
          </div>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <SocialIcon href="#" aria-label="Facebook">
              <Facebook size={18} />
            </SocialIcon>
            <SocialIcon href="#" aria-label="Twitter">
              <Twitter size={18} />
            </SocialIcon>
            <SocialIcon href="#" aria-label="LinkedIn">
              <Linkedin size={18} />
            </SocialIcon>
            <SocialIcon href="#" aria-label="Instagram">
              <Instagram size={18} />
            </SocialIcon>
            <SocialIcon href="#" aria-label="YouTube">
              <Youtube size={18} />
            </SocialIcon>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center">
        <p>ProperAid is a lawyer referral service. We do not provide legal advice or representation.</p>
      </div>
    </div>
  </footer>
)
}

const SocialIcon = ({ href, children, ...props }) => (
<a href={href} className="bg-gray-700 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors" {...props}>
  {children}
</a>
)
export default Footer