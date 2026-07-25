
import { redirect } from 'next/navigation';

/**
 * REDIRECT TO HOME
 * The Discovery/Marketplace is now the primary landing page at the root.
 */
export default function RedirectToHome() {
  redirect('/');
}
