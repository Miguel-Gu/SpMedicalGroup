USE SP_MG_GUSTAVO_MIGUEL;
GO

SELECT * FROM empresa

SELECT * FROM tipoUsuario

SELECT * FROM tipoMedico 

SELECT * FROM usuario 

SELECT * FROM medico 

SELECT * FROM paciente 

SELECT * FROM consulta

SELECT * FROM imagemCliente




SELECT nomeUsuario Nome, email, senha, nomeTipoUsuario [Tipo de usuário] FROM usuario
LEFT JOIN tipoUsuario
ON usuario.idTipoUsuario = tipoUsuario.idTipoUsuario;




SELECT nomeUsuario [Nome do Médico], nomeTipoMedico [Especialidade], CRM FROM medico
LEFT JOIN tipoMedico
ON medico.idTipoMedico = tipoMedico.idTipoMedico
LEFT JOIN usuario
ON medico.idUsuario = usuario.idUsuario




SELECT nomeUsuario [Nome do Médico], nomeTipoMedico [Especialidade], CRM, nomeFantasia [Nome da Empresa] FROM medico
LEFT JOIN tipoMedico
ON medico.idTipoMedico = tipoMedico.idTipoMedico
LEFT JOIN usuario
ON medico.idUsuario = usuario.idUsuario
LEFT JOIN empresa
ON medico.idEmpresa = empresa.idEmpresa




SELECT nomeUsuario [Nome do Paciente], RG, CPF, endereco, CONVERT(VARCHAR(20), dataNascimento,103) [Data Nascimento], telefone FROM paciente
LEFT JOIN usuario
ON paciente.idUsuario = usuario.idUsuario




SELECT UP.nomeUsuario [Nome Paciente], UM.nomeUsuario [Nome Doutor], nomeTipoMedico [Especialidade],  CONVERT(VARCHAR(20), dataConsulta,103) [Data da Consulta], descricao [Descrição] FROM consulta
LEFT JOIN medico
ON consulta.idMedico = medico.idMedico
LEFT JOIN tipoMedico
ON medico.idTipoMedico = tipoMedico.idTipoMedico
LEFT JOIN paciente
ON consulta.idPaciente = paciente.idPaciente
LEFT JOIN usuario as UM
ON medico.idUsuario = UM.idUsuario
LEFT JOIN usuario UP
ON paciente.idUsuario = UP.idUsuario

SELECT * FROM CONSULTA WHERE idMedico = 1

SELECT * FROM CONSULTA WHERE idPaciente = 4




SELECT COUNT(nomeUsuario) [Quantidade de usuários]
FROM usuario;




CREATE FUNCTION TIPO_MEDICO(@nomeTipoMedico VARCHAR(30))
RETURNS TABLE
AS
RETURN (
	SELECT @nomeTipoMedico Especialidade, COUNT(idTipoMedico) [Quantidade de médicos] FROM tipoMedico
	WHERE nomeTipoMedico LIKE '%'+ @nomeTipoMedico +'%'
)
GO
SELECT * FROM TIPO_MEDICO('Angiologia');
GO




CREATE PROCEDURE RetornaIdade
@usuarioIdade VARCHAR(20) AS
BEGIN
SELECT nomeUsuario, DATEDIFF(YEAR,dataNascimento,GETDATE()) idade FROM usuario
RIGHT JOIN paciente
ON paciente.idUsuario = usuario.idUsuario
WHERE nomeUsuario = @usuarioIdade
END
GO
EXEC RetornaIdade 'Ligia'