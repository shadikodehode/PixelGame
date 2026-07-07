export class Monster {
  constructor({ name, health, strength, defense, value}) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.strength = strength;
    this.defense = defense;
    this.value = value;
  }
}