import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Terms of Business with Career Ireland
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            Welcome to Career Ireland. These Terms & Conditions outline the
            framework for the services we provide and your rights and
            responsibilities as our client. By using our services, you agree to
            these Terms. If you do not agree, please refrain from using our
            services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Career Ireland offers specialized services for career development
            and immigration needs, ensuring a seamless experience every step of
            the way. We are dedicated to supporting individuals at every stage
            of their journey in Ireland – from job applications to work permits,
            visa applications, and beyond.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. Services Provided
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Career Services</li>
            <li>Immigration Services</li>
            <li>Trainings</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. Client Responsibilities
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li className="font-semibold">Provide Accurate Information</li>
            <p className="mb-4">
              Clients must furnish complete and accurate details regarding their
              immigration history, status, and any relevant personal
              information.
            </p>

            <li className="font-semibold">Documentation</li>
            <p className="mb-4">
              Clients are required to supply all requested documentation
              promptly and maintain open communication regarding any
              developments in their circumstances.
            </p>

            <li className="font-semibold">Cooperation</li>
            <p>
              Clients must respond to our inquiries in a timely manner and
              notify us of any changes that could affect their immigration
              applications.
            </p>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            4. Fees and Payment Terms
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li className="font-semibold">Service Fees</li>
            <p className="mb-4">
              Our fees will be clearly communicated at the outset. A detailed
              cost breakdown may be provided based on the specific services
              required.
            </p>

            <li className="font-semibold">Payment Schedule</li>
            <p className="mb-4">
              Payment is due upon acceptance of our proposal unless otherwise
              agreed in writing. In some cases, a deposit may be required before
              services begin.
            </p>

            <li className="font-semibold">Refund Policy</li>
            <p>
              All fees are non-refundable unless explicitly stated otherwise in
              writing. If services cannot be rendered due to circumstances
              beyond our control, we may offer a partial refund at our
              discretion.
            </p>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Confidentiality
          </h2>
          <p>
            We prioritize the privacy of our clients. All personal information
            and documentation provided to Career Ireland will be treated as
            confidential. We will not disclose any client information to third
            parties without explicit consent, unless required by law or relevant
            authorities.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Limitation of Liability
          </h2>
          <p>
            Career Ireland shall not be liable for any direct, indirect,
            incidental, or consequential damages arising from the use of our
            services or from any delay or failure in the provision of services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            7. Termination of Services
          </h2>
          <p>
            Either party may terminate the service agreement with written notice
            if there is a breach of these Terms. In the event of termination,
            the client is responsible for payment of any outstanding fees for
            services rendered prior to the termination date.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Governing Law</h2>
          <p>
            These Terms & Conditions shall be governed by and construed in
            accordance with the laws of Ireland. Any disputes arising under or
            in connection with these Terms shall be subject to the exclusive
            jurisdiction of the courts of Ireland.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Amendments</h2>
          <p>
            Career Ireland reserves the right to modify these Terms at any time.
            Clients will be notified of any significant changes. Continued use
            of our services following any modifications constitutes acceptance
            of the updated Terms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
