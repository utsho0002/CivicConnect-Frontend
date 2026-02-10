import React from 'react';
import Banner from '../Components/Home/Banner';
import FeaturedSection from '../Components/Home/FeaturedSection';
import ContactUs from '../Components/Home/ContactUs';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <FeaturedSection></FeaturedSection>
           <ContactUs></ContactUs>
        </div>
    );
};

export default Home;