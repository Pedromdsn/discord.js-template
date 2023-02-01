import Bot from "@/bot"
import { loadCommands } from "@/lib/commands"
import { ActivityType } from "discord.js"

export const bot = Bot().start()

const main = async () => {
	const { commands, commandListWithOutExecute } = await loadCommands()

	bot.on("ready", () => {
		if (!bot.user) return

		bot.application?.commands.set(commandListWithOutExecute)

		bot.user.setActivity("🎮", { type: ActivityType.Playing })
		console.log("O bot esta na rede.")
	})

	bot.on("interactionCreate", async (interaction) => {
		if (!interaction.isCommand()) return

		const command = commands.find((command) => command.name === interaction.commandName)
		if (!command) return

		command.execute(interaction)
	})
}

main()
