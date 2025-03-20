import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

import { BigNumberish } from 'starknet';

type WithFieldOrder<T> = T & { fieldOrder: string[] };

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

// Type definition for `lutte::models::player::EntityCounter` struct
export interface EntityCounter {
	gid: BigNumberish;
	count: BigNumberish;
}

// Type definition for `lutte::models::player::EntityCounterValue` struct
export interface EntityCounterValue {
	count: BigNumberish;
}

// Type definition for `lutte::models::player::PlayableCharacter` struct
export interface PlayableCharacter {
	uid: BigNumberish;
	gid: BigNumberish;
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
	dash_sprite: string;
	dodge_sprite: string;
}

// Type definition for `lutte::models::player::PlayableCharacterValue` struct
export interface PlayableCharacterValue {
	gid: BigNumberish;
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
	dash_sprite: string;
	dodge_sprite: string;
}

// Type definition for `lutte::models::player::Player` struct
export interface Player {
	address: string;
	health: BigNumberish;
	demeanor: BigNumberish;
	attack_power: BigNumberish;
	special_attack: boolean;
	current_enemy: SelectedEnemy;
	skin_id: BigNumberish;
	last_attack: boolean;
	character: SelectedCharacter;
	last_attack_state: BigNumberish;
}

// Type definition for `lutte::models::player::PlayerValue` struct
export interface PlayerValue {
	health: BigNumberish;
	demeanor: BigNumberish;
	attack_power: BigNumberish;
	special_attack: boolean;
	current_enemy: SelectedEnemy;
	skin_id: BigNumberish;
	last_attack: boolean;
	character: SelectedCharacter;
	last_attack_state: BigNumberish;
}

// Type definition for `lutte::models::player::SelectedCharacter` struct
export interface SelectedCharacter {
	uid: BigNumberish;
	gid: BigNumberish;
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
	dash_sprite: string;
	dodge_sprite: string;
}

// Type definition for `lutte::models::player::SelectedEnemy` struct
export interface SelectedEnemy {
	uid: BigNumberish;
	gid: BigNumberish;
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
	dash_sprite: string;
	dodge_sprite: string;
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
	gid: BigNumberish;
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
	dash_sprite: string;
	dodge_sprite: string;
}

// Type definition for `lutte::models::player::UEnemyValue` struct
export interface UEnemyValue {
	gid: BigNumberish;
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
	dash_sprite: string;
	dodge_sprite: string;
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
		Enemy: WithFieldOrder<Enemy>,
		EnemyValue: WithFieldOrder<EnemyValue>,
		EntityCounter: WithFieldOrder<EntityCounter>,
		EntityCounterValue: WithFieldOrder<EntityCounterValue>,
		PlayableCharacter: WithFieldOrder<PlayableCharacter>,
		PlayableCharacterValue: WithFieldOrder<PlayableCharacterValue>,
		Player: WithFieldOrder<Player>,
		PlayerValue: WithFieldOrder<PlayerValue>,
		SelectedCharacter: WithFieldOrder<SelectedCharacter>,
		SelectedEnemy: WithFieldOrder<SelectedEnemy>,
		Session: WithFieldOrder<Session>,
		SessionDetail: WithFieldOrder<SessionDetail>,
		SessionDetailValue: WithFieldOrder<SessionDetailValue>,
		SessionValue: WithFieldOrder<SessionValue>,
		UEnemy: WithFieldOrder<UEnemy>,
		UEnemyValue: WithFieldOrder<UEnemyValue>,
		GameEvent: WithFieldOrder<GameEvent>,
		GameEventValue: WithFieldOrder<GameEventValue>,
	},
}
export const schema: SchemaType = {
	lutte: {
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
		EntityCounter: {
			fieldOrder: ['gid', 'count'],
			gid: 0,
			count: 0,
		},
		EntityCounterValue: {
			fieldOrder: ['count'],
			count: 0,
		},
		PlayableCharacter: {
			fieldOrder: ['uid', 'gid', 'skin', 'health', 'attack_power', 'special_attack', 'level', 'max_health', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite', 'folder', 'dash_sprite', 'dodge_sprite'],
			uid: 0,
			gid: 0,
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
		dash_sprite: "",
		dodge_sprite: "",
		},
		PlayableCharacterValue: {
			fieldOrder: ['gid', 'skin', 'health', 'attack_power', 'special_attack', 'level', 'max_health', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite', 'folder', 'dash_sprite', 'dodge_sprite'],
			gid: 0,
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
		dash_sprite: "",
		dodge_sprite: "",
		},
		Player: {
			fieldOrder: ['address', 'health', 'demeanor', 'attack_power', 'special_attack', 'current_enemy', 'skin_id', 'last_attack', 'character', 'last_attack_state'],
			address: "",
			health: 0,
			demeanor: 0,
			attack_power: 0,
			special_attack: false,
		current_enemy: { uid: 0, gid: 0, health: 0, max_health: 0, attack_power: 0, special_attack: false, level: 0, skin: "", idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", folder: "", dash_sprite: "", dodge_sprite: "", },
			skin_id: 0,
			last_attack: false,
		character: { uid: 0, gid: 0, skin: "", health: 0, attack_power: 0, special_attack: false, level: 0, max_health: 0, idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", folder: "", dash_sprite: "", dodge_sprite: "", },
			last_attack_state: 0,
		},
		PlayerValue: {
			fieldOrder: ['health', 'demeanor', 'attack_power', 'special_attack', 'current_enemy', 'skin_id', 'last_attack', 'character', 'last_attack_state'],
			health: 0,
			demeanor: 0,
			attack_power: 0,
			special_attack: false,
		current_enemy: { uid: 0, gid: 0, health: 0, max_health: 0, attack_power: 0, special_attack: false, level: 0, skin: "", idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", folder: "", dash_sprite: "", dodge_sprite: "", },
			skin_id: 0,
			last_attack: false,
		character: { uid: 0, gid: 0, skin: "", health: 0, attack_power: 0, special_attack: false, level: 0, max_health: 0, idle_sprite: "", attack_sprite: "", mugshot: "", hit_sprite: "", folder: "", dash_sprite: "", dodge_sprite: "", },
			last_attack_state: 0,
		},
		SelectedCharacter: {
			fieldOrder: ['uid', 'gid', 'skin', 'health', 'attack_power', 'special_attack', 'level', 'max_health', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite', 'folder', 'dash_sprite', 'dodge_sprite'],
			uid: 0,
			gid: 0,
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
		dash_sprite: "",
		dodge_sprite: "",
		},
		SelectedEnemy: {
			fieldOrder: ['uid', 'gid', 'health', 'max_health', 'attack_power', 'special_attack', 'level', 'skin', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite', 'folder', 'dash_sprite', 'dodge_sprite'],
			uid: 0,
			gid: 0,
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
		dash_sprite: "",
		dodge_sprite: "",
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
			fieldOrder: ['uid', 'gid', 'health', 'max_health', 'attack_power', 'special_attack', 'level', 'skin', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite', 'folder', 'dash_sprite', 'dodge_sprite'],
			uid: 0,
			gid: 0,
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
		dash_sprite: "",
		dodge_sprite: "",
		},
		UEnemyValue: {
			fieldOrder: ['gid', 'health', 'max_health', 'attack_power', 'special_attack', 'level', 'skin', 'idle_sprite', 'attack_sprite', 'mugshot', 'hit_sprite', 'folder', 'dash_sprite', 'dodge_sprite'],
			gid: 0,
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
		dash_sprite: "",
		dodge_sprite: "",
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
	Enemy = 'lutte-Enemy',
	EnemyValue = 'lutte-EnemyValue',
	EntityCounter = 'lutte-EntityCounter',
	EntityCounterValue = 'lutte-EntityCounterValue',
	PlayableCharacter = 'lutte-PlayableCharacter',
	PlayableCharacterValue = 'lutte-PlayableCharacterValue',
	Player = 'lutte-Player',
	PlayerValue = 'lutte-PlayerValue',
	SelectedCharacter = 'lutte-SelectedCharacter',
	SelectedEnemy = 'lutte-SelectedEnemy',
	Session = 'lutte-Session',
	SessionDetail = 'lutte-SessionDetail',
	SessionDetailValue = 'lutte-SessionDetailValue',
	SessionValue = 'lutte-SessionValue',
	UEnemy = 'lutte-UEnemy',
	UEnemyValue = 'lutte-UEnemyValue',
	GameEvent = 'lutte-GameEvent',
	GameEventValue = 'lutte-GameEventValue',
}