// app/not-found.tsx

import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6">
            <div className="max-w-md text-center">
                <h1 className="text-8xl font-extrabold tracking-tight text-primary">
                    404
                </h1>

                <h2 className="mt-4 text-3xl font-bold text-foreground">
                    Page Not Found
                </h2>

                <p className="mt-3 text-sm text-muted-foreground">
                    Sorry, the page you're looking for doesn't exist or may have been
                    moved.
                </p>

                <Link
                    href="/"
                    className="mt-8 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    ← Back to Home
                </Link>
            </div>
        </main>
    );
}