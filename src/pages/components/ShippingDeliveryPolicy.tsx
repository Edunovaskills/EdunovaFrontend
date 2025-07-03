import React from 'react';

const ShippingDeliveryPolicy: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px', marginBottom: '20px' }}>Shipping and Delivery Policy – Edunova</h1>
      <p style={{ fontSize: '0.9em', color: '#666' }}><strong>Effective Year:</strong> 2025</p>

      <p>Welcome to Edunova! We are dedicated to providing you with a seamless experience for receiving our training materials and related products. This Shipping and Delivery Policy outlines important details regarding how your orders will be processed and delivered, whether digital or physical.</p>

      <h2 style={{ color: '#007bff', marginTop: '30px', marginBottom: '15px' }}>1. Digital Products</h2>
      <h3 style={{ color: '#555', marginTop: '20px', marginBottom: '10px' }}>Access & Delivery:</h3>
      <p>All digital products, including e-books, PDFs, online courses, video tutorials, and other downloadable materials, are delivered electronically. Once your payment is successfully processed, you will receive an email with secure download links or instructions to access the course content immediately.</p>

      <h3 style={{ color: '#555', marginTop: '20px', marginBottom: '10px' }}>Delivery Time:</h3>
      <p>Access to digital products is typically granted within minutes after payment confirmation. If you do not receive access within 1 hour, please contact our support team.</p>

      <h2 style={{ color: '#007bff', marginTop: '30px', marginBottom: '15px' }}>2. Physical Products</h2>
      <h3 style={{ color: '#555', marginTop: '20px', marginBottom: '10px' }}>Order Processing:</h3>
      <p>Physical product orders such as printed books, study kits, training accessories, or merchandise will be processed within <strong>2-4 business days</strong> from the date of order confirmation.</p>

      <h3 style={{ color: '#555', marginTop: '20px', marginBottom: '10px' }}>Shipping Methods:</h3>
      <p>We partner with leading global courier services including FedEx, DHL, UPS, and USPS to ensure fast and reliable shipping. Customers may select from standard or expedited shipping options during checkout.</p>

      <h3 style={{ color: '#555', marginTop: '20px', marginBottom: '10px' }}>Shipping Charges:</h3>
      <p>Shipping fees are calculated based on the product weight, dimensions, delivery destination, and selected shipping method. All charges will be transparently displayed before you complete your purchase.</p>

      <h3 style={{ color: '#555', marginTop: '20px', marginBottom: '10px' }}>Delivery Timeframes:</h3>
      <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
        <li><strong>Standard Domestic Shipping:</strong> 7-10 business days</li>
        <li><strong>Expedited Domestic Shipping:</strong> 10-15 business days</li>
        <li><strong>International Shipping:</strong> 15-20 business days depending on the destination country and customs processing</li>
      </ul>

      <h3 style={{ color: '#555', marginTop: '20px', marginBottom: '10px' }}>Customs & Import Duties:</h3>
      <p>For international shipments, customs fees, taxes, and import duties may apply. These charges are the responsibility of the recipient and are not included in the shipping fees collected by Edunova.</p>

      <h2 style={{ color: '#007bff', marginTop: '30px', marginBottom: '15px' }}>3. Tracking Your Order</h2>
      <p>After your order ships, you will receive a tracking number via email. Use this number to track your shipment in real-time on the courier’s website.</p>
      <p>For any delivery delays, lost packages, or issues with your order, please contact our Customer Support team immediately so we can assist you in resolving the matter promptly.</p>

      <h2 style={{ color: '#007bff', marginTop: '30px', marginBottom: '15px' }}>4. Shipping Restrictions and Special Notes</h2>
      <h3 style={{ color: '#555', marginTop: '20px', marginBottom: '10px' }}>P.O. Box Deliveries:</h3>
      <p>We are currently unable to ship to P.O. Box addresses due to courier limitations.</p>

      <h3 style={{ color: '#555', marginTop: '20px', marginBottom: '10px' }}>Military and Remote Addresses:</h3>
      <p>Deliveries to military bases or remote locations may experience longer transit times. We appreciate your patience in such cases.</p>

      <h3 style={{ color: '#555', marginTop: '20px', marginBottom: '10px' }}>Address Accuracy:</h3>
      <p>Please ensure that your shipping address is complete and accurate. We are not responsible for delays or lost packages caused by incorrect or incomplete address information.</p>

      <h2 style={{ color: '#007bff', marginTop: '30px', marginBottom: '15px' }}>5. Lost, Damaged, or Incorrect Shipments</h2>
      <p>If your order arrives damaged, defective, or you receive the wrong product, please report it to us within <strong>3 days of delivery</strong>.</p>
      <p>We will coordinate with our shipping partners and suppliers to resolve the issue, which may include reshipping the correct item or issuing a refund, subject to our refund policy.</p>

      <h2 style={{ color: '#007bff', marginTop: '30px', marginBottom: '15px' }}>6. Contact Us</h2>
      <p>If you have any questions or concerns regarding your order, shipping, or delivery, please contact our support team:</p>
      <p><strong>Email:</strong> <a href="mailto:Support@edunova.com" style={{ color: '#007bff', textDecoration: 'none' }}>Support@edunova.com</a></p>
      <p><strong>Phone:</strong> +91 9891279370</p>
      <p><strong>Support Hours:</strong> Monday to Friday, 9:00 AM to 6:00 PM IST</p>
    </div>
  );
};

export default ShippingDeliveryPolicy;
