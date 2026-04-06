export const metadata = {
  title: "Briefd — AI-Powered Client Reporting for Agencies",
  description: "Briefd connects to Google Ads, Meta Ads, and GA4, then generates branded narrative client reports in under 45 seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400;1,9..144,700&display=swap" rel="stylesheet" />
        <style>{`
          @font-face {
            font-family: 'General Sans';
            src: local('General Sans'), local('-apple-system');
            font-display: swap;
          }
          *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
          body { -webkit-font-smoothing: antialiased; }
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none; appearance: none;
            width: 20px; height: 20px; border-radius: 50%;
            background: #1B4D3E; cursor: pointer; border: 3px solid #fff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          }
          input[type="range"]::-moz-range-thumb {
            width: 20px; height: 20px; border-radius: 50%;
            background: #1B4D3E; cursor: pointer; border: 3px solid #fff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
