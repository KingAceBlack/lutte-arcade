use starknet::{ContractAddress};


#[derive(Clone, Drop, Serde)]
#[dojo::model]
pub struct Player {
    #[key]
    pub address: ContractAddress,
    pub health: u32,
    pub demeanor: u8,
    pub attack_power: u8,
    pub special_attack: bool,
    pub current_enemy: SelectedEnemy,
    pub skin_id: u8,
    pub last_attack: bool,
    pub character: SelectedCharacter,
    pub last_attack_state: u32,
}

// last attack state can be 0, 1, 2, 3, 4 -- 1- successful attack, 2- glazed attack, 3- missed
// attack, 4- critical attack, 0- not yet attacked

// skin can be 1, 2, 3 ...etc

#[derive(Clone, Drop, Serde, Introspect)]
pub struct SelectedCharacter {
    pub uid: u32,
    pub gid: u32,
    pub skin: ByteArray,
    pub health: u32,
    pub attack_power: u8,
    pub special_attack: bool,
    pub level: u8,
    pub max_health: u32,
    pub idle_sprite: ByteArray,
    pub attack_sprite: ByteArray,
    pub mugshot: ByteArray,
    pub hit_sprite: ByteArray,
    pub folder: ByteArray,
    pub dash_sprite: ByteArray,
    pub dodge_sprite: ByteArray,
}


#[derive(Clone, Drop, Serde, Introspect)]
pub struct SelectedEnemy {
    pub uid: u32,
    pub gid: u32,
    pub health: u32,
    pub max_health: u32,
    pub attack_power: u8,
    pub special_attack: bool,
    pub level: u8,
    pub skin: ByteArray,
    pub idle_sprite: ByteArray,
    pub attack_sprite: ByteArray,
    pub mugshot: ByteArray,
    pub hit_sprite: ByteArray,
    pub folder: ByteArray,
    pub dash_sprite: ByteArray,
    pub dodge_sprite: ByteArray,
}


#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Enemy {
    #[key]
    pub uid: u32,
    pub health: u32,
    pub attack_power: u8,
    pub special_attack: bool,
    pub level: u8,
}


#[derive(Clone, Drop, Serde, Introspect)]
#[dojo::model]
pub struct PlayableCharacter {
    #[key]
    pub uid: u32,
    pub gid: u32,
    pub skin: ByteArray,
    pub health: u32,
    pub attack_power: u8,
    pub special_attack: bool,
    pub level: u8,
    pub max_health: u32,
    pub idle_sprite: ByteArray,
    pub attack_sprite: ByteArray,
    pub mugshot: ByteArray,
    pub hit_sprite: ByteArray,
    pub folder: ByteArray,
    pub dash_sprite: ByteArray,
    pub dodge_sprite: ByteArray,
}

#[derive(Clone, Drop, Serde, Introspect)]
#[dojo::model]
pub struct UEnemy {
    #[key]
    pub uid: u32,
    pub gid: u32,
    pub health: u32,
    pub max_health: u32,
    pub attack_power: u8,
    pub special_attack: bool,
    pub level: u8,
    pub skin: ByteArray,
    pub idle_sprite: ByteArray,
    pub attack_sprite: ByteArray,
    pub mugshot: ByteArray,
    pub hit_sprite: ByteArray,
    pub folder: ByteArray,
    pub dash_sprite: ByteArray,
    pub dodge_sprite: ByteArray,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct EntityCounter {
    #[key]
    pub gid: u32, // 1 for players, 2 for enemies
    pub count: u32,
}


#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct SessionDetail {
    #[key]
    id: u32,
    player: ContractAddress,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Session {
    #[key]
    pub id: ContractAddress,
    pub player: Span<SessionDetail>,
}

