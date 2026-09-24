export type NavTab = 'home' | 'about' | 'courses' | 'campus' | 'faculty' | 'gallery' | 'admin' | 'tracker' | 'faculty_portal';

export type PortalMode = 'student' | 'faculty';

export type CourseCategory = 'pg_diploma' | 'short_term' | 'evening_weekend' | 'online_learning';

export interface CourseChapter {
  title: string;
  topics: string[];
}

export interface DurationLesson {
  lessonNumber: number;
  title: string;
  focus: string;
  topics: string[];
  handsOnDrill?: string;
}

export interface DurationTrackPeriod {
  period: string; // e.g., 'Week 1', 'Week 2' or 'Weekend 1 (Sat & Sun)'
  theme: string;
  lessons: DurationLesson[];
}

export interface DurationTrack {
  id: '2_weeks' | '4_weeks' | 'weekend';
  title: string;
  durationLabel: string;
  badge: string;
  schedule: string;
  fee: string;
  description: string;
  recommendedFor: string;
  scheduleBreakdown: DurationTrackPeriod[];
}

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  categoryName: string;
  duration: string;
  mode: string;
  deliveryFormat?: string;
  isOnline: boolean;
  eligibility: string;
  description: string;
  badge?: string;
  highlight: string;
  image: string;
  tools: string[];
  careerRoles: string[];
  keyModules: string[];
  chapters?: CourseChapter[];
  durationTracks?: DurationTrack[];
  fee: string;
  jayaTvHandsOn: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department?: 'News Department' | 'IT Department' | string;
  experience: string;
  expertise: string[];
  bio: string;
  image: string;
  networkCredit: string;
  email?: string;
  phone?: string;
  isCustomUploaded?: boolean;
}

export interface AlumniStory {
  id: string;
  name: string;
  courseName: string;
  batchYear: string;
  currentRole: string;
  company: string;
  testimonial: string;
  avatar: string;
  featuredWork: string;
}

export type AdmissionStatus = 
  | 'New Candidate'
  | 'Application Submitted'
  | 'Documents Under Review'
  | 'Faculty Interview Scheduled'
  | 'Studio Assessment'
  | 'Provisional Admission Offered'
  | 'Admission Confirmed'
  | 'Application On Hold';

export interface RegistrationRecord {
  id: string;
  academy: string;
  corporate_partner: string;
  full_name: string;
  email: string;
  phone: string;
  program_interest: string;
  qualification: string;
  timestamp: string;
  // Faculty Processing Fields:
  status?: AdmissionStatus;
  facultyRemarks?: string;
  interviewDate?: string;
  interviewVenue?: string;
  reviewedByFaculty?: string;
  updatedAt?: string;
  studioFloorAssigned?: string;
  scholarshipGranted?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'astra';
  text: string;
  timestamp: Date;
  registrationExtracted?: RegistrationRecord;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'student' | 'faculty' | 'admin';
  facultyDesignation?: string;
  facultyDepartment?: string;
  programInterest?: string;
  isEmailVerified: boolean;
  registeredAt: string;
  lastLoginAt: string;
  admissionStatus: AdmissionStatus;
  applicationId?: string;
  updatesSubscribed: boolean;
}

export interface FacultyProfile {
  id: string;
  facultyId: string;
  fullName: string;
  email: string;
  department: string;
  designation: string;
  avatar?: string;
  role: 'faculty';
  permissions: string[];
}

export interface CircularUpdate {
  id: string;
  title: string;
  category: 'Admissions' | 'Studio Broadcast' | 'Curriculum & Labs' | 'Placement & Network';
  date: string;
  summary: string;
  urgent?: boolean;
  publishedBy?: string;
}
