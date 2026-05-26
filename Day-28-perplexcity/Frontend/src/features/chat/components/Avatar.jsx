const COLORS = [
  { bg: '#FF6B6B', text: '#fff' },
  { bg: '#4ECDC4', text: '#fff' },
  { bg: '#45B7D1', text: '#fff' },
  { bg: '#96CEB4', text: '#fff' },
  { bg: '#6C5CE7', text: '#fff' },
  { bg: '#F0A500', text: '#fff' },
  { bg: '#E17055', text: '#fff' },
  { bg: '#00B894', text: '#fff' },
];

function getColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

export default function Avatar({ name, src, size = 40 }) {
  const color = getColor(name || '');
  const initials = getInitials(name || '');

  // If user has uploaded a real photo, show that instead
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color.bg,
        color: color.text,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.4,
        fontWeight: 'bold',
        userSelect: 'none',
        flexShrink: 0,
      }}
      title={name}
    >
      {initials}
    </div>
  );
}