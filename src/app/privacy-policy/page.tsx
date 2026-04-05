export default function PrivacyPolicyPage() {
  return (
    <main className="bg-transparent py-16">
      <div className="container-site">
        <div className="mx-auto max-w-4xl rounded-[36px] border border-brand-space/6 bg-white/85 px-7 py-10 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:px-12 md:py-14">
          <span className="pill-eyebrow">Privacy Policy</span>
          <h1 className="mt-5 text-5xl font-extrabold tracking-[-0.05em] text-brand-space md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-base leading-8 text-brand-space/62">
            This privacy policy explains how Cirrionix collects, uses, and protects information when you visit the site.
            It is intended to provide a clear overview for readers, newsletter visitors, and analytics-enabled pages.
          </p>

          <div className="prose-cirrionix mt-10 max-w-none">
            <h2>Information We Collect</h2>
            <p>
              Cirrionix may collect basic usage information such as pages visited, browser type, device information,
              and referring sources. If you choose to submit your email through a site form, that information may also
              be collected for communication or newsletter-related purposes once the subscription workflow is finalized.
            </p>

            <h2>Analytics and Cookies</h2>
            <p>
              This site uses analytics tools to understand traffic, content performance, and general site usage. These
              tools may use cookies or similar technologies to measure engagement and improve the reader experience.
            </p>

            <h2>Advertising</h2>
            <p>
              Cirrionix may display advertising in the future, including services such as Google AdSense. Advertising
              providers may use cookies or similar technologies to serve ads based on your visit to this and other websites.
            </p>

            <h2>How Information Is Used</h2>
            <p>
              Information may be used to improve site content, understand audience behavior, maintain site performance,
              and develop editorial products such as newsletters or future site features.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              Cirrionix may use third-party services for analytics, content infrastructure, hosting, and form handling.
              These providers may process technical data as part of normal service delivery.
            </p>

            <h2>Your Choices</h2>
            <p>
              You can generally manage cookies through your browser settings. If newsletter or contact functionality is
              expanded later, additional controls for communication preferences may also be provided.
            </p>

            <h2>Policy Updates</h2>
            <p>
              This policy may be updated over time as the site evolves. Material updates will be reflected on this page.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
