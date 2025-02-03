use starknet::{ContractAddress};


#[derive(Drop, Serde)]
#[dojo::model]
pub struct Player {
    #[key]
    pub address: ContractAddress,
    pub health: u32,
    pub demeanor: u8,
    pub attack_power: u8,
    pub special_attack: bool,
    pub current_enemy: UEnemy,
    pub skin_id: u8,
    pub last_attack: bool,
}

// skin can be 1, 2, 3 ...etc

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

#[derive(Drop, Serde)]
#[dojo::model]
pub struct EnemiesList {
    #[key]
    pub id: u8,
    pub enemies: Array<UEnemy>,
}

#[derive(Drop, Serde)]
#[dojo::model]
pub struct PlayableCharacterList {
    #[key]
    pub id: u8,
    pub players: Array<PlayableCharacter>,
}

#[derive(Clone, Drop, Serde, Introspect)]
pub struct PlayableCharacter {
    pub uid: u8,
    pub skin: ByteArray,
    pub health: u32,
    pub attack_power: u8,
    pub special_attack: bool,
    pub level: u8,
    pub max_health: u32,
    // pub sprite: ByteArray,
}

#[derive(Clone, Drop, Serde, Introspect)]
pub struct UEnemy {
    pub uid: u32,
    pub health: u32,
    pub attack_power: u8,
    pub special_attack: bool,
    pub level: u8,
    pub skin: ByteArray,
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

