import { config } from "@/config/shipper.config";
import Mailgun from "mailgun.js";

const formData = require("form-data");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  // TODO: This should not be public
  key: process.env.NEXT_PUBLIC_MAILGUN_API_KEY,
});

/**
 * Sends an email using the provided parameters.
 *
 * @async
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text content of the email.
 * @param {string} html - The HTML content of the email.
 * @param {string} replyTo - The email address to set as the "Reply-To" address.
 * @returns {Promise} A Promise that resolves when the email is sent.
 */
export const sendEmail = async (to, subject, text, html, replyTo) => {
  const data = {
    from: config.email.fromAdmin,
    to: [to],
    subject,
    text,
    html,
    ...(replyTo && { "h:Reply-To": replyTo }),
  };

  try {
    await mg.messages.create(
      config.email.testSubdomain,
      // (config.mailgun.subdomain ? `${config.mailgun.subdomain}.` : "") +
      // config.domainName,
      data,
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
