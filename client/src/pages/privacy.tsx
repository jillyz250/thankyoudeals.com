import { useEffect } from "react";
import { Link } from "wouter";
import headerLogoImage from "@assets/image_1750091632559.png";
import { ArrowLeft, Mail } from "lucide-react";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = "Privacy Policy — ThankYouDeals.com";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-yellow via-white to-soft-blue">
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-gray-200/60 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow rounded-md">
              <img src={headerLogoImage} alt="ThankYouDeals.com Logo" className="h-9 w-auto" />
            </a>
          </Link>
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-gray-700 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </a>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <article className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Effective Date: June 11, 2025</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            This webpage is operated by Xzellerate Media LLC and is designed to display weekly store deals and
            sponsored offers. This policy explains how we handle information when you visit our site, especially in
            relation to data privacy, tracking, and third-party links.
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Table of Contents</h2>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li><a className="hover:text-brand-yellow transition-colors" href="#section-1">No Collection of Personal Information</a></li>
              <li><a className="hover:text-brand-yellow transition-colors" href="#section-2">Analytics &amp; Tracking</a></li>
              <li><a className="hover:text-brand-yellow transition-colors" href="#section-3">Third-Party Links</a></li>
              <li><a className="hover:text-brand-yellow transition-colors" href="#section-4">SMS Messages</a></li>
              <li><a className="hover:text-brand-yellow transition-colors" href="#section-5">Data Sharing &amp; Selling</a></li>
              <li><a className="hover:text-brand-yellow transition-colors" href="#section-6">Data Security</a></li>
              <li><a className="hover:text-brand-yellow transition-colors" href="#section-7">Children's Privacy</a></li>
              <li><a className="hover:text-brand-yellow transition-colors" href="#section-8">Changes to This Policy</a></li>
              <li><a className="hover:text-brand-yellow transition-colors" href="#section-9">Contact Us</a></li>
            </ol>
          </section>

          <section id="section-1" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. No Collection of Personal Information</h2>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">We Protect Your Privacy</h3>
            <p className="text-gray-700 leading-relaxed">
              We do not collect, store, or access any personally identifiable information (PII) such as your name,
              phone number, or email address. You do not need to submit any information to view our content, and our
              webpage does not include any forms or input fields.
            </p>
          </section>

          <section id="section-2" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Analytics &amp; Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To understand how our website performs and to improve your experience, we use Google Analytics. This
              tool collects non-personal, anonymous data about how you interact with the site, including:
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Page Analytics</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
              <li>Page views</li>
              <li>Clicks on buttons and other interactive elements</li>
              <li>Anonymous engagement data</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Usage Data</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
              <li>Clicks on offers or links that lead to third-party websites</li>
              <li>General campaign effectiveness metrics</li>
              <li>Site experience improvement metrics</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Important Notes:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
              <li>We do not collect any personal information through Google Analytics.</li>
              <li>We do not sell data or use tracking for advertising or remarketing.</li>
              <li>We do not receive or access any personal information you may submit on third-party websites.</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-4">
              For more details on how Google handles data collected through Google Analytics, please visit{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green underline hover:no-underline"
              >
                Google Analytics – How Google uses data
              </a>
              .
            </p>

            <p className="text-gray-700 leading-relaxed">
              By continuing to use our website, you agree to this basic analytics tracking, which is anonymous and
              used solely to improve the site experience.
            </p>
          </section>

          <section id="section-3" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our site includes links to third-party websites, including promotional offers and sweepstakes.
            </p>
            <div className="bg-light-yellow border-l-4 border-brand-yellow rounded-r-md p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-1">Important Notice</h3>
              <p className="text-gray-700 leading-relaxed">
                We are not responsible for the privacy practices or content of those external sites. We recommend
                reviewing the privacy policies of any third-party site you visit.
              </p>
            </div>
          </section>

          <section id="section-4" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. SMS Messages</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you received a text message linking to this page, it was sent by a point-of-sale (POS) software
              partner, not by us. That partner handles all aspects of the SMS program, including:
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">SMS Partner Responsibilities</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
              <li>Collecting your phone number</li>
              <li>Managing consent and compliance</li>
              <li>Handling opt-out requests</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">How to Stop SMS Messages</h3>
            <p className="text-gray-700 leading-relaxed">
              To stop receiving future text messages, reply <span className="font-semibold">STOP</span> to the SMS.
              We do not have access to your phone number or any related SMS data.
            </p>
          </section>

          <section id="section-5" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Data Sharing &amp; Selling</h2>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">We Don't Sell Your Data</h3>
            <p className="text-gray-700 leading-relaxed">
              We do not sell, rent, or share personal data — because we don't collect any. Any tracking data we
              receive is aggregated and anonymous.
            </p>
          </section>

          <section id="section-6" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Although we do not collect personal information, we maintain standard security measures to protect our
              site and its content, including:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-1">Secure Configurations</h3>
                <p className="text-gray-700 text-sm">Secure server configurations and SSL protection</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-1">Regular Monitoring</h3>
                <p className="text-gray-700 text-sm">Regular performance monitoring and updates</p>
              </div>
            </div>
          </section>

          <section id="section-7" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              This site is not intended for children under the age of 13. We do not knowingly collect or solicit
              personal information from children.
            </p>
          </section>

          <section id="section-8" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. If changes are made, the updated version will be
              posted on this page with a revised "Effective Date" at the top.
            </p>
          </section>

          <section id="section-9" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about this policy, please contact us at:
            </p>
            <a
              href="mailto:business@xzellerate.com"
              className="inline-flex items-center gap-2 text-brand-green font-semibold hover:underline"
            >
              <Mail className="h-4 w-4" />
              business@xzellerate.com
            </a>
          </section>

          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            Powered by Xzellerate Media LLC.
          </div>
        </article>
      </main>
    </div>
  );
}
