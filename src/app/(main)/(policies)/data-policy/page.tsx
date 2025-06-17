import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DataPolicy() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Our Data Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            This document outlines how Career Ireland collect, use, store, and
            protect your personal information when you engage with our services.
            By using our services, you consent to the practices described in
            this Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Definitions</h2>
          <p>
            <strong>Company:</strong> Career Ireland, located at 109 Windmill
            Park, Crumlin, Dublin, D12Y0YX
            <br />
            <strong>Service:</strong> The services we provide through our
            website, which can be accessed at www.careerireland.com
            <br />
            <strong>Personal Data:</strong> Any information that identifies you
            or can be used to identify you, including but not limited to your
            name, contact details, and any unique identifiers.
            <br />
            <strong>Data Controller:</strong> The Company, as defined under the
            General Data Protection Regulation (GDPR), responsible for deciding
            how your personal data is used and processed.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. Data Collection and Use
          </h2>
          <h3 className="text-xl font-semibold mt-6 mb-2">
            2.1 Types of Data Collected
          </h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Identification Details: Name and identification number</li>
            <li>Contact Information: Email address and phone number</li>
            <li>
              Payment Information: For processing transactions (if applicable)
            </li>
            <li>
              Usage Data: Automatically collected data, such as IP address,
              browser type, pages visited, and time spent on those pages
            </li>
          </ul>
          <p>
            We use cookies and similar tracking technologies to enhance your
            experience and analyze usage trends. For more information, see our
            Cookies Policy.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">
            2.2 Use of Personal Data
          </h3>
          <p>
            We&apos;ll only use your information in ways that are fair and
            satisfy our legal obligations.
          </p>
          <p>Your personal data may be used for:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Service Provision: To provide, maintain, and improve our services
            </li>
            <li>Account Management: For registration and profile management</li>
            <li>Contract Fulfillment: To execute contracts and agreements</li>
            <li>
              Communication: To send updates, newsletters, and marketing
              materials
            </li>
            <li>
              Targeted Advertising: To deliver ads based on your interests
            </li>
            <li>
              Business Transfers: During mergers, acquisitions, or asset sales
            </li>
            <li>Internal Analysis: For research and service improvement</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Sharing</h2>
          <p>We may share your data in the following cases:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              With Service Providers: For service facilitation and analysis
            </li>
            <li>
              For Business Transfers: In case of mergers, acquisitions, or asset
              sales
            </li>
            <li>
              With Affiliates: They will be required to honor this Privacy
              Policy
            </li>
            <li>
              With Your Consent: For any other purpose with your explicit
              consent
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            4. Data Retention and Transfer
          </h2>
          <p>
            We retain your data only as long as necessary. When no longer
            required, it will be securely deleted. Data may be transferred
            internationally, and by using our services, you consent to this
            transfer and processing.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Your Rights (GDPR)
          </h2>
          <p>If you are in the EU, you have the following rights:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Right to Access: Request copies of your data</li>
            <li>
              Right to Rectification: Correct inaccurate or incomplete data
            </li>
            <li>
              Right to Erasure: Request data deletion under certain
              circumstances
            </li>
            <li>Right to Restrict Processing: Limit data processing</li>
            <li>
              Right to Data Portability: Receive a copy of your data in a
              machine-readable format
            </li>
            <li>Right to Object: Object to data processing</li>
          </ul>
          <p>
            To exercise these rights, contact us using the details provided
            below.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Children&apos;s Privacy
          </h2>
          <p>
            Our services are not intended for individuals under 13. We do not
            knowingly collect data from children under 13. If we discover such
            data, we will delete it.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            7. Links to Other Websites
          </h2>
          <p>
            We are not responsible for the content or privacy practices of
            third-party websites. We recommend reviewing their privacy policies.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            8. Changes to This Policy
          </h2>
          <p>
            We may update this policy periodically. Changes will be posted with
            an updated effective date. We encourage you to review this page
            regularly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
