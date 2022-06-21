import React from "react";
import NoSideBarLayout from "../layouts/NoSideBarLayout";
import HeroSection from "../sections/HeroSection";

function PrivacyPolicy() {
  return (
    <NoSideBarLayout>
      <HeroSection
        heading={"Privacy Policy"}
        heading2="Home/Privacy"
        image="/images/theater.jpeg"
      />

      <div className={"flex column center p-4"}>
        <span className="selection">WWW.THEARTOFFILM.CO.UK</span>
        <div className="flex column">
          <h2>PRIVACY POLICY</h2>
          <span>Type of website: Ecommerce</span>
          <span>Effective date: 24th day of January, 2022</span>
        </div>

        <div className="flex column">
          <span>
            www.theartoffilm.co.uk (the “Site”) is owned and operated by The Art
            of Film. The Art of Film is the data controller and can be contacted
            at:
          </span>
          <span className={"selection"}>
            <a href="mailto:henry@theartoffilm.co.uk">
              henry@theartoffilm.co.uk
            </a>
          </span>
        </div>

        <div className="flex column">
          <h2>PURPOSE</h2>
          <ul>
            <li>
              The purpose of this privacy policy (this “Privacy Policy”) is to
              inform users of our Site of the following:
            </li>
            <li>The personal data we will collect;</li>
            <li>Use of collected data;</li>
            <li>Who has access to the data collected;</li>
            <li>The rights of Site users; and</li>
            <li>The Site’s cookie policy.</li>
            <li>
              This Privacy Policy applies in addition to the terms and
              conditions of our Site.
            </li>
          </ul>
        </div>

        <div className="flex column">
          <h2>GDPR</h2>
          <ul>
            <li>
              For users in the European Union, we adhere to the Regulation (EU)
              2016/679 of the European Parliament and of the Council of 27 April
              2016, known as the General Data Protection Regulation (the
              “GDPR”). For users in the United Kingdom, we adhere to the GDPR as
              enshrined in the Data Protection Act 2018.
            </li>
            <li>
              We have not appointed a Data Protection Officer as we do not fall
              within the categories of controllers and processors required to
              appoint a Data Protection Officer under Article 37 of the GDPR.
            </li>
          </ul>
        </div>

        <div className="flex column">
          <h2>CONSENT</h2>
          <ul>
            <li>By using our Site users agree that they consent to:</li>
            <li>The conditions set out in this Privacy Policy.</li>
            <li>
              When the legal basis for us processing your personal data is that
              you have provided your consent to that processing, you may
              withdraw your consent at any time. If you withdraw your consent,
              it will not make processing which we completed before you withdrew
              your consent unlawful.
            </li>
            <li>
              You can withdraw your consent by: Contacting the Privacy Officer.
              <span className={"selection"}>
                <a href="mailto:henry@theartoffilm.co.uk">
                  henry@theartoffilm.co.uk
                </a>
              </span>
            </li>
          </ul>
        </div>

        <div className="flex column">
          <h2>LEGAL BASIS FOR PROCESSING</h2>
          <ul>
            <li>
              We collect and process personal data about users in the EU only
              when we have a legal basis for doing so under Article 6 of the
              GDPR.
            </li>
            <li>
              We rely on the following legal bases to collect and process the
              personal data of users in the EU:
            </li>
            <li>
              Users have provided their consent to the processing of their data
              for one or more specific purposes; and
            </li>
            <li>
              Processing of user personal data is necessary for us or a third
              pary to pursue a legitimate interest. Our legitimate interest is
              not overriden by the interests or fundamenal rights and freedoms
              of users. Our legitimate interest(s) are: Movie poster showcase
              and the buying and selling of movie posters and memorabilia
              online.
            </li>
          </ul>
        </div>

        <div className="flex column">
          <h2>PERSONAL DATA WE COLLECT</h2>
          <ul>
            <li>
              We only collect data that helps us achieve the purpose set out in
              this Privacy Policy. We will not collect any additional data
              beyond the data listed below without notifying you first.
            </li>
          </ul>
        </div>

        <div className={"flex column"}>
          <h2>DATA COLLECTED AUTOMATICALLY</h2>
          <span>
            When you visit and use our Site, we may automatically collect and
            store the following information:
          </span>
          <li>IP address;</li>
          <li>Location;</li>
          <li>Clicked links; and Content viewed.</li>
        </div>
        <div className={"flex column"}>
          <h2>DATA COLLECTED IN A NON-AUTOMATIC WAY</h2>
          <ul>
            <li>
              We may also collect the following data when you perform certain
              functions on our Site:
            </li>
            <li>
              First and last name; Email address; Phone number; Address; and
              Payment information.
            </li>
            <li>
              This data may be collected using the following methods:
              Subscribing and creating an account.
            </li>
          </ul>
        </div>
        <div className={"flex column"}>
          <h2> HOW WE USE PERSONAL DATA </h2>
          <ul>
            <li>
              {" "}
              Data collected on our Site will only be used for the purposes
              specified in this Privacy Policy or indicated on the relevant
              pages of our Site.
            </li>
            <li>
              {" "}
              We will not use your data beyond what we disclose in this Privacy
              Policy.{" "}
            </li>
            <li>
              {" "}
              The data we collect automatically is used for the following
              purposes: Statistics.{" "}
            </li>
            <li>
              {" "}
              The data we collect when the user performs certain functions may
              be used for the following purposes: Communication; and Payments.
            </li>
            <li></li>
          </ul>
        </div>
        <div className={"flex column"}>
          <h2> WHO WE SHARE PERSONAL DATA WITH </h2>
          <ul>
            <li>
              Employees We may disclose user data to any member of our
              organisation who reasonably needs access to user data to achieve
              the purposes set out in this Privacy Policy.
            </li>
            <li>
              Third Parties We may share user data with the following third
              parties:
            </li>
            <li>
              Posters Sellers We may share the following user data with third
              parties: Name and address of where to send the purchased item.
            </li>
            <li>
              We may share user data with third parties for the following
              purposes:
              _____________________________________________________________________________.
            </li>
            <li>
              Third parties will not be able to access user data beyond what is
              reasonably necessary to achieve the given purpose.
            </li>
          </ul>
        </div>
        <div className={"flex column"}>
          <h2>Other Disclosures</h2>
          <ul>
            <li>
              We will not sell or share your data with other third parties,
              except in the following cases: If the law requires it; If it is
              required for any legal proceeding; To prove or protect our legal
              rights; and To buyers or potential buyers of this company in the
              event that we seek to sell the company. If you follow hyperlinks
              from our Site to another Site, please note that we are not
              responsible for and have no control over their privacy policies
              and practices.
            </li>
          </ul>
        </div>
        <div className={"flex column"}>
          <h2>HOW LONG WE STORE PERSONAL DATA</h2>
          <ul>
            <li>
              User data will be stored for 6 years. You will be notified if your
              data is kept for longer than this period.
            </li>
            <li>
              In order to protect your security, we use the strongest available
              browser encryption and store all of our data on servers in a
              secure trusted facility. All data is only accessible to our
              employees.
            </li>
            <li>
              Our employees are bound by strict confidentiality agreements and a
              breach of this agreement would result in the employee’s
              termination.
            </li>
            <li>
              While we take all reasonable precautions to ensure that user data
              is secure and that users are protected, there always remains the
              risk of harm.
            </li>
            <li>
              The Internet as a whole can be insecure at times and therefore we
              are unable to guarantee the security of user data beyond what is
              reasonably practical.
            </li>
          </ul>
        </div>
        <div className={"flex column"}>
          <h2>INTERNATIONAL DATA TRANSFERS</h2>
          <ul>
            <li>
              We transfer user personal data to the following countries: All EU
              Countries; and All non EU countries.
            </li>
            <li>
              When we transfer user personal data we will protect that data as
              described in this Privacy Policy and comply with applicable legal
              requirements for transferring personal data internationally.
            </li>
            <li>
              If you are located in the United Kingdom or the European Union, we
              will only transfer your personal data if: The country your
              personal data is being transferred to has been deemed to have
              adequate data protection by the European Commission or, if you are
              in the United Kingdom, by the United Kingdom adequacy regulations;
              or We have implemented appropriate safeguards in respect of the
              transfer. For example, the recipient is a party to binding
              corporate rules, or we have entered into standard EU or United
              Kingdom data protection contractual clauses with the recipient..
            </li>
          </ul>
        </div>
        <div className={"flex column"}>
          <h2>YOUR RIGHTS AS A USER</h2>
          <ul>
            <li>
              Under the GDPR, you have the following rights: Right to be
              informed; Right of access; Right to rectification; Right to
              erasure; Right to restrict processing; Right to data portability;
              and Right to object.
            </li>
            <li>
              CHILDREN The minimum age to use our website is 16 years of age. We
              do not knowingly collect or use personal data from children under
              16 years of age.
            </li>
            <li>
              If we learn that we have collected personal data from a child
              under 16 years of age, the personal data will be deleted as soon
              as possible.
            </li>
            <li>
              If a child under 16 years of age has provided us with personal
              data their parent or guardian may contact our privacy officer.
            </li>
            <li></li>
          </ul>
        </div>
        <div className="flex column">
          <h2>
            HOW TO ACCESS, MODIFY, DELETE, OR CHALLENGE THE DATA COLLECTED
          </h2>
          <ul>
            <li>
              If you would like to know if we have collected your personal data,
              how we have used your personal data, if we have disclosed your
              personal data and to who we disclosed your personal data, if you
              would like your data to be deleted or modified in any way, or if
              you would like to exercise any of your other rights under the
              GDPR, please contact our privacy officer here: Henry Coleman
              <span className={"selection"}>
                <a href="mailto:henry@theartoffilm.co.uk">
                  henry@theartoffilm.co.uk
                </a>
              </span>
            </li>
          </ul>
        </div>
        <div className={"flex column"}>
          <h2>DO NOT TRACK NOTICE</h2>
          <ul>
            <li>
              Do Not Track (“DNT”) is a privacy preference that you can set in
              certain web browsers.
            </li>
            <li>
              We do not track the users of our Site over time and across third
              party websites and therefore do not respond to browser-initiated
              DNT signals.
            </li>
            <li>
              We are not responsible for and cannot guarantee how any third
              parties who interact with our Site and your data will respond to
              DNT signals.
            </li>
          </ul>
        </div>
        <div className={"flex column"}>
          <h2>USE OF COOKIES</h2>
          <ul>
            <li>
              {" "}
              A cookie is a small file, stored on a user’s hard drive by a
              website.
            </li>
            <li>
              Its purpose is to collect data relating to the user’s browsing
              habits.
            </li>
            <li>
              You can choose to be notified each time a cookie is transmitted.
            </li>
            <li>
              You can also choose to disable cookies entirely in your internet
              browser, but this may decrease the quality of your user
              experience.
            </li>
            <li>
              We use the following types of cookies on our Site: Functional
              cookies Functional cookies are used to remember the selections you
              make on our Site so that your selections are saved for your next
              visits; Analytical cookies Analytical cookies allow us to improve
              the design and functionality of our Site by collecting data on how
              you access our Site, for example data on the content you access,
              how long you stay on our Site, etc; Targeting cookies Targeting
              cookies collect data on how you use the Site and your preferences.
            </li>
            <li>
              This allows us to personalise the information you see on our Site
              for you; and Third-Party Cookies Third-party cookies are created
              by a website other than ours.
            </li>
            <li>
              We may use third-party cookies to achieve the following purposes:
              Monitor user preferences to tailor advertisements around their
              interests.
            </li>
            <li>
              Modifications This Privacy Policy may be amended from time to time
              in order to maintain compliance with the law and to reflect any
              changes to our data collection process.
            </li>
            <li>
              When we amend this Privacy Policy we will update the “Effective
              Date” at the top of this Privacy Policy. We recommend that our
              users periodically review our Privacy Policy to ensure that they
              are notified of any updates.
            </li>
            <li>
              If necessary, we may notify users by email of changes to this
              Privacy Policy.
            </li>
          </ul>
        </div>
        <div className={"flex column"}>
          <h2>COMPLAINTS</h2>
          <ul>
            <li>
              If you have any complaints about how we process your personal
              data, please contact us through the contact methods listed in the
              Contact Information section so that we can, where possible,
              resolve the issue.
            </li>
            <li>
              If you feel we have not addressed your concern in a satisfactory
              manner you may contact a supervisory authority.
            </li>
            <li>
              You also have the right to directly make a complaint to a
              supervisory authority.
            </li>
            <li>
              You can lodge a complaint with a supervisory authority by
              contacting the Information Commissioner’s Office in the UK, Data
              Protection Commission in Ireland.
            </li>
            <li></li>
          </ul>
        </div>
        <div className="flex column">
          <h2>CONTACT INFORMATION</h2>
          If you have any questions, concerns or complaints, you can contact our
          privacy officer, Henry Coleman, at:
          <span className={"selection"}>
            <a href="mailto:henry@theartoffilm.co.uk">
              henry@theartoffilm.co.uk
            </a>
          </span>
        </div>
      </div>
    </NoSideBarLayout>
  );
}

export default PrivacyPolicy;
