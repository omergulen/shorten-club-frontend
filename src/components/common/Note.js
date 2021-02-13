import styled from "@emotion/styled";
import { EditTextarea } from 'react-edit-text';

const Note = styled(EditTextarea)`
  color: #5a5656;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4rem;
  padding: 0.3rem 0.2rem;
  width: 100%;
  word-wrap: break-word;
`;

export default Note;
