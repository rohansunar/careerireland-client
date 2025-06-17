import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CookiePolicy() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Our Cookie Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            Welcome to Career Ireland. This Cookies Policy explains the types of
            cookies we use, how we use them, and your options regarding cookies
            when visiting our website.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            What Are Cookies?
          </h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help websites function efficiently and provide useful
            insights to website owners.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Types of Cookies We Use
          </h2>

          <h3 className="text-xl font-semibold mt-6 mb-2">
            1. Necessary Cookies
          </h3>
          <p>
            These cookies are essential for core website functions like
            navigation and secure access. The website won&apos;t work properly
            without them.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">
            2. Performance Cookies
          </h3>
          <p>
            These cookies help us analyze how visitors use our site, allowing us
            to improve performance. For example, they track the most popular
            pages and visitor activity.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">
            3. Functionality Cookies
          </h3>
          <p>
            These cookies provide enhanced features and personalization. They
            may be set by us or third-party services integrated into our site.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">
            4. Targeting Cookies
          </h3>
          <p>
            Set by our advertising partners, these cookies build a profile of
            your interests to show you relevant ads on other websites.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Your Choices</h2>
          <p>
            You can choose to accept or decline cookies. Most browsers accept
            cookies by default, but you can modify your settings to decline
            them. Note that disabling cookies may affect your browsing
            experience.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Consent</h2>
          <p>
            By using our website, you consent to our use of cookies as outlined
            in this policy. If you do not agree, please disable cookies through
            your browser or refrain from using the site.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Updates</h2>
          <p>
            We may update this Cookies Policy from time to time. Changes will be
            posted on this page with the effective date.
          </p>

          <p>Here&apos;s what you need to know about our use of cookies.</p>
        </CardContent>
      </Card>
    </div>
  );
}
