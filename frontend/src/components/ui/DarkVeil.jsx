import React from 'react';

const DarkVeil = ({
    hueShift = 0,
    noiseIntensity = 0.02,
    scanlineIntensity = 0,
    speed = 0.8,
    scanlineFrequency = 0,
    warpAmount = 0,
    resolutionScale = 1
}) => {
    return (
        <div
            className="dark-veil-container"
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                position: 'relative',
                overflow: 'hidden',
                '--hue-shift': `${hueShift}deg`,
                '--noise-opacity': noiseIntensity,
                '--scanline-opacity': scanlineIntensity,
                '--anim-speed': `${2 / speed}s`
            }}
        >
            {/* Gradient Background with Hue Shift */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, #4a00e0 0%, #8e2de2 50%, #000000 100%)',
                    filter: `hue-rotate(${hueShift}deg)`,
                    animation: speed > 0 ? `hueRotate var(--anim-speed) linear infinite` : 'none',
                    opacity: 0.6
                }}
            />

            {/* Noise Layer */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='${noiseIntensity}'/%3E%3C/svg%3E")`,
                    opacity: noiseIntensity * 20, // Scale up for visibility
                    mixBlendMode: 'overlay'
                }}
            />

            {/* Scanlines Layer */}
            {scanlineIntensity > 0 && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))',
                        backgroundSize: '100% 4px',
                        opacity: scanlineIntensity
                    }}
                />
            )}

            <style jsx>{`
                @keyframes hueRotate {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default DarkVeil;