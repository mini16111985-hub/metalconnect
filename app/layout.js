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
              <a href="/contact" className="hover:text-slate-600">
                Contact
              </a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="border-t bg-white">
          <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-500">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                © 2026 MetalConnect. Independent industrial platform connecting Croatian manufacturers with European buyers.
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="/contact" className="hover:text-slate-700">
                  Contact
                </a>
                <a href="/privacy" className="hover:text-slate-700">
                  Privacy
                </a>
                <a href="/terms" className="hover:text-slate-700">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}