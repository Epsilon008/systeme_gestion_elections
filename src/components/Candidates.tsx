import React from 'react';
import { Candidate } from '../types';

const CandidateStats: React.FC<{ candidates: Candidate[], totalVotes: number }> = ({ candidates, totalVotes }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {candidates.map((candidate) => (
        <div key={candidate.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
          <img 
            src={candidate.photo} 
            alt={candidate.name} 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-medium">{candidate.name}</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="h-2.5 rounded-full" 
                style={{
                  width: `${(candidate.votes / totalVotes * 100).toFixed(1)}%`,
                  backgroundColor: candidate.color
                }}
              />
            </div>
            <span className="text-sm text-gray-600">
              {((candidate.votes / totalVotes) * 100).toFixed(1)}% ({candidate.votes.toLocaleString()} votes)
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateStats;
