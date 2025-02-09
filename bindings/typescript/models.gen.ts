import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

import type { BigNumberish } from 'starknet';

type RemoveFieldOrder<T> = T extends object
  ? Omit<
      {
        [K in keyof T]: T[K] extends object ? RemoveFieldOrder<T[K]> : T[K];
      },
      'fieldOrder'
    >
  : T;
// Type definition for `lutte::models::player::EnemiesListValue` struct
export interface EnemiesListValue {
	fieldOrder: string[];
	enemies: Array<UEnemy>;
}
export type InputEnemiesListValue = RemoveFieldOrder<EnemiesListValue>;

// Type definition for `lutte::models::player::EnemiesList` struct
export interface EnemiesList {
	fieldOrder: string[];
	id: BigNumberish;
	enemies: Array<UEnemy>;
}
export type InputEnemiesList = RemoveFieldOrder<EnemiesList>;

// Type definition for `lutte::models::player::UEnemy` struct
export interface UEnemy {
	fieldOrder: string[];
	uid: BigNumberish;
	health: BigNumberish;
	max_health: BigNumberish;
	attack_power: BigNumberish;
	special_attack: boolean;
	level: BigNumberish;
	skin: string;
	idle_sprite: string;
	attack_sprite: string;
	mugshot: string;
	hit_sprite: string;
}
export type InputUEnemy = RemoveFieldOrder<UEnemy>;

// Type definition for `lutte::models::player::EnemyValue` struct
export interface EnemyValue {
	fieldOrder: string[];
	health: BigNumberish;
	attack_power: BigNumberish;
	special_attack: boolean;
	level: BigNumberish;
}
export type InputEnemyValue = RemoveFieldOrder<EnemyValue>;

// Type definition for `lutte::models::player::Enemy` struct
export interface Enemy {
	fieldOrder: string[];
	uid: BigNumberish;
	health: BigNumberish;
	attack_power: BigNumberish;
	special_attack: boolean;
	level: BigNumberish;
}
export type InputEnemy = RemoveFieldOrder<Enemy>;

// Type definition for `lutte::models::player::PlayableCharacterList` struct
export interface PlayableCharacterList {
	fieldOrder: string[];
	id: BigNumberish;
	players: Array<PlayableCharacter>;
}
export type InputPlayableCharacterList = RemoveFieldOrder<PlayableCharacterList>;

// Type definition for `lutte::models::player::PlayableCharacter` struct
export interface PlayableCharacter {
	fieldOrder: string[];
	uid: BigNumberish;
	skin: string;
	health: BigNumberish;
	attack_power: BigNumberish;
	special_attack: boolean;
	level: BigNumberish;
	max_health: BigNumberish;
	idle_sprite: string;
	attack_sprite: string;
	mugshot: string;
	hit_sprite: string;
}
export type InputPlayableCharacter = RemoveFieldOrder<PlayableCharacter>;

// Type definition for `lutte::models::player::PlayableCharacterListValue` struct
export interface PlayableCharacterListValue {
	fieldOrder: string[];
	players: Array<PlayableCharacter>;
}
export type InputPlayableCharacterListValue = RemoveFieldOrder<PlayableCharacterListValue>;

// Type definition for `lutte::models::player::PlayerValue` struct
export interface PlayerValue {
	fieldOrder: string[];
	health: BigNumberish;
	demeanor: BigNumberish;
	attack_power: BigNumberish;
	special_attack: boolean;
	current_enemy: UEnemy;
	skin_id: BigNumberish;
	last_attack: boolean;
}
export type InputPlayerValue = RemoveFieldOrder<PlayerValue>;

// Type definition for `lutte::models::player::Player` struct
export interface Player {
	fieldOrder: string[];
	address: string;
	health: BigNumberish;
	demeanor: BigNumberish;
	attack_power: BigNumberish;
	special_attack: boolean;
	current_enemy: UEnemy;
	skin_id: BigNumberish;
	last_attack: boolean;
}
export type InputPlayer = RemoveFieldOrder<Player>;

// Type definition for `lutte::models::player::SessionDetail` struct
export interface SessionDetail {
	fieldOrder: string[];
	id: BigNumberish;
	player: string;
}
export type InputSessionDetail = RemoveFieldOrder<SessionDetail>;

// Type definition for `lutte::models::player::SessionValue` struct
export interface SessionValue {
	fieldOrder: string[];
	player: Array<SessionDetail>;
}
export type InputSessionValue = RemoveFieldOrder<SessionValue>;

// Type definition for `lutte::models::player::Session` struct
export interface Session {
	fieldOrder: string[];
	id: string;
	player: Array<SessionDetail>;
}
export type InputSession = RemoveFieldOrder<Session>;

// Type definition for `lutte::models::player::SessionDetailValue` struct
export interface SessionDetailValue {
	fieldOrder: string[];
	player: string;
}
export type InputSessionDetailValue = RemoveFieldOrder<SessionDetailValue>;

export interface SchemaType extends ISchemaType {
	lutte: {
		EnemiesListValue: EnemiesListValue,
		EnemiesList: EnemiesList,
		UEnemy: UEnemy,
		EnemyValue: EnemyValue,
		Enemy: Enemy,
		PlayableCharacterList: PlayableCharacterList,
		PlayableCharacter: PlayableCharacter,
		PlayableCharacterListValue: PlayableCharacterListValue,
		PlayerValue: PlayerValue,
		Player: Player,
		SessionDetail: SessionDetail,
		SessionValue: SessionValue,
		Session: Session,
		SessionDetailValue: SessionDetailValue,
	},
}
export const schema: SchemaType = {
	lutte: {
		EnemiesListValue: {
			fieldOrder: ['enemies'],
			enemies: [{ fieldOrder: ['uid', 'health', 'max_health', 'attack_power', 'special_attack', 'level', 'skin', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite'], uid: 0, health: 0, max_health: 0, attack_power: 0, special_attack: false, level: 0, skin: "", idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", }],
		},
		EnemiesList: {
			fieldOrder: ['id', 'enemies'],
			id: 0,
			enemies: [{ fieldOrder: ['uid', 'health', 'max_health', 'attack_power', 'special_attack', 'level', 'skin', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite'], uid: 0, health: 0, max_health: 0, attack_power: 0, special_attack: false, level: 0, skin: "", idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", }],
		},
		UEnemy: {
			fieldOrder: ['uid', 'health', 'max_health', 'attack_power', 'special_attack', 'level', 'skin', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite'],
			uid: 0,
			health: 0,
			max_health: 0,
			attack_power: 0,
			special_attack: false,
			level: 0,
			skin: "",
			idle_sprite: "",
			attack_sprite: "",
			mugshot: "",
			hit_sprite: "",
		},
		EnemyValue: {
			fieldOrder: ['health', 'attack_power', 'special_attack', 'level'],
			health: 0,
			attack_power: 0,
			special_attack: false,
			level: 0,
		},
		Enemy: {
			fieldOrder: ['uid', 'health', 'attack_power', 'special_attack', 'level'],
			uid: 0,
			health: 0,
			attack_power: 0,
			special_attack: false,
			level: 0,
		},
		PlayableCharacterList: {
			fieldOrder: ['id', 'players'],
			id: 0,
			players: [{ fieldOrder: ['uid', 'skin', 'health', 'attack_power', 'special_attack', 'level', 'max_health', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite'], uid: 0, skin: "", health: 0, attack_power: 0, special_attack: false, level: 0, max_health: 0, idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", }],
		},
		PlayableCharacter: {
			fieldOrder: ['uid', 'skin', 'health', 'attack_power', 'special_attack', 'level', 'max_health', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite'],
			uid: 0,
			skin: "",
			health: 0,
			attack_power: 0,
			special_attack: false,
			level: 0,
			max_health: 0,
			idle_sprite: "",
			attack_sprite: "",
			mugshot: "",
			hit_sprite: "",
		},
		PlayableCharacterListValue: {
			fieldOrder: ['players'],
			players: [{ fieldOrder: ['uid', 'skin', 'health', 'attack_power', 'special_attack', 'level', 'max_health', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite'], uid: 0, skin: "", health: 0, attack_power: 0, special_attack: false, level: 0, max_health: 0, idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", }],
		},
		PlayerValue: {
			fieldOrder: ['health', 'demeanor', 'attack_power', 'special_attack', 'current_enemy', 'skin_id', 'last_attack'],
			health: 0,
			demeanor: 0,
			attack_power: 0,
			special_attack: false,
			current_enemy: { fieldOrder: ['uid', 'health', 'max_health', 'attack_power', 'special_attack', 'level', 'skin', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite'], uid: 0, health: 0, max_health: 0, attack_power: 0, special_attack: false, level: 0, skin: "", idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", },
			skin_id: 0,
			last_attack: false,
		},
		Player: {
			fieldOrder: ['address', 'health', 'demeanor', 'attack_power', 'special_attack', 'current_enemy', 'skin_id', 'last_attack'],
			address: "",
			health: 0,
			demeanor: 0,
			attack_power: 0,
			special_attack: false,
			current_enemy: { fieldOrder: ['uid', 'health', 'max_health', 'attack_power', 'special_attack', 'level', 'skin', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite'], uid: 0, health: 0, max_health: 0, attack_power: 0, special_attack: false, level: 0, skin: "", idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", },
			skin_id: 0,
			last_attack: false,
		},
		SessionDetail: {
			fieldOrder: ['id', 'player'],
			id: 0,
			player: "",
		},
		SessionValue: {
			fieldOrder: ['player'],
			player: [{ fieldOrder: ['id', 'player'], id: 0, player: "", }],
		},
		Session: {
			fieldOrder: ['id', 'player'],
			id: "",
			player: [{ fieldOrder: ['id', 'player'], id: 0, player: "", }],
		},
		SessionDetailValue: {
			fieldOrder: ['player'],
			player: "",
		},
	},
};
// Type definition for ERC__Balance struct
export type ERC__Type = 'ERC20' | 'ERC721';
export interface ERC__Balance {
    fieldOrder: string[];
    balance: string;
    type: string;
    tokenMetadata: ERC__Token;
}
export interface ERC__Token {
    fieldOrder: string[];
    name: string;
    symbol: string;
    tokenId: string;
    decimals: string;
    contractAddress: string;
}
export interface ERC__Transfer {
    fieldOrder: string[];
    from: string;
    to: string;
    amount: string;
    type: string;
    executedAt: string;
    tokenMetadata: ERC__Token;
    transactionHash: string;
}