import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import NotificationSection from "./components/NotificationSection"
import AppStatsSection from "./components/AppStatsSection"
import ProductsSection from "./components/ProductsSection"
import CtaSection from "./components/CtaSection"
import Footer from "./components/Footer"

export default function Page() {
  return (
    <main>
      <Header />
      <HeroSection />
      <NotificationSection />
      <AppStatsSection />
      <ProductsSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
