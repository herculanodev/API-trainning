package med.voll.api.medico;

import med.voll.api.endereço.DadosEndereço;

public record DadosCadastroMedico(String nome, String email, String crm, Especialidade especialidade, DadosEndereço endereço) {
}
