USE SP_MG_GUSTAVO_MIGUEL;
GO

INSERT INTO empresa (CNPJ, nomeFantasia, endereco)
VALUES ('86.400.902/0001-30', 'SP Medical Group', 'Av. Barão Limeira, 532, São Paulo, SP');
GO

INSERT INTO tipoUsuario (nomeTipoUsuario)
VALUES ('Paciente'),('Médico'),('Administrador');
GO

INSERT INTO tipoMedico (nomeTipoMedico)
VALUES ('Acupuntura'),('Anestesiologia'),('Angiologia'),('Cardiologia'),('Cirurgia Cardiovascular'),('Cirurgia da Mão'),('Cirurgia do Aparelho Digestivo'),('Cirurgia Geral'),('Cirurgia Pediátrica'),('Cirurgia Plástica'),('Cirurgia Torácica'),('Cirurgia Vascular'),('Dermatologia'),('Radioterapia'),('Urologia'),('Pediatria'),('Psiquiatria');
GO

INSERT INTO usuario (idTipoUsuario, nomeUsuario, email, senha)
VALUES ('2', 'Ricardo Lemos', 'ricardo.lemos@spmedicalgroup.com.br', '###'),
	   ('2', 'Roberto Possarle', 'roberto.possarle@spmedicalgroup.com.br', '###'),
	   ('2', 'Helena Strada', 'helena.souza@spmedicalgroup.com.br', '###'),
	   ('1', 'Ligia', 'ligia@gmail.com', '###'),
	   ('1', 'Alexandre', 'alexandre@gmail.com', '###'),
	   ('1', 'Fernando', 'fernando@gmail.com', '###'),
	   ('1', 'Henrique', 'henrique@gmail.com', '###'),
	   ('1', 'João', 'joao@hotmail.com', '###'),
	   ('1', 'Bruno', 'bruno@gmail.com', '###'),
	   ('1', 'Mariana', 'mariana@outlook.com', '###'),
	   ('3', 'Administrador', 'administrador@admin.com', '###');
GO

INSERT INTO medico (idTipoMedico, idUsuario, CRM, idEmpresa)
VALUES ('3', '1', '54356-SP', '1'), ('17', '2', '53452-SP', '1'), ('16', '3', '65463-SP', '1');
GO

INSERT INTO paciente (RG, CPF, endereco, dataNascimento, telefone, idUsuario)
VALUES ('43522543-5', '94839859000', 'Rua Estado de Israel 240, São Paulo, Estado de São Paulo, 04022-000', '13/10/1983', '11 3456-7654', '4'), 
	   ('32654345-7', '73556944057', 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200', '23/07/2001', '11 98765-6543', '5'), 
	   ('54636525-3', '16839338002', 'Av. Ibirapuera - Indianópolis, 2927,  São Paulo - SP, 04029-200', '10/10/1978', '11 97208-4453', '6'), 
	   ('54366362-5', '14332654765', 'R. Vitória, 120 - Vila Sao Jorge, Barueri - SP, 06402-030', '13/10/1985', '11 3456-6543', '7'),  
	   ('53254444-1', '91305348010', 'R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeirão Pires - SP, 09405-380', '27/08/1975', '11 7656-6377', '8'), 
	   ('54566266-7', '79799299004', 'Alameda dos Arapanés, 945 - Indianópolis, São Paulo - SP, 04524-001', '21/03/1972', '11 95436-8769', '9'), 
	   ('54566266-8', '13771913039', 'R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140', '05/03/2018', '0', '10');
GO

INSERT INTO consulta (idMedico, idPaciente, dataConsulta, descricao, situacao)
VALUES ('3', '7', '20/01/2020  15:00:00', 'Realizada', 'Realizada'), 
	   ('2', '2', '01/06/2020  10:00:00', 'Cancelada', 'Cancelada'), 
	   ('2', '3', '07/02/2020  11:00:00', 'Realizada', 'Realizada'), 
	   ('2', '2', '06/02/2018  10:00:00', 'Realizada', 'Realizada'), 
	   ('1', '4', '07/02/2019  11:00:45', 'Cancelada', 'Cancelada'), 
	   ('3', '7', '08/03/2020  15:00:00', 'Agendada', 'Agendada'), 
	   ('1', '4', '09/03/2020  11:00:45', 'Agendada', 'Agendada');
GO