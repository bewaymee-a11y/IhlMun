import React from 'react';

const DarkVeil = ({
    className = "",
    children,
    ...props
}) => {
    return (
        <div
            className={`dark-veil-container relative w-full h-full overflow-hidden bg-slate-950 ${className}`}
            {...props}
        >
            {/* Base dark blue background */}
            <div className="absolute inset-0 bg-[#0A1628]" />

            {/* Aurora Layers (Blue, Cyan, Violet Northern Lights) */}
            <div className="absolute inset-0 opacity-60 mix-blend-screen">
                {/* Layer 1: Deep Blue/Indigo moving slowly */}
                <div
                    className="absolute top-[-50%] left-[-20%] w-[180%] h-[180%] animate-aurora-1 opacity-70 blur-[80px]"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.8), transparent 60%)', // Secondary blue
                    }}
                />

                {/* Layer 2: Bright Cyan/Teal accents (Brighter Northern Lights feel) */}
                <div
                    className="absolute top-[-30%] right-[-20%] w-[150%] h-[150%] animate-aurora-2 opacity-50 blur-[100px]"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.6), transparent 50%)', // Cyan-500
                    }}
                />

                {/* Layer 3: Purple/Violet undertones */}
                <div
                    className="absolute bottom-[-40%] left-[-10%] w-[160%] h-[160%] animate-aurora-3 opacity-40 blur-[90px]"
                    style={{
                        background: 'radial-gradient(circle at 60% 40%, rgba(124, 58, 237, 0.5), transparent 50%)', // Violet-600
                    }}
                />
            </div>

            {/* Scanlines (optional, subtle) */}
            <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))',
                    backgroundSize: '100% 4px',
                }}
            />

            {children}

            <style jsx>{`
                @keyframes aurora-1 {
                    0% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(5%, 2%) scale(1.1); }
                    66% { transform: translate(-2%, 5%) scale(0.95); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                @keyframes aurora-2 {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(-5%, 5%) rotate(5deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
                @keyframes aurora-3 {
                    0% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(5%, -5%) scale(1.1); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                .animate-aurora-1 { animation: aurora-1 20s infinite ease-in-out alternate; }
                .animate-aurora-2 { animation: aurora-2 25s infinite ease-in-out alternate; }
                .animate-aurora-3 { animation: aurora-3 30s infinite ease-in-out alternate; }
            `}</style>
        </div>
    );
};

export default DarkVeil;