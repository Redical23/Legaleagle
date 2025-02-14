import React from 'react';
import { Scale, Users } from 'lucide-react';

function CaseCard() {
  return (
    <div className="card w-[400px] h-[300px] perspective-1000">
      <div className="card-inner relative w-full h-full transition-transform duration-1000 transform-style-preserve-3d hover:rotate-y-180">
        <div className="card-front absolute w-full h-full backface-hidden rounded-xl bg-indigo-700 text-white p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Case Details</h2>
          </div>
          
          <div className="space-y-2">
            <p className="text-lg">Count No: 01</p>
            <p className="text-lg">Case Type: Criminal Misc. Bail</p>
            <p className="text-lg">Application No: 000057</p>
          </div>
          
          <p className="text-sm text-indigo-200">Hover to see parties involved</p>
        </div>
        
        <div className="card-back absolute w-full h-full backface-hidden rounded-xl bg-orange-600 text-white p-6 rotate-y-180">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Parties Involved</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-orange-200 font-semibold">Applicant</h3>
              <p className="text-lg">Ram Singh</p>
            </div>
            
            <div>
              <h3 className="text-orange-200 font-semibold">Opposition Party</h3>
              <ul className="list-disc list-inside">
                <li className="text-lg">Akash</li>
                <li className="text-lg">Piyush</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaseCardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <CaseCard />
    </div>
  );
}
