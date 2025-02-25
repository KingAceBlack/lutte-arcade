import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

import { BigNumberish } from 'starknet';

type WithFieldOrder<T> = T & { fieldOrder: string[] };

// Type definition for `lutte::models::player::EnemiesList` struct
export interface EnemiesList {
	id: BigNumberish;
	enemies: Array<UEnemy>;
}

// Type definition for `lutte::models::player::EnemiesListValue` struct
export interface EnemiesListValue {
	enemies: Array<UEnemy>;
}

// Type definition for `lutte::models::player::Enemy` struct
export interface Enemy {
	uid: BigNumberish;
	health: BigNumberish;
	attack_power: BigNumberish;
	special_attack: boolean;
	level: BigNumberish;
}

// Type definition for `lutte::models::player::EnemyValue` struct
export interface EnemyValue {
	health: BigNumberish;
	attack_power: BigNumberish;
	special_attack: boolean;
	level: BigNumberish;
}

// Type definition for `lutte::models::player::PlayableCharacter` struct
export interface PlayableCharacter {
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
	folder: string;
}

// Type definition for `lutte::models::player::PlayableCharacterList` struct
export interface PlayableCharacterList {
	id: BigNumberish;
	players: Array<PlayableCharacter>;
}

// Type definition for `lutte::models::player::PlayableCharacterListValue` struct
export interface PlayableCharacterListValue {
	players: Array<PlayableCharacter>;
}

// Type definition for `lutte::models::player::Player` struct
export interface Player {
	address: string;
	health: BigNumberish;
	demeanor: BigNumberish;
	attack_power: BigNumberish;
	special_attack: boolean;
	current_enemy: UEnemy;
	skin_id: BigNumberish;
	last_attack: boolean;
	character: PlayableCharacter;
	last_attack_state: BigNumberish;
}

// Type definition for `lutte::models::player::PlayerValue` struct
export interface PlayerValue {
	health: BigNumberish;
	demeanor: BigNumberish;
	attack_power: BigNumberish;
	special_attack: boolean;
	current_enemy: UEnemy;
	skin_id: BigNumberish;
	last_attack: boolean;
	character: PlayableCharacter;
	last_attack_state: BigNumberish;
}

// Type definition for `lutte::models::player::Session` struct
export interface Session {
	id: string;
	player: Array<SessionDetail>;
}

// Type definition for `lutte::models::player::SessionDetail` struct
export interface SessionDetail {
	id: BigNumberish;
	player: string;
}

// Type definition for `lutte::models::player::SessionDetailValue` struct
export interface SessionDetailValue {
	player: string;
}

// Type definition for `lutte::models::player::SessionValue` struct
export interface SessionValue {
	player: Array<SessionDetail>;
}

// Type definition for `lutte::models::player::UEnemy` struct
export interface UEnemy {
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
	folder: string;
}

// Type definition for `lutte::systems::lutte::actions::GameEvent` struct
export interface GameEvent {
	id: string;
	won: boolean;
	died: boolean;
}

// Type definition for `lutte::systems::lutte::actions::GameEventValue` struct
export interface GameEventValue {
	won: boolean;
	died: boolean;
}

export interface SchemaType extends ISchemaType {
	lutte: {
		EnemiesList: WithFieldOrder<EnemiesList>,
		EnemiesListValue: WithFieldOrder<EnemiesListValue>,
		Enemy: WithFieldOrder<Enemy>,
		EnemyValue: WithFieldOrder<EnemyValue>,
		PlayableCharacter: WithFieldOrder<PlayableCharacter>,
		PlayableCharacterList: WithFieldOrder<PlayableCharacterList>,
		PlayableCharacterListValue: WithFieldOrder<PlayableCharacterListValue>,
		Player: WithFieldOrder<Player>,
		PlayerValue: WithFieldOrder<PlayerValue>,
		Session: WithFieldOrder<Session>,
		SessionDetail: WithFieldOrder<SessionDetail>,
		SessionDetailValue: WithFieldOrder<SessionDetailValue>,
		SessionValue: WithFieldOrder<SessionValue>,
		UEnemy: WithFieldOrder<UEnemy>,
		GameEvent: WithFieldOrder<GameEvent>,
		GameEventValue: WithFieldOrder<GameEventValue>,
	},
}
export const schema: SchemaType = {
	lutte: {
		EnemiesList: {
			fieldOrder: ['id', 'enemies'],
			id: 0,
			enemies: [{ uid: 0, health: 0, max_health: 0, attack_power: 0, special_attack: false, level: 0, skin: "", idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", folder: "", }],
		},
		EnemiesListValue: {
			fieldOrder: ['enemies'],
			enemies: [{ uid: 0, health: 0, max_health: 0, attack_power: 0, special_attack: false, level: 0, skin: "", idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", folder: "", }],
		},
		Enemy: {
			fieldOrder: ['uid', 'health', 'attack_power', 'special_attack', 'level'],
			uid: 0,
			health: 0,
			attack_power: 0,
			special_attack: false,
			level: 0,
		},
		EnemyValue: {
			fieldOrder: ['health', 'attack_power', 'special_attack', 'level'],
			health: 0,
			attack_power: 0,
			special_attack: false,
			level: 0,
		},
		PlayableCharacter: {
			fieldOrder: ['uid', 'skin', 'health', 'attack_power', 'special_attack', 'level', 'max_health', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite', 'folder'],
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
		folder: "",
		},
		PlayableCharacterList: {
			fieldOrder: ['id', 'players'],
			id: 0,
			players: [{ uid: 0, skin: "", health: 0, attack_power: 0, special_attack: false, level: 0, max_health: 0, idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", folder: "", }],
		},
		PlayableCharacterListValue: {
			fieldOrder: ['players'],
			players: [{ uid: 0, skin: "", health: 0, attack_power: 0, special_attack: false, level: 0, max_health: 0, idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", folder: "", }],
		},
		Player: {
			fieldOrder: ['address', 'health', 'demeanor', 'attack_power', 'special_attack', 'current_enemy', 'skin_id', 'last_attack', 'character', 'last_attack_state'],
			address: "",
			health: 0,
			demeanor: 0,
			attack_power: 0,
			special_attack: false,
		current_enemy: { uid: 0, health: 0, max_health: 0, attack_power: 0, special_attack: false, level: 0, skin: "", idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", folder: "", },
			skin_id: 0,
			last_attack: false,
		character: { uid: 0, skin: "", health: 0, attack_power: 0, special_attack: false, level: 0, max_health: 0, idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", folder: "", },
			last_attack_state: 0,
		},
		PlayerValue: {
			fieldOrder: ['health', 'demeanor', 'attack_power', 'special_attack', 'current_enemy', 'skin_id', 'last_attack', 'character', 'last_attack_state'],
			health: 0,
			demeanor: 0,
			attack_power: 0,
			special_attack: false,
		current_enemy: { uid: 0, health: 0, max_health: 0, attack_power: 0, special_attack: false, level: 0, skin: "", idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", folder: "", },
			skin_id: 0,
			last_attack: false,
		character: { uid: 0, skin: "", health: 0, attack_power: 0, special_attack: false, level: 0, max_health: 0, idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", folder: "", },
			last_attack_state: 0,
		},
		Session: {
			fieldOrder: ['id', 'player'],
			id: "",
			player: [{ id: 0, player: "", }],
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
		SessionValue: {
			fieldOrder: ['player'],
			player: [{ id: 0, player: "", }],
		},
		UEnemy: {
			fieldOrder: ['uid', 'health', 'max_health', 'attack_power', 'special_attack', 'level', 'skin', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite', 'folder'],
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
		folder: "",
		},
		GameEvent: {
			fieldOrder: ['id', 'won', 'died'],
			id: "",
			won: false,
			died: false,
		},
		GameEventValue: {
			fieldOrder: ['won', 'died'],
			won: false,
			died: false,
		},
	},
};
export enum ModelsMapping {
	EnemiesList = 'lutte-EnemiesList',
	EnemiesListValue = 'lutte-EnemiesListValue',
	Enemy = 'lutte-Enemy',
	EnemyValue = 'lutte-EnemyValue',
	PlayableCharacter = 'lutte-PlayableCharacter',
	PlayableCharacterList = 'lutte-PlayableCharacterList',
	PlayableCharacterListValue = 'lutte-PlayableCharacterListValue',
	Player = 'lutte-Player',
	PlayerValue = 'lutte-PlayerValue',
	Session = 'lutte-Session',
	SessionDetail = 'lutte-SessionDetail',
	SessionDetailValue = 'lutte-SessionDetailValue',
	SessionValue = 'lutte-SessionValue',
	UEnemy = 'lutte-UEnemy',
	GameEvent = 'lutte-GameEvent',
	GameEventValue = 'lutte-GameEventValue',
}