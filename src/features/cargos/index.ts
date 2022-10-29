import { ReactionRole } from "discordjs-reaction-role";

import { bot } from "../..";

new ReactionRole(bot, [
	{ messageId: "12341234", reaction: "🔔", roleId: "5959859595" }, // Basic usage
	{ messageId: "12341234", reaction: "✅", roleId: "5959859598" }, // Multiple reactions per message!
	{ messageId: "12341234", reaction: "784536908345", roleId: "5959859598" }, // Custom emoji by ID
	{ messageId: "12341234", reaction: "worry", roleId: "5959859598" } // Custom emoji by emoji name
])
