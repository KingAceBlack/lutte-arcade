import { DojoProvider } from "@dojoengine/core";
import { Account, AccountInterface, BigNumberish } from "starknet";
import * as models from "./models.gen";

export async function setupWorld(provider: DojoProvider) {

	const actions_offensivePhase = async (snAccount: Account | AccountInterface, color: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "offensive_phase",
					calldata: [color],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_fetchPlayableCharacters = async () => {
		try {
			return await provider.call("lutte", {
				contractName: "actions",
				entrypoint: "fetch_playable_characters",
				calldata: [],
			});
		} catch (error) {
			console.error(error);
		}
	};

	const actions_fetchEnemies = async () => {
		try {
			return await provider.call("lutte", {
				contractName: "actions",
				entrypoint: "fetch_enemies",
				calldata: [],
			});
		} catch (error) {
			console.error(error);
		}
	};

	const actions_defensivePhase = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "defensive_phase",
					calldata: [],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_getUser = async (player: string) => {
		try {
			return await provider.call("lutte", {
				contractName: "actions",
				entrypoint: "get_user",
				calldata: [player],
			});
		} catch (error) {
			console.error(error);
		}
	};

	const actions_createFirstEnemy = async (snAccount: Account | AccountInterface, skin: string, health: BigNumberish, attackPower: BigNumberish, idleSprite: string, attackSprite: string, mugshot: string, hitSprite: string) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "create_first_enemy",
					calldata: [skin, health, attackPower, idleSprite, attackSprite, mugshot, hitSprite],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_createFirstCharacter = async (snAccount: Account | AccountInterface, skin: string, health: BigNumberish, attackPower: BigNumberish, idleSprite: string, attackSprite: string, mugshot: string, hitSprite: string) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "create_first_character",
					calldata: [skin, health, attackPower, idleSprite, attackSprite, mugshot, hitSprite],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_createCharacter = async (snAccount: Account | AccountInterface, skin: string, health: BigNumberish, attackPower: BigNumberish, level: BigNumberish, idleSprite: string, attackSprite: string, mugshot: string, hitSprite: string) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "create_character",
					calldata: [skin, health, attackPower, level, idleSprite, attackSprite, mugshot, hitSprite],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_createEnemy = async (snAccount: Account | AccountInterface, skin: string, health: BigNumberish, attackPower: BigNumberish, level: BigNumberish, idleSprite: string, attackSprite: string, mugshot: string, hitSprite: string) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "create_enemy",
					calldata: [skin, health, attackPower, level, idleSprite, attackSprite, mugshot, hitSprite],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_spawn = async (snAccount: Account | AccountInterface, skin: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "spawn",
					calldata: [skin],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_specialAttack = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "special_attack",
					calldata: [],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		actions: {
			offensivePhase: actions_offensivePhase,
			fetchPlayableCharacters: actions_fetchPlayableCharacters,
			fetchEnemies: actions_fetchEnemies,
			defensivePhase: actions_defensivePhase,
			getUser: actions_getUser,
			createFirstEnemy: actions_createFirstEnemy,
			createFirstCharacter: actions_createFirstCharacter,
			createCharacter: actions_createCharacter,
			createEnemy: actions_createEnemy,
			spawn: actions_spawn,
			specialAttack: actions_specialAttack,
		},
	};
}