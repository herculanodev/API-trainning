package med.voll.api.endereço;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class Endereço {


    private String logradouro;
    private String bairro;
    private String cep;
    private  String cidade;
    private String uf;
    private String complemento;
    private String numero;

    public Endereço(DadosEndereço dados) {
            this.logradouro = dados.logradouro();
            this.complemento = dados.complemento();
            this.uf = dados.uf();
            this.cidade = dados.cidade();
            this.bairro = dados.bairro();
            this.numero = dados.numero();
            this.cep = dados.cep();
    }
}
