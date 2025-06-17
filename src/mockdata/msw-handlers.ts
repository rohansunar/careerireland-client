// Mock Service Worker (MSW) handlers for API mocking in tests and development
import { http, HttpResponse } from 'msw';
import { mockApi, mockData, mockUtils } from './index';

const API_BASE_URL = 'http://localhost:3000/api';

export const handlers = [
  // Authentication endpoints
  http.post(`${API_BASE_URL}/user/login`, async ({ request }) => {
    const { email, password } = await request.json() as { email: string; password: string };
    
    if (mockUtils.simulateNetworkError()) {
      return HttpResponse.json(
        { error: true, message: 'Network error' },
        { status: 500 }
      );
    }
    
    await mockUtils.delay();
    const response = await mockApi.user.login(email, password);
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 400 });
    }
  }),

  http.post(`${API_BASE_URL}/user/register`, async ({ request }) => {
    const userData = await request.json() as { name: string; email: string; password: string };
    
    await mockUtils.delay();
    const response = await mockApi.user.register(userData);
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 400 });
    }
  }),

  http.post(`${API_BASE_URL}/user/verify`, async ({ request }) => {
    const { token, otp } = await request.json() as { token: string; otp: string };
    
    await mockUtils.delay();
    const response = await mockApi.user.verifyEmail(token, otp);
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 400 });
    }
  }),

  http.post(`${API_BASE_URL}/user/forgot-password`, async ({ request }) => {
    const { email } = await request.json() as { email: string };
    
    await mockUtils.delay();
    const response = await mockApi.user.forgotPassword(email);
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 400 });
    }
  }),

  // Immigration endpoints
  http.get(`${API_BASE_URL}/immigration/applications`, async () => {
    await mockUtils.delay();
    const response = await mockApi.immigration.getApplications();
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 500 });
    }
  }),

  http.get(`${API_BASE_URL}/immigration/applications/:id`, async ({ params }) => {
    const { id } = params;
    
    await mockUtils.delay();
    const response = await mockApi.immigration.getApplication(id as string);
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 404 });
    }
  }),

  http.put(`${API_BASE_URL}/immigration/applications/:id/steps/:stepId`, async ({ params, request }) => {
    const { id, stepId } = params;
    const updates = await request.json();
    
    await mockUtils.delay();
    const response = await mockApi.immigration.updateApplicationStep(id as string, Number(stepId));
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 400 });
    }
  }),

  // Training endpoints
  http.get(`${API_BASE_URL}/training/programs`, async () => {
    await mockUtils.delay();
    const response = await mockApi.training.getPrograms();
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 500 });
    }
  }),

  http.get(`${API_BASE_URL}/training/programs/:id`, async ({ params }) => {
    const { id } = params;
    
    await mockUtils.delay();
    const response = await mockApi.training.getProgram(id as string);
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 404 });
    }
  }),

  http.post(`${API_BASE_URL}/payment/training`, async ({ request }) => {
    const { trainingId } = await request.json() as { trainingId: string };
    
    await mockUtils.delay();
    const response = await mockApi.training.enrollInProgram(trainingId, 'user-001');
    
    if (response.success) {
      return HttpResponse.json({ url: response.data.paymentUrl });
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 400 });
    }
  }),

  // Document endpoints
  http.get(`${API_BASE_URL}/documents`, async ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    
    await mockUtils.delay();
    const response = await mockApi.document.getDocuments(category || undefined);
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 500 });
    }
  }),

  http.post(`${API_BASE_URL}/documents/upload`, async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const notes = formData.get('notes') as string;
    
    await mockUtils.delay(1000, 3000); // Longer delay for file upload
    const response = await mockApi.document.uploadDocument(file, category, notes);
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 400 });
    }
  }),

  http.delete(`${API_BASE_URL}/documents/:id`, async ({ params }) => {
    const { id } = params;
    
    await mockUtils.delay();
    const response = await mockApi.document.deleteDocument(id as string);
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 404 });
    }
  }),

  // Contact form endpoint
  http.post(`${API_BASE_URL}/contact-us`, async ({ request }) => {
    const formData = await request.json() as {
      name: string;
      email: string;
      mobile: string;
      message: string;
    };
    
    await mockUtils.delay();
    const response = await mockApi.common.submitContactForm(formData);
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 400 });
    }
  }),

  // Service packages endpoint
  http.get(`${API_BASE_URL}/services/packages`, async () => {
    await mockUtils.delay();
    const response = await mockApi.common.getServicePackages();
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 500 });
    }
  }),

  // Application tracking endpoints
  http.get(`${API_BASE_URL}/applications/:caseId/tracking`, async ({ params }) => {
    const { caseId } = params;
    
    await mockUtils.delay();
    const response = await mockApi.application.getApplicationTracking(caseId as string);
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 404 });
    }
  }),

  http.get(`${API_BASE_URL}/applications/:caseId/status-updates`, async ({ params }) => {
    const { caseId } = params;
    
    await mockUtils.delay();
    const response = await mockApi.application.getStatusUpdates(caseId as string);
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 404 });
    }
  }),

  // User profile endpoints
  http.get(`${API_BASE_URL}/user/profile/:userId`, async ({ params }) => {
    const { userId } = params;
    
    await mockUtils.delay();
    const response = await mockApi.user.getUserProfile(userId as string);
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 404 });
    }
  }),

  http.put(`${API_BASE_URL}/user/profile/:userId`, async ({ params, request }) => {
    const { userId } = params;
    const updates = await request.json();
    
    await mockUtils.delay();
    const response = await mockApi.user.updateUserProfile(userId as string, updates);
    
    if (response.success) {
      return HttpResponse.json(response.data);
    } else {
      return HttpResponse.json(response, { status: response.statusCode || 404 });
    }
  }),

  // Fallback handler for unmatched requests
  http.all('*', ({ request }) => {
    console.warn(`Unhandled ${request.method} request to ${request.url}`);
    return HttpResponse.json(
      { error: true, message: 'API endpoint not found' },
      { status: 404 }
    );
  })
];

export default handlers;
