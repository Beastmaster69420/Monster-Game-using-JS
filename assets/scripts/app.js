const ATTACK_VALUE = 10;
const BIG_ATK_VALUE = 19;
const monsterAttackValue = 11;
const HEALVAL = 5;
const battleLog = [];

const MODE_ATK = 'ATTACK';
const MODE_STRONG_ATK = 'STRONG_ATTACK';

const LOG_PLAYER_ATK = 'PLAYER_ATTACK';
const LOG_PLAYER_STRONG_ATK = 'PLAYER_STRONG_ATTACK';
const LOG_MONSTER_ATK = 'MONSTER_ATTACK';
const LOG_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_GAME_OVER = 'GAME_OVER';


const enteredNumber = prompt('Enter max life', 100);
let chosenMaxLife = +enteredNumber;

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasExtraLife = true;

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

adjustHealthBars(chosenMaxLife);

function endRound() {
  let initialplayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(monsterAttackValue);
  currentPlayerHealth -= playerDamage;
  writeLog(LOG_MONSTER_ATK, playerDamage, currentMonsterHealth, currentPlayerHealth);
  if (currentPlayerHealth <= 0 && hasExtraLife) {
    hasExtraLife = false;
    removeBonusLife();
    currentPlayerHealth = initialplayerHealth;
    setPlayerHealth(initialplayerHealth);
    alert("Cat has nine lives but you had two!");
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("Winner");
    writeLog(LOG_GAME_OVER,'PLAYER WON', currentMonsterHealth, currentPlayerHealth);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("Defeated");
    writeLog(LOG_GAME_OVER,'MONSTER WON', currentMonsterHealth, currentPlayerHealth);
  } else if (currentPlayerHealth <= 0 && currentPlayerHealth <= 0) {
    alert("Stalemate!");
    writeLog(LOG_GAME_OVER,'DRAW', currentMonsterHealth, currentPlayerHealth);
  }
  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function writeLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    finalValue: val,
    finalMonsterHealth: monsterHealth,
    finalPLayerHealth: playerHealth,
  };
  switch(ev) {
    case LOG_PLAYER_ATK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_PLAYER_STRONG_ATK:
      logEntry = {
        event: ev,
        finalValue: val,
        target: 'Monster',
        finalMonsterHealth: monsterHealth,
        finalPLayerHealth: playerHealth,
      };
      break;
    case LOG_MONSTER_ATK:
      logEntry = {
        event: ev,
        finalValue: val,
        target: 'Player',
        finalMonsterHealth: monsterHealth,
        finalPLayerHealth: playerHealth,
      };
      break;
    case LOG_PLAYER_HEAL:
      logEntry = {
        event: ev,
        finalValue: val,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPLayerHealth: playerHealth,
      };
      break;
    case LOG_GAME_OVER:
      logEntry = {
        event: ev,
        finalValue: val,
        finalMonsterHealth: monsterHealth,
        finalPLayerHealth: playerHealth,
      };
    default:
      logEntry = {};
  }
  // if (ev === LOG_PLAYER_ATK) {
  //   logEntry.target = 'MONSTER';
  // } else if (ev === LOG_PLAYER_STRONG_ATK) {
  //   logEntry = {
  //     event: ev,
  //     finalValue: val,
  //     target: 'Monster',
  //     finalMonsterHealth: monsterHealth,
  //     finalPLayerHealth: playerHealth,
  //   };
  // } else if (ev === LOG_MONSTER_ATK) {
  //   logEntry = {
  //     event: ev,
  //     finalValue: val,
  //     target: 'Player',
  //     finalMonsterHealth: monsterHealth,
  //     finalPLayerHealth: playerHealth,
  //   };
  // } else if (ev === LOG_PLAYER_HEAL) {
  //   logEntry = {
  //     event: ev,
  //     finalValue: val,
  //     target: 'PLAYER',
  //     finalMonsterHealth: monsterHealth,
  //     finalPLayerHealth: playerHealth,
  //   };
  // } else if (ev === LOG_GAME_OVER) {
  //   logEntry = {
  //     event: ev,
  //     finalValue: val,
  //     finalMonsterHealth: monsterHealth,
  //     finalPLayerHealth: playerHealth,
  //   };
  // }
  battleLog.push(logEntry);
}

function ATTACK_MONSTER(mode) {
  const maxDamage=mode===MODE_ATK?ATTACK_VALUE:BIG_ATK_VALUE;
  const LOG_EVENT=mode===MODE_ATK?LOG_PLAYER_ATK:LOG_PLAYER_STRONG_ATK;
  // if (mode === MODE_ATK) {
  //   maxDamage = ATTACK_VALUE;
  //   LOG_EVENT= LOG_PLAYER_ATK;
  // } else if (mode === MODE_STRONG_ATK) {
  //   maxDamage = BIG_ATK_VALUE;
  //   LOG_EVENT=LOG_PLAYER_STRONG_ATK;
  // }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeLog(LOG_EVENT,damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}
function attackHandler() {
  ATTACK_MONSTER(MODE_ATK);
}

function strongAttackBtnClick() {
  ATTACK_MONSTER(MODE_STRONG_ATK);
}

function onClickhealPlayer() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEALVAL) {
    alert('Exceeds max life');
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEALVAL;
  }

  increasePlayerHealth(healValue);
  currentMonsterHealth += healValue;
  writeLog(LOG_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

function onClickPrintLog() {
  for(let i=10;i>0;i--){
    console.log('--------------------------------');
  }
  // for(i=0;i<battleLog.length;i++){
  // console.log(battleLog[i]);
  // }
  let i=0;
  for(const log of battleLog) {
    console.log(log);
    console.log(i);
    i++;
  }
}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackBtnClick);
healBtn.addEventListener('click', onClickhealPlayer);
logBtn.addEventListener('click', onClickPrintLog);