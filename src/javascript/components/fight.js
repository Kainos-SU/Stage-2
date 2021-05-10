import { controls } from '../../constants/controls';


let firstPlayer = {}, secondPlayer = {};

export function fight(firstFighter, secondFighter, cb) {
    let keySet = new Set();
    firstPlayer = Object.assign({}, firstFighter);
    secondPlayer = Object.assign({}, secondFighter);
    firstPlayer.block = false;
    firstPlayer.cooldown = false;
    firstPlayer.critical = false;
    firstPlayer.lifeBar = document.getElementById("left-fighter-indicator");
    firstPlayer.lifeBar.style.float = "left";
    secondPlayer.block = false;
    secondPlayer.cooldown = false;
    secondPlayer.critical = false;
    secondPlayer.lifeBar = document.getElementById("right-fighter-indicator");
    secondPlayer.lifeBar.style.float = "right";

    const keyDown = (event) => {
      // console.log(event.code);
      if (event.repeat) {
        return
      }
        keySet.add(event.code);
        for (let code of keySet) {
          if (code === controls.PlayerOneBlock){
            firstPlayer.block = true;
            continue;
          }
          if (code === controls.PlayerTwoBlock) {
            secondPlayer.block = true;
            continue;
          }
          if (!firstPlayer.block) {
            if (code === controls.PlayerOneAttack) {
              secondPlayer.health -= getDamage(firstPlayer, secondPlayer);
              keySet.delete(code);
              continue;
            }
          }
          if (!secondPlayer.block) {
            if (code === controls.PlayerTwoAttack) {
              firstPlayer.health -= getDamage(secondPlayer, firstPlayer);
              keySet.delete(code);
              continue;
            }
          }

        }

        firstPlayer.critical = true;
        for (let code of controls.PlayerOneCriticalHitCombination) {
          if (!keySet.has(code)) {
            firstPlayer.critical = false;
            break;
          }
        }
        if (!keySet.has(controls.PlayerOneBlock) && firstPlayer.critical && !firstPlayer.cooldown) {
          firstPlayer.cooldown = true;
          setTimeout(()=>{
            firstPlayer.colldown = false;
            console.log(firstPlayer.colldown);
          }, 10000);
          secondPlayer.health -= getDamage(firstPlayer, secondPlayer);
          for (let code of controls.PlayerOneCriticalHitCombination) {
            keySet.delete(code);
          }
        }

        secondPlayer.critical = true;
        for (let code of controls.PlayerTwoCriticalHitCombination) {
          if (!keySet.has(code)) {
            secondPlayer.critical = false;
            break;
          }
        }
        if (!keySet.has(controls.PlayerTwoBlock) && secondPlayer.critical && !secondPlayer.cooldown) {
          secondPlayer.cooldown = true;
          setTimeout(()=>{
            secondPlayer.colldown = false;
            console.log(secondPlayer.colldown);
          }, 10000);
          secondPlayer.health -= getDamage(secondPlayer, firstPlayer);
          for (let code of controls.PlayerTwoCriticalHitCombination) {
            keySet.delete(code);
          }
        }
        firstPlayer.lifeBar.style.width = (firstPlayer.health / firstFighter.health * 100) + "%";
        secondPlayer.lifeBar.style.width = secondPlayer.health / secondFighter.health * 100 + "%";
        // console.log(`firstPlayer Health = ${firstPlayer.health}\nsecondPlayer Health = ${secondPlayer.health}`);
        if (firstPlayer.health <= 0){
          console.log("hello");
          cb(secondFighter);
        }else if (secondPlayer.health <=0) {
          console.log("hello");
          cb(firstFighter);
        }
    }

    const keyUp = (event) => {
      if (keySet.has(event.code)){
        if (event.code === controls.PlayerOneBlock) {
          firstPlayer.block = false;
        } else if (event.code === controls.PlayerTwoBlock) {
          secondPlayer.block = false;
        }
        keySet.delete(event.code);
      }
    }

    document.addEventListener('keyup', keyUp);

    document.addEventListener('keydown', keyDown);

    // resolve the promise with the winner when fight is over
}

export function getDamage(attacker, defender) {
  if (attacker.critical) {
    let power = getHitPower(attacker);
    attacker.critical = false;
    return power - getBlockPower(defender);
  }else if (defender.block) {
    return 0;
  }
  let p = getHitPower(attacker) - getBlockPower(defender);
  if (p >= 0)
    return p;
  else
    return 0;
  // return damage
}

export function getHitPower(fighter) {
  if (fighter.critical) {
    return fighter.attack * 2;
  }
  let criticalHitChance = Math.random() * 2 + 1;
  let damage = criticalHitChance * fighter.attack;
  if (damage >= 0)
    return damage;
  else {
    return 0;
  }
  // return hit power
}

export function getBlockPower(fighter) {
  let dogeChance = Math.random() * 2 + 1;
  return fighter.defense * dogeChance;
  // return block power
}
