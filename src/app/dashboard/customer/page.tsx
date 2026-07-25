
import { redirect } from 'next/navigation';

/**
 * DELETED CUSTOMER DASHBOARD
 * Redirecting users to profile to prevent broken links.
 */
export default function DeletedCustomerDashboard() {
  redirect('/profile');
}
