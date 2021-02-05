import styled from "@emotion/styled";

const PinTextarea = styled.textarea`
  background-color: #FFFFFF;
  border: 0.125rem solid #CCCCCC;
  color: #333333;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.2rem;
  margin-bottom: 12px;
  min-width: 6.25rem;
  padding: 0.3rem 0.375rem;
  text-align: left;
  outline: none;
  width: 100%;

  transition: border 0.2s linear 0s, box-shadow 0.2s linear 0s;

  &:focus {
    outline: -webkit-focus-ring-color auto 0.3125rem;
    outline-offset: -0.125rem;
  }

  &:active,
  &:hover {
    outline: 0;
  }

  &:active,
  &:focus {
    border: 0.125rem solid #333333;
  }

  &::after,
  &::before {
    box-sizing: inherit;
  }

  &::-webkit-input-placeholder,
  &::-webkit-input-placeholder,
  &::placeholder {
    color: #B2B2B2;
    font-weight: 700;
    opacity: 1;
  }
`;

export default PinTextarea;
