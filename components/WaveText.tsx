export default function WaveText ({
    text,
}: {
    text: string;
}) {
    return (
        <span>
            {text.split("").map((letter, index) => (
                <span
                key={index}
                className="wave-letter"
                style={{
                    animationDelay: `${index * 0.08}s`,
                }}
            >
                {letter === " " ? "\u00A0" : letter}
                </span>    
            ))}
        </span>
    )
}