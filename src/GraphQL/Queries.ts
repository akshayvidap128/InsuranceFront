import { gql } from "@apollo/client";

export const Questions = gql`
  query {
    getQuestions {
      uuid
      order
      sectionUuid
      questionString
      type
    }
  }
`;
