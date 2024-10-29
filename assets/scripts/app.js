const ATTACK_VALUE = 10;
const BIG_ATK_VALUE = 19;
const monsterAttackValue = 11;
const HEALVAL = 5;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function endRound(){
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

function ATTACK_MONSTER(mode){
  let maxDamage;
  if (mode === 'ATTACK'){
    maxDamage = ATTACK_VALUE;
  }else if (mode === 'STRONG_ATTACK'){
    maxDamage= BIG_ATK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}
function attackHandler() {
  ATTACK_MONSTER('ATTACK');
}

function strongAttackBtnClick(){
  ATTACK_MONSTER('STRONG_ATTACK');
}



function onClickhealPlayer(){
  let healValue;
  if (currentPlayerHealth>=chosenMaxLife-HEALVAL) {
    alert('Exceeds max life');
    healValue = chosenMaxLife-currentPlayerHealth;
  } else{
    healValue = HEALVAL;
  }

  increasePlayerHealth(healValue);
  currentMonsterHealth += healValue;
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click',strongAttackBtnClick);
healBtn.addEventListener('click', onClickhealPlayer);
