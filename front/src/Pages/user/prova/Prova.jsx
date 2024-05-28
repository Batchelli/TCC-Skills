import Navbar from "../../../components/navbar/Navbar";
import styles from "./Prova.module.css";

import axios from "axios";
import api from "../../../api";
import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Prova = () => {
  const [provaData, setProvaData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [numeroRespostasCorretas, setNumeroRespostasCorretas] = useState(0);

  const handleOptionClick = (index, idx) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [`questao_${index}`]: idx,
    }));
  };

  const color = localStorage.getItem("color") || "#0000ff";

  const request = async () => {
    try {
      const response = await axios.get(`${api}/provas/Prova/5`, {
        params: {
          percentage: "100",
        },
      });

      if (response && response.data && Array.isArray(response.data)) {
        const conteudoProva = response.data[0];
        const formattedData = JSON.parse(conteudoProva.conteudo_prova).map(
          (item) => ({
            enunciado: item.Enunciado,
            perguntas: item.perguntas.map((pergunta) => ({
              alternativas: pergunta.alternativas,
              respostaCerta: pergunta.respostaCerta,
            })),
          })
        );

        setProvaData(formattedData);
      } else {
        console.error("Dados da API estão em um formato inválido:", response);
      }
    } catch (error) {
      console.error("Erro ao obter os dados da API:", error);
    }
  };

  useEffect(() => {
    request();
  }, []);

  const verificarRespostasCorretas = () => {
    const newCheckedAnswers = {};
    let corretas = 0;

    Object.entries(selectedOptions).forEach(([key, value]) => {
      const questaoIndex = parseInt(key.split("_")[1]);
      const correta =
        provaData[questaoIndex].perguntas[value].alternativas ===
        provaData[questaoIndex].perguntas.find(
          (pergunta) => pergunta.respostaCerta
        ).alternativas;
      newCheckedAnswers[questaoIndex] = correta ? "correct" : "incorrect";

      if (correta) {
        corretas++;
      }
    });

    setCheckedAnswers(newCheckedAnswers);
    setNumeroRespostasCorretas(corretas);
    setShowResults(true);
  };

  const ops = ["A", "B", "C", "D", "E"];

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.asd}>
        <div className={styles.modalBody}>
          <div className={styles.quests}>
            {provaData.map((prova, index) => (
              <div
                style={{ border: `2px solid ${color}` }}
                className={styles.contQuest}
                key={index}
              >
                <h3>
                  {index + 1} - {prova.enunciado}
                </h3>
                <ul>
                  {prova.perguntas.map((pergunta, idx) => (
                    <div
                      className={styles.options}
                      style={{
                        backgroundColor:
                          showResults &&
                          checkedAnswers[index] === "correct" &&
                          selectedOptions[`questao_${index}`] === idx
                            ? "#6BB268"
                            : showResults &&
                              checkedAnswers[index] === "incorrect" &&
                              selectedOptions[`questao_${index}`] === idx
                            ? "#E33F42"
                            : selectedOptions[`questao_${index}`] === idx,
                        color:
                          selectedOptions[`questao_${index}`] === idx &&
                          showResults &&
                          (checkedAnswers[index] === "correct" ||
                            checkedAnswers[index] === "incorrect")
                            ? "white"
                            : "black",
                      }}
                      key={idx}
                    >
                      <button
                        type="button"
                        style={{
                          border: `1px solid ${
                            showResults &&
                            checkedAnswers[index] &&
                            selectedOptions[`questao_${index}`] === idx
                              ? "white"
                              : color
                          }`,
                          backgroundColor:
                            showResults &&
                            checkedAnswers[index] === "correct" &&
                            selectedOptions[`questao_${index}`] === idx
                              ? "#6BB268"
                              : showResults &&
                                checkedAnswers[index] === "incorrect" &&
                                selectedOptions[`questao_${index}`] === idx
                              ? "#E33F42"
                              : selectedOptions[`questao_${index}`] === idx
                              ? color
                              : "",
                          color:
                            selectedOptions[`questao_${index}`] === idx
                              ? "white"
                              : "black",
                        }}
                        className={styles.optionButton}
                        onClick={() => handleOptionClick(index, idx)}
                        disabled={showResults}
                      >
                        {ops[idx]}
                      </button>
                      <p>{pergunta.alternativas}</p>
                    </div>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.sideBar}>
            <div>
              <button
                className={styles.send}
                onClick={verificarRespostasCorretas}
                style={{ backgroundColor: color }}
              >
                Enviar Respostas
              </button>
            </div>
            <div className={styles.results}>
              <p>
                Questões corretas: {showResults ? numeroRespostasCorretas : ""}
              </p>
              <p>
                Questões Incorretas:
                {showResults
                  ? Object.keys(selectedOptions).length -
                    numeroRespostasCorretas
                  : ""}
              </p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Prova;
