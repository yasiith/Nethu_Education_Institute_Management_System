'use client';

export default function Error({ error }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg text-red-600">Error: {error.message}</p>
    </div>
  );
}
