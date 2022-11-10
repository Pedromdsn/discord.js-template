import { EmbedBuilder, PermissionsBitField } from "discord.js";

import { Command, Config } from "../lib/commands";

const start: Command = (e) => {
	if (!e.channel) return

	const embed = new EmbedBuilder()

	embed.setTitle("Cargo")
	embed.setDescription("Seleciona o ano que estas a frequentar.")

	e.channel.send({ embeds: [embed] })
}

export const config: Config = {
  permissions: [PermissionsBitField.Flags.Administrator],
}

export default start
