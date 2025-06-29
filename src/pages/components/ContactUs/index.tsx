import React from 'react';
import {
  ContactHero,
  ContactForm
} from 'features/components/contactUs';

export const ContactUsPage: React.FC = () => {
  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  );
};

export default ContactUsPage;