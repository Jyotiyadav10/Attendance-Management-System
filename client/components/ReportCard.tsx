"use client";

import { IconType } from "react-icons";

interface Props {
  title: string;
  value: number | string;
  icon: IconType;
  color: string;
}

export default function ReportCard({
  title,
  value,
  icon: Icon,
  color,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition">
      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mt-2">
          {value}
        </h2>
      </div>

      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center ${color}`}
      >
        <Icon className="text-white text-3xl" />
      </div>
    </div>
  );
}