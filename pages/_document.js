import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head><link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css"
          rel="stylesheet"
        /></Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <Script src="../path/to/flowbite/dist/flowbite.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></Script>
    </Html>
  )
}
