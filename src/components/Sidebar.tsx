import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function Sidebar({ candidates, totalVotes }: { candidates: any; totalVotes: number }) {
  const pieData = {
    labels: candidates.map((c: any) => c.name),
    datasets: [
      {
        data: candidates.map((c: any) => c.votes),
        backgroundColor: candidates.map((c: any) => c.color),
      },
    ],
  };

  return (
    <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Statistiques</h2>
      <div className="mb-4">
        <Pie data={pieData} />
      </div>
      <ul>
        {candidates.map((candidate: any) => (
          <li key={candidate.id} className="flex items-center space-x-2">
            <img src={candidate.photo || '/placeholder.png'} alt={candidate.name} className="w-8 h-8 rounded-full" />
            <span>{candidate.name}</span>
            <span className="ml-auto text-gray-600">{candidate.votes.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
