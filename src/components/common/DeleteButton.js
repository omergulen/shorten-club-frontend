import styled from "@emotion/styled";

const DeleteButton = styled.span`
  cursor: pointer;
  float: right;
  font-weight: 800;
  position: absolute;
  right: 10px;
  top: 10px;

  &:hover {
    color: red;
  }
`;

export default DeleteButton;
