import { DojoProvider } from "@dojoengine/core";
import { Account } from "starknet";
import * as models from "./models.gen";

export async function setupWorld(provider: DojoProvider) {

	const actions_offensivePhase = async (snAccount: Account) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "offensive_phase",
					calldata: [],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_fetchPlayableCharacters = async (snAccount: Account) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "fetch_playable_characters",
					calldata: [],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_fetchEnemies = async (snAccount: Account) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "fetch_enemies",
					calldata: [],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_defensivePhase = async (snAccount: Account) => {
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

	const actions_getUser = async (snAccount: Account, player: string) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "get_user",
					calldata: [player],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_createFirstEnemy = async (snAccount: Account, skin: string, health: number, attackPower: number) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "create_first_enemy",
					calldata: [skin, health, attackPower],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_createFirstCharacter = async (snAccount: Account, skin: string, health: number, attackPower: number) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "create_first_character",
					calldata: [skin, health, attackPower],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_createCharacter = async (snAccount: Account, skin: string, health: number, attackPower: number, level: number) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "create_character",
					calldata: [skin, health, attackPower, level],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_createEnemy = async (snAccount: Account, skin: string, health: number, attackPower: number, level: number) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "create_enemy",
					calldata: [skin, health, attackPower, level],
				},
				"lutte",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_spawn = async (snAccount: Account) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "spawn",
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
		},
	};
}