import "dotenv/config";

import { Client } from "discord.js";

const Bot = () => {
	const bot = new Client({
		intents: ["Guilds"],
	})

	const start = () => {
		bot.login(process.env.DISCORD_TOKEN)
		return bot
	}

	return { start }
}

export default Bot
