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

export const saveQuestionMutation = gql(`
  mutation createQuestion($applicationUuid:String!, $questionString: String!, $sectionUuid: String!, $type: String!, $role: String!) {
    createQuestion(applicationUuid: $applicationUuid,questionString: $questionString, sectionUuid: $sectionUuid, type: $type, role:$role)
    {
      uuid
    }
  }
`);

export const saveSectionMutation = gql(`
  mutation  createSection($applicationUuid: String!, $sectionName: String!){
     createSection(applicationUuid: $applicationUuid, sectionName: $sectionName )
     {
      uuid
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
