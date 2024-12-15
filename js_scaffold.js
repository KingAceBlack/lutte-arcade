// Utility function to generate a random number and determine outcome based on probability
function getOutcome(probabilities) {
  const random = Math.random() * 100; // random number between 0 and 100
  console.log("random");
  console.log(random);
  let cumulative = 0;

  // Iterate through the probabilities
  for (const [outcome, probability] of Object.entries(probabilities)) {
    cumulative += probability;
    console.log("cumulative");
    console.log(cumulative);
    if (random <= cumulative) {
      return outcome;
    }
  }
  return "default"; // Fallback in case something goes wrong
}

// Define probabilities for different outcomes based on enemy's color
const attackOutcomeBlue = {
  successful: 50, // 50% chance of success
  glazed: 20, // 20% chance of a glazed attack
  miss: 15, // 15% chance of a miss
  critical: 15 // 15% chance of a critical attack
};

const attackOutcomeGreen = {
  miss: 50,
  glazed: 20,
  hit: 15,
  critical: 15
};

const attackOutcomeRed = {
  hit: 25,
  miss: 25,
  glazed: 25,
  critical: 25
};

// Function to resolve the attack based on player's and enemy's color choices
function resolveAttack(playerColor, enemyColor) {
  let outcome;

  if (enemyColor === "blue") {
    outcome = getOutcome(attackOutcomeBlue);
  } else if (enemyColor === "green") {
    outcome = getOutcome(attackOutcomeGreen);
  } else if (enemyColor === "red") {
    outcome = getOutcome(attackOutcomeRed);
  } else {
    outcome = "unknown"; // In case the enemy color is invalid
  }

  console.log(`Attack Outcome: ${outcome}`);
  return outcome;
}

// Define probabilities for defensive outcomes
const defenseOutcomeRedBlue = {
  block: 50,
  glazed_hit: 30,
  complete_hit: 20
};

const defenseOutcomeRedGreen = {
  complete_hit: 50,
  glazed_hit: 30,
  block: 20
};

const defenseOutcomeRedRed = {
  block: 33,
  glazed_hit: 33,
  complete_hit: 33
};

// Function to resolve the defensive phase
function resolveDefense(playerColor, enemyColor) {
  let outcome;

  if (playerColor === "red" && enemyColor === "blue") {
    outcome = getOutcome(defenseOutcomeRedBlue);
  } else if (playerColor === "red" && enemyColor === "green") {
    outcome = getOutcome(defenseOutcomeRedGreen);
  } else if (playerColor === "red" && enemyColor === "red") {
    outcome = getOutcome(defenseOutcomeRedRed);
  } else {
    outcome = "unknown";
  }

  console.log(`Defense Outcome: ${outcome}`);
  return outcome;
}

// Example test cases for attack and defense
resolveAttack("red", "blue"); // Resolve an attack phase where enemy picked blue
resolveDefense("red", "green"); // Resolve a defensive phase where enemy picked green
