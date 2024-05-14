import styled from "styled-components";

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;


export default function Content({children}) {
  return (
    <Vertical>
        {children}
    </Vertical>
  )
}
