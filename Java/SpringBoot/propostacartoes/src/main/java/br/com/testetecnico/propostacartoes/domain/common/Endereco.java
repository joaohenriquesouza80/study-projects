package br.com.testetecnico.propostacartoes.domain.common;

import br.com.testetecnico.propostacartoes.exception.CadastroExpectationFailedException;

import javax.persistence.Embeddable;

/**
 * Classe Modal Comum de Endereco que pode ser utilizada em outros modais
 * @author joao.souza
 */
@Embeddable
public class Endereco {

    private String rua;

    private Integer numero;

    private String bairro;

    private String cidade;

    private String cep;

    private String estado;

    public String getRua() {
        return rua;
    }
    public void setRua(String rua) {
        this.rua = rua;
    }

    public Integer getNumero() {
        return numero;
    }
    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }
    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }
    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getCep() {
        return cep;
    }
    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }

    /**
     * Valida se os campos da classe são brancos ou nulos
     */
    public void validarEndereco() {
        if ((this.rua == null) || this.rua.isEmpty())
            throw new CadastroExpectationFailedException("rua");
        if (this.numero == null)
            throw new CadastroExpectationFailedException("numero");
        if ((this.bairro == null) || this.bairro.isEmpty())
            throw new CadastroExpectationFailedException("bairro");
        if ((this.cidade == null) || this.cidade.isEmpty())
            throw new CadastroExpectationFailedException("cidade");
        if ((this.cep == null) || this.cep.isEmpty())
            throw new CadastroExpectationFailedException("cep");
        if ((this.estado == null) || this.estado.isEmpty())
            throw new CadastroExpectationFailedException("estado");
    }
}
