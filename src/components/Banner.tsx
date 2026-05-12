interface BannerProps {
  title: string;
  subtitle?: string;
}

export default function Banner({ title, subtitle }: BannerProps) {
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}
