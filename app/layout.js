import './globals.css';

export const metadata = {
  title: 'React Native · Türkçe Dokümantasyon',
  description: 'React Native ile mobil uygulama geliştirme rehberi — Türkçe',
  icons: { icon: 'https://reactnative.dev/img/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
