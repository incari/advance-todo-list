const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="fixed h-16 bg-[#61dafbaa] w-full flex items-center justify-center left-0">
        <div className="text-xl font-bold text-white">My Todo app</div>
      </header>
      <main className="pt-16">{children}</main>
    </>
  );
};
export default Layout;
