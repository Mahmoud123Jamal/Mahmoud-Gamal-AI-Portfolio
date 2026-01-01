export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-black z-50">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-blue-100 dark:border-blue-900/30"></div>

        <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>

      {/* Optional Brand Text */}
      <h2 className="mt-6 text-blue-600 font-black tracking-widest uppercase text-sm animate-pulse">
        Mahmoud Ghoraba
      </h2>
    </div>
  );
}
