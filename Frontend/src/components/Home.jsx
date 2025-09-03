// // 


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animated, setAnimated] = useState(false);
  
  // Sample bus images for carousel - FIXED: Removed spaces from URLs
  const busImages = [
    "https://cdn.britannica.com/27/242227-050-48358A10/Mysore-Palace-Mysuru-Karnataka-India.jpg",
    "https://images.picxy.com/cache/2018/7/19/40fde17d2cab936b9b692fc3e1b203f9.jpg",
    "https://images.squarespace-cdn.com/content/v1/6298cb774cf3830bc9b342bf/f22b252a-48a9-486f-896b-d86914361f45/alleppey-backwaters-canal-1.jpg",
    "https://vijayawadatourism.com/images/places-to-visit/headers/prakasam-barrage-vijayawada-entry-fee-timings-holidays-reviews-header.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/1200px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
    "https://images.squarespace-cdn.com/content/v1/6298cb774cf3830bc9b342bf/f22b252a-48a9-486f-896b-d86914361f45/alleppey-backwaters-canal-1.jpg",
  ];

  // Sample reviews
  const reviews = [
    { name: "Sarah Johnson", rating: 5, comment: "The most comfortable bus journey I've ever experienced. Will definitely travel with DreamBus again!" },
    { name: "Michael Chen", rating: 5, comment: "Excellent service, punctual departures, and very friendly staff. Highly recommended!" },
    { name: "Emma Williams", rating: 4, comment: "Clean buses and smooth ride. The entertainment system could be better but overall great experience." },
    { name: "David Miller", rating: 5, comment: "Affordable prices with premium comfort. The seats are incredibly comfortable for long journeys." }
  ];

  // Travel questions for the hero section
  const travelQuestions = [
    "Ready for your next adventure?",
    "Where will your journey take you?",
    "Dreaming of new destinations?",
    "Ready to explore the world?"
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Auto-rotate carousel and questions
  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % busImages.length);
    }, 4000);
    
    const questionTimer = setInterval(() => {
      setCurrentQuestion((prev) => (prev + 1) % travelQuestions.length);
    }, 3000);
    
    // Trigger animations after component mounts
    setAnimated(true);
    
    return () => {
      clearInterval(carouselTimer);
      clearInterval(questionTimer);
    };
  }, []);

  // Render star ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Animated Background */}
      
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-purple-600">
        {/* Animated elements in background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-yellow-400 bg-opacity-20 rounded-full animate-bounce delay-700"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-green-400 bg-opacity-15 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-red-400 bg-opacity-10 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 transform transition-all duration-1000 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Journey with <span className="text-yellow-300">Dreams</span>
          </h1>
          
          <div className="h-20 mb-8 overflow-hidden">
            <div 
              className="transform transition-all duration-1000 ease-in-out"
              style={{ transform: `translateY(-${currentQuestion * 100}%)` }}
            >
              {travelQuestions.map((question, index) => (
                <p key={index} className="text-xl md:text-2xl font-light">
                  {question}
                </p>
              ))}
            </div>
          </div>
          
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Discover the joy of travel with our comfortable, affordable, and reliable bus services. 
            Your next adventure is just a ride away.
          </p>
          
          <div className={`transform transition-all duration-1000 delay-500 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link to="/buslist"> {/* FIXED: Changed to correct route */}
              <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Explore Our Routes
              </button>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Bus Fleet Carousel Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Premium Fleet</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our modern, comfortable buses equipped with the latest amenities for your journey
            </p>
          </div>
          
          <div className="relative overflow-hidden rounded-xl shadow-2xl max-w-6xl mx-auto">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {busImages.map((img, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img src={img} alt={`Bus ${index + 1}`} className="w-full h-96 object-cover" />
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {busImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-white'}`}
                  onClick={() => setCurrentSlide(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Travel Questions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about traveling with DreamBus</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">How far in advance should I book my ticket?</h3>
              <p className="text-gray-700">
                We recommend booking at least 3-5 days in advance for the best prices and seat selection, especially during peak travel seasons.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-green-800 mb-3">What amenities are available on your buses?</h3>
              <p className="text-gray-700">
                Our buses feature comfortable reclining seats, air conditioning, free WiFi, charging ports, and onboard restrooms for your convenience.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">Can I change or cancel my booking?</h3>
              <p className="text-gray-700">
                Yes, you can modify or cancel your booking up to 24 hours before departure. Some fees may apply depending on the fare type.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Are your buses accessible for passengers with disabilities?</h3>
              <p className="text-gray-700">
                Absolutely! We offer accessible buses with wheelchair lifts and priority seating. Please notify us in advance so we can ensure a comfortable journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="About DreamBus" 
                className="rounded-xl shadow-xl w-full h-96 object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose DreamBus?</h2>
              <p className="text-lg text-gray-600 mb-6">
                At DreamBus, we believe that journey should be as memorable as the destination. 
                Since 2010, we've been providing safe, comfortable, and affordable bus travel 
                experiences to thousands of passengers across the country.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our modern fleet of buses is equipped with comfortable seating, air conditioning, 
                free WiFi, and entertainment systems to make your journey enjoyable. Our professional 
                drivers are trained to prioritize your safety and comfort above all else.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <span className="font-semibold">Safe Travel</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                    </svg>
                  </div>
                  <span className="font-semibold">Free WiFi</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 01118 0z"></path>
                    </svg>
                  </div>
                  <span className="font-semibold">Comfortable</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <span className="font-semibold">Punctual</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Passengers Say</h2>
            <p className="text-xl text-gray-600">Don't just take our word for it - hear from our satisfied customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="flex mb-4">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-600 italic mb-4">"{review.comment}"</p>
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-800 rounded-full h-10 w-10 flex items-center justify-center font-bold mr-3">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-gray-800">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DreamBus</h3>
              <p className="text-gray-400 mb-4">Travel with comfort and dreams. Your journey is our priority.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.630c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.630zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.350.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.350.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.350-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors duration-300">Services</a></li>
                <li><Link to="/buslist" className="text-gray-400 hover:text-white transition-colors duration-300">Routes</Link></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Popular Routes</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">New York to Boston</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Los Angeles to San Francisco</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Chicago to Detroit</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Miami to Orlando</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Seattle to Portland</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  123 Travel Street, City, Country
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  +1 234 567 8900
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  info@dreambus.com
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} DreamBus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;






