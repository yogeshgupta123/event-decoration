import AddonsSlider from '../components/home/AddonsSlider'
import BlogSection from '../components/home/BlogSection'
import CategorySlider from '../components/home/CategorySlider'
import CtaBanner from '../components/home/CtaBanner'
import FAQ from '../components/home/FAQ'
import Gallery from '../components/home/Gallery'
import Hero from '../components/home/Hero'
import Occasions from '../components/home/Occasions'
import PlanningSection from '../components/home/PlanningSection'
import StatsBar from '../components/home/StatsBar'
import Testimonials from '../components/home/Testimonials'
import TrendingPackages from '../components/home/TrendingPackages'
import VendorNetwork from '../components/home/VendorNetwork'
import WhyChooseUs from '../components/home/WhyChooseUs'

function Home() {
  return (
    <div>
      <Hero />
      <StatsBar/>
      <Occasions/>
      <CategorySlider/>
      <TrendingPackages/>
      <PlanningSection/>
      <WhyChooseUs/>
      <VendorNetwork/>
      <Testimonials/>
      <FAQ/>
      <Gallery/>
      <AddonsSlider/>
      <BlogSection/>
      <CtaBanner/>
    </div>
  )
}

export default Home