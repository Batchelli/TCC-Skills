import styles from "./Fpassword.module.css";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../../components/inputs/inputText/Input";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { FaUser, FaUserTie } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { HiIdentification } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import api from "../../../api";
import lSkills from "../../../components/assets/logoSkill-B.svg"

const Fpassword = () => {
	const navigate = useNavigate();
	const [edv, setEdv] = useState("");
	const [emailUser, setEmail] = useState("");
	const [confirm, setConfirm] = useState("");
	const color = localStorage.getItem("color")

	const email = async (e) => {
		e.preventDefault();
		console.log("OI oi");

		try {
			const NewUser = await axios.post(
				`${api}/email/email`,
				{
					email: emailUser,
					edv: edv,
				}
			);
			toast.success("Código enviado com sucesso");
		} catch (error) {
			console.error("Erro na requisição:", error);
			toast.error("Usuário não cadastrado");
		}
	};

	const confirmeCode = async (e) => {
		try {
			const getCode = await axios.get(
				`${api}/email/getcode/`,
				{}
			);
			console.log("teste", getCode.data);
			if (confirm == getCode.data) {
				console.log("acesso permitido");
				toast.success('Código verificado com sucesso')
				setEdv("")
				setEmail("")
				setConfirm("")
			
				const NewDataUser = await axios.put(`${api}/users/updatePassword/${edv}`, {
					name: "",
					edv: edv,
					email_user: emailUser,
					user_area: "",
					focal_point: "",
					admin_email: "",
					percentage: 0,
					typeUser: "",
					is_activate: false, //verificar se é true ou false
					hashed_password: edv,
					image_user: ""
		
				  });
				  console.log(NewDataUser)
				
			} else {
				toast.error("Código incorreto, tente novamente")
				setConfirm("")
				console.log("acesso negado", confirm);
				console.log("codigo mandado do front", confirm);
				console.log("codigo mandado do back", getCode.data);
					}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.container} style={{ backgroundColor: color }}>
			<div className={styles.contLogin}>
				<div className={styles.logo}>
					<img src={lSkills} alt="logo" />
				</div>
				<div className={styles.inputs}>
					<div className={styles.dadosUser}>
						<div className={styles.input} id={styles.edv}>
							<HiIdentification size={20} className={styles.icon} />
							<div className={styles.line}></div>
							<Input
								label="Edv"
								type="number"
								id="edv"
								placeholder=""
								value={edv}
								onChange={(e) => setEdv(e.target.value)}
								max={8}
							/>
						</div>
					</div>

					<div className={styles.dadosUser}></div>
					<div className={styles.input}>
						<MdEmail size={20} className={styles.icon} />
						<div className={styles.line}></div>
						<Input
							label="Digite seu email"
							type="text"
							id="emailFocal"
							placeholder=""
							value={emailUser}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</div>

				<div className={styles.bts}>
					<button className={styles.bt} onClick={email}>
						<h3>Enviar e-mail</h3>
					</button>
				</div>
				<div className={styles.input}>
					<MdEmail size={20} className={styles.icon} />
					<div className={styles.line}></div>
					<Input
						label="Digite o código"
						type="text"
						id="codigo"
						placeholder=""
						value={confirm}
						onChange={(e) => setConfirm(e.target.value)}
					/>
				</div>
				<div className={styles.bts} >
					<button onClick={confirmeCode} className={styles.bt}>
						<h3>Verificar código</h3>
		
					</button>
					<a  className = {styles.a} href="/login">Voltar</a>
				</div>
				
				
			</div>

			<ToastContainer
				position="top-right"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</div>
	); F
}

export default Fpassword
