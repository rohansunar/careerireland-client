// Zod validation schemas for Case Form Wizard
// Extends existing schema patterns with comprehensive validation

import { z } from "zod";

// Personal Information Schema
export const personalInfoSchema = z.object({
  surname: z.string().min(1, "Surname is required"),
  forename: z.string().min(1, "Forename is required"),
  otherName: z.string().optional(),
  dateOfBirth: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be dd/mm/yyyy"),
  gender: z.enum(["Male", "Female"], {
    required_error: "Gender is required",
  }),
  countryOfBirth: z.string().min(1, "Country of birth is required"),
  currentLocation: z.string().min(1, "Current location is required"),
  address: z.object({
    line1: z.string().min(1, "Address line 1 is required"),
    line2: z.string().optional(),
    line3: z.string().optional(),
    line4: z.string().optional(),
  }),
  contactPhone: z.string().min(1, "Contact phone is required"),
  contactEmail: z.string().email("Valid email is required"),
});

// Visa Details Schema
export const visaDetailsSchema = z.object({
  countryOfNationality: z.string().min(1, "Country of nationality is required"),
  reasonForTravel: z.string().min(1, "Reason for travel is required"),
  visaType: z.enum(["Short Stay (C)", "Long Stay (D)"], {
    required_error: "Visa type is required",
  }),
  journeyType: z.enum(["Single", "Multiple"], {
    required_error: "Journey type is required",
  }),
  purposeOfTravel: z.string().min(1, "Purpose of travel is required"),
  passportType: z.string().min(1, "Passport type is required"),
  passportNumber: z.string().min(1, "Passport number is required"),
  issuingAuthority: z.string().min(1, "Issuing authority is required"),
  dateOfIssue: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be dd/mm/yyyy"),
  dateOfExpiry: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be dd/mm/yyyy"),
  proposedDates: z.object({
    from: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be dd/mm/yyyy"),
    to: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be dd/mm/yyyy"),
  }),
}).refine((data) => {
  // Validate that passport is not expired
  const expiryDate = new Date(data.dateOfExpiry.split('/').reverse().join('-'));
  const today = new Date();
  return expiryDate > today;
}, {
  message: "Passport must not be expired",
  path: ["dateOfExpiry"],
}).refine((data) => {
  // Validate that proposed travel dates are logical
  const fromDate = new Date(data.proposedDates.from.split('/').reverse().join('-'));
  const toDate = new Date(data.proposedDates.to.split('/').reverse().join('-'));
  return fromDate < toDate;
}, {
  message: "Travel end date must be after start date",
  path: ["proposedDates", "to"],
});

// Additional Information Schema
export const additionalInfoSchema = z.object({
  previousApplications: z.boolean().optional(),
  refusedVisa: z.boolean().optional(),
  criminalConvictions: z.boolean().optional(),
  medicalConditions: z.boolean().optional(),
  additionalDetails: z.string().optional(),
});

// Document Upload Schema
export const documentUploadSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Document name is required"),
  type: z.string().min(1, "Document type is required"),
  size: z.number().positive("File size must be positive"),
  uploadDate: z.string(),
  status: z.enum(["uploaded", "verified", "rejected"]),
  checklistItemId: z.string().optional(),
});

// Review Data Schema
export const reviewDataSchema = z.object({
  completionPercentage: z.number().min(0).max(100),
  criticalItemsComplete: z.boolean(),
  recommendedItemsComplete: z.boolean(),
  readyForSubmission: z.boolean(),
});

// Complete Case Form Schema
export const caseFormSchema = z.object({
  personalInfo: personalInfoSchema,
  visaDetails: visaDetailsSchema,
  additionalInfo: additionalInfoSchema,
  documents: z.array(documentUploadSchema),
  reviewData: reviewDataSchema,
});

// Step-specific schemas for validation
export const step1Schema = personalInfoSchema;
export const step2Schema = visaDetailsSchema;
export const step3Schema = additionalInfoSchema;
export const step4Schema = z.object({
  documents: z.array(documentUploadSchema).min(1, "At least one document is required"),
});
export const step5Schema = caseFormSchema;

// Checkpoint Call Schema
export const checkpointCallSchema = z.object({
  callType: z.enum(["Video Consultation", "Phone Call", "In-Person Meeting"]),
  duration: z.string().min(1, "Duration is required"),
  specialist: z.string().min(1, "Specialist is required"),
  status: z.enum(["scheduled", "in_progress", "completed", "rescheduled"]),
  scheduledDate: z.string().min(1, "Scheduled date is required"),
  completedDate: z.string().optional(),
  agenda: z.array(z.string()),
  meetingLink: z.string().url().optional(),
  notes: z.string().optional(),
});

// Document Review Schema
export const documentReviewSchema = z.object({
  reviewedBy: z.string().min(1, "Reviewer is required"),
  reviewDate: z.string().min(1, "Review date is required"),
  status: z.enum(["under_review", "approved", "requires_changes", "rejected"]),
  feedback: z.array(z.object({
    documentId: z.string(),
    feedback: z.string(),
    severity: z.enum(["info", "warning", "error"]),
    actionRequired: z.boolean(),
  })),
  approvedDocuments: z.array(z.string()),
  rejectedDocuments: z.array(z.string()),
  missingDocuments: z.array(z.string()),
});

// Query Schema
export const querySchema = z.object({
  queryId: z.string(),
  fromDETE: z.boolean(),
  queryDate: z.string(),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["high", "medium", "low"]),
  dueDate: z.string(),
  status: z.enum(["pending", "answered", "overdue"]),
  attachments: z.array(z.string()).optional(),
});

// Query Response Schema
export const queryResponseSchema = z.object({
  queryId: z.string(),
  responseDate: z.string(),
  response: z.string().min(1, "Response is required"),
  attachments: z.array(z.string()).optional(),
  submittedBy: z.string().min(1, "Submitter is required"),
});

// Decision Schema
export const decisionSchema = z.object({
  decisionType: z.enum(["approved", "rejected", "conditional_approval"]),
  decisionDate: z.string(),
  decisionBy: z.string().min(1, "Decision maker is required"),
  reasonCode: z.string().optional(),
  conditions: z.array(z.string()).optional(),
  appealEligible: z.boolean(),
  appealDeadline: z.string().optional(),
});

// Appeal Schema
export const appealSchema = z.object({
  appealId: z.string(),
  appealDate: z.string(),
  appealReason: z.string().min(1, "Appeal reason is required"),
  status: z.enum(["submitted", "under_review", "decided"]),
  appealDecision: z.object({
    decision: z.enum(["upheld", "overturned", "dismissed"]),
    decisionDate: z.string(),
    reasoning: z.string().min(1, "Reasoning is required"),
  }).optional(),
});

// Checklist Item Schema
export const checklistItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["CRITICAL", "RECOMMENDED", "OPTIONAL", "ENHANCEMENT"]),
  status: z.enum(["pending", "completed", "not_applicable"]),
  documentType: z.string(),
  required: z.boolean(),
  conditional: z.boolean(),
  riskOfOmission: z.string(),
  specifications: z.object({
    acceptedFormats: z.array(z.string()),
    maxSize: z.string(),
    validityRequirement: z.string().optional(),
    minimumAmount: z.number().optional(),
    notes: z.string().optional(),
  }).optional(),
});

// Checklist Progress Schema
export const checklistProgressSchema = z.object({
  critical: z.array(checklistItemSchema),
  recommended: z.array(checklistItemSchema),
  optional: z.array(checklistItemSchema),
  enhancement: z.array(checklistItemSchema),
  completionPercentage: z.number().min(0).max(100),
});

// Extended Application Step Schema
export const extendedApplicationStepSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  phase: z.enum(["creation", "processing", "application", "timeline", "queries", "decision"]),
  status: z.enum(["pending", "in_progress", "completed", "blocked", "not_applicable"]),
  stepType: z.enum(["user_action", "professional_action", "system_action", "external_action"]),
  estimatedDuration: z.string().optional(),
  actualDuration: z.string().optional(),
  completedDate: z.string().optional(),
  scheduledDate: z.string().optional(),
  assignedTo: z.string().optional(),
  dependencies: z.array(z.number()).optional(),
  isConditional: z.boolean().optional(),
});

// Export type inference helpers
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type VisaDetailsFormData = z.infer<typeof visaDetailsSchema>;
export type AdditionalInfoFormData = z.infer<typeof additionalInfoSchema>;
export type CaseFormData = z.infer<typeof caseFormSchema>;
export type CheckpointCallFormData = z.infer<typeof checkpointCallSchema>;
export type DocumentReviewFormData = z.infer<typeof documentReviewSchema>;
export type QueryFormData = z.infer<typeof querySchema>;
export type QueryResponseFormData = z.infer<typeof queryResponseSchema>;
export type DecisionFormData = z.infer<typeof decisionSchema>;
export type AppealFormData = z.infer<typeof appealSchema>;
export type ChecklistItemFormData = z.infer<typeof checklistItemSchema>;
export type ChecklistProgressFormData = z.infer<typeof checklistProgressSchema>;
export type ExtendedApplicationStepFormData = z.infer<typeof extendedApplicationStepSchema>;
