import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function ProgressBar({ habits }) {
  return (
    <div className="progress-bar">
      <BarChart width={100} height={50} data={habits}>
        <XAxis dataKey="key" />
        <YAxis dataKey="count" />
        <Tooltip />
        <Bar dataKey="id" fill="gold" barSize={30} />
      </BarChart>
    </div>
  );
}
