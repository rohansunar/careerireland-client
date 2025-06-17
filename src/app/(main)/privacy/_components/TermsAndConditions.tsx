import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <ScrollArea className="h-[600px] w-full rounded-md border p-4">
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              1. Agreement to Terms
            </h2>
            <p>
              Career Ireland is your ultimate career consulting destination
              connecting job seekers to accomplished mentors in their respective
              fields. By choosing our Services (as defined below) in any manner,
              you are entering into a legally binding agreement with Career
              Ireland, as set forth in these Terms of Use (&quot;Terms&quot;).
              These Terms also include our Privacy Policy which is incorporated
              by reference.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              2. Definition of Services
            </h2>
            <p>
              The &quot;Services&quot; collectively include the CV Clinic,
              Interview Coaching, Mentorship, &quot;Website&quot;
              (https://careerireland.com and including all webpages, subdomains,
              and any successor or affiliated websites), emails, newsletters,
              other communications, Content, any other services offered by
              Career Ireland, and any other services governed by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              3. Membership and Account Security
            </h2>
            <p>
              Your Career Ireland Membership is for your personal,
              non-commercial use only and you must provide complete and accurate
              information when joining our membership. You are responsible for
              maintaining the confidentiality including security of information
              and services provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">4. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. We will give you
              notice of the changes by posting an updated version of these Terms
              online, updating the &quot;Revised&quot;date, or by emailing you
              at an email address you have provided. Changes to these Terms will
              be effective as of the date we post them or otherwise notify you
              of them unless we specify a different effective date when we make
              a particular change. Your continued use of the Services will
              constitute your acceptance of the changes. If you do not agree to
              a change, you must stop using the Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              5. Modifications to Services
            </h2>
            <p>
              We may modify, add to, suspend, or discontinue the Services or
              certain features of the Services, or remove any Content at any
              time for any reason, without prior notice to you. Unless expressly
              stated otherwise, any new feature that augments, enhances, or
              otherwise modifies the Services is subject to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">6. Paid Services</h2>
            <p>
              The Services include a variety of services that require payment
              (&quot;Paid Services&quot;). Paid Services include CV Clinic,
              Interview Coaching and Career Mentorship services. We reserve the
              right to change the price for Paid Services, at any time. If you
              purchase any of our Paid Services, you agree to pay us any
              applicable fees and taxes and you agree to any additional terms
              that may apply. Failure to pay these fees will result in the
              termination of the applicable Paid Service.
            </p>
            <p className="mt-2">
              Please note that The Career Ireland is not liable for any bank
              fees, foreign exchange fees, or differences in prices based on
              geographic location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              7. Intellectual Property Rights
            </h2>
            <h3 className="text-xl font-semibold mt-4 mb-2">
              7.1 Career Ireland Content
            </h3>
            <p>
              The Website and Services also contain Content posted by the Career
              Ireland. We retain all right, title and interest in and to such
              Content, including all associated intellectual property rights.
              Subject to your compliance with these Terms, The Career Ireland
              grants you a revocable, limited, non-exclusive, non-transferable
              license, to access and view any Content solely for your personal
              and non-commercial purposes. You agree not to copy, distribute,
              display, disseminate, reproduce, or otherwise exploit any Services
              without our prior written permission, regardless of whether it is
              created or owned by The Career Ireland.
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2">7.2 Trademarks</h3>
            <p>
              The trademarks, logos, trade names, and service marks, whether
              registered or unregistered (&quot;Trademarks&quot;) displayed on
              the Website are Trademarks of The Career Ireland. Display or use
              of any Trademarks on the Website or in the Services shall not be
              construed as granting, by implication or otherwise, any license or
              right to use any Trademark without the prior written permission of
              The Career Ireland. You also agree not to use our trade dress or
              copy the look and feel of the Website or its design.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              8. Content Disclosure
            </h2>
            <p>
              We reserve the right to access, read, preserve, and disclose any
              Content or information in accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              9. Cancellation and Refund Policy
            </h2>
            <p>
              Any client who wants to cancel the membership can ask for a full
              refund and this will be given, provided that the request for a
              refund has been made within two days from the start of coaching
              session. In such cases, the client is required to put this in
              writing outlining their reasons for the cancellation. If a client
              obtains a refund for a coaching session in accordance with this
              clause, then the client and the Career Ireland each have the
              option to terminate this contract immediately, confirming such
              termination by email or letter. If either party does terminate
              this contract in such circumstances then Career Ireland will have
              no obligation to provide any further coaching sessions to the
              client and the client will, in turn, will be entitled to a refund
              for any future coaching sessions for which they have already paid
              which are no longer to be provided.
            </p>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}
