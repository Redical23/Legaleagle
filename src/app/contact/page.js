import React from "react";

const ContactPage = () => {
  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p className="mb-2">
        <strong>Merchant Legal Entity Name:</strong> Rishi Gupta
      </p>
      <p className="mb-2">
        <strong>Registered Address:</strong> 7 Old Lashkar Line, Allahabad, Uttar Pradesh 211003
      </p>
      <p className="mb-2">
        <strong>Telephone No:</strong> <a href="tel:+919305371779" className="text-blue-600">9305371779</a>
      </p>
      <p>
        <strong>Email:</strong> <a href="mailto:Properaid45@gmail.com" className="text-blue-600">Properaid45@gmail.com</a>
      </p>
    </div>
  );
};

export default ContactPage;
