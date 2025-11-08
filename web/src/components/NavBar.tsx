import { motion } from "framer-motion";

interface NavBarProps {
  onStartPurchase: () => void;
}

const NavBar = ({ onStartPurchase }: NavBarProps) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/40 border-b border-white/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand via-brand-accent to-brand-light" />
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-white/60">S1lents</p>
            <p className="text-lg font-semibold">Custom Discord Bots</p>
          </div>
        </motion.div>

        <motion.nav
          className="flex items-center gap-4 text-sm font-medium"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <a href="#features" className="text-white/70 hover:text-white transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-white/70 hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#process" className="text-white/70 hover:text-white transition-colors">
            Process
          </a>
          <a href="#reviews" className="text-white/70 hover:text-white transition-colors">
            Reviews
          </a>
          <motion.button
            className="rounded-full bg-brand px-5 py-2 font-semibold shadow-lg shadow-brand/30 hover:bg-brand-accent transition-colors"
            whileTap={{ scale: 0.97 }}
            onClick={onStartPurchase}
          >
            Purchase
          </motion.button>
        </motion.nav>
      </div>
    </header>
  );
};

export default NavBar;

