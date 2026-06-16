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
import TrustBar from '../components/home/TrustBar'

import Testimonials from '../components/home/Testimonials'
import TrendingPackages from '../components/home/TrendingPackages'
import WhyChooseUs from '../components/home/WhyChooseUs'
// import OccasionShop from '../components/home/OccasionShop'
// import BestSelling from '../components/home/BestSelling'
import FlowerPicker from '../components/home/FlowerPicker'
import PersonaliseSection from '../components/home/PersonaliseSection'
import FeaturedExperiences from '../components/home/FeaturedExperiences'
import QuickCategories from '../components/home/QuickCategories'
import ComboDeals from '../components/home/ComboDeals'

function Home() {
  return (
    <div>
      <Hero />
      <QuickCategories/>
      <StatsBar/>
       <TrustBar />
      <Occasions/>
      <FeaturedExperiences/>
      <ComboDeals/>
      {/* <OccasionShop/> */}
      {/* <BestSelling/> */}
      <FlowerPicker/>
      <PersonaliseSection/>

      <CategorySlider/>
      <TrendingPackages/>
      <PlanningSection/>
      <WhyChooseUs/>
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