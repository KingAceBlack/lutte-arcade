use starknet::{ContractAddress, get_caller_address, get_block_number, get_block_timestamp};
use lutte::models::{player::Player, player::Enemy, player::UEnemy, player::EnemiesList};
use starknet::storage::{
    StoragePointerReadAccess, StoragePointerWriteAccess, Vec, VecTrait, MutableVecTrait
};
use lutte::random::dice::{Dice, DiceTrait};


#[starknet::interface]
trait IBattleActions<T> {
    // fn offensive_phase(ref self: T, player: ContractAddress);
    // fn defensive_phase(ref self: T, player: ContractAddress);
    fn get_user(self: @T, player: ContractAddress) -> Player;
    // fn create_first_enemy(ref self: T, health: u32, demeanor: u8, attack_power: u8, level: u8);
    fn spawn(ref self: T);
    fn get_outcome(
        ref self: T, probability_weights: Array<(u32, felt252)>, walletAddress: ContractAddress
    ) -> felt252;
}

const attack_probabilities_blue: [
    (u32, felt252)
    ; 4] = [
    (50, 1), // 50% chance for a successful attack
    (20, 2), // 20% chance for a glazed attack
    (15, 3), // 15% chance for a miss
    (15, 4), // 15% chance for a critical hit
];

// Probabilities when enemy picks green
const attack_probabilities_green: [
    (u32, felt252)
    ; 4] = [
    (50, 3), // 50% chance for a miss
    (20, 2), // 20% chance for a glazed attack
    (15, 1), // 15% chance for a hit
    (15, 4), // 15% chance for a critical hit
];

// Probabilities for defense phase when player chooses red and enemy picks blue
const defense_probabilities_red_blue: [
    (u32, felt252)
    ; 3] = [
    (50, 1), // 50% chance for a block
    (30, 2), // 30% chance for a glazed hit
    (20, 3), // 20% chance for a complete hit
];

#[dojo::contract]
mod actions {
    use dojo::world::WorldStorageTrait;
    use dojo::world::IWorldDispatcherTrait;
    use dojo::model::{ModelStorage, ModelValueStorage};
    use super::{IBattleActions};
    use super::{ContractAddress, get_caller_address};
    use super::{Player, Enemy, UEnemy, EnemiesList};
    use super::{get_block_number, get_block_timestamp, Dice, DiceTrait};
    use super::{Vec, VecTrait};

    // let world = self.world(@"lutte");
    // use super::{attack_probabilities_blue, attack_probabilities_green,
    // defense_probabilities_red_blue}

    #[storage]
    struct Storage {
        owner: ContractAddress,
        enemies: Array<Enemy>
    }

    // either manage enemies in a struct or as a storage

    // #[constructor]
    // fn constructor() {}

    fn get_random_value(walletAddress: ContractAddress) -> u8 {
        let _block_number = get_block_number();
        let timestamp = get_block_timestamp();

        let user: felt252 = walletAddress.try_into().unwrap();
        let new_value = user + timestamp.try_into().unwrap();
        let mut dice = DiceTrait::new(15, new_value.try_into().unwrap());

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
            // let mut existing_player = get!(world, (address), Player);
        // if existing_player.health > 0 {
        //     return existing_player;
        // } else {
        //     let enemy_id = world.uuid();

            //     const initial_enemy: Enemy = Enemy {
        //            enemy_id: 0,
        //            health: 200,
        //            demeanor: 14,
        //            attack_power: 50,
        //            special_attack: true,
        //            level: 0,
        //     };

            //     set!(
        //         world,
        //         Player {
        //             address,
        //             player,
        //             health: 34,
        //             special_attack: true,
        //             attack_power: 35,
        //             demeanor: 12,
        //         }
        //     );
        //     existing_player = get!(world, (address), Player);
        //     return existing_player;
        // }
        }


        // fn create_first_enemy(
        //     ref self: ContractState, health: u32, demeanor: u8, attack_power: u8, level: u8
        // ) {
        //     let mut world = self.world_default();
        //     const caller: ContractAddress = get_caller_address();
        //     // let mut uid = world.uuid();
        //     let mut uid = 0;
        //     assert(self.isOwner(caller), "Only Whitelisted Addresses can create Enemies");

        //     let new_enemy = Enemy { uid, health, demeanor, attack_power, level };
        //     let first_enemy = EnemiesList { owner: caller, enemies: array![new_enemy] };
        //     world.write_model(@first_enemy);
        // }

        //     // Offensive phase where player attacks
        //     fn offensive_phase(ref world: IWorldDispatcher, player: ContractAddress) {
        //         let mut player_data = get!(world, player, (Player));

        //         // Simulate an attack, adjust demeanor, and apply damage
        //         player_data.demeanor += 3;
        //         if player_data.demeanor > 20 {
        //             player_data.demeanor = 20;
        //         }

        //         // Update world state after attack
        //         set!(world, (player_data));
        //     }

        fn get_user(self: @ContractState, player: ContractAddress) -> Player {
            let mut world = self.world_default();
            let existing_player: Player = world.read_model(player);
            existing_player
        }
        //     // Defensive phase where player defends against an enemy attack
        // fn defensive_phase(ref world: IWorldDispatcher, player: ContractAddress) {
        //      let mut world = self.world_default();
        //     let mut player_data: Player = world.read_model(player);

        //     // Simulate defense and reduce player's health if necessary
        //     player_data.health -= 10; // example damage

        //     // Update world state after defense
        //     set!(world, (player_data));
        // }

        fn get_outcome(
            ref self: ContractState,
            probability_weights: Array<(u32, felt252)>,
            walletAddress: ContractAddress
        ) -> felt252 {
            let random_number: u32 = get_random_value(walletAddress)
                .try_into()
                .unwrap(); // Generates a random number

            // println!("hello {}", random_number);

            let mut cumulative = 0_u32;
            let mut outcome: felt252 = 0;

            for (
                weight, result
            ) in probability_weights {
                cumulative = cumulative + weight;
                if random_number < cumulative {
                    outcome = result;
                    break;
                }
            };

            return outcome;
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
                        current_enemy: UEnemy {
                            uid: 0, health: 0, special_attack: true, level: 0, attack_power: 8
                        }
                    }
                );
        }

        /// Use the default namespace "ns". A function is handy since the ByteArray
        /// can't be const.
        fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"lutte")
        }

        fn isOwner(self: @ContractState) -> bool {
            let mut world = self.world_default();

            let current_contract_selector = world.contract_selector(self.name());

            if world
                .dispatcher
                .is_owner(
                    resource: current_contract_selector, address: starknet::get_caller_address()
                ) {
                true
            } else {
                false
            }
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


