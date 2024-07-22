import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Nextjs } from "cdk-nextjs-standalone";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import "dotenv/config";

export class ClerkSpikeStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        if (
            !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
            !process.env.CLERK_SECRET_KEY
        ) {
            throw new Error(
                "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY must be set",
            );
        }
        const hostedZone = HostedZone.fromLookup(this, "HostedZone", {
            domainName: "sandbox.safeinsights.org",
        });

        const nextjs = new Nextjs(this, "Nextjs", {
            nextjsPath: "./",
            skipBuild: process.env.SKIP_BUILD === "t",

            // how to use lambda layer for secrets
            // it's unclear how to then pass them onto Clerk though since it reads from the ENV
            // overrides: {
            //     nextjsServer: {
            //         functionProps: {
            //             paramsAndSecrets: lambda.LayerVersion.fromLayerVersionArn(
            //                 this,
            //                 'ParametersAndSecretsLambdaExtension',
            //                 'arn:aws:lambda:eu-west-1:015030872274:layer:AWS-Parameters-and-Secrets-Lambda-Extension:10',
            //             )

            //         }
            //     }
            // },

            environment: {
                // this is semi-insecure, but it's just a demo
                // AWS Secrets Manager or SSM Parameter Store should be used to store secrets
                // this will reveal the secret in the CDK output and be visible in the AWS console for the lambda
                NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
                    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
                CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
            },
            domainProps: {
                domainName: "demo.sandbox.safeinsights.org",
                hostedZone,
            },
        });
        new cdk.CfnOutput(this, "CloudFrontDistributionDomain", {
            value: nextjs.distribution.distributionDomain,
        });
    }
}
