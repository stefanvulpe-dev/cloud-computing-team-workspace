import nodemailer from 'nodemailer';
import { TCreateFeedback } from '../types';
import { Result } from '../utils';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.TASTY_BITES_EMAIL || '',
    pass: process.env.TASTY_BITES_PASSWORD || '',
  },
});

const mailHTML = (content: TCreateFeedback) => {
  const { firstName, lastName, message } = content;
  return `
        <p>
            Hi <b>${firstName} ${lastName}</b>, <br><br>
            Thanks for making time to provide us with your feedback. We appreciate it! <br><br>
            Your rating was: <em>${content.rating} ⭐</em> <br><br>
            Your message to us was: <em>${message}</em> <br><br>
            Kind regards, <br><br>
            Tasty Bites team 🍔
        </p>
    `;
};

export async function sendEmail(content: TCreateFeedback) {
  const { email } = content;

  const html = mailHTML(content);

  const mailOptions = {
    from: 'Tasty Bites 🍔 <WeAreTastyBites@gmail.com>',
    to: email,
    subject: 'Thank you for your feedback! 🎉',
    text: 'We appreciate your feedback and will use it to improve our services.',
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return Result.ok(info, 'Email sent successfully');
  } catch (error) {
    if (error instanceof Error) {
      return Result.failWithStatusCode(
        `Failed to send email: ${error.message}`,
        500,
      );
    }
    return Result.failWithStatusCode('Failed to send email', 500);
  }
}
