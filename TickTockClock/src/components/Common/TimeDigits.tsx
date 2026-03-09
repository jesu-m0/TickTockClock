interface TimeDigitsProps {
      value: string;
      className?: string;
}

const TimeDigits: React.FC<TimeDigitsProps> = ({ value, className }) => (
      <p className={className}>
            {value.split('').map((char, i) => (
                  <span
                        key={i}
                        style={{
                              display: 'inline-block',
                              width: char === ':' ? '0.6ch' : '1ch',
                              textAlign: 'center',
                        }}
                  >
                        {char}
                  </span>
            ))}
      </p>
);

export default TimeDigits;
