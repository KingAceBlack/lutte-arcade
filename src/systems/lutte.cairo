use starknet::{ContractAddress, get_caller_address, get_block_number, get_block_timestamp};
use lutte::models::{
    player::Player, player::Enemy, player::UEnemy, player::EnemiesList, player::PlayableCharacter,
    player::PlayableCharacterList,
};
use starknet::storage::{
    StoragePointerReadAccess, StoragePointerWriteAccess, Vec, VecTrait, MutableVecTrait,
};

use lutte::random::dice::{Dice, DiceTrait};
// use core::{ArrayTrait, Array};

#[starknet::interface]
trait IBattleActions<T> {
    fn offensive_phase(
        ref self: T, color: u8,
    ); // color red - 0, green - 1, blue - 2, ...anything else throws an error
    fn fetch_playable_characters(self: @T) -> Array<PlayableCharacter>;
    fn fetch_enemies(self: @T) -> Array<UEnemy>;
    fn defensive_phase(ref self: T);
    fn get_user(self: @T, player: ContractAddress) -> Player;
    fn create_first_enemy(ref self: T, skin: ByteArray, health: u32, attack_power: u8);
    fn create_first_character(ref self: T, skin: ByteArray, health: u32, attack_power: u8);
    fn create_character(ref self: T, skin: ByteArray, health: u32, attack_power: u8, level: u8);
    fn create_enemy(ref self: T, skin: ByteArray, health: u32, attack_power: u8, level: u8);
    fn spawn(ref self: T);
    // fn get_outcome(
//     ref self: T, probability_weights: Array<(u32, felt252)>, walletAddress: ContractAddress
// ) -> felt252;
}

const attack_probabilities_blue: [(u32, felt252); 4] = [
    (50, 1), // 50% chance for a successful attack
    (20, 2), // 20% chance for a glazed attack
    (15, 3), // 15% chance for a miss
    (15, 4) // 15% chance for a critical hit
];

// Probabilities when enemy picks green
const attack_probabilities_green: [(u32, felt252); 4] = [
    (50, 3), // 50% chance for a miss
    (20, 2), // 20% chance for a glazed attack
    (15, 1), // 15% chance for a hit
    (15, 4) // 15% chance for a critical hit
];

const attack_probabilities_red: [(u32, felt252); 4] = [
    (25, 3), // 50% chance for a miss
    (25, 2), // 20% chance for a glazed attack
    (25, 1), // 15% chance for a hit
    (25, 4) // 15% chance for a critical hit
];

// Probabilities for defense phase when player chooses red and enemy picks blue
const defense_probabilities_red_blue: [(u32, felt252); 3] = [
    (50, 1), // 50% chance for a block
    (30, 2), // 30% chance for a glazed hit
    (20, 3) // 20% chance for a complete hit
];


// let mut probabilities = Array::new();  // Initialize an empty array

//     probabilities.append(20_u32);  // 20% chance for the first outcome
//     probabilities.append(30_u32);  // 30% chance for the second outcome
//     probabilities.append(50_u32);  // 50% chance for the third outcome

// const defense_probabilities_red_green: Array<u32> = [20, 30, 50];

// :new!();
// defense_probabilities_red_green.append!((20, 1));
// defense_probabilities_red_green.append!((30, 2));
// defense_probabilities_red_green.append!((50, 3));

const defense_probabilities_red_red: [(u32, felt252); 3] = [
    (33, 1), // 50% chance for a block
    (33, 2), // 30% chance for a glazed hit
    (33, 3) // 20% chance for a complete hit
];

#[dojo::contract]
mod actions {
    use dojo::model::IModel;
    use dojo::world::WorldStorageTrait;
    use dojo::world::IWorldDispatcherTrait;
    use dojo::model::{ModelStorage, ModelValueStorage};
    use super::{IBattleActions};
    use super::{ContractAddress, get_caller_address};
    use super::{Player, Enemy, UEnemy, EnemiesList, PlayableCharacter, PlayableCharacterList};
    use super::{get_block_number, get_block_timestamp, Dice, DiceTrait};
    use super::{Vec, VecTrait};


    // #[storage]
    // struct Storage {
    //     owner: ContractAddress,
    //     enemies: Array<Enemy>
    // }

    // either manage enemies in a struct or as a storage

    // #[constructor]
    // fn constructor() {}

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


    #[abi(embed_v0)]
    impl BattleImpl of super::IBattleActions<ContractState> {
        fn spawn(ref self: ContractState) {
            let player = get_caller_address();
            self.set_default_position(player);
        }

        fn fetch_enemies(self: @ContractState) -> Array<UEnemy> {
            let mut world = self.world_default();
            let id = 0_u8;

            let mut enemies_list: EnemiesList = world.read_model(id);
            return enemies_list.enemies;
        }

        fn fetch_playable_characters(self: @ContractState) -> Array<PlayableCharacter> {
            let mut world = self.world_default();
            let id = 0_u8;

            let mut playable_charactr_list: PlayableCharacterList = world.read_model(id);
            return playable_charactr_list.players;
        }

        fn create_first_enemy(
            ref self: ContractState, skin: ByteArray, health: u32, attack_power: u8,
        ) {
            let mut world = self.world_default();
            // let caller = get_caller_address();
            // let mut uid = world.uuid();
            let mut uid = 0;
            assert(self.is_owner(), 'unauthorised');

            let new_enemy = UEnemy { uid, health, attack_power, level: 0_u8, special_attack: true };
            let first_enemy = EnemiesList { id: 0_u8, enemies: array![new_enemy] };
            world.write_model(@first_enemy);
        }

        fn create_first_character(
            ref self: ContractState, skin: ByteArray, health: u32, attack_power: u8,
        ) {
            let mut world = self.world_default();
            let mut uid = 0_u8;
            // assert(self.is_owner(), 'unauthorised');
            let new_character = PlayableCharacter {
                uid, health, attack_power, level: 0_u8, special_attack: true, skin,
            };

            let first_character = PlayableCharacterList { id: uid, players: array![new_character] };
            world.write_model(@first_character);
        }

        fn create_character(
            ref self: ContractState, skin: ByteArray, health: u32, attack_power: u8, level: u8,
        ) {
            let mut world = self.world_default();

            let mut world_characters: PlayableCharacterList = world.read_model(0_u8);
            let mut current_characters: Array::<PlayableCharacter> = world_characters.players;

            current_characters
                .append(
                    PlayableCharacter {
                        uid: (current_characters.len() + 1).try_into().unwrap(),
                        skin,
                        health,
                        attack_power,
                        level,
                        special_attack: true,
                    },
                );

            world_characters = PlayableCharacterList { id: 0, players: current_characters };

            world.write_model(@world_characters);
        }
        fn create_enemy(
            ref self: ContractState, skin: ByteArray, health: u32, attack_power: u8, level: u8,
        ) {
            let mut world = self.world_default();

            let mut world_enemies: EnemiesList = world.read_model(0_u8);
            let mut current_enemies: Array::<UEnemy> = world_enemies.enemies;

            current_enemies
                .append(
                    UEnemy {
                        uid: (current_enemies.len() + 1).try_into().unwrap(),
                        health,
                        attack_power,
                        level,
                        special_attack: true,
                    },
                );

            world_enemies = EnemiesList { id: 0, enemies: current_enemies };

            world.write_model(@world_enemies);
        }

        //     // Offensive phase where player attacks
        fn offensive_phase(ref self: ContractState, color: u8) {
            let mut world = self.world_default();
            let user_address = get_caller_address();
            let mut player_data: Player = world.read_model(user_address);

            assert(color >= 0 && color <= 2, 'Invalid color');

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

            let (outcome, random): (felt252, u32) = self.get_outcome(probabilities, user_address);

            // Simulate an attack, adjust demeanor, and apply damage
            let mut user_enemy: UEnemy = player_data.current_enemy;

            // Apply changes based on the outcome
            if outcome == 1 {
                // Successful Attack
                player_data.demeanor += 3;
                user_enemy.health -= 20; // Standard damage
            } else if outcome == 2 {
                // Glazed Attack
                player_data.demeanor += 1; // Minor boost
                user_enemy.health -= 5; // Small amount of damage
            } else if outcome == 3 { // Missed Attack
            // No demeanor change or health deduction
            } else if outcome == 4 {
                // Critical Attack
                player_data.demeanor += 5; // Higher boost
                user_enemy.health -= 30; // Higher damage (10+ extra HP)
            } else { // Default case, should not occur
            }

            // Ensure demeanor does not exceed maximum
            if player_data.demeanor > 20 {
                player_data.demeanor = 20;
            }
            // Update world state after attack
            world.write_model(@player_data);
        }

        fn get_user(self: @ContractState, player: ContractAddress) -> Player {
            let mut world = self.world_default();
            let existing_player: Player = world.read_model(player);
            existing_player
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

            defense_probabilities_red_red.append((33, 1)); // 50% chance for a block
            defense_probabilities_red_red.append((33, 2)); // 30% chance for a glazed hit
            defense_probabilities_red_red.append((33, 3)); // 20% chance for a complete hit

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

            let (outcome, random): (felt252, u32) = self.get_outcome(probabilities, user_address);

            // Simulate an attack, adjust demeanor, and apply damage
            let mut user_enemy: UEnemy = player_data.current_enemy;

            // Apply changes based on the outcome
            if outcome == 1 {
                // Successful Attack
                player_data.demeanor += 3;
                user_enemy.health -= 20; // Standard damage
            } else if outcome == 2 {
                // Glazed Attack
                player_data.demeanor += 1; // Minor boost
                user_enemy.health -= 5; // Small amount of damage
            } else if outcome == 3 { // Missed Attack
            // No demeanor change or health deduction
            } else if outcome == 4 {
                // Critical Attack
                player_data.demeanor += 5; // Higher boost
                user_enemy.health -= 30; // Higher damage (10+ extra HP)
            } else { // Default case, should not occur
            }

            // Ensure demeanor does not exceed maximum
            if player_data.demeanor > 20 {
                player_data.demeanor = 20;
            }
            // Update world state after attack
            world.write_model(@player_data);
            // (outcome, random, random_index)
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalUtils {
        fn set_default_position(self: @ContractState, player: ContractAddress) {
            let mut world = self.world_default();

            world
                .write_model(
                    @Player {
                        address: player,
                        health: 34,
                        special_attack: true,
                        attack_power: 35,
                        demeanor: 12,
                        skin: 1,
                        current_enemy: UEnemy {
                            uid: 0, health: 0, special_attack: true, level: 0, attack_power: 8,
                        },
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

            // println!("hello {}", random_number);

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


