import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;


export default function Layout({children}) {
  return (
    <Vertical>
      <Header />
        {children}
      <Footer />
    </Vertical>
  )
}
