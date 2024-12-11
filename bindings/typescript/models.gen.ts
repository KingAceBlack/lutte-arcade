import type { SchemaType } from "@dojoengine/sdk";

// Type definition for `lutte::models::player::EnemiesList` struct
export interface EnemiesList {
	fieldOrder: string[];
	id: number;
	enemies: Array<UEnemy>;
}

// Type definition for `lutte::models::player::UEnemy` struct
export interface UEnemy {
	fieldOrder: string[];
	uid: number;
	health: number;
	attack_power: number;
	special_attack: boolean;
	level: number;
}

// Type definition for `lutte::models::player::EnemiesListValue` struct
export interface EnemiesListValue {
	fieldOrder: string[];
	enemies: Array<UEnemy>;
}

// Type definition for `lutte::models::player::EnemyValue` struct
export interface EnemyValue {
	fieldOrder: string[];
	health: number;
	attack_power: number;
	special_attack: boolean;
	level: number;
}

// Type definition for `lutte::models::player::Enemy` struct
export interface Enemy {
	fieldOrder: string[];
	uid: number;
	health: number;
	attack_power: number;
	special_attack: boolean;
	level: number;
}

// Type definition for `lutte::models::player::PlayableCharacter` struct
export interface PlayableCharacter {
	fieldOrder: string[];
	uid: number;
	skin: string;
	health: number;
	attack_power: number;
	special_attack: boolean;
	level: number;
}

// Type definition for `lutte::models::player::PlayableCharacterList` struct
export interface PlayableCharacterList {
	fieldOrder: string[];
	id: number;
	players: Array<PlayableCharacter>;
}

// Type definition for `lutte::models::player::PlayableCharacterListValue` struct
export interface PlayableCharacterListValue {
	fieldOrder: string[];
	players: Array<PlayableCharacter>;
}

// Type definition for `lutte::models::player::UEnemy` struct
export interface UEnemy {
	fieldOrder: string[];
	uid: number;
	health: number;
	attack_power: number;
	special_attack: boolean;
	level: number;
}

// Type definition for `lutte::models::player::Player` struct
export interface Player {
	fieldOrder: string[];
	address: string;
	health: number;
	demeanor: number;
	attack_power: number;
	special_attack: boolean;
	current_enemy: UEnemy;
	skin: number;
}

// Type definition for `lutte::models::player::PlayerValue` struct
export interface PlayerValue {
	fieldOrder: string[];
	health: number;
	demeanor: number;
	attack_power: number;
	special_attack: boolean;
	current_enemy: UEnemy;
	skin: number;
}

// Type definition for `lutte::models::player::Session` struct
export interface Session {
	fieldOrder: string[];
	id: string;
	player: Array<SessionDetail>;
}

// Type definition for `lutte::models::player::SessionValue` struct
export interface SessionValue {
	fieldOrder: string[];
	player: Array<SessionDetail>;
}

// Type definition for `lutte::models::player::SessionDetail` struct
export interface SessionDetail {
	fieldOrder: string[];
	id: number;
	player: string;
}

// Type definition for `lutte::models::player::SessionDetailValue` struct
export interface SessionDetailValue {
	fieldOrder: string[];
	player: string;
}

// Type definition for `lutte::models::player::SessionDetail` struct
export interface SessionDetail {
	fieldOrder: string[];
	id: number;
	player: string;
}

export interface LutteSchemaType extends SchemaType {
	lutte: {
		EnemiesList: EnemiesList,
		UEnemy: UEnemy,
		EnemiesListValue: EnemiesListValue,
		EnemyValue: EnemyValue,
		Enemy: Enemy,
		PlayableCharacter: PlayableCharacter,
		PlayableCharacterList: PlayableCharacterList,
		PlayableCharacterListValue: PlayableCharacterListValue,
		Player: Player,
		PlayerValue: PlayerValue,
		Session: Session,
		SessionValue: SessionValue,
		SessionDetail: SessionDetail,
		SessionDetailValue: SessionDetailValue,
		ERC__Balance: ERC__Balance,
		ERC__Token: ERC__Token,
		ERC__Transfer: ERC__Transfer,
	},
}
export const schema: LutteSchemaType = {
	lutte: {
		EnemiesList: {
			fieldOrder: ['id', 'enemies'],
			id: 0,
			enemies: [{ fieldOrder: ['uid', 'health', 'attack_power', 'special_attack', 'level'], uid: 0, health: 0, attack_power: 0, special_attack: false, level: 0, }],
		},
		UEnemy: {
			fieldOrder: ['uid', 'health', 'attack_power', 'special_attack', 'level'],
			uid: 0,
			health: 0,
			attack_power: 0,
			special_attack: false,
			level: 0,
		},
		EnemiesListValue: {
			fieldOrder: ['enemies'],
			enemies: [{ fieldOrder: ['uid', 'health', 'attack_power', 'special_attack', 'level'], uid: 0, health: 0, attack_power: 0, special_attack: false, level: 0, }],
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
		PlayableCharacter: {
			fieldOrder: ['uid', 'skin', 'health', 'attack_power', 'special_attack', 'level'],
			uid: 0,
			skin: "",
			health: 0,
			attack_power: 0,
			special_attack: false,
			level: 0,
		},
		PlayableCharacterList: {
			fieldOrder: ['id', 'players'],
			id: 0,
			players: [{ fieldOrder: ['uid', 'skin', 'health', 'attack_power', 'special_attack', 'level'], uid: 0, skin: "", health: 0, attack_power: 0, special_attack: false, level: 0, }],
		},
		PlayableCharacterListValue: {
			fieldOrder: ['players'],
			players: [{ fieldOrder: ['uid', 'skin', 'health', 'attack_power', 'special_attack', 'level'], uid: 0, skin: "", health: 0, attack_power: 0, special_attack: false, level: 0, }],
		},
		Player: {
			fieldOrder: ['address', 'health', 'demeanor', 'attack_power', 'special_attack', 'current_enemy', 'skin'],
			address: "",
			health: 0,
			demeanor: 0,
			attack_power: 0,
			special_attack: false,
			current_enemy: { fieldOrder: ['uid', 'health', 'attack_power', 'special_attack', 'level'], uid: 0, health: 0, attack_power: 0, special_attack: false, level: 0, },
			skin: 0,
		},
		PlayerValue: {
			fieldOrder: ['health', 'demeanor', 'attack_power', 'special_attack', 'current_enemy', 'skin'],
			health: 0,
			demeanor: 0,
			attack_power: 0,
			special_attack: false,
			current_enemy: { fieldOrder: ['uid', 'health', 'attack_power', 'special_attack', 'level'], uid: 0, health: 0, attack_power: 0, special_attack: false, level: 0, },
			skin: 0,
		},
		Session: {
			fieldOrder: ['id', 'player'],
			id: "",
			player: [{ fieldOrder: ['id', 'player'], id: 0, player: "", }],
		},
		SessionValue: {
			fieldOrder: ['player'],
			player: [{ fieldOrder: ['id', 'player'], id: 0, player: "", }],
		},
		SessionDetail: {
			fieldOrder: ['id', 'player'],
			id: 0,
			player: "",
		},
		SessionDetailValue: {
			fieldOrder: ['player'],
			player: "",
		},
		ERC__Balance: {
			fieldOrder: ['balance', 'type', 'tokenmetadata'],
			balance: '',
			type: 'ERC20',
			tokenMetadata: {
				fieldOrder: ['name', 'symbol', 'tokenId', 'decimals', 'contractAddress'],
				name: '',
				symbol: '',
				tokenId: '',
				decimals: '',
				contractAddress: '',
			},
		},
		ERC__Token: {
			fieldOrder: ['name', 'symbol', 'tokenId', 'decimals', 'contractAddress'],
			name: '',
			symbol: '',
			tokenId: '',
			decimals: '',
			contractAddress: '',
		},
		ERC__Transfer: {
			fieldOrder: ['from', 'to', 'amount', 'type', 'executed', 'tokenMetadata'],
			from: '',
			to: '',
			amount: '',
			type: 'ERC20',
			executedAt: '',
			tokenMetadata: {
				fieldOrder: ['name', 'symbol', 'tokenId', 'decimals', 'contractAddress'],
				name: '',
				symbol: '',
				tokenId: '',
				decimals: '',
				contractAddress: '',
			},
			transactionHash: '',
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