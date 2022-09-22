import { ResponseType } from "@microsoft/microsoft-graph-client";
import { CardFactory, TurnContext } from "botbuilder";
import {
  createMicrosoftGraphClient,
  TeamsFx,
} from "@microsoft/teamsfx";
import { SSOCommand } from "../helpers/botCommand";

export class ShowUserProfile extends SSOCommand {
  constructor() {
    super();
    this.matchPatterns = [/^\s*show\s*/];
    this.operationWithSSOToken = this.showUserInfo;
  }

  async showUserInfo(context: TurnContext, ssoToken: string) {
    await context.sendActivity("Retrieving user information from Microsoft Graph ...");

    // Call Microsoft Graph half of user
    const teamsfx = new TeamsFx().setSsoToken(ssoToken);
    const graphClient = createMicrosoftGraphClient(teamsfx, [
      "User.Read"
    ]);
   // const me = await graphClient.api("/me").get();
   const me = await graphClient.api('/me').get();
    if (me) {
      await context.sendActivity(
        `You're logged in as ${me.displayName} (${me.userPrincipalName})${
          me.jobTitle ? `; your job title is: ${me.jobTitle}` : ""
        }.`
      );

      

      // show user picture
      let photoBinary: ArrayBuffer;
      try {
        photoBinary = await graphClient
          .api("/me/photo/$value")
          .responseType(ResponseType.ARRAYBUFFER)
          .get();
      } catch {
        return;
      }

      const buffer = Buffer.from(photoBinary);
      const imageUri = "data:image/png;base64," + buffer.toString("base64");
    /*  const card = CardFactory.thumbnailCard(
        "Akshit",
        "Senior Software Engineer \n <p></p> akshitgupta@microsoft.com",
        null
      );*/
    //  const card = CardFactory.heroCard("Akshit Gupta","akshitgupta@microsoft.com");
   
      const card1 = CardFactory.heroCard("Prashant Tripathi",null,null, {
        text: "IP and Comp IDC Substrate 1190 <p></p> HYD SOHINI/Mobile <p></p><p></p>"+
        "His interests are as follows:"+
        "<ul>"+
        "<li>Substrate</li>"+
        "<li>Accomdation</li>"+
        "<li>Onboarding</li>"+
        "</ul>"
      });

      const card2 = CardFactory.heroCard("Harshikesh Kumar",null,null, {
        text: "IP and Comp IDC Substrate 1190 <p></p> HYD SOHINI/Mobile <p></p><p></p>"+
        "His interests are as follows:"+
        "<ul>"+
        "<li>Substrate</li>"+
        "<li>Mentorship</li>"+
        "<li>Tech</li>"+
        "</ul>"
      });

      const card3 = CardFactory.heroCard("Soumyajit Pal",null,null, {
        text: "IP and Comp IDC Substrate 1190 <p></p> HYD SOHINI/Mobile <p></p><p></p>"+
        "His interests are as follows:"+
        "<ul>"+
        "<li>Fun</li>"+
        "<li>Mentorship</li>"+
        "<li>Substrate</li>"+
        "</ul>"
      });


      await context.sendActivity({ attachments: [card1, card2, card3] });
    } else {
      await context.sendActivity(
        "Could not retrieve profile information from Microsoft Graph."
      );
    }


  }
}
