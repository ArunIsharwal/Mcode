export default function PageContainer({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center">
      <div className="w-full max-w-md p-6 space-y-6">
        {children}
      </div>
    </div>
  );
}
