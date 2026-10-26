import type { Metadata } from 'next';
import { FormBuilder } from '@/components/form-builder/FormBuilder';

export const metadata: Metadata = { title: 'New form' };

export default function NewFormPage() {
  return <FormBuilder />;
}
