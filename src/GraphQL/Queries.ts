import { gql } from "@apollo/client";

export const Questions = gql`
  query {
    getQuestions {
      uuid
      order
      sectionUuid
      questionString
      type
      role
    }
  }
`;

export const UserQuestions = gql`
  query {
    getUserQuestions {
      uuid
      order
      sectionUuid
      questionString
      type
      role
    }
  }
`;

export const ManagerQuestions = gql`
  query {
    getManagerQuestions {
      uuid
      order
      sectionUuid
      questionString
      type
      role
    }
  }
`;

export const AppeaserQuestions = gql`
  query {
    getAppeaserQuestions {
      uuid
      order
      sectionUuid
      questionString
      type
      role
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

export const Sections = gql`
  query {
    getSections {
      name
      uuid
      order
    }
  }
`;

export const ViewApplicant = gql`
  query ($applicantUuid: String!) {
    getApplicantWithQuestion(applicantUuid: $applicantUuid) {
      name
      questions {
        questionString
        order
        answer {
          answer
        }
      }
    }
  }
`;
