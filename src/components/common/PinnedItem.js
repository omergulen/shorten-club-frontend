import styled from "@emotion/styled";

const PinnedItem = styled.li`
  background-color: rgb(255, 255, 255);
  border: 0.125rem solid rgb(204, 204, 204);
  line-height: 3rem;
  list-style: none;
  padding: 0.25rem 0.375rem;
  transition: border 0.2s linear 0s, box-shadow 0.2s linear 0s;
`;

export default PinnedItem;
