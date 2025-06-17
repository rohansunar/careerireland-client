// Usage examples for the mock data system
// These examples show how to integrate mock data with components and hooks

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mockApi, mockData, useMockApi, useMockData } from './index';

// Example 1: Using mock API directly in a component
export const DirectMockUsageExample: React.FC = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await mockApi.immigration.getApplications();
        if (response.success) {
          setApplications(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div>Loading applications...</div>;

  return (
    <div>
      <h2>Visa Applications</h2>
      {applications.map((app: any) => (
        <div key={app.id} className="border p-4 mb-2">
          <h3>{app.caseType}</h3>
          <p>Status: {app.caseStatus}</p>
          <p>Progress: {app.completionPercentage}%</p>
        </div>
      ))}
    </div>
  );
};

// Example 2: Using mock data with TanStack Query
export const TanStackQueryExample: React.FC = () => {
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const response = await mockApi.immigration.getApplications();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Applications with TanStack Query</h2>
      {applications?.map((app: any) => (
        <div key={app.id} className="card">
          <h3>{app.userName} - {app.caseType}</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${app.completionPercentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Example 3: Using mock context provider
export const MockContextExample: React.FC = () => {
  const { api, isEnabled } = useMockApi();
  const { data } = useMockData();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (isEnabled) {
      // Use mock API
      api.user.getUserProfile('user-001').then(response => {
        if (response.success) {
          setUserProfile(response.data);
        }
      });
    } else {
      // Use real API
      fetch('/api/user/profile/user-001')
        .then(res => res.json())
        .then(setUserProfile);
    }
  }, [api, isEnabled]);

  return (
    <div>
      <div className="mb-4">
        <span className={`badge ${isEnabled ? 'badge-warning' : 'badge-success'}`}>
          {isEnabled ? 'Mock Mode' : 'Live Mode'}
        </span>
      </div>
      
      {userProfile && (
        <div className="user-profile">
          <h2>{userProfile.name}</h2>
          <p>{userProfile.email}</p>
          <p>Role: {userProfile.role}</p>
        </div>
      )}
      
      <div className="mt-4">
        <h3>Available Mock Data:</h3>
        <ul>
          <li>Visa Applications: {data.visaApplications.length}</li>
          <li>Training Programs: {data.trainingPrograms.length}</li>
          <li>Users: {data.users.length}</li>
          <li>Documents: {data.documents.length}</li>
        </ul>
      </div>
    </div>
  );
};

// Example 4: Form submission with mock API
export const FormSubmissionExample: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const response = await mockApi.common.submitContactForm(formData);
      if (response.success) {
        setResult('Form submitted successfully!');
        setFormData({ name: '', email: '', mobile: '', message: '' });
      } else {
        setResult('Failed to submit form. Please try again.');
      }
    } catch (error) {
      setResult('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
          className="form-input"
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
          className="form-input"
        />
      </div>
      
      <div>
        <label htmlFor="mobile">Mobile:</label>
        <input
          id="mobile"
          type="tel"
          value={formData.mobile}
          onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
          required
          className="form-input"
        />
      </div>
      
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          required
          className="form-textarea"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={submitting}
        className="btn btn-primary"
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
      
      {result && (
        <div className={`alert ${result.includes('success') ? 'alert-success' : 'alert-error'}`}>
          {result}
        </div>
      )}
    </form>
  );
};

// Example 5: Document upload with mock API
export const DocumentUploadExample: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState('personal');
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadResult(null);

    try {
      const response = await mockApi.document.uploadDocument(
        selectedFile, 
        category, 
        'Uploaded via example component'
      );
      
      if (response.success) {
        setUploadResult(`File uploaded successfully: ${response.data.name}`);
        setSelectedFile(null);
      } else {
        setUploadResult('Upload failed. Please try again.');
      }
    } catch (error) {
      setUploadResult('An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3>Document Upload Example</h3>
      
      <div>
        <label htmlFor="file">Select File:</label>
        <input
          id="file"
          type="file"
          onChange={handleFileSelect}
          accept=".pdf,.jpg,.jpeg,.png"
          className="form-input"
        />
      </div>
      
      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
        >
          <option value="personal">Personal</option>
          <option value="employment">Employment</option>
          <option value="education">Education</option>
          <option value="financial">Financial</option>
          <option value="legal">Legal</option>
        </select>
      </div>
      
      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="btn btn-primary"
      >
        {uploading ? 'Uploading...' : 'Upload Document'}
      </button>
      
      {uploadResult && (
        <div className={`alert ${uploadResult.includes('success') ? 'alert-success' : 'alert-error'}`}>
          {uploadResult}
        </div>
      )}
    </div>
  );
};

// Example 6: Testing component with mock data
export const TestableComponent: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await mockApi.user.getUserProfile(userId);
        if (response.success) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div data-testid="loading">Loading user...</div>;
  if (!user) return <div data-testid="error">User not found</div>;

  return (
    <div data-testid="user-profile">
      <h2 data-testid="user-name">{user.name}</h2>
      <p data-testid="user-email">{user.email}</p>
      <span data-testid="user-role" className={`badge badge-${user.role}`}>
        {user.role}
      </span>
    </div>
  );
};

export default {
  DirectMockUsageExample,
  TanStackQueryExample,
  MockContextExample,
  FormSubmissionExample,
  DocumentUploadExample,
  TestableComponent
};
