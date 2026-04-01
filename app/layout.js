export const metadata = {
  title: 'React Native Docs — Türkçe',
  description: 'React Native geliştirici dokümantasyonu',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
