import homeStyles from '~/styles/home.css';
import { Link } from '@remix-run/react';

export default function Index() {
  return (
    <main id='content'>
      <h1>A better way of keeping track of your notes</h1>
      <p>Try our erly beta and never lose track of your notes again!</p>
      <p id='cta'>
        <Link to='/notes'>Try now!</Link>
      </p>
    </main>
  );
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: homeStyles,
    },
  ];
}
