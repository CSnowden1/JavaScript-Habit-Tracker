import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function ProgressBar({ habits}) {
    return (
        <div className="progress-bar">
          <BarChart width={50} height={50} data={habits}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="gold" />
          </BarChart>
        </div>
      );
}
