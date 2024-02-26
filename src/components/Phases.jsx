import React from "react";
import style from "./styles/phases.module.css";
import { useContract, useContractRead } from "@thirdweb-dev/react";

const Phases = ({
  index,
  phaseNo,
  currency,
  value,
  matarValue,
  isActive = false,
  currentPhase,
}) => {
  // console.log(currentPhase);
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);

  const { data: rounds } = useContractRead(contract, "rounds", [index + 1]);
  const roundData =
    rounds?.length > 0 ? rounds.map((item) => item.toString()) : [];
  const tokenPrice = roundData ? roundData[0] : "0";
  const priceTillNextRound = tokenPrice ? tokenPrice / 10 ** 8 : "...";
  return (
    <div className={isActive ? style.phaseStyleActive : style.phaseStyle}>
      <p>{phaseNo}</p>
      <h3>
        {"$" + parseFloat(priceTillNextRound.toString()).toFixed(2)}
        {currency}
      </h3>
      <p className="matarValue">{matarValue + " MATAR"}</p>
    </div>
  );
};

export default Phases;
