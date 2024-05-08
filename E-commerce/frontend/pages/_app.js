import { Helmet } from 'react-helmet';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  body{
    padding: 0;
    margin: 0;
    font-weight: 400;
    font-family: "Roboto", sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}