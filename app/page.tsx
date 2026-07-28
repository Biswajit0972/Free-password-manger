import Image from "next/image";
import PasswordGenerator from "./_components/PasswordGenerator";

const steps = [
    ["01", "Create your vault", "Create a private vault first. It gives your passwords a secure place to live."],
    ["02", "Generate a password", "Create a long, unique password. Avoid names, dates, or anything easy to guess."],
    ["03", "Save it securely", "Click Save Password, then enter the website address and your username."],
    ["04", "Access when needed", "Your vault keeps the encrypted password ready when you need to sign in."],
];

const Page = () => (
    <div className="overflow-x-hidden">
        <section
            className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16 lg:px-12 lg:py-16">
            <div className="relative">
                <div
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1.5 text-sm font-semibold tracking-wide text-teal-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-300 shadow-[0_0_12px_#5eead4]"/> PRIVATE BY DESIGN
                </div>
                <h1 className="max-w-xl text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-6xl">Security
                    that feels <span className="text-teal-300">effortless.</span></h1><p
                className="mt-6 max-w-xl text-lg leading-8 text-slate-400">Create strong, unique passwords in seconds.
                Keep your digital life protected without compromising simplicity.</p>
                <div
                    className="mt-9 grid max-w-xl gap-3 sm:grid-cols-3">{[["Local-first", "Your data stays yours"], ["Zero tracking", "No ads, no profiling"], ["Built strong", "Modern encryption"]].map(([title, text]) =>
                    <div key={title} className="rounded-2xl border border-white/8 bg-white/[.035] p-4 backdrop-blur-sm">
                        <p className="text-base font-semibold text-slate-100">{title}</p><p
                        className="mt-1 text-sm leading-5 text-slate-400">{text}</p></div>)}</div>
                <div
                    className="mt-9 flex items-start gap-3 rounded-2xl border border-amber-200/10 bg-amber-100/[.035] p-4 text-base leading-7 text-slate-400">
                    <span className="mt-0.5 text-amber-300">✦</span><p><span className="font-semibold text-slate-200">Security reminder.</span> Never
                    reuse passwords or share them in messages. Use a unique password for every account and turn on
                    two-factor authentication when available.</p></div>
            </div>
            <div className="relative">
                <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-teal-400/10 blur-3xl"/>
                <PasswordGenerator/></div>
        </section>

        <section className="border-y border-white/[.07] bg-[#0a0f18]/70">
            <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
                <div className="max-w-2xl"><p className="text-sm font-semibold tracking-[.14em] text-teal-300">HOW TO
                    USE IT</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">A safer
                    password routine in four steps.</h2><p className="mt-4 text-base leading-7 text-slate-400">Start
                    with your vault, generate a secure password, and save the website details so you can return to them
                    with confidence.</p></div>
                <div className="mt-10 grid gap-4 md:grid-cols-2">{steps.map(([number, title, text]) => <article
                    key={number}
                    className="group rounded-2xl border border-white/[.08] bg-white/[.025] p-5 transition hover:-translate-y-0.5 hover:border-teal-300/25 hover:bg-teal-300/[.035]">
                    <span className="text-base font-bold text-teal-300">{number}</span><h3
                    className="mt-5 text-xl font-semibold text-slate-100">{title}</h3><p
                    className="mt-2 text-base leading-7 text-slate-400">{text}</p></article>)}</div>
            </div>
        </section>

        <section
            className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-12 lg:py-24">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c121d]"><Image
                src="/vault-security-illustration.png" alt="Encrypted vault protecting your passwords" width={1024}
                height={1024} className="h-auto w-full object-cover" priority/></div>
            <div><p className="text-sm font-semibold tracking-[.14em] text-teal-300">WHY USE FREEPASSWORD</p><h2
                className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Your password should be yours
                alone.</h2>
                <div
                    className="mt-7 space-y-5">{[["Zero-knowledge by design", "Your secret is handled on your device. We are designed so the service does not need to know your password."], ["Encrypted before storage", "The backend is used to store encrypted data—not readable passwords."], ["Built for breach resilience", "Even if stored data is exposed, encryption helps keep your password unreadable to attackers."], ["Only you unlock it", "Your master password is the key to accessing the passwords in your vault."]].map(([title, text]) =>
                    <div key={title} className="flex gap-3"><span
                        className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-300/10 text-sm text-teal-300">✓</span>
                        <p className="text-base leading-7 text-slate-400"><span
                            className="font-semibold text-slate-200">{title}.</span> {text}</p></div>)}</div>
            </div>
        </section>

        <footer className="border-t border-white/[.07] bg-[#070a10]">
            <div
                className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
                <div><p className="font-semibold text-slate-200">Free<span className="text-teal-300">Password</span></p>
                    <p className="mt-1 text-xs text-slate-500">Private by design. Strong by default.</p></div>
                <p className="text-xs text-slate-500">© {new Date().getFullYear()} FreePassword · Built for safer
                    everyday browsing.</p></div>
        </footer>
    </div>
);

export default Page;
