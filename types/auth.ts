export type AccountType = 'shopper' | 'seller' | 'healthcare';

export interface HealthcareProfessional {
  type: 'healthcare';
  profession: string;
  specialization: string;
  licenseNumber: string;
  practiceLocation: string;
  yearsOfExperience: number;
  education: string;
  certifications: string[];
  services: string[];
  acceptedInsurance: string[];
  languages: string[];
}

export interface Seller {
  type: 'seller';
  businessName: string;
  businessType: string;
  categories: string[];
  storeLocation: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface Shopper {
  type: 'shopper';
  preferences?: string[];
  favoriteCategories?: string[];
}

export type UserProfile = HealthcareProfessional | Seller | Shopper;

export const healthcareProfessions = [
  'Doctor',
  'Nurse',
  'Dentist',
  'Physiotherapist',
  'Psychologist',
  'Optometrist',
  'Pharmacist',
  'Nutritionist',
  'Occupational Therapist',
  'Speech Therapist',
  'Chiropractor',
  'Podiatrist',
  'Alternative Medicine Practitioner',
  'Mental Health Professional',
  'Veterinarian'
];
