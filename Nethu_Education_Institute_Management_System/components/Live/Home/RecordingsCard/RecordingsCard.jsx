"use client";

import React from "react";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";

const RecordingsCard = () => {
  const router = useRouter();

  return (
    <div 
      className="bg-yellow-500 rounded-xl p-6 md:p-8 cursor-pointer hover:bg-yellow-600 transition-colors"
      onClick={() => router.push('/Live/recordings')}
    >
      <div className="bg-white/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
        <Video className="w-8 h-8" />
      </div>
      <h3 className="text-xl md:text-2xl font-semibold mb-3">
        View Recordings
      </h3>
      <p className="text-base text-white/80">Meeting Recordings</p>
    </div>
  );
};

export default RecordingsCard;