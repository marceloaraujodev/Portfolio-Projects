import styled, {css} from "styled-components"
// import css from "styled-jsx/css";

export const StyleButton = css`
  border: 0;
  border-radius: 3px;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  svg{
    height: 18px;
    margin-right: 5px;
  }
  ${props => props.white && !props.outline && css`
    background-color: white;
    color: black;
  ` }
  ${props => props.white && props.outline && css`
    background-color: transparent;
    color: white;
    border: 1px solid white;
  ` }
  ${props => props.primary && css`
    background-color: ;
    background-color: #5542f6;
    border: 1px solid #5542f6;
  `}
  ${props => props.size === 'l' && css`
   font-size: 1.2rem;
   padding: 10px 20px;
   svg{
    height: 20px;
   }
   `}
`;

const StyledBtn = styled.button`
   ${StyleButton}
`;

export default function Button({children, ...all}) {
  return (
    <StyledBtn {...all}>{children}</StyledBtn>
  )
}
