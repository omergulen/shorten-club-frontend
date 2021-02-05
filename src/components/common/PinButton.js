import styled from "@emotion/styled";

const PinButton = styled.button`
  background-color: #333333;
  border: 0.0625rem solid #0000001a #0000001a #00000040;
  border-image: initial;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: auto;
  min-height: 3.2rem;
  min-width: 6.25rem;
  outline: 0;
  padding: 0.25rem 0.875rem;
  text-decoration: none;
  text-shadow: #00000040 0 -1px 0;
  width: 100%;

  &:active,
  &:hover {
    outline: 0;
  }

  &:active,
  &:focus {
      border: 0.125rem solid #000000;
  }

  &::after,
  &::before {
      box-sizing: inherit;
  }
`;

export default PinButton;
