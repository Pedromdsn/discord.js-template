import {
  APIApplicationCommandOption,
  ChatInputCommandInteraction,
  CommandInteraction,
  Interaction,
  PermissionsBitField
} from "discord.js";
import { readdirSync } from "fs";

export type Command = (event: CommandInteraction) => void

export interface Config {
	name?: string
	description?: string
	permissions?: PermissionsBitField[]
	options?: APIApplicationCommandOption[]
}

interface CommandBot {
	name: string
	description: string
	default_member_permissions: PermissionsBitField[]
	execute: Command
}

export const loadCommands = async () => {
	const commandFiles = readdirSync("./src/commands").filter((file) => file.endsWith(".ts"))

	const commands = [] as CommandBot[]
	for (const file of commandFiles) {
    const command = await import(`${process.cwd()}/src/commands/${file}`)
    
		const newCommand = {
			...command.config?.options,
			name: command.config?.name ?? file.split(".")[0],
			description: command.config?.description ?? "No description",
			default_member_permissions: command.config?.permissions ?? [],
			execute: command.default
		} as CommandBot

		if (commands.find((command) => command.name === newCommand.name)) {
			newCommand.name = file.split(".")[0]
    }
    
    newCommand.name = newCommand.name.toLowerCase()

		commands.push(newCommand)
	}

			const commandListWithOutExecute = commands.map(({ execute, ...rest }) => rest)



	return { commands, commandListWithOutExecute }
}

