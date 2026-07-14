export default function SocialLogin() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <form action="/api/auth/google" method="GET" className="w-full">
        <button
          type="submit"
          className="flex items-center justify-center space-x-2 py-3 px-4 glass-card rounded-xl hover:bg-surface-container-high transition-all active:scale-95 w-full"
        >
          <GoogleIcon />
          <span className="font-medium text-sm">Google</span>
        </button>
      </form>
      <button
        type="button"
        disabled
        className="flex items-center justify-center space-x-2 py-3 px-4 glass-card rounded-xl opacity-50 cursor-not-allowed w-full"
      >
        <AppleIcon />
        <span className="font-medium text-sm">Apple</span>
      </button>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="w-5 h-5 text-on-surface" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.05 20.28c-.98.95-2.05 1.88-3.4 1.9-1.34.02-1.78-.79-3.32-.79-1.54 0-2.02.77-3.3.8-1.34.03-2.58-.99-3.57-1.95-2.01-1.95-3.55-5.51-1.51-9.05 1.01-1.76 2.82-2.88 4.79-2.9 1.49-.03 2.9.99 3.81.99.91 0 2.62-1.22 4.41-1.04.75.03 2.85.3 4.2 2.26-3.1 1.76-2.6 5.61.1 7.22-1.04 2.56-2.23 4.56-4.11 6.56zM15.53 4.07c-.79.95-2.01 1.65-3.23 1.56-.16-1.22.41-2.47 1.2-3.41 1.01-1.18 2.37-1.93 3.46-1.9.12 1.29-.64 2.8-1.43 3.75z" />
    </svg>
  );
}
