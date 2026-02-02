export function Logo({ className = "", size = 32 }: { className?: string, size?: number }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <img
                src="/logo.png"
                alt="Logo"
                className="object-contain"
                style={{ width: size + 8, height: size + 8 }}
            />
            <div className="flex flex-col">
                <span className="font-bold text-xl leading-none text-white tracking-tight">SubManager</span>
            </div>
        </div>
    );
}
