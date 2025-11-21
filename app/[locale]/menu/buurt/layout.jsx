export default function BuurtLayout({ children }) {
  return (
    <div className="mt-8 px-4 text-white max-sm:mt-4 max-md:mt-4">
      <div className="flex justify-center border-b-2 text-2xl font-semibold tracking-wide">
        <div className="px-4 pb-4">Buurtteam Staatsliedenbuurt</div>
      </div>
             <main>{children}</main>
    </div>
  );
}
