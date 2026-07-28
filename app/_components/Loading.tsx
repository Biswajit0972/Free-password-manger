export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="flex flex-col items-center gap-6">
                {/* Logo */}
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl animate-pulse" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16 10V8a4 4 0 10-8 0v2m-1 0h10a1 1 0 011 1v8a1 1 0 01-1 1H7a1 1 0 01-1-1v-8a1 1 0 011-1z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Spinner */}
                <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-cyan-400" />
                </div>

                {/* Text */}
                <div className="space-y-2 text-center">
                    <h2 className="text-xl font-semibold tracking-wide text-white">
                        Unlocking Your Vault
                    </h2>

                    <p className="text-sm text-slate-400">
                        Preparing your encrypted passwords...
                    </p>
                </div>

                {/* Loading Dots */}
                <div className="flex gap-2">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                </div>
            </div>
        </div>
    );
}