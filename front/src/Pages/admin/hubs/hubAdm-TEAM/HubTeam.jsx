import React from "react";
import styles from "./HubTeam.module.css";

import CardsCad from "../../../../components/cards/cardsCad/CardsCad";
import NavBar from "../../../../components/navbar/Navbar";
import TeamIcon from "../../../../components/assets/teamIconW.svg";

const HubTeam = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <h1>Times</h1>
        <section className={styles.cards}>
          <CardsCad
            title="Criar Time"
            desc="Area destinada a criação de novos times."
            icon={TeamIcon}
            color="blue"
            path="/criartime"
            btTxt="Criar"
          />
          <CardsCad
            title="Visualizar Times"
            desc="Area destinada visualização de times que foram criados por você."
            icon={TeamIcon}
            color="pink"
            path="/teams"
            btTxt="Visualizar"
          />
        </section>
      </div>
    </div>
  );
};

export default HubTeam;
