import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/ChatGPT Image Jun 16, 2025, 11_22_12 AM_1750088538557.png";
import { Home as HomeIcon, Mail } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page not found — ThankYouDeals.com";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-yellow via-white to-soft-blue flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center">
        <img
          src={logoImage}
          alt="ThankYouDeals.com Logo"
          className="h-24 sm:h-28 w-auto mx-auto mb-8"
        />

        <p className="text-7xl sm:text-8xl font-bold brand-yellow mb-2 tracking-tight">404</p>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          This page no longer exists
        </h1>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          The link you followed may be out of date, or the page may have moved. Let's get you back to
          something useful.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <a className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-white px-8 py-3 rounded-md font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
              <HomeIcon className="h-5 w-5" />
              Back to home
            </a>
          </Link>
          <a
            href="mailto:support@thankyoudeals.com"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors"
          >
            <Mail className="h-5 w-5" />
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
