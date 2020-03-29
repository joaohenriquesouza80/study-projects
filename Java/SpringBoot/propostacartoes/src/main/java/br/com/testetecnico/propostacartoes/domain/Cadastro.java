package br.com.testetecnico.propostacartoes.domain;

import br.com.testetecnico.propostacartoes.domain.common.Endereco;
import br.com.testetecnico.propostacartoes.domain.common.Identificador;
import br.com.testetecnico.propostacartoes.exception.CadastroExpectationFailedException;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Classe Modal da tabela cadastros
 * @author joao.souza
 */
@Entity(name = "cadastros")
public class Cadastro extends Identificador {

    private String nome;

    private String email;

    private String telefone;

    private Endereco endereco;

    @Column(name="cadastro_confirmado")
    private Boolean cadastroConfirmado;

    @Column(name = "data_confirmacao")
    private Date dataConfirmacao;

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email.toLowerCase();
    }

    public String getTelefone() {
        return telefone;
    }
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Endereco getEndereco() {
        return endereco;
    }
    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Boolean getCadastroConfirmado() {
        return cadastroConfirmado;
    }
    public void setCadastroConfirmado(Boolean cadastroConfirmado) {
        this.cadastroConfirmado = cadastroConfirmado;
    }

    public Date getDataConfirmacao() {
        return dataConfirmacao;
    }
    public void setDataConfirmacao(Date dataConfirmacao) {
        this.dataConfirmacao = dataConfirmacao;
    }

    /**
     * Valida se os campos da classe são brancos ou nulos
     */
    public void validarCadastro() {
        if ((this.nome == null) || this.nome.isEmpty())
            throw new CadastroExpectationFailedException("nome");
        if ((this.email == null) || this.email.isEmpty()) {
            throw new CadastroExpectationFailedException("email");
        } else {
            //Expressão regular para validar email
            Pattern p = Pattern.compile(".+@.+\\.[a-z]+");
            Matcher m = p.matcher(this.email);
            // E-mail válido ou inválido.
            if (!m.matches())
                throw new CadastroExpectationFailedException("Email inválido: " + this.email);
        }
        if ((this.telefone == null) || this.telefone.isEmpty())
            throw new CadastroExpectationFailedException("telefone");
        if (this.endereco == null) {
            throw new CadastroExpectationFailedException("endereco");
        } else {
            this.endereco.validarEndereco();
        }
    }
}
