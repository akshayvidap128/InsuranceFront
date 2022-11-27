import { gql } from "@apollo/client";

export const saveAnswersMutation = gql`
  mutation saveAnswers(
    $answer: String!
    $questionUuid: String!
    $type: String!
  ) {
    saveAnswers(answer: $answer, questionUuid: $questionUuid, type: $type) {
      uuid
    }
  }
`;
