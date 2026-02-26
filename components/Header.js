import Link from 'next/link';

function handleLogout() {
  fetch('/api/logout', { method: 'POST' }).then(() => {
    window.location.href = '/login';
  });
}

export default function Header({ title }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
        <nav style={{ display: 'flex', gap: '16px' }}>
          <Link href="/" style={{ color: '#1565c0', fontWeight: 'bold', textDecoration: 'none', fontSize: '1rem' }}>
            Form
          </Link>
          <Link href="/preview" style={{ color: '#1565c0', fontWeight: 'bold', textDecoration: 'none', fontSize: '1rem' }}>
            Preview
          </Link>
          <Link href="/history" style={{ color: '#1565c0', fontWeight: 'bold', textDecoration: 'none', fontSize: '1rem' }}>
            History
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            color: '#666',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textDecoration: 'underline',
            padding: 0,
          }}
        >
          Sign Out
        </button>
      </div>
      <h1 className="title">{title}</h1>
      {/*
      <p>
        Hi 👋! This template gives you a{" "}
        <a href="https://nextjs.org/">Next.js</a> app with the scaffolding for{" "}
        <a href="https://www.netlify.com/products/functions/">
          Netlify Functions
        </a>
        , <a href="https://www.netlify.com/products/forms/">Forms</a>, and{" "}
        <a href="https://docs.netlify.com/routing/redirects/">Redirects</a>. Our
        aim was to give you the code you would need to hit the ground running
        with a few fun features.
      </p>

      <p>
        You can find the code for this project on GitHub at{" "}
        <a href="https://github.com/netlify-templates/nextjs-toolbox">
          https://github.com/netlify-templates/nextjs-toolbox
        </a>
        ! Happy coding!
      </p>
      */}
    </>
  );
}
