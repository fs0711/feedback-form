// Schema validation for Feedback
export const feedbackSchema = {
  name: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    required: true
  },
  phone: {
    type: 'string',
    required: false
  },
  jobTitle: {
    type: 'string',
    required: true
  },
  companyName: {
    type: 'string',
    required: true
  },
  topic: {
    type: 'string',
    required: true,
    enum: ['AI in HR', 'People intelligence', 'Skill Based Organization', 'All of the above']
  },
  reason: {
    type: 'string',
    required: false
  },
  ipAddress: {
    type: 'string',
    required: false
  }
};

// Validation function
export function validateFeedback(data) {
  const errors = {};

  // Check required fields
  if (!data.name || typeof data.name !== 'string') {
    errors.name = 'Name is required';
  }
  if (!data.email || typeof data.email !== 'string') {
    errors.email = 'Email is required';
  }
  if (!data.jobTitle || typeof data.jobTitle !== 'string') {
    errors.jobTitle = 'Job title is required';
  }
  if (!data.companyName || typeof data.companyName !== 'string') {
    errors.companyName = 'Company name is required';
  }

  // Check topic enum
  const validTopics = ['AI in HR', 'People intelligence', 'Skill Based Organization', 'All of the above'];
  if (!data.topic || !validTopics.includes(data.topic)) {
    errors.topic = `Topic must be one of: ${validTopics.join(', ')}`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Sanitize data before saving
export function sanitizeFeedback(data) {
  return {
    name: data.name?.trim(),
    email: data.email?.trim().toLowerCase(),
    phone: data.phone?.trim() || null,
    jobTitle: data.jobTitle?.trim(),
    companyName: data.companyName?.trim(),
    topic: data.topic,
    reason: data.reason?.trim() || null,
    ipAddress: data.ipAddress || null,
    submittedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
}