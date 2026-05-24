import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/ChatGPT Image Jun 16, 2025, 11_22_12 AM_1750088538557.png";
import headerLogoImage from "@assets/image_1750091632559.png";
import keyFoodDemoImage from "@assets/image_1750201789093.png";
import customerPhoneImage from "@assets/ChatGPT Image Jun 17, 2025, 10_44_54 PM_1750214731570.png";
import howItWorksImage from "@assets/ChatGPT Image Jun 17, 2025, 11_01_16 PM_1750216030691.png";
import advertiserImage from "@assets/ChatGPT Image Jun 17, 2025, 11_19_47 PM_1750216912862.png";
import {
  DollarSign,
  Store,
  Smartphone,
  TrendingUp,
  Calendar,
  Play,
  Mail,
  Menu,
  X,
  Quote,
  RefreshCw,
  Heart
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

function scrollToSectionWithHeaderOffset(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  const headerEl = document.querySelector('header');
  const headerHeight = headerEl?.getBoundingClientRect().height ?? 64;
  const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

function AnimatedSection({ children, animation = fadeInUp, delay = 0, className }: {
  children: React.ReactNode;
  animation?: any;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animation}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    scrollToSectionWithHeaderOffset(id);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'retailers', label: 'Retailers' },
    { id: 'advertisers', label: 'Advertisers' },
    { id: 'how-it-works', label: 'How it Works' },
    { id: 'demo', label: 'Demo' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src={headerLogoImage}
              alt="ThankYouDeals.com Logo"
              className="h-10 w-auto"
            />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`header-${link.id}`}
                onClick={() => scrollToSection(link.id)}
                className="text-black hover:text-gray-700 font-semibold transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              id="header-contact"
              onClick={() => scrollToSection('contact')}
              className="bg-brand-yellow text-white hover:bg-yellow-600 transition-colors font-medium"
            >
              Contact Us
            </Button>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-black hover:text-gray-700 font-semibold transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-brand-yellow text-white hover:bg-yellow-600 transition-colors font-medium w-full"
              >
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function HeroSection() {
  const scrollToSection = scrollToSectionWithHeaderOffset;

  return (
    <section className="bg-gradient-to-br from-light-yellow via-white to-soft-blue py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation={fadeIn} className="min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8">
              <img
                src={logoImage}
                alt="ThankYouDeals.com Logo"
                className="h-12 sm:h-16 lg:h-20 w-auto flex-shrink-0"
              />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight break-words min-w-0">
                Turn Every Transaction into a{" "}
                <span className="brand-yellow">Thank You</span>—and{" "}
                <span className="brand-green">More Revenue</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our post-purchase deal platform helps retailers reward customers, drive repeat visits, and generate new revenue from advertiser offers that we source and curate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                id="body-retailers"
                onClick={() => scrollToSection('retailers')}
                className="bg-brand-yellow text-white px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                size="lg"
              >
                <Store className="mr-2 h-5 w-5" />
                For Retailers
              </Button>
              <Button 
                id="body-advertisers"
                onClick={() => scrollToSection('advertisers')}
                className="bg-brand-green text-white px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                size="lg"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                For Advertisers
              </Button>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation={slideInRight}>
            <div className="rounded-2xl shadow-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Happy shopper using mobile app in store" 
                className="w-full h-auto"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function RetailerSection() {
  const scrollToSection = scrollToSectionWithHeaderOffset;

  return (
    <section id="retailers" className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">For Supermarkets &amp; Retailers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Turn every checkout into a customer retention opportunity while generating new revenue streams.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <AnimatedSection delay={0}>
            <div className="h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-brand-yellow rounded-xl flex items-center justify-center mb-5 shadow-md">
                <DollarSign className="text-white h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Monetize Every Checkout</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn new revenue from curated advertiser offers we source and place inside your post-purchase
                experience — no extra work at the register.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-brand-green rounded-xl flex items-center justify-center mb-5 shadow-md">
                <RefreshCw className="text-white h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Drive Repeat Visits</h3>
              <p className="text-gray-600 leading-relaxed">
                Pair your weekly deals with timely offers so shoppers come back sooner and spend more on their
                next trip to your store.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-brand-orange rounded-xl flex items-center justify-center mb-5 shadow-md">
                <Heart className="text-white h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Create Loyalty</h3>
              <p className="text-gray-600 leading-relaxed">
                Reward customers in the moment they're happiest — right after they've checked out — with a
                fully branded experience that strengthens your relationship.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const scrollToSection = scrollToSectionWithHeaderOffset;

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">More Revenue. More Repeat Visits.</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to turn everyday shoppers into loyal, high-value customers.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation={fadeIn} className="min-w-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">How it Works</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Customer transacts at the register and receives a Text message</h4>
                  <p className="text-gray-600">Your POS sends a "Thank You for your purchase" SMS with a link to a custom mobile page built by ThankYouDeals.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Customer Visits Your Branded Page</h4>
                  <p className="text-gray-600">Shoppers are directed to a store-branded web page that highlights your weekly deals alongside complementary advertiser offers we've secured for you.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Earn revenue from Advertising and return store visits</h4>
                  <p className="text-gray-600">Earn revenue from advertiser partnerships while customers enjoy valuable deals that reinforce their positive shopping experience and drive repeat store visits with your store deals.</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-brand-yellow text-white px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                size="lg"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Demo
              </Button>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation={slideInRight}>
            <div className="rounded-xl shadow-2xl overflow-hidden">
              <img 
                src={howItWorksImage} 
                alt="Happy customer smiling while looking at phone after shopping" 
                className="w-full h-auto"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function AdvertiserSection() {
  const scrollToSection = scrollToSectionWithHeaderOffset;

  return (
    <section id="advertisers" className="py-16 lg:py-24 bg-gradient-to-br from-mint via-white to-soft-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">For Advertisers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reach high-intent customers at the perfect moment - right after they've made a purchase.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedSection animation={fadeIn} className="min-w-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Post-Transaction Moments Matter</h3>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center">
                    <TrendingUp className="text-white text-lg" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">High-Intent Audience</h4>
                </div>
                <p className="text-gray-600">Connect with consumers who are already in a buying mindset, increasing the likelihood of engagement and conversion.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center">
                    <Smartphone className="text-white text-lg" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Peak Engagement</h4>
                </div>
                <p className="text-gray-600">Reach customers during the transaction moment when they're most receptive to relevant offers and deals.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center">
                    <DollarSign className="text-white text-lg" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Qualified Traffic</h4>
                </div>
                <p className="text-gray-600">Your offers reach shoppers who have just demonstrated purchasing power and intent.</p>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation={slideInRight}>
            <div className="rounded-xl shadow-2xl overflow-hidden">
              <img 
                src={advertiserImage} 
                alt="Happy customer using phone at grocery store checkout with cashier" 
                className="w-full h-auto"
              />
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <div id="demo" className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">See Your Offers in Action</h3>
              <p className="text-lg text-gray-600">
                Experience how your brand appears on our platform with this live example
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <a 
                  id="body-live-example"
                  href="https://keyfood101-junex-juney.thankyoudeals.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border-4 border-brand-yellow">
                    <img 
                      src={keyFoodDemoImage} 
                      alt="KeyFood ThankYouDeals demo experience" 
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center shadow-xl">
                          <Play className="text-white text-xl ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button 
                id="body-partner"
                onClick={() => scrollToSection('contact')}
                className="bg-brand-green text-white px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                size="lg"
              >
                <Mail className="mr-2 h-5 w-5" />
                Partner With Us
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}



function FeaturesSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Monetize Every Transaction",
      description: "Unlock a powerful new income stream by delivering sponsored offers to shoppers immediately after checkout—transforming everyday transactions into a high-margin revenue channel.",
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: TrendingUp,
      title: "Drive Return Visits That Grow Sales",
      description: "Keep your store top of mind by delivering weekly in-store offers immediately after checkout—turning post-purchase moments into repeat visits and measurable revenue growth.",
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: Quote,
      title: "Create Loyalty Through Consistent Value",
      description: "Turn post-purchase gratitude into loyalty by sharing sponsored offers that reward your customers with savings they'll actually use—and remember.",
      iconColor: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  return (
    <section id="what-you-get" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What You Get</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A new revenue stream, more return visits, and a stronger relationship with every shopper.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <div className="flex flex-col gap-6 min-w-0">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} delay={index * 0.1} className="flex-1 min-h-0">
                <div className="h-full bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start space-x-4 h-full">
                    <div className={`w-12 h-12 ${benefit.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <benefit.icon className={`h-6 w-6 ${benefit.iconColor}`} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation={slideInRight} className="min-w-0">
            <div className="rounded-2xl shadow-2xl overflow-hidden h-full min-h-[400px]">
              <img
                src={customerPhoneImage}
                alt="Happy customer smiling while looking at phone in grocery store after purchase"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  return (
    <section id="measurable-impact" className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Measurable Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Clear reporting on the metrics that matter — so you can see exactly what's working.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          <AnimatedSection delay={0}>
            <div className="h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl mb-4">💰</div>
              <div className="text-xl font-bold brand-yellow mb-2">Revenue</div>
              <div className="text-gray-800 font-semibold mb-2">Earnings from advertiser offers</div>
              <div className="text-gray-600 text-sm leading-relaxed">
                See exactly how much incremental revenue your store generates — broken down by campaign.
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl mb-4">🔁</div>
              <div className="text-xl font-bold brand-green mb-2">Visits</div>
              <div className="text-gray-800 font-semibold mb-2">Repeat customer visits</div>
              <div className="text-gray-600 text-sm leading-relaxed">
                Track how often customers return after receiving our customized post-checkout experiences.
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl mb-4">📲</div>
              <div className="text-xl font-bold brand-orange mb-2">Engagement</div>
              <div className="text-gray-800 font-semibold mb-2">SMS performance</div>
              <div className="text-gray-600 text-sm leading-relaxed">
                Review open rates, click-throughs, and engagement trends to see what's resonating.
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection animation={fadeIn}>
          <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900"
              alt="Analytics dashboard showing business metrics"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">About ThankYouDeals.com</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            ThankYouDeals.com is a turnkey post-transaction marketing platform built by ThankYouDeals INC. We help grocers and retailers activate their existing customer base by developing custom mobile landing pages that feature your weekly deals alongside carefully curated advertiser offers. These valuable deals and discounts create positive associations with your store while generating new revenue streams from our advertiser partnerships.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-soft-blue via-white to-mint">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Whether you're a retailer looking to monetize post-purchase moments or an advertiser seeking high-intent audiences, we'd love to show you how ThankYouDeals can work for your business.
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center">
                <Mail className="text-white text-2xl" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900">Schedule a Demo</h3>
                <p className="text-gray-600">Get additional information about ThankYouDeals</p>
              </div>
            </div>
            
            <div className="text-center">
              <a 
                id="body-email"
                href="mailto:support@thankyoudeals.com?subject=ThankYouDeals Demo Request&body=Hi, I'm interested in learning more about ThankYouDeals for my store. Please contact me to schedule a demo or provide additional information."
                className="inline-flex items-center space-x-2 bg-brand-yellow text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
                <span>support@thankyoudeals.com</span>
              </a>
            </div>
          </div>
          

        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  const scrollToSection = scrollToSectionWithHeaderOffset;

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <img 
                src={headerLogoImage} 
                alt="ThankYouDeals.com Logo" 
                className="h-12 w-auto mb-4"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Powered by ThankYouDeals INC
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform your checkout process into a customer retention powerhouse with our post-purchase deal platform.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  id="footer-retailers"
                  onClick={() => scrollToSection('retailers')}
                  className="hover:text-white transition-colors"
                >
                  For Retailers
                </button>
              </li>
              <li>
                <button 
                  id="footer-advertisers"
                  onClick={() => scrollToSection('advertisers')}
                  className="hover:text-white transition-colors"
                >
                  For Advertisers
                </button>
              </li>
              <li>
                <button 
                  id="footer-how-it-works"
                  onClick={() => scrollToSection('how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  id="footer-demo"
                  onClick={() => scrollToSection('demo')}
                  className="hover:text-white transition-colors"
                >
                  Demo
                </button>
              </li>
              <li>
                <button 
                  id="footer-about"
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <a
                  id="footer-privacy-policy"
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  id="footer-email"
                  href="mailto:support@thankyoudeals.com" 
                  className="hover:text-white transition-colors flex items-center"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  support@thankyoudeals.com
                </a>
              </li>
              <li>
                <button 
                  id="footer-schedule-demo"
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-white transition-colors flex items-center"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Demo
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ThankYouDeals INC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <RetailerSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ResultsSection />
      <AdvertiserSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
