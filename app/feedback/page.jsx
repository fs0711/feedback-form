"use client";
import { useState } from 'react'

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    companyName: '',
    topicInterest: '',
    connectFor: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [showThankYou, setShowThankYou] = useState(false)

  const handleInputChangeEvent = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    
    try {
      // Map frontend field names to backend schema
      const submitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        jobTitle: formData.jobTitle,
        companyName: formData.companyName,
        topic: mapTopicValue(formData.topicInterest),
        reason: formData.connectFor || ''
      }
      
      const response = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      })
      
      if (response.ok) {
        const result = await response.json()
        setShowThankYou(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          jobTitle: '',
          companyName: '',
          topicInterest: '',
          connectFor: ''
        })
      } else {
        const error = await response.json()
        setSubmitMessage(`Error: ${error.error || 'Failed to submit feedback'}`)
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      setSubmitMessage('Error: Unable to submit feedback. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Helper function to map topic values
  const mapTopicValue = (topicInterest) => {
    const topicMap = {
      'manufacturing-assets': 'Manufacturing & Assets',
      'planning': 'Planning',
      'logistics': 'Logistics',
      'all-above': 'All of the above'
    }
    return topicMap[topicInterest] || topicInterest
  }

  const renderThankYouScreen = () => (
    <div className="main-container">
      <div className="header">
        <div className="hero-image-mobile">
          <img src="/hero-mobile.png" alt="Mobile Hero Image" />
        </div>
        <div className="hero-image-desktop">
          <img src="/hero-dektop.png" alt="Desktop Hero Image" />
        </div>
        <div className="header-content">
          <h1 className='ThankYou'>Thank You!</h1>
        </div>
      </div>
      
      <div className="form-container">
        <div className="thank-you-content">
          <div className="thank-you-icon">
            <img src="/thank-you-icon.svg" alt="Thank You" />
          </div>
          <h2>Your feedback has been submitted successfully!</h2>
          <p>Thank you! Your feedback has been received and will be used to enhance our SAP solutions.</p>
        </div>
      </div>
    </div>
  )

  const renderFeedbackForm = () => (
    <div className="">
      <div className="header">
        <div className="hero-image-mobile">
        <img src="/hero-mobile.png" alt="Mobile Hero Image" />
        </div>
        <div className="hero-image-desktop">
          <img src="/hero-dektop.png" alt="Desktop Hero Image" />
        </div>
        
      </div>
      
      <div className="form-container">
        <div className="form-header-section">
          <h5 className="form-title-blue">Please share your thoughts with us</h5>
          <div className="black-divider-line"></div>
        </div>
        <div className="feedback-form">
    <form onSubmit={handleSubmit}>
      <div className="form-section">
        <label htmlFor="name" className="field-heading">
          <span className="required"></span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name *"
          value={formData.name}
          onChange={handleInputChangeEvent}
          required
          className="form-input red-asterisk-placeholder"
        />
      </div>

      <div className="form-section">
        <label htmlFor="email" className="field-heading">
          <span className="required"></span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email *"
          value={formData.email}
          onChange={handleInputChangeEvent}
          required
          className="form-input red-asterisk-placeholder"
        />
      </div>

      <div className="form-section">
        <label htmlFor="phone" className="field-heading">
          <span className="optional"></span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Enter your phone number (Optional)"
          value={formData.phone}
          onChange={handleInputChangeEvent}
          className="form-input"
        />
      </div>

      <div className="form-section">
        <label htmlFor="jobTitle" className="field-heading">
          <span className="required"></span>
        </label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          placeholder="Enter your job title *"
          value={formData.jobTitle}
          onChange={handleInputChangeEvent}
          required
          className="form-input red-asterisk-placeholder"
        />
      </div>

      <div className="form-section">
        <label htmlFor="companyName" className="field-heading">
           <span className="required"></span>
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          placeholder="Enter your company name *"
          value={formData.companyName}
          onChange={handleInputChangeEvent}
          required
          className="form-input red-asterisk-placeholder"
        />
      </div>

      <div className="form-section">
        <h5 className="field-heading">
          What topic are you interested in ? <span className="required">*</span>
        </h5>
        <div className="radio-group">
          <div className="radio-option">
            <input
              type="radio"
              id="ai-in-hr"
              name="topicInterest"
              value="AI in HR"
              checked={formData.topicInterest === 'AI in HR'}
              onChange={handleInputChangeEvent}
              required
            />
            <label htmlFor="ai-in-hr">AI in HR</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="people-intelligence"
              name="topicInterest"
              value="People intelligence"
              checked={formData.topicInterest === 'People intelligence'}
              onChange={handleInputChangeEvent}
              required
            />
            <label htmlFor="people-intelligence">People intelligence</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="skill-based-organization"
              name="topicInterest"
              value="Skill Based Organization"
              checked={formData.topicInterest === 'Skill Based Organization'}
              onChange={handleInputChangeEvent}
              required
            />
            <label htmlFor="skill-based-organization">Skill Based Organization</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="all-above"
              name="topicInterest"
              value="All of the above"
              checked={formData.topicInterest === 'All of the above'}
              onChange={handleInputChangeEvent}
              required
            />
            <label htmlFor="all-above">All of the above</label>
          </div>
        </div>
      </div>

      <div className="form-section">
        <label htmlFor="connectFor" className="field-heading">
          Please let us know below, if there's something specific you'd like us to follow up on <span className="required">*</span>
        </label>
        <textarea
          id="connectFor"
          name="connectFor"
          value={formData.connectFor}
          onChange={handleInputChangeEvent}
          rows="4"
          // placeholder="Please share what you would like to connect with us about..."
          className="form-input wide-textarea"
        />
      </div>

      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>

      {submitMessage && (
        <div className={`message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
          {submitMessage}
        </div>
      )}
    </form>
  </div>
</div>
</div>
  )

  return (
    <div className="app">
      {showThankYou ? renderThankYouScreen() : renderFeedbackForm()}
    </div>
  )
}

export default FeedbackForm