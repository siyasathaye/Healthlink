export default function Footer() {
  return (
    <footer className="mt-20 border-t border-blue-900/40 backdrop-blur-xl bg-[#0b1c36]/80">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* LOGO + CONTACT */}
        <div>
          <div className="p-4 w-fit mb-6">
            <img
              src="/logo.png"
              alt="HealthLink logo"
              className="w-40 brightness-200 contrast-150"
            />
          </div>

          <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-neutral-300">healthlink@ucsd.edu</p>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2 text-neutral-300">
            <li>healthlink@ucsd.edu</li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Resources</h3>
          <ul className="space-y-2 text-neutral-300">
            <li>
              <a href="https://instagram.com" className="hover:text-blue-300">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://discord.gg" className="hover:text-blue-300">
                Discord
              </a>
            </li>
          </ul>
        </div>

        {/* ABOUT */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">About</h3>
          <ul className="space-y-2 text-neutral-300">
            <li>
              <a href="/terms" className="hover:text-blue-300">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-blue-300">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-900/40 py-6 text-center text-neutral-500 text-sm">
        © {new Date().getFullYear()} HealthLink UCSD. All rights reserved.
      </div>
    </footer>
  );
}
