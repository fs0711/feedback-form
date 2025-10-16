import { useState, useEffect } from 'react';

const QRCodeGenerator = ({ formUrl = 'http://supplychain.tpm' }) => {
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    generateQRCode();
  }, [formUrl]);

  const generateQRCode = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Generate QR code for direct form access
      const directFormUrl = `${window.location.origin}?view=form`;
      
      const response = await fetch('http://localhost:3000/api/qrcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: directFormUrl,
          size: 300
        })
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to generate QR code: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setQrCode(data.qrCode);
      
    } catch (err) {
      console.error('Error generating QR code:', err);
      setError(`QR Code generation failed: ${err.message}. Please check if the backend server is running on port 5001.`);
      setQrCode(''); // Clear any existing QR code
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.download = 'feedback-form-qr-code.png';
    link.href = qrCode;
    link.click();
  };

  const printQRCode = () => {
    if (!qrCode) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Feedback Form QR Code</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
            }
            .qr-container {
              text-align: center;
              padding: 2rem;
            }
            .qr-title {
              font-size: 1.5rem;
              font-weight: bold;
              margin-bottom: 1rem;
              color: #1e3a8a;
            }
            .qr-subtitle {
              font-size: 1rem;
              margin-bottom: 2rem;
              color: #374151;
            }
            .qr-image {
              max-width: 300px;
              height: auto;
            }
            .qr-url {
              font-size: 0.9rem;
              margin-top: 1rem;
              color: #6b7280;
              word-break: break-all;
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <div class="qr-title">Feedback Form</div>
            <div class="qr-subtitle">Scan to access the feedback form</div>
            <img src="${qrCode}" alt="QR Code" class="qr-image" />
            <div class="qr-url">${formUrl}</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) {
    return (
      <div className="qr-generator">
        <div className="qr-loading">
          <div className="spinner"></div>
          <p>Generating QR Code...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="qr-generator">
        <div className="qr-error">
          <p>Failed to load QR code</p>
          <div className="error-details">
            <small>{error}</small>
          </div>
          <button onClick={generateQRCode} className="retry-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="qr-generator">
      <div className="qr-section">
        <div className="qr-left">
          <div className="qr-display">
            <h3>Event Feedback QR Code</h3>
            <p>Display this QR code at your event for easy access</p>
            <div className="qr-code-container">
              <img src={qrCode} alt="Feedback Form QR Code" className="qr-image" />
            </div>
            <div className="qr-actions">
              <button onClick={downloadQRCode} className="action-btn">
                Download
              </button>
              <button onClick={printQRCode} className="action-btn">
                Print
              </button>
              <button onClick={generateQRCode} className="action-btn">
                Refresh
              </button>
            </div>
          </div>
        </div>
        
        <div className="qr-right">
          <div className="qr-management">
            <h3>QR Code Management</h3>
            <p>How to use and deploy the QR code</p>
          </div>
          
          <div className="deployment-instructions">
            <h4>Deployment Instructions:</h4>
            <ul>
              <li>Print the QR code in a visible location</li>
              <li>Ensure good lighting for easy scanning</li>
              <li>Include brief instructions for attendees</li>
              <li>Test the QR code before the event</li>
              <li>Keep the feedback form link active throughout</li>
            </ul>
          </div>
          
          <div className="current-event-status">
            <h4>Current Event Status</h4>
            <div className="status-indicator">
              <span className="status-dot active"></span>
              <span>Event currently active</span>
            </div>
          </div>
          
          <div className="form-requirements">
            <h4>Form Requirements:</h4>
            <ul>
              <li><strong>Required:</strong> Name, Email, Job Title, Company, Topic Interest</li>
              <li><strong>Optional:</strong> Phone Number, Connection Reason</li>
              <li><strong>Average completion time:</strong> 2-3 minutes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;