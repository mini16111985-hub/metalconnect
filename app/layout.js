import "./globals.css";

export const metadata = {
  title: "MetalConnect",
  description: "Connecting Croatian manufacturers with European buyers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div>
              <a href="/" className="text-2xl font-bold tracking-tight">
                MetalConnect
              </a>
              <div className="text-sm text-slate-600">
                Connecting Croatian manufacturers with European buyers
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm md:flex">
              <a href="/about" className="hover:text-slate-600">
                About
              </a>
              <a href="/companies" className="hover:text-slate-600">
                Directory
              </a>
              <a href="/articles" className="hover:text-slate-600">
                Articles
              </a>
              <a href="/buyers" className="hover:text-slate-600">
                For Buyers
              </a>
              <a href="/manufacturers" className="hover:text-slate-600">
                For Manufacturers
              </a>
              <a href="/advertise" className="hover:text-slate-600">
                Advertise
              </a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="border-t bg-white">
          <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-500">
            © 2026 MetalConnect. Independent industrial platform connecting Croatian manufacturers with European buyers.
          </div>
        </footer>
      </body>
    </html>
  );
}