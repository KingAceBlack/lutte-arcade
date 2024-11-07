use starknet::{ContractAddress};


#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Player {
    #[key]
    pub address: ContractAddress,
    pub player: u32,
    pub health: u32,
    pub demeanor: u8,
    pub attack_power: u8,
    pub special_attack: bool,
    current_enemy: Enemy
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Enemy {
    #[key]
    pub uid: u32,
    pub health: u32,
    pub demeanor: u8,
    pub attack_power: u8,
    pub special_attack: bool,
    pub level: u8,
}


#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct SessionDetail {
    #[key]
    id: u32,
    player: ContractAddress
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Session {
    #[key]
    pub id: ContractAddress,
    pub player: Span<SessionDetail>
}

