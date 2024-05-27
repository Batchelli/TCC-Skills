import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import LandingPage from "./Pages/user/landingPage/LandingPage.jsx";
import Login from "./Pages/user/login/Login";
import Trilha from "./Pages/user/trilha/Trilha.jsx"

import Cadastro from "./Pages/admin/cadastros/cadastro/Cadastro"
import CadastroAdm from "./Pages/admin/cadastros/cadastro-Adm/CadastroAdm.jsx";
import CadMassa from "./Pages/admin/cadastros/cadMassa/CadMassa.jsx";

import Hub from "./Pages/user/hub/Hub";
import HubADM from "./Pages/admin/hubs/hub-ADM/HubADM.jsx";
import HubCad from "./Pages/admin/hubs/hub-CAD/HubCad.jsx";
import HubTri from "./Pages/admin/hubs/hub-TRI/HubTri.jsx";
import HubTCri from "./Pages/admin/hubs/hub-TCRI/HubTCri.jsx";
import HubTeam from "./Pages/admin/hubs/hubAdm-TEAM/HubTeam.jsx";
import HubTeams from "./Pages/admin/hubs/hub-TEAMS/HubTeams.jsx";

import MakeTri from "./Pages/admin/makeTri/MakeTri.jsx";
import TurmaCri from "./Pages/admin/TurmaCri/TurmaCri.jsx";

import { TypeProvider } from "./Auth.jsx"
import Central from "./Pages/admin/central/Central.jsx";

import Fpassword from "./Pages/user/fpassword/Fpassword.jsx";
import FirstAcessUser from "./Pages/user/FirstAcessUser/FirstAcessUser.jsx";
import UserPerfil from "./Pages/user/userPerfil/UserPerfil.jsx";

import Prova from "./Pages/user/prova/Prova.jsx";
import MakeTest from "./components/modal/makeTest/MakeTest.jsx";


const ProtectedRoute = ({ element, allowedUserTypes }) => {
	const token = localStorage.getItem('token');
	if (!token) {
		return <Navigate to="/login" />;
	} else {
		const decodedToken = jwtDecode(token);

		if (allowedUserTypes.includes(decodedToken.typeUser)) {
			return element;
		} else {
			return <Navigate to="/hubTrilhas" />;
		}
	}

};


const Router = () => {
	return (
		<BrowserRouter basename="/skills">
			<TypeProvider>
				<Routes>
					<Route element={<LandingPage />} path="/" exact />
					<Route element={<Login />} path="/login"/>
					<Route element={<Central />} path="/adicionarTime"/>
					<Route element={<Fpassword />} path="/fpass"/>
					<Route element={<FirstAcessUser />} path="/first"/>
					<Route element={<MakeTest />} path="/maketest"/>
					<Route element={<Prova />} path="/prova"/>

					<Route path="/hubTrilhas" element={<Hub />}/>
					<Route path="/trilha/:id" element={<Trilha />}/>
					<Route path="/userprofile" element={<UserPerfil />}/>
					<Route path="/singleregister" element={<Cadastro />}/>
					<Route path="/multiregister" element={<CadMassa />}/>
					<Route path="/adminregister" element={<CadastroAdm />}/>
					<Route path="/hubadmin" element={<HubADM />}/>
					<Route path="/hubcadastros" element={<HubCad />}/>
					<Route path="/hubtrilhasadm" element={<HubTri />}/>
					<Route path="/trilhascriadas" element={<HubTCri />}/>
					<Route path="/hubteam" element={<HubTeam />}/>
					<Route path="/teams" element={<HubTeams />}/>
					<Route path="/criartime" element={<TurmaCri />}/>
					<Route path="/criartrilha" element={<MakeTri />}/>

					{/* <Route path="/hubTrilhas" element={<ProtectedRoute element={<Hub />} allowedUserTypes={['SAdmin', 'Admin', 'User']} />} />
					<Route path="/trilha/:id" element={<ProtectedRoute element={<Trilha />} allowedUserTypes={['SAdmin', 'Admin', 'User']} />} />
					<Route path="/userprofile" element={<ProtectedRoute element={<UserPerfil />} allowedUserTypes={['SAdmin', 'Admin', 'User']} />} />
					<Route path="/singleregister" element={<ProtectedRoute element={<Cadastro />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/multiregister" element={<ProtectedRoute element={<CadMassa />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/adminregister" element={<ProtectedRoute element={<CadastroAdm />} allowedUserTypes={['SAdmin']} />} />
					<Route path="/hubadmin" element={<ProtectedRoute element={<HubADM />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/hubcadastros" element={<ProtectedRoute element={<HubCad />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/hubtrilhasadm" element={<ProtectedRoute element={<HubTri />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/trilhascriadas" element={<ProtectedRoute element={<HubTCri />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/hubteam" element={<ProtectedRoute element={<HubTeam />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/teams" element={<ProtectedRoute element={<HubTeams />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/criartime" element={<ProtectedRoute element={<TurmaCri />} allowedUserTypes={['SAdmin', 'Admin']} />} />
					<Route path="/criartrilha" element={<ProtectedRoute element={<MakeTri />} allowedUserTypes={['SAdmin', 'Admin']} />} /> */}
					
				</Routes>
			</TypeProvider>
		</BrowserRouter>
	);
};

export default Router;
