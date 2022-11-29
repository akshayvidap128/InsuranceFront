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

export const Applicants = gql`
  query {
    applicantForms {
      name
      uuid
      createdAt
    }
  }
`;
export const ViewApplicant = gql`
  query ($applicantUuid: String!) {
    getApplicantWithQuestion(applicantUuid: $applicantUuid) {
      name
      questions {
        questionString
        answer {
          answer
        }
      }
    }
  }
`;
