import type { Metadata } from "next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Palestinian Restaurant",
  description: "Palestinian restaurant menu",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Delicious+Handrawn&family=Fondamento&display=swap"
          rel="stylesheet"
        />

        {/* SKLIK Retargeting */}
        <Script
          id="sklik-loader"
          src="https://c.seznam.cz/js/rc.js"
          strategy="afterInteractive"
        />
        <Script id="sklik-retargeting" strategy="afterInteractive">
          {`
            window.sznIVA = window.sznIVA || {};
            window.sznIVA.IS = window.sznIVA.IS || { updateIdentities: function(){} };
            window.sznIVA.IS.updateIdentities({ eid: null });
            var retargetingConf = { rtgId: 1684242, consent: null };
            if (window.rc && window.rc.retargetingHit) {
              window.rc.retargetingHit(retargetingConf);
            }
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8QLZN9KKZ6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8QLZN9KKZ6');
          `}
        </Script>

        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18098152200"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18098152200');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '432632918949026');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=432632918949026&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
