export const Layout = ({ children }) => {
  return (
    <main className="min-h-[calc(100%-100px)] max-w-screen overflow-x-hidden bg-background mt-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </main>
  );
};
