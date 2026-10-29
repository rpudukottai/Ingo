export const SERVICE_REQUIRED_OPTIONS = [
  'Logo Design',
  'Digital marketing',
  'Advertisement Shoot',
  'Video editing',
  'Content Creation',
  'Social media management',
  'Website Development',
  'Making ads',
] as const;

export type ServiceRequiredOption = (typeof SERVICE_REQUIRED_OPTIONS)[number];

export interface ContactFormValues {
  name: string;
  phone: string;
  email: string;
  serviceRequired: string;
  message: string;
}

export interface ContactFormValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormValues, string>>;
}

export function validateContactForm(
  values: ContactFormValues
): ContactFormValidationResult {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }

  const cleanedPhone = (values.phone || '').replace(/[^\d+]/g, '');
  if (cleanedPhone.length < 7) {
    errors.phone = 'Please enter a valid phone number.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email || !emailPattern.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (
    !values.serviceRequired ||
    !SERVICE_REQUIRED_OPTIONS.includes(
      values.serviceRequired as ServiceRequiredOption
    )
  ) {
    errors.serviceRequired = 'Please select a service required.';
  }

  if (!values.message || values.message.trim().length < 10) {
    errors.message = 'Please share a brief message (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
