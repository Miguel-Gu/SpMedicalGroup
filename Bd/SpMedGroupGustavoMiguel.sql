CREATE DATABASE SP_MG_GUSTAVO_MIGUEL;

DROP DATABASE SP_MG_GUSTAVO_MIGUEL;
GO

USE SP_MG_GUSTAVO_MIGUEL;
GO

CREATE TABLE empresa (
  idEmpresa SMALLINT PRIMARY KEY IDENTITY,
  CNPJ CHAR(18) UNIQUE NOT NULL,
  nomeFantasia VARCHAR(200) UNIQUE NOT NULL,
  endereco VARCHAR(200) UNIQUE NOT NULL
  );
GO

CREATE TABLE tipoUsuario (
  idTipoUsuario SMALLINT PRIMARY KEY IDENTITY,
  nomeTipoUsuario VARCHAR(20) NOT NULL,
  );
GO

CREATE TABLE tipoMedico (
  idTipoMedico SMALLINT PRIMARY KEY IDENTITY,
  nomeTipoMedico VARCHAR(30) NOT NULL,
  );
GO

CREATE TABLE usuario (
  idUsuario SMALLINT PRIMARY KEY IDENTITY,
  idTipoUsuario SMALLINT FOREIGN KEY REFERENCES tipoUsuario(idTipoUsuario),
  nomeUsuario VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(100) NOT NULL
);
GO

CREATE TABLE medico (
  idMedico SMALLINT PRIMARY KEY IDENTITY,
  idTipoMedico SMALLINT FOREIGN KEY REFERENCES tipoMedico(idTipoMedico),
  idUsuario SMALLINT FOREIGN KEY REFERENCES usuario(idUsuario),
  CRM CHAR(8) NOT NULL,
  idEmpresa SMALLINT FOREIGN KEY REFERENCES empresa(idEmpresa)
);
GO

CREATE TABLE paciente (
  idPaciente SMALLINT PRIMARY KEY IDENTITY,
  RG CHAR(10) NOT NULL,
  CPF CHAR(11) NOT NULL,
  endereco VARCHAR(200) NOT NULL,
  dataNascimento DATE NOT NULL,
  telefone VARCHAR(13),
  idUsuario SMALLINT FOREIGN KEY REFERENCES usuario(idUsuario)
);

CREATE TABLE consulta (
  idConsulta SMALLINT PRIMARY KEY IDENTITY,
  idMedico SMALLINT FOREIGN KEY REFERENCES medico(idMedico) NOT NULL,
  idPaciente SMALLINT FOREIGN KEY REFERENCES paciente(idPaciente),
  dataConsulta DATETIME NOT NULL,
  descricao VARCHAR(200) NOT NULL DEFAULT 'Agendada',
  situacao VARCHAR(10) NOT NULL
);

CREATE TABLE imagemCliente (
	id INT PRIMARY KEY IDENTITY,
	idEmpresa SMALLINT NOT NULL UNIQUE REFERENCES empresa(idEmpresa),
	binario VARBINARY(MAX) NOT NULL,
	mimeType VARCHAR(30) NOT NULL,
	nomeArquivo VARCHAR(250) NOT NULL,
	data_inclusao DATETIME DEFAULT GETDATE() NULL
);