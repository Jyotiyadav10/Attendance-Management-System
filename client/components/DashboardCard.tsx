interface DashboardCardProps {
  title: string;
  value: string | number;
}

export default function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
      <h2 className="text-gray-500 text-sm font-medium">
        {title}
      </h2>

      <p className="text-4xl font-bold text-slate-800 mt-3">
        {value}
      </p>
    </div>
  );
}