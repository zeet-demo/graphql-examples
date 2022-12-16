import { GraphQLClient, gql } from 'graphql-request'

const API_KEY = "wTe6GAtAR3WqdUCcTq4KoFoIWiRTubfWVjSKFDFGv3e4dwxCQKj5jYvDdUsLW2HC"
const USER_ID = "0e9d4ac7-2fb1-4f94-a2cd-cf8054dfa8d9"

async function main () {
  // define your HTTP endpoint
  const endpoint = "https://anchor.zeet.co/graphql";
  
  // create new GraphQLClient object
  const graphQLClient = new GraphQLClient (endpoint, {
      headers : {
          authorization : 'Bearer ' + API_KEY,
      },
  });

  // craft a new gql req
  const req = gql`
    mutation {
      createProjectGit(input: {
        id: $user_id,
        name: "my-new-app"
        projectName: "nodel-express-demo-123",
        environmentName: "production"
        url: "https://github.com/zeet-demo/node-express-demo",
        deployTarget: {
          deployTarget: "AWS_SAM",
          region: "us-east-2",
          awsAccountID: $aws_id,
        },
        build: {
          buildType: "NODE",
          nodejsVersion: "14",
        },
        envs: [
          {
            name: "MY_API_KEY",
            value: "1234567890",
            sealed: false,
          },
        ],
        ports: [
          {
            port: "3000",
            protocol: "tcp",
            public: true,
          },
        ],
      }) {
        id
      }
    }
  `

  // define the variables that we are using in the reqest
  const variables = {
    user_id: "MY_ZEET_USER_ID",
    aws_id:  "MY_ZEET_AWS_ID",
  }

  // send the request
  const data = await graphQLClient.request(req);

  // print the data received
  console.log (JSON.stringify(data, undefined, 4));

}

await main()