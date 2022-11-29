import { gql } from "@apollo/client";

//  saveAnswers(data: {applicationUuid: "", answers: {questionUuid: ""}})
export const saveAnswersMutation = gql(`
  mutation saveAnswers($applicationUuid: String!,$answers:[SaveAnswerInput!]!) {
    saveAnswers(data:{applicationUuid:  $applicationUuid, answers:$answers }) {
      uuid
    }
  }
`);

export const saveApplicantMutation = gql(`
  mutation saveForm($name:String!,$uuid: String!) {
    submitApplicantForm(name: $name, uuid: $uuid)
    {
      name
    }
  }
`);

export const saveAnswersMutationOld = gql(`
  mutation saveAnswers($data:String!)
  {
    sendMessage(data: $data)
   
  }
`);
//  mutation saveAnswers(applicationUuid:$applicationUuid,$answers:[$answer: String!, $questionUuid: String!]) {
//     saveAnswers(data:{applicationUuid: $applicationUuid, answers: $answer }){
//       uuid
//     }

// const POST_APPLICATION_ANSWERS = graphql(`
//   mutation postAnswers($answers: JSON!) {
//     answers(answers: $answers) {
//       uuid
//       sectionUuid
//       subSectionUuid
//       order
//       type
//       graphqlQuery
//       answer {
//         uuid
//         answer
//         type
//         createdAt
//         updatedAt
//       }
//     }
//   }
// `);
