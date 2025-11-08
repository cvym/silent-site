import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import NavBar from "./components/NavBar";
import HeroSection from "./sections/Hero";
import FeaturesSection from "./sections/Features";
import PricingSection from "./sections/Pricing";
import HostingSection from "./sections/Hosting";
import ProcessSection from "./sections/Process";
import ReviewsSection from "./sections/Reviews";
import CTASection from "./sections/CTA";
import Footer from "./sections/Footer";
import PurchaseDialog from "./components/PurchaseDialog";
import ThankYouPage from "./pages/ThankYou";

function App() {
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [path, setPath] = useState(() =>
    typeof window !== "undefined" ? window.location.pathname : "/",
  );

  useEffect(() => {
    const handlePopState = () => {
      setPath(typeof window !== "undefined" ? window.location.pathname : "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  if (path.startsWith("/thank-you")) {
    return <ThankYouPage />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar onStartPurchase={() => setPurchaseOpen(true)} />
      <main className="flex-1">
        <HeroSection onStartPurchase={() => setPurchaseOpen(true)} />
        <FeaturesSection />
        <PricingSection onStartPurchase={() => setPurchaseOpen(true)} />
        <HostingSection onStartPurchase={() => setPurchaseOpen(true)} />
        <ProcessSection />
        <ReviewsSection />
        <CTASection onStartPurchase={() => setPurchaseOpen(true)} />
      </main>
      <Footer />

      <AnimatePresence>
        {purchaseOpen && <PurchaseDialog onClose={() => setPurchaseOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;

