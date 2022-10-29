import Bot from "./bot";
import { loadCommands } from "./features/commands";

const bot = Bot().start()

const main = async () => {
	const commands = await loadCommands()

	bot.on("ready", () => {
		if (!bot.user) return

		const commandList = commands.map(({ execute, ...rest }) => rest)

    bot.application?.commands.set(commandList)


		bot.user.setActivity("Netacad")
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
export { bot }
