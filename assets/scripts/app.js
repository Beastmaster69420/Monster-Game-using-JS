const ATTACK_VALUE = 10;
const monsterAttackValue = 11;

let chosenMaxLife = 5;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
  const damage = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damage;
  const playerDamage = dealPlayerDamage(monsterAttackValue);
  currentPlayerHealth -= playerDamage;
  if (currentMonsterHealth<=0 && currentPlayerHealth>0){
    alert("Winner");
  }else if (currentPlayerHealth<=0 && currentMonsterHealth>0){
    alert("Defeated");
  }else if (currentPlayerHealth<=0 && currentPlayerHealth<=0){
    alert("Stalemate!");
  }
}

attackBtn.addEventListener('click', attackHandler);