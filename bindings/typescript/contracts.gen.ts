import { DojoProvider, DojoCall } from "@dojoengine/core";
import { Account, AccountInterface, BigNumberish, CairoOption, CairoCustomEnum, ByteArray } from "starknet";
import * as models from "./models.gen";

export function setupWorld(provider: DojoProvider) {

	const build_actions_createCharacter_calldata = (skin: ByteArray, health: BigNumberish, attackPower: BigNumberish, level: BigNumberish, folder: ByteArray, idleSprite: ByteArray, attackSprite: ByteArray, mugshot: ByteArray, hitSprite: ByteArray, dashSprite: ByteArray, dodgeSprite: ByteArray): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "create_character",
			calldata: [skin, health, attackPower, level, folder, idleSprite, attackSprite, mugshot, hitSprite, dashSprite, dodgeSprite],
		};
	};

	const actions_createCharacter = async (snAccount: Account | AccountInterface, skin: ByteArray, health: BigNumberish, attackPower: BigNumberish, level: BigNumberish, folder: ByteArray, idleSprite: ByteArray, attackSprite: ByteArray, mugshot: ByteArray, hitSprite: ByteArray, dashSprite: ByteArray, dodgeSprite: ByteArray) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_createCharacter_calldata(skin, health, attackPower, level, folder, idleSprite, attackSprite, mugshot, hitSprite, dashSprite, dodgeSprite),
				"lutte",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_createEnemy_calldata = (skin: ByteArray, health: BigNumberish, attackPower: BigNumberish, level: BigNumberish, folder: ByteArray, idleSprite: ByteArray, attackSprite: ByteArray, mugshot: ByteArray, hitSprite: ByteArray, dashSprite: ByteArray, dodgeSprite: ByteArray): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "create_enemy",
			calldata: [skin, health, attackPower, level, folder, idleSprite, attackSprite, mugshot, hitSprite, dashSprite, dodgeSprite],
		};
	};

	const actions_createEnemy = async (snAccount: Account | AccountInterface, skin: ByteArray, health: BigNumberish, attackPower: BigNumberish, level: BigNumberish, folder: ByteArray, idleSprite: ByteArray, attackSprite: ByteArray, mugshot: ByteArray, hitSprite: ByteArray, dashSprite: ByteArray, dodgeSprite: ByteArray) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_createEnemy_calldata(skin, health, attackPower, level, folder, idleSprite, attackSprite, mugshot, hitSprite, dashSprite, dodgeSprite),
				"lutte",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_defensivePhase_calldata = (color: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "defensive_phase",
			calldata: [color],
		};
	};

	const actions_defensivePhase = async (snAccount: Account | AccountInterface, color: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_defensivePhase_calldata(color),
				"lutte",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_entityCount_calldata = (gid: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "entity_count",
			calldata: [gid],
		};
	};

	const actions_entityCount = async (gid: BigNumberish) => {
		try {
			return await provider.call("lutte", build_actions_entityCount_calldata(gid));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_fetchEnemies_calldata = (): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "fetch_enemies",
			calldata: [],
		};
	};

	const actions_fetchEnemies = async () => {
		try {
			return await provider.call("lutte", build_actions_fetchEnemies_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_fetchPlayableCharacters_calldata = (): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "fetch_playable_characters",
			calldata: [],
		};
	};

	const actions_fetchPlayableCharacters = async () => {
		try {
			return await provider.call("lutte", build_actions_fetchPlayableCharacters_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getUser_calldata = (player: string): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_user",
			calldata: [player],
		};
	};

	const actions_getUser = async (player: string) => {
		try {
			return await provider.call("lutte", build_actions_getUser_calldata(player));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_offensivePhase_calldata = (color: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "offensive_phase",
			calldata: [color],
		};
	};

	const actions_offensivePhase = async (snAccount: Account | AccountInterface, color: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_offensivePhase_calldata(color),
				"lutte",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_spawn_calldata = (skin: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "spawn",
			calldata: [skin],
		};
	};

	const actions_spawn = async (snAccount: Account | AccountInterface, skin: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_spawn_calldata(skin),
				"lutte",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_specialAttack_calldata = (): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "special_attack",
			calldata: [],
		};
	};

	const actions_specialAttack = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_specialAttack_calldata(),
				"lutte",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_updateEnemyAsset_calldata = (id: BigNumberish, skin: ByteArray, folder: ByteArray, idleSprite: ByteArray, attackSprite: ByteArray, mugshot: ByteArray, hitSprite: ByteArray): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "update_enemy_asset",
			calldata: [id, skin, folder, idleSprite, attackSprite, mugshot, hitSprite],
		};
	};

	const actions_updateEnemyAsset = async (snAccount: Account | AccountInterface, id: BigNumberish, skin: ByteArray, folder: ByteArray, idleSprite: ByteArray, attackSprite: ByteArray, mugshot: ByteArray, hitSprite: ByteArray) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_updateEnemyAsset_calldata(id, skin, folder, idleSprite, attackSprite, mugshot, hitSprite),
				"lutte",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_updatePlayerAsset_calldata = (id: BigNumberish, skin: ByteArray, folder: ByteArray, idleSprite: ByteArray, attackSprite: ByteArray, mugshot: ByteArray, hitSprite: ByteArray): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "update_player_asset",
			calldata: [id, skin, folder, idleSprite, attackSprite, mugshot, hitSprite],
		};
	};

	const actions_updatePlayerAsset = async (snAccount: Account | AccountInterface, id: BigNumberish, skin: ByteArray, folder: ByteArray, idleSprite: ByteArray, attackSprite: ByteArray, mugshot: ByteArray, hitSprite: ByteArray) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_updatePlayerAsset_calldata(id, skin, folder, idleSprite, attackSprite, mugshot, hitSprite),
				"lutte",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};



	return {
		actions: {
			createCharacter: actions_createCharacter,
			buildCreateCharacterCalldata: build_actions_createCharacter_calldata,
			createEnemy: actions_createEnemy,
			buildCreateEnemyCalldata: build_actions_createEnemy_calldata,
			defensivePhase: actions_defensivePhase,
			buildDefensivePhaseCalldata: build_actions_defensivePhase_calldata,
			entityCount: actions_entityCount,
			buildEntityCountCalldata: build_actions_entityCount_calldata,
			fetchEnemies: actions_fetchEnemies,
			buildFetchEnemiesCalldata: build_actions_fetchEnemies_calldata,
			fetchPlayableCharacters: actions_fetchPlayableCharacters,
			buildFetchPlayableCharactersCalldata: build_actions_fetchPlayableCharacters_calldata,
			getUser: actions_getUser,
			buildGetUserCalldata: build_actions_getUser_calldata,
			offensivePhase: actions_offensivePhase,
			buildOffensivePhaseCalldata: build_actions_offensivePhase_calldata,
			spawn: actions_spawn,
			buildSpawnCalldata: build_actions_spawn_calldata,
			specialAttack: actions_specialAttack,
			buildSpecialAttackCalldata: build_actions_specialAttack_calldata,
			updateEnemyAsset: actions_updateEnemyAsset,
			buildUpdateEnemyAssetCalldata: build_actions_updateEnemyAsset_calldata,
			updatePlayerAsset: actions_updatePlayerAsset,
			buildUpdatePlayerAssetCalldata: build_actions_updatePlayerAsset_calldata,
		},
	};
}