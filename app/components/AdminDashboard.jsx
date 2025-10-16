import { useState, useEffect } from "react";

// Modern Icon Components
const Icons = {
  QRCode: () => (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="5" height="5" />
      <rect x="3" y="16" width="5" height="5" />
      <rect x="16" y="3" width="5" height="5" />
      <path d="m5 5 .01 0" />
      <path d="m5 19 .01 0" />
      <path d="m19 5 .01 0" />
      <path d="M9 12h6" />
      <path d="M12 9v6" />
    </svg>
  ),
  Analytics: () => (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
  Download: () => (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  ),
  Print: () => (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6,9 6,2 18,2 18,9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect width="12" height="8" x="6" y="14" />
    </svg>
  ),
  Refresh: () => (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  ),
  Export: () => (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  ),
  Eye: () => (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Users: () => (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="m22 21-3-3m0 0a5.5 5.5 0 1 0-7.78-7.78 5.5 5.5 0 0 0 7.78 7.78Z" />
    </svg>
  ),
  TrendingUp: () => (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" />
      <polyline points="16,7 22,7 22,13" />
    </svg>
  ),
  Target: () => (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Smartphone: () => (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
  FileText: () => (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  ),
  Save: () => (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17,21 17,13 7,13 7,21" />
      <polyline points="7,3 7,8 15,8" />
    </svg>
  ),
  Trash2: () => (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  ),
};

const AdminDashboard = () => {
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [qrLoading, setQrLoading] = useState(false);
  const [currentAdminView, setCurrentAdminView] = useState("qr"); // 'qr', 'responses'
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);

  useEffect(() => {
    fetchFeedback();
    fetchStats();
    generateQRCode();
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/feedback");

      if (!response.ok) {
        throw new Error("Failed to fetch feedback");
      }

      const data = await response.json();
      console.log("data:", data)
      setFeedback(data.feedback);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      setError("Failed to load feedback data");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/feedback/stats");

      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const exportToExcel = async () => {
    try {
      setExporting(true);

      const response = await fetch("http://localhost:3000/api/feedback/export");

      if (!response.ok) {
        throw new Error("Failed to export data");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `feedback-export-${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting data:", err);
      setError("Failed to export data");
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getTopicColor = (topic) => {
    const colors = {
      "AI in HR": "#ef4444",
      "People intelligence": "#3b82f6",
      "Skill Based Organization": "#10b981",
      "All of the above": "#8b5cf6",
    };
    return colors[topic] || "#6b7280";
  };

  const generateQRCode = async () => {
    try {
      setQrLoading(true);
      setError(""); // Clear any previous errors

      // Generate QR code for the specific feedback form URL
      const feedbackFormUrl =
        "https://sapeventfeedbackform.online.tgtdemo.com/feedback";

      const response = await fetch("http://localhost:3000/api/qrcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: feedbackFormUrl,
          size: 300,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `Failed to generate QR code: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setQrCode(data.qrCode);
    } catch (err) {
      console.error("Error generating QR code:", err);
      setError(
        `QR Code generation failed: ${err.message}. Please check if the backend server is running on port 5001.`
      );
      setQrCode(""); // Clear any existing QR code
    } finally {
      setQrLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCode) return;

    const link = document.createElement("a");
    link.download = "feedback-form-qr-code.png";
    link.href = qrCode;
    link.click();
  };

  const printQRCode = () => {
    if (!qrCode) return;

    const printWindow = window.open("", "_blank");
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
            <div class="qr-url">https://sapeventfeedbackform.online.tgtdemo.com/feedback</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDeleteClick = (feedbackId) => {
    setFeedbackToDelete(feedbackId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!feedbackToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/feedback/${feedbackToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete feedback");
      }

      // Remove from local state - handle both _id and id fields
      setFeedback(
        feedback.filter((item) => (item._id || item.id) !== feedbackToDelete)
      );

      // Refresh stats
      fetchStats();

      // Close modal and reset state
      setShowDeleteModal(false);
      setFeedbackToDelete(null);
    } catch (err) {
      console.error("Error deleting feedback:", err);
      setError("Failed to delete feedback. Please try again.");
      setShowDeleteModal(false);
      setFeedbackToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setFeedbackToDelete(null);
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const renderTabNavigation = () => (
    <div className="tab-navigation">
      <button
        className={`tab-btn ${currentAdminView === "qr" ? "active" : ""}`}
        onClick={() => setCurrentAdminView("qr")}
      >
        <Icons.QRCode />
        <span>QR Code Management</span>
      </button>
      <button
        className={`tab-btn ${
          currentAdminView === "responses" ? "active" : ""
        }`}
        onClick={() => setCurrentAdminView("responses")}
      >
        <Icons.Analytics />
        <span>Response Analytics</span>
      </button>
    </div>
  );

  const renderQRView = () => (
    <div className="qr-view">
      <div className="view-header">
        {/* <div className="header-icon">
          <Icons.QRCode />
        </div> */}
        <div className="header-text">
          <h2>Event Feedback QR Code</h2>
          <p>
            During the event, display this QR code for attendees to access the
            feedback form
          </p>
        </div>
      </div>

      <div className="qr-section">
        <div className="qr-header">
          <h3>QR Code for Feedback Form</h3>
          <p>Share this QR code with users to collect feedback</p>
        </div>

        <div className="qr-content">
          <div className="qr-display">
            {qrLoading ? (
              <div className="qr-loading">
                <div className="spinner"></div>
                <p>Generating QR Code...</p>
              </div>
            ) : qrCode ? (
              <>
                <img
                  src={qrCode}
                  alt="Feedback Form QR Code"
                  className="qr-image"
                />
                <div className="qr-url">
                  <strong>URL:</strong>{" "}
                  https://sapeventfeedbackform.online.tgtdemo.com/feedback
                </div>
              </>
            ) : (
              <div className="qr-error">
                <p>Failed to load QR code</p>
                {error && (
                  <div className="error-details">
                    <small>{error}</small>
                  </div>
                )}
                <button onClick={generateQRCode} className="retry-btn">
                  🔄 Try Again
                </button>
              </div>
            )}
          </div>

          {qrCode && (
            <div className="qr-actions">
              <button
                onClick={downloadQRCode}
                className="qr-action-btn download-btn"
              >
                <Icons.Download />
                <span>Download QR Code</span>
              </button>
              <button onClick={printQRCode} className="qr-action-btn print-btn">
                <Icons.Print />
                <span>Print QR Code</span>
              </button>
              <button
                onClick={generateQRCode}
                className="qr-action-btn refresh-btn"
              >
                <Icons.Refresh />
                <span>Regenerate</span>
              </button>
            </div>
          )}
        </div>

        <div className="qr-info">
          <div className="info-header">
            <Icons.Target />
            <h4>QR Code Management</h4>
          </div>
          <p>How to use and deploy this QR code</p>
          <div className="qr-instructions">
            <div className="instruction-item">
              <div className="instruction-icon">
                <Icons.Print />
              </div>
              <div className="instruction-text">
                <strong>Print and Display</strong>
                <p>Print this QR code and display it at your event location</p>
              </div>
            </div>
            <div className="instruction-item">
              <div className="instruction-icon">
                <Icons.QRCode />
              </div>
              <div className="instruction-text">
                <strong>Easy Scanning</strong>
                <p>
                  Visitors can scan it with their phone camera or QR code app
                </p>
              </div>
            </div>
            <div className="instruction-item">
              <div className="instruction-icon">
                <Icons.FileText />
              </div>
              <div className="instruction-text">
                <strong>Direct Access</strong>
                <p>Users will be directed straight to the feedback form</p>
              </div>
            </div>
            <div className="instruction-item">
              <div className="instruction-icon">
                <Icons.Save />
              </div>
              <div className="instruction-text">
                <strong>Auto Save</strong>
                <p>All responses are automatically saved to your database</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResponsesView = () => (
    <div className="responses-view">
      <div className="view-header">
        <div className="header-content">
          {/* <div className="header-response-icon">
            <Icons.Analytics />
          </div> */}
          <div className="header-text">
            <h2>Response Analytics</h2>
            <p>Detailed analysis of feedback responses received</p>
          </div>
        </div>
        <button
          onClick={exportToExcel}
          className="export-btn"
          disabled={exporting}
        >
          <Icons.Export />
          <span>{exporting ? "Exporting..." : "Export to Excel"}</span>
        </button>
      </div>

      {stats && (
        <div className="detailed-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Icons.Users />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total Responses</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Icons.TrendingUp />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.recent.length}</div>
                <div className="stat-label">Recent (Last 5)</div>
              </div>
            </div>

            <div className="stat-card topic-breakdown">
              <div className="stat-icon">
                <Icons.Target />
              </div>
              <div className="stat-content">
                <div className="stat-label">Topic Breakdown</div>
                <div className="topic-stats">
                  {stats.topicBreakdown.map((item, index) => (
                    <div key={index} className="topic-item">
                      <span
                        className="topic-dot"
                        style={{ backgroundColor: getTopicColor(item._id) }}
                      ></span>
                      <span className="topic-name">{item._id}</span>
                      <span className="topic-count">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="feedback-table-container">
        <h3>All Feedback Responses ({feedback.length})</h3>

        {feedback.length === 0 ? (
          <div className="no-data">
            <p>No feedback responses yet.</p>
            <p>Share the QR code to start collecting feedback!</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="feedback-table">
              <thead>
                <tr>
                  <th className="serial-header">#</th>
                  <th className="name-header">Name</th>
                  <th className="email-header">Email</th>
                  <th className="company-header">Company</th>
                  <th className="job-header">Job Title</th>
                  <th className="topic-header">Topic</th>
                  <th className="phone-header">Phone</th>
                  <th className="date-header">Submitted</th>
                  <th className="actions-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedback.map((item, index) => (
                  <tr key={item._id || item.id}>
                    <td className="serial-cell">{index + 1}</td>
                    <td className="name-cell">{item.name}</td>
                    <td className="email-cell">{item.email}</td>
                    <td className="company-cell">{item.companyName}</td>
                    <td className="job-cell">{item.jobTitle}</td>
                    <td className="topic-cell">
                      <span
                        className="topic-badge"
                        style={{ backgroundColor: getTopicColor(item.topic) }}
                      >
                        {item.topic}
                      </span>
                    </td>
                    <td className="phone-cell">{item.phone || "N/A"}</td>
                    <td className="date-cell">
                      {formatDate(item.submittedAt)}
                    </td>
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <button
                          className="action-btn view-btn"
                          onClick={() => {
                            setSelectedFeedback(item);
                            setShowModal(true);
                          }}
                          title="View full response"
                        >
                          <Icons.Eye />
                          <span className="btn-text">View</span>
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteClick(item._id || item.id)}
                          title="Delete response"
                        >
                          <Icons.Trash2 />
                          <span className="btn-text">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Supply Chain Event Feedback Administration</h1>
        <p>Manage QR codes and export event feedback responses</p>
      </div>

      {renderTabNavigation()}

      {error && <div className="error-message">{error}</div>}

      <div className="admin-content">
        {currentAdminView === "qr" && renderQRView()}
        {currentAdminView === "responses" && renderResponsesView()}
      </div>

      {showModal && selectedFeedback && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Feedback Details</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="feedback-detail">
                <label>Name:</label>
                <span>{selectedFeedback.name}</span>
              </div>
              <div className="feedback-detail">
                <label>Email:</label>
                <span>{selectedFeedback.email}</span>
              </div>
              <div className="feedback-detail">
                <label>Company:</label>
                <span>{selectedFeedback.companyName}</span>
              </div>
              <div className="feedback-detail">
                <label>Job Title:</label>
                <span>{selectedFeedback.jobTitle}</span>
              </div>
              <div className="feedback-detail">
                <label>Topic:</label>
                <span
                  className="topic-badge"
                  style={{
                    backgroundColor: getTopicColor(selectedFeedback.topic),
                  }}
                >
                  {selectedFeedback.topic}
                </span>
              </div>
              <div className="feedback-detail">
                <label>Phone:</label>
                <span>{selectedFeedback.phone || "N/A"}</span>
              </div>
              <div className="feedback-detail">
                <label>Reason:</label>
                <span>{selectedFeedback.reason || "No reason provided"}</span>
              </div>
              <div className="feedback-detail">
                <label>Submitted:</label>
                <span>{formatDate(selectedFeedback.submittedAt)}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="modal-btn secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div
            className="modal-content delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="delete-icon">
                <Icons.Trash2 />
              </div>
              <h3>Confirm Delete</h3>
              <button className="modal-close-btn" onClick={cancelDelete}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this feedback?</p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="modal-btn danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
