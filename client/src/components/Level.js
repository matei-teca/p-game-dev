import { useEffect, useState } from "react";
import state from "./test";
import { useAtom, useAtomValue, useSetAtom  } from "jotai";

export default function Level(props) {
  const [ifPlayerWon, setIfPlayerWon] = useState(false);
  const [level, setLevel] = useAtom(state.level);

  const calculateMaxExperience = () => {
    if (level.exp >= level.maxExp) {
      // props.handleLevel(
      //   props.level.level + 1,
      //   props.level.exp % props.level.maxExp,
      //   props.level.maxExp + props.level.maxExp / 2
      // );
      setLevel({
        level: level.level + 1,
        exp: level.exp % level.maxExp,
        maxExp: level.maxExp + level.maxExp / 2,
      });
    }
    return level.maxExp;
  };

  useEffect(() => {
    if (level.level === 4) setIfPlayerWon(true);
  }, [level.level]);

  if (ifPlayerWon) {
    document.querySelector(".Test").innerHTML = "";
    document.querySelector(".pokemons-battleground").style.background = "none";
  }

  return ifPlayerWon ? (
    <div className="player-won">
      <h1 className="won">CONGRATS</h1>
      <h1 className="won">You won the game</h1>
      <button onClick={() => window.location.reload()}>Play again</button>
    </div>
  ) : (
    <div>
      <p className="level">
        Level{level.level} {level.exp}/{calculateMaxExperience()}
      </p>
    </div>
  );
}
