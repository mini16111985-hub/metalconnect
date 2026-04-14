import "./globals.css";

export const metadata = {
  title: "MetalConnect",
  description: "Connecting European buyers with Croatian manufacturers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="min-w-0">
              <a
                href="/"
                className="inline-block text-2xl font-bold tracking-tight text-slate-950 transition hover:text-blue-900"
              >
                MetalConnect
              </a>

              <div className="mt-1 text-sm font-medium text-slate-500">
                Connecting European buyers with Croatian manufacturers
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
              <a href="/about" className="text-slate-700 transition hover:text-blue-900">
                About
              </a>
              <a href="/companies" className="text-slate-700 transition hover:text-blue-900">
                Directory
              </a>
              <a href="/articles" className="text-slate-700 transition hover:text-blue-900">
                Articles
              </a>
              <a href="/buyers" className="text-slate-700 transition hover:text-blue-900">
                For Buyers
              </a>
              <a href="/manufacturers" className="text-slate-700 transition hover:text-blue-900">
                For Manufacturers
              </a>
              <a href="/advertise" className="text-slate-700 transition hover:text-blue-900">
                Advertise
              </a>
              <a href="/contact" className="text-slate-700 transition hover:text-blue-900">
                Contact
              </a>
            </nav>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />
        </header>

        {children}

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-500">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                © 2026 MetalConnect. Connecting European buyers with Croatian manufacturers.
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="/contact" className="transition hover:text-blue-900">
                  Contact
                </a>
                <a href="/privacy" className="transition hover:text-blue-900">
                  Privacy
                </a>
                <a href="/terms" className="transition hover:text-blue-900">
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