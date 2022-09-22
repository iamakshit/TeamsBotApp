import { BotCommand } from "../helpers/botCommand";
import { Utils } from "../helpers/utils";
const rawPostCard = require("../adaptiveCards/post.json");

export class PostCommand extends BotCommand {
  constructor() {
    super();
    this.matchPatterns = [/^\s*post\s*/];
  }

  async run(parameters: any): Promise<any> {
    const card = Utils.renderAdaptiveCard(rawPostCard);
    return await parameters.context.sendActivity({ attachments: [card] });
  }
}
