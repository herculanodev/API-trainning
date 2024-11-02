package med.voll.api.paciente;

import med.voll.api.endereço.DadosEndereço;

public record DadosCadastroPaciente(String nome, String email, String telefone, String cpf, DadosEndereço endereço) {
}
