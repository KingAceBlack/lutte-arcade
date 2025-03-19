use starknet::{ContractAddress, get_caller_address, get_block_number, get_block_timestamp};
use lutte::models::{
    player::Player, player::Enemy, player::UEnemy, player::EnemiesList, player::PlayableCharacter,
    player::PlayableCharacterList, player::EntityCounter,
};
use starknet::storage::{
    StoragePointerReadAccess, StoragePointerWriteAccess, Vec, VecTrait, MutableVecTrait,
};

use lutte::random::dice::{Dice, DiceTrait};
use dojo::event::EventStorage;


#[starknet::interface]
trait IBattleActions<T> {
    fn offensive_phase(
        ref self: T, color: u8,
    ); // color red - 0, green - 1, blue - 2, ...anything else throws an error
    fn fetch_playable_characters(self: @T) -> Array::<PlayableCharacter>;
    fn fetch_enemies(self: @T) -> Array::<UEnemy>;
    fn defensive_phase(ref self: T);
    fn get_user(self: @T, player: ContractAddress) -> Player;
    fn create_character(
        ref self: T,
        skin: ByteArray,
        health: u32,
        attack_power: u8,
        level: u8,
        folder: ByteArray,
        idle_sprite: ByteArray,
        attack_sprite: ByteArray,
        mugshot: ByteArray,
        hit_sprite: ByteArray,
        dash_sprite: ByteArray,
        dodge_sprite: ByteArray,
    );
    fn create_enemy(
        ref self: T,
        skin: ByteArray,
        health: u32,
        attack_power: u8,
        level: u8,
        folder: ByteArray,
        idle_sprite: ByteArray,
        attack_sprite: ByteArray,
        mugshot: ByteArray,
        hit_sprite: ByteArray,
        dash_sprite: ByteArray,
        dodge_sprite: ByteArray,
    );
    // fn update_character(
    //     ref self: T,
    //     skin: ByteArray,
    //     health: u32,
    //     attack_power: u8,
    //     level: u8,
    //     folder: ByteArray,
    //     idle_sprite: ByteArray,
    //     attack_sprite: ByteArray,
    //     mugshot: ByteArray,
    //     hit_sprite: ByteArray,
    //     uid: u32,
    // );
    fn update_enemy_asset(
        ref self: T,
        id: u32,
        skin: ByteArray,
        folder: ByteArray,
        idle_sprite: ByteArray,
        attack_sprite: ByteArray,
        mugshot: ByteArray,
        hit_sprite: ByteArray,
    );
    fn update_player_asset(
        ref self: T,
        id: u32,
        skin: ByteArray,
        folder: ByteArray,
        idle_sprite: ByteArray,
        attack_sprite: ByteArray,
        mugshot: ByteArray,
        hit_sprite: ByteArray,
    );
    fn spawn(ref self: T, skin: u8);
    fn special_attack(ref self: T);
}


// demeanor values
const depressed: u8 = 0; // 0-5 
const neutral: u8 = 6; // 6-15
const motivated: u8 = 16; // 16-20

// demeanor values
const depressed_multiplier: u8 = 1; // 0-5 
const neutral_multiplier: u8 = 10; // 6-15
const motivated_multiplier: u8 = 100; // 16-20

#[dojo::contract]
mod actions {
    use dojo::model::IModel;
    use dojo::world::WorldStorageTrait;
    use dojo::world::IWorldDispatcherTrait;
    use dojo::model::{ModelStorage, ModelValueStorage};
    use super::{IBattleActions};
    use super::{ContractAddress, get_caller_address};
    use super::{
        Player, Enemy, UEnemy, EnemiesList, PlayableCharacter, PlayableCharacterList, EntityCounter,
    };
    use super::{get_block_number, get_block_timestamp, Dice, DiceTrait};
    use super::{Vec, VecTrait};
    use super::{depressed, neutral, motivated};
    use super::EventStorage;


    // #[derive(Serde, Copy, Drop, Introspect, PartialEq, Debug)]
    // pub enum EventEnum {
    //     Died: bool,
    //     Won: bool,
    // }

    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    pub struct GameEvent {
        #[key]
        id: ContractAddress,
        won: bool,
        died: bool,
    }


    pub fn get_random_value(walletAddress: ContractAddress) -> u8 {
        let _block_number = get_block_number();
        let timestamp = get_block_timestamp();

        let user: felt252 = walletAddress.try_into().unwrap();
        let new_value = user + timestamp.try_into().unwrap();
        let mut dice = DiceTrait::new(
            99, new_value.try_into().unwrap(),
        ); // imitating javascript's Math.random() * 100

        let result = dice.roll();
        return result;
    }

    fn get_random_in_range(seed: ContractAddress, min: felt252, max: felt252) -> felt252 {
        let random_value: u32 = get_random_value(seed).try_into().unwrap();
        let range = max - min + 1;

        let converted_range: u32 = range.try_into().unwrap();
        let converted_min: u32 = min.try_into().unwrap();

        let result = random_value % converted_range;
        let final_result = converted_min + result;
        let converted_final_result: felt252 = final_result.try_into().unwrap();
        return converted_final_result;
    }

    const ENEMY_GID: u32 = 1;
    const PLAYER_GID: u32 = 0;


    #[abi(embed_v0)]
    impl BattleImpl of super::IBattleActions<ContractState> {
        fn spawn(ref self: ContractState, skin: u8) {
            let player = get_caller_address();
            self.set_default_position(player, skin);
        }

        fn fetch_enemies(self: @ContractState) -> Array::<UEnemy> {
            let mut world = self.world_default();

            let enemy_counter: EntityCounter = world.read_model(ENEMY_GID);
            let enemy_count = enemy_counter.count;

            // Construct list of keys (assuming uid is incremental)
            let mut enemy_keys: Array::<u32> = ArrayTrait::new();
            let mut i = 0;
            while i < enemy_count {
                enemy_keys.append(i);
                i += 1;
            };

            let mut enemies_list: Array::<UEnemy> = world.read_models(enemy_keys.span());
            return enemies_list;
        }

        fn fetch_playable_characters(self: @ContractState) -> Array::<PlayableCharacter> {
            let mut world = self.world_default();

            let player_counter: EntityCounter = world.read_model(PLAYER_GID);
            let player_count = player_counter.count;

            // Construct list of keys (assuming uid is incremental)
            let mut player_keys: Array::<u32> = ArrayTrait::new();
            let mut i = 0;
            while i < player_count {
                player_keys.append(i);
                i += 1;
            };

            let mut players_list: Array::<PlayableCharacter> = world
                .read_models(player_keys.span());
            return players_list;
        }

        fn create_character(
            ref self: ContractState,
            skin: ByteArray,
            health: u32,
            attack_power: u8,
            level: u8,
            folder: ByteArray,
            idle_sprite: ByteArray,
            attack_sprite: ByteArray,
            mugshot: ByteArray,
            hit_sprite: ByteArray,
            dash_sprite: ByteArray,
            dodge_sprite: ByteArray,
        ) {
            let mut world = self.world_default();

            let player_counter: EntityCounter = world.read_model(PLAYER_GID);
            let player_count = player_counter.count;

            if player_count == 0 {
                let mut new_character = PlayableCharacter {
                    uid: 1,
                    gid: PLAYER_GID,
                    skin,
                    health,
                    attack_power,
                    level,
                    special_attack: true,
                    max_health: health,
                    idle_sprite,
                    attack_sprite,
                    mugshot,
                    hit_sprite,
                    folder,
                    dash_sprite,
                    dodge_sprite,
                };

                world.write_model(@new_character);
                return;
            }

            let mut new_character = PlayableCharacter {
                uid: (player_count + 1).try_into().unwrap(),
                gid: PLAYER_GID,
                skin,
                health,
                attack_power,
                level,
                special_attack: true,
                max_health: health,
                idle_sprite,
                attack_sprite,
                mugshot,
                hit_sprite,
                folder,
                dash_sprite,
                dodge_sprite,
            };

            world.write_model(@new_character);
        }


        fn create_enemy(
            ref self: ContractState,
            skin: ByteArray,
            health: u32,
            attack_power: u8,
            level: u8,
            folder: ByteArray,
            idle_sprite: ByteArray,
            attack_sprite: ByteArray,
            mugshot: ByteArray,
            hit_sprite: ByteArray,
            dash_sprite: ByteArray,
            dodge_sprite: ByteArray,
        ) {
            let mut world = self.world_default();

            let enemy_counter: EntityCounter = world.read_model(ENEMY_GID);
            let enemy_count = enemy_counter.count;

            if enemy_count == 0 {
                let mut new_enemy = UEnemy {
                    uid: 1,
                    gid: ENEMY_GID,
                    health,
                    attack_power,
                    level,
                    special_attack: true,
                    max_health: health,
                    skin,
                    idle_sprite,
                    attack_sprite,
                    mugshot,
                    hit_sprite,
                    folder,
                    dash_sprite,
                    dodge_sprite,
                };

                world.write_model(@new_enemy);
                return;
            }

            let mut new_enemy = UEnemy {
                uid: (enemy_count + 1).try_into().unwrap(),
                gid: ENEMY_GID,
                health,
                attack_power,
                level,
                special_attack: true,
                max_health: health,
                skin,
                idle_sprite,
                attack_sprite,
                mugshot,
                hit_sprite,
                folder,
                dash_sprite,
                dodge_sprite,
            };

            world.write_model(@new_enemy);
        }

        fn update_enemy_asset(
            ref self: ContractState,
            id: u32,
            skin: ByteArray,
            folder: ByteArray,
            idle_sprite: ByteArray,
            attack_sprite: ByteArray,
            mugshot: ByteArray,
            hit_sprite: ByteArray,
        ) {
            let mut world = self.world_default();

            let enemy_counter: EntityCounter = world.read_model(ENEMY_GID);
            let enemy_count = enemy_counter.count;

            // Create array of keys to fetch all enemies
            let mut enemy_keys: Array::<u32> = ArrayTrait::new();
            let mut i = 0;
            while i < enemy_count {
                enemy_keys.append(i);
                i += 1;
            };

            // Fetch all enemies
            let mut enemies_list: Array::<UEnemy> = world.read_models(enemy_keys.span());

            // Find the enemy by `id`
            let mut enemy_found: Option::<UEnemy> = Option::None;

            for enemy in enemies_list.clone() {
                if enemy.uid == id {
                    enemy_found = Option::Some(enemy);
                    break;
                }
            };

            match enemy_found {
                Option::Some(x) => { // Update the enemy's assets
                    enemy_found =
                        Option::Some(
                            UEnemy {
                                uid: id,
                                folder,
                                idle_sprite,
                                attack_sprite,
                                mugshot,
                                hit_sprite,
                                ..x,
                            },
                        );
                },
                Option::None => { panic!("enemy not found"); },
            };

            world.write_model(@enemy_found.unwrap());
        }

        fn update_player_asset(
            ref self: ContractState,
            id: u32,
            skin: ByteArray,
            folder: ByteArray,
            idle_sprite: ByteArray,
            attack_sprite: ByteArray,
            mugshot: ByteArray,
            hit_sprite: ByteArray,
        ) {
            let mut world = self.world_default();

            // Fetch player count from the counter model
            let player_counter: EntityCounter = world.read_model(PLAYER_GID);
            let player_count = player_counter.count;

            // Create an array of keys to fetch all players
            let mut player_keys: Array::<u32> = ArrayTrait::new();
            let mut i = 0;
            while i < player_count {
                player_keys.append(i);
                i += 1;
            };

            // Fetch all players
            let mut players_list: Array::<PlayableCharacter> = world
                .read_models(player_keys.span());

            // Find the player by `id`
            let mut player_found: Option::<PlayableCharacter> = Option::None;

            for player in players_list.clone() {
                if player.uid == id {
                    player_found = Option::Some(player);
                    break;
                }
            };

            // Ensure the player exists
            match player_found {
                Option::Some(x) => { // Update the player's assets
                    player_found =
                        Option::Some(
                            PlayableCharacter {
                                uid: id,
                                skin,
                                folder,
                                idle_sprite,
                                attack_sprite,
                                mugshot,
                                hit_sprite,
                                ..x,
                            },
                        );
                },
                Option::None => { panic!("player not found"); },
            };

            world.write_model(@player_found.unwrap());
        }


        //     // Offensive phase where player attacks
        fn offensive_phase(ref self: ContractState, color: u8) {
            let mut world = self.world_default();
            let user_address = get_caller_address();
            let mut player_data: Player = world.read_model(user_address);

            let playable_characters: PlayableCharacterList = world.read_model(0);
            let storage_user_character = playable_characters.players.at(player_data.skin_id.into());

            assert(color >= 0 && color <= 2, 'Invalid color');
            assert(player_data.last_attack == false, 'out of turn');

            let mut attack_probabilities_blue = ArrayTrait::new();
            attack_probabilities_blue.append((50, 1)); // 50% chance for a successful attack
            attack_probabilities_blue.append((20, 2)); // 20% chance for a glazed attack
            attack_probabilities_blue.append((15, 3)); // 15% chance for a miss
            attack_probabilities_blue.append((15, 4)); // 15% chance for a critical hit

            let mut attack_probabilities_green = ArrayTrait::new();
            attack_probabilities_green.append((50, 3)); // 50% chance for a miss
            attack_probabilities_green.append((20, 2)); // 20% chance for a glazed attack
            attack_probabilities_green.append((15, 1)); // 15% chance for a hit
            attack_probabilities_green.append((15, 4)); // 15% chance for a critical hit

            let mut attack_probabilities_red = ArrayTrait::new();
            attack_probabilities_red.append((25, 3)); // 25% chance for a miss
            attack_probabilities_red.append((25, 2)); // 25% chance for a glazed attack
            attack_probabilities_red.append((25, 1)); // 25% chance for a hit
            attack_probabilities_red.append((25, 4)); // 25% chance for a critical hit

            let mut probabilities: Array<(u32, felt252)> = ArrayTrait::new();

            if color == 0 {
                probabilities = attack_probabilities_red;
            } else if color == 1 {
                probabilities = attack_probabilities_green;
            } else if color == 2 {
                probabilities = attack_probabilities_blue;
            }

            let (outcome, _random): (felt252, u32) = self.get_outcome(probabilities, user_address);

            // Simulate an attack, adjust demeanor, and apply damage
            let mut user_enemy: UEnemy = player_data.current_enemy.clone();

            // last attack state can be 0, 1, 2, 3, 4 -- 1- successful attack, 2- glazed attack, 3-
            // missed attack, 4- critical attack, 0- not yet attacked

            // Apply changes based on the outcome
            if outcome == 1 {
                // Successful Attack
                player_data.last_attack_state = 1;
                player_data.demeanor += 3;
                user_enemy
                    .health = self
                    .safe_math_to_zero(user_enemy.health, 20); // Standard damage
            } else if outcome == 2 {
                // Glazed Attack
                player_data.last_attack_state = 2;
                player_data.demeanor += 1; // Minor boost
                user_enemy
                    .health = self
                    .safe_math_to_zero(user_enemy.health, 5); // Small amount of damage
            } else if outcome == 3 { // Missed Attack
                player_data.last_attack_state = 3;
                // No demeanor change or health deduction
            } else if outcome == 4 {
                // Critical Attack
                player_data.last_attack_state = 4;
                player_data.demeanor += 5; // Higher boost
                user_enemy
                    .health = self
                    .safe_math_to_zero(user_enemy.health, 30); // Higher damage (10+ extra HP)
            } else { // Default case, should not occur
            }

            // Ensure enemy health does not underflow
            if user_enemy.health == 0 {
                let e = GameEvent { id: user_address, won: true, died: false };
                world.emit_event(@e);
            }

            // emits user died

            if player_data.health == 0 {
                let e = GameEvent { id: user_address, won: false, died: true };
                world.emit_event(@e);
            }

            if player_data.current_enemy.health == 0 {
                let e = GameEvent { id: user_address, won: true, died: false };
                world.emit_event(@e);
            }

            // ensure user health doesnt exceed max healh
            if player_data.health >= *storage_user_character.max_health {
                player_data.health = *storage_user_character.max_health
            }

            // Ensure demeanor does not exceed maximum
            if player_data.demeanor > 20 {
                player_data.demeanor = 20;
            }
            player_data.current_enemy = user_enemy.clone();
            player_data.last_attack = true;
            // Update world state after attack
            world.write_model(@player_data);
        }

        fn get_user(self: @ContractState, player: ContractAddress) -> Player {
            let mut world = self.world_default();
            let existing_player: Player = world.read_model(player);
            existing_player
        }


        fn special_attack(ref self: ContractState) {
            let mut world = self.world_default();
            let user_address = get_caller_address();

            let player_data: Player = world.read_model(user_address);
            assert(player_data.demeanor >= 0, 'underflow');
            assert(
                player_data.demeanor < neutral || player_data.demeanor >= motivated,
                'unmet conditions',
            );
        }


        //     // Defensive phase where player defends against an enemy attack
        fn defensive_phase(ref self: ContractState) {
            let mut world = self.world_default();
            let user_address = get_caller_address();
            let mut player_data: Player = world.read_model(user_address);

            let mut defense_probabilities_red_blue = ArrayTrait::new();

            defense_probabilities_red_blue.append((50, 1)); // 50% chance for a block
            defense_probabilities_red_blue.append((30, 2)); // 30% chance for a glazed hit
            defense_probabilities_red_blue.append((20, 3)); // 20% chance for a complete hit

            let mut defense_probabilities_red_green = ArrayTrait::new();

            defense_probabilities_red_green.append((20, 1));
            defense_probabilities_red_green.append((30, 2));
            defense_probabilities_red_green.append((50, 3));

            let mut defense_probabilities_red_red = ArrayTrait::new();

            defense_probabilities_red_red.append((33, 1)); // 33% chance for a block
            defense_probabilities_red_red.append((33, 2)); // 33% chance for a glazed hit
            defense_probabilities_red_red.append((33, 3)); // 33% chance for a complete hit

            let mut probabilities: Array<(u32, felt252)> = ArrayTrait::new();

            let mut enemy_color: Array<felt252> = ArrayTrait::new();
            enemy_color.append('red');
            enemy_color.append('green');
            enemy_color.append('blue');

            // block of code to add randomness to dice seed
            let timestamp = get_block_timestamp();
            let user: felt252 = user_address.try_into().unwrap();
            let new_value = user + timestamp.try_into().unwrap();

            let mut dice = DiceTrait::new(
                3, new_value,
            ); // imitating javascript's Math.random() * 100 for 3 range

            let mut result = dice.roll();
            result = result - 1;
            if result < 0 {
                result = 0
            }
            if result > 2 {
                result = 2
            }

            let random_index: u32 = result.try_into().unwrap();

            if enemy_color[random_index] == enemy_color[1] {
                probabilities = defense_probabilities_red_green;
            } else if enemy_color[random_index] == enemy_color[0] {
                probabilities = defense_probabilities_red_red;
            } else {
                probabilities = defense_probabilities_red_blue;
            }

            let (outcome, _get_userrandom): (felt252, u32) = self
                .get_outcome(probabilities, user_address);

            // Simulate an attack, adjust demeanor, and apply damage
            let mut _user_enemy: UEnemy = player_data.current_enemy;

            // Apply changes based on the outcome
            if outcome == 1 {
                // Successful Attack
                // player_data.health -= 20; // Standard damage
                player_data.health = self.safe_math_to_zero(player_data.health, 20)
                // player_data.demeanor -= 2;
            // player_data
            //     .demeanor = self
            //     .safe_math_to_zero(player_data.demeanor, 2)
            //     .try_into()
            //     .unwrap();
            } else if outcome == 2 {
                // Glazed Attack
                // player_data.health -= 5;
                player_data.health = self.safe_math_to_zero(player_data.health, 5)
            } else if outcome == 3 {
                // Critical Attack
                // player_data.health -= 30;
                player_data.health = self.safe_math_to_zero(player_data.health, 30)
                // player_data.demeanor -= 2;
            // player_data
            //     .demeanor = self
            //     .safe_math_to_zero(player_data.demeanor, 2)
            //     .try_into()
            //     .unwrap();
            } else { // Default case, should not occur
            }

            // Ensure demeanor does not exceed maximum
            if player_data.health <= 0 {
                player_data.health = 0;
                let e = GameEvent { id: user_address, won: false, died: true };
                world.emit_event(@e);
            }
            // allow user to attack
            player_data.last_attack = false;
            // Update world state after attack
            world.write_model(@player_data);
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalUtils {
        fn safe_math_to_zero(
            self: @ContractState, mut variable_to_update: u32, value_to_subtract: u32,
        ) -> u32 {
            if variable_to_update <= value_to_subtract {
                0
            } else {
                variable_to_update - value_to_subtract
            }
        }
        fn set_default_position(self: @ContractState, player: ContractAddress, skin_id: u8) {
            let mut world = self.world_default();
            let playable_characters: PlayableCharacterList = world.read_model(0_u8);
            let enemies: EnemiesList = world.read_model(0);
            let index: u32 = skin_id.into();

            match playable_characters.players.get(index) {
                Option::Some(x) => { x.unbox() },
                Option::None => { panic!("player doesnt exist") },
            }

            assert(playable_characters.players.len() > 0, 'empty players');
            assert(enemies.enemies.len() > 0, 'empty enemies');

            // assert(playable_characters.players.get(index), 'empty players');

            let user_character = playable_characters.players.at(index);
            let first_enemy = enemies.enemies.at(0).clone();

            world
                .write_model(
                    @Player {
                        address: player,
                        health: *user_character.health,
                        special_attack: false,
                        attack_power: *user_character.attack_power,
                        demeanor: 10,
                        skin_id,
                        last_attack_state: 0,
                        last_attack: false,
                        current_enemy: first_enemy,
                        character: user_character.clone(),
                    },
                );
        }

        fn get_outcome(
            self: @ContractState,
            probability_weights: Array<(u32, felt252)>,
            walletAddress: ContractAddress,
        ) -> (felt252, u32) {
            let random_number: u32 = get_random_value(walletAddress)
                .try_into()
                .unwrap(); // Generates a random number

            let mut cumulative = 0_u32;
            let mut outcome: felt252 = 0;

            for (weight, result) in probability_weights {
                cumulative = cumulative + weight;
                if random_number < cumulative {
                    outcome = result;
                    break;
                }
            };

            return (outcome, random_number);
        }

        fn increment_entity_number(self: @ContractState, entity_id: u32) {
            let mut world = self.world_default();
            let mut entity: super::EntityCounter = world.read_model(entity_id);
            entity.count = entity.count + 1;
            world.write_model(@entity);
        }

        fn decrease_entity_number(self: @ContractState, entity_id: u32) {
            let mut world = self.world_default();
            let mut entity: super::EntityCounter = world.read_model(entity_id);
            if entity.count > 0 {
                entity.count = entity.count - 1;
            } else {
                entity.count = 0;
            }

            world.write_model(@entity);
        }

        /// Use the default namespace "ns". A function is handy since the ByteArray
        /// can't be const.
        fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"lutte")
        }


        fn is_owner(self: @ContractState) -> bool {
            let mut world = self.world_default();

            let current_contract_selector = world.resource_selector(@self.dojo_name());

            world.dispatcher.is_owner(current_contract_selector, starknet::get_caller_address())
        }
    }
}
// todo: add and emit events for wins and losses

// #[cfg(test)]
// mod tests {
//     use super::actions::{get_user};

//     #[test]
//     fn it_works() {
//         let user =
//         get_user("0x03ACADC542Eb14fFeE3d2be0CC33672Cac74dbAAe1A7cbA2D0F1Ff76E81D16dC");
//         println!(user);
//     }
// }


