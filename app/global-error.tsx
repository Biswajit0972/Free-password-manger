// app/global-error.tsx

"use client";

import Link from "next/link";

export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
        <body className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="text-center">
            <h1 className="text-4xl font-bold">
                A critical error occurred
            </h1>

            <p className="mt-4 text-muted-foreground">
                Please try again or return to the homepage.
            </p>

            <div className="mt-8 flex justify-center gap-4">
                <button
                    onClick={reset}
                    className="rounded-lg bg-primary px-5 py-2.5 text-primary-foreground"
                >
                    Retry
                </button>

                <Link
                    href="/"
                    className="rounded-lg border px-5 py-2.5"
                >
                    Home
                </Link>
            </div>
        </div>
        </body>
        </html>
    );
}