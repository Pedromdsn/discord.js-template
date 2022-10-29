import { APIApplicationCommandOption, ChatInputCommandInteraction, Interaction } from "discord.js";
import { readdirSync } from "fs";

export type Command = (event: ChatInputCommandInteraction) => void

export interface Config {
	name?: string
  description?: string
	options?: APIApplicationCommandOption[]
}

interface CommandBot {
	name: string
	description: string
	execute: (interaction: Interaction) => void
}

export const loadCommands = async () => {
	const commandFiles = readdirSync("./src/commands").filter((file) => file.endsWith(".ts"))

	const commands = [] as CommandBot[]
	for (const file of commandFiles) {
    const command = await import(`${process.cwd()}/src/commands/${file}`)
    
		const newCommand = {
			...command.config,
			name: command.config?.name ?? file.split(".")[0],
			description: command.config?.description ?? "No description",
			execute: command.default
		} as CommandBot

		if (commands.find((command) => command.name === newCommand.name)) {
			newCommand.name = file.split(".")[0]
    }
    
    newCommand.name = newCommand.name.toLowerCase()

		commands.push(newCommand)
	}

	return commands
}

