import NavBar from "../../components/NavBar/NavBar"
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";

import Category from "../../components/Category/Category"
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <Category/>
      <FeaturedProducts/>
      <WhyChooseUs/>
      <Footer />
     
    </>
  );
}

export default Home;