const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/40 py-10 text-sm text-white/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} S1lents. Custom Discord bots & hosting.</p>
        <div className="flex gap-4">
          <a href="mailto:contact@s1lents.dev" className="hover:text-white transition">
            contact@s1lents.dev
          </a>
          <a href="https://discord.gg/your-server" className="hover:text-white transition">
            Discord
          </a>
          <a href="https://github.com" className="hover:text-white transition">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

