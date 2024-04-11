import { Accordion } from "flowbite-react";

export default function FAQHelp() {
  return (
    <div className="max-w-6xl min-h-screen bg-white w-full flex flex-col mx-auto my-5 p-2">
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>What is PrimeBazzar?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              PrimeBazzar is an online shopping platform that offers a wide
              range of products ranging from electronics, fashion, home
              essentials, beauty products, and much more.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              It provides a convenient and secure way for users to shop for
              their favorite items from the comfort of their homes.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            How does PrimeBazzar ensure the safety of my personal information?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              PrimeBazzar takes the privacy and security of its users'
              information very seriously. We employ advanced encryption
              technologies to safeguard your personal data, and we adhere to
              strict privacy policies to ensure that your information is never
              compromised.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            What payment methods does PrimeBazzar accept?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              PrimeBazzar accepts various payment methods to provide convenience
              to its users. You can pay for your orders using credit/debit
              cards, net banking, UPI, and cash on delivery (COD) options,
              depending on your preference.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            Are the products on PrimeBazzar genuine?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Yes, all the products available on PrimeBazzar are sourced
              directly from authorized distributors and manufacturers. We
              guarantee the authenticity and quality of every product listed on
              our platform.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            How does PrimeBazzar handle returns and refunds?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              PrimeBazzar has a hassle-free returns and refunds policy. If
              you're not satisfied with your purchase for any reason, you can
              initiate a return within [X] days of receiving the product. Once
              the returned item is received and inspected, we'll process your
              refund accordingly.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            How does PrimeBazzar ensure the safety of my personal information?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              PrimeBazzar takes the privacy and security of its users'
              information very seriously. We employ advanced encryption
              technologies to safeguard your personal data, and we adhere to
              strict privacy policies to ensure that your information is never
              compromised.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            How does PrimeBazzar handle returns and refunds?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              PrimeBazzar has a hassle-free returns and refunds policy. If
              you're not satisfied with your purchase for any reason, you can
              initiate a return within [X] days of receiving the product. Once
              the returned item is received and inspected, we'll process your
              refund accordingly.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            Does PrimeBazzar offer discounts and promotions?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Yes, PrimeBazzar frequently offers discounts, deals, and
              promotions on various products. Make sure to keep an eye on our
              website and mobile app to stay updated on the latest offers and
              grab exciting discounts on your favorite items.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            How can I track my order on PrimeBazzar?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Tracking your order on PrimeBazzar is easy! Once your order is
              confirmed and dispatched, you'll receive a tracking ID via email
              or SMS. You can use this tracking ID to monitor the status and
              location of your package in real-time.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            Does PrimeBazzar offer customer support?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Absolutely! PrimeBazzar has a dedicated customer support team
              available to assist you with any queries or concerns you may have.
              You can reach out to us via email, phone, or live chat support,
              and we'll be more than happy to help you out.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            Can I sell my products on PrimeBazzar?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              PrimeBazzar welcomes sellers who offer high-quality products and
              adhere to our seller guidelines. If you're interested in selling
              your products on our platform, you can apply to become a seller
              through our website. Our team will review your application and get
              in touch with you regarding the next steps.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            Is PrimeBazzar available in my area?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              PrimeBazzar strives to reach as many customers as possible. While
              we may not be available in all areas currently, we're constantly
              expanding our reach. You can check if PrimeBazzar delivers to your
              area by entering your pin code during the checkout process.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}
